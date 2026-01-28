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
    
    // Check for existing category to provide better error
    const existing = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, "i") } });
    if (existing) {
      return NextResponse.json({ error: "Category already exists" }, { status: 400 });
    }

    const category = await Category.create({ name, slug });
    return NextResponse.json(category);
  } catch (error: any) {
    console.error("POST /api/categories error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
