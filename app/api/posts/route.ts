import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import Post from "@/models/Post";

export async function GET() {
  await dbConnect();
  try {
    const posts = await Post.find({}).populate("category").sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const data = await req.json();
    const post = await Post.create(data);
    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
