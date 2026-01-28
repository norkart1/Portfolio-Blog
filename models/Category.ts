import mongoose, { Schema, model, models } from "mongoose";

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  createdAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default models.Category || model("Category", CategorySchema);
