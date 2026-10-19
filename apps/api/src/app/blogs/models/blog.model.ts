import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import { ContentStatus } from '../../shared/constants/content-status';

export interface IBlog {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  status: ContentStatus;
  publishedAt: Date | null;
  deletedAt: Date | null;
}

export interface IBlogDocument extends IBlog, Document {
  _id: Types.ObjectId;
}

export type IBlogModel = Model<IBlogDocument>;

const blogSchema = new Schema<IBlogDocument, IBlogModel>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    status: { type: String, enum: Object.values(ContentStatus), default: ContentStatus.DRAFT },
    publishedAt: { type: Date, default: null },
    deletedAt: { type: Date, default: null, index: true },
  },
  { timestamps: true }
);

const Blog = (mongoose.models.Blog as IBlogModel) || mongoose.model<IBlogDocument, IBlogModel>('Blog', blogSchema);

export default Blog;
