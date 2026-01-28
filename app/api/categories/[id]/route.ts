import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import Category from "@/models/Category";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const { name } = await req.json();
    const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    const category = await Category.findByIdAndUpdate(
      params.id,
      { name, slug },
      { new: true }
    );
    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    await Category.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
