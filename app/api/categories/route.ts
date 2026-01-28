import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import Category from "@/models/Category";

export async function GET() {
  await dbConnect();
  const categories = await Category.find({}).sort({ name: 1 });
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    console.log("POST /api/categories body:", body);
    const { name } = body;
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    const slug = name.toLowerCase().trim().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    const category = await Category.create({ name, slug });
    return NextResponse.json(category);
  } catch (error: any) {
    console.error("POST /api/categories error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
