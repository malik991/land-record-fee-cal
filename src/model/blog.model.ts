// model/blog.model.ts
import mongoose, { Schema } from "mongoose";

interface BlogDocument extends mongoose.Document {
  slug: string;
  views: number;
}

const BlogSchema = new Schema<BlogDocument>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const BlogModel =
  (mongoose.models.Blog as mongoose.Model<BlogDocument>) ||
  mongoose.model<BlogDocument>("Blog", BlogSchema);

export default BlogModel;
