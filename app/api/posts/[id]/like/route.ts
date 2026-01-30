import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Post from '@/models/Post';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await req.cookies;
    const likedKey = `liked_${id}`;
    
    if (cookieStore.has(likedKey)) {
      return NextResponse.json({ error: 'Already liked' }, { status: 400 });
    }

    await connectDB();
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const response = NextResponse.json(post);
    response.cookies.set(likedKey, 'true', {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
    });
    
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
