import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import Category from "@/models/Category";

export async function GET() {
  await dbConnect();
  const categories = await Category.find({}).sort({ name: 1 });
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  // Simple check - in production you'd verify session
  await dbConnect();
  try {
    const { name } = await req.json();
    const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    const category = await Category.create({ name, slug });
    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
