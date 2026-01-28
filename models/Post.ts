import mongoose, { Schema, model, models } from "mongoose";

export interface IPost {
  _id: string;
  title: string;
  content: string;
  image: string;
  category: mongoose.Types.ObjectId;
  author: string;
  readTime: string;
  createdAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    author: { type: String, required: true },
    readTime: { type: String, required: true },
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);
export default Post;

