import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import Post from "@/models/Post";
import "@/models/Category"; // Pre-register Category model

export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find({}).populate("category").sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error: any) {
    console.error("API Error [GET /api/posts]:", error);
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
