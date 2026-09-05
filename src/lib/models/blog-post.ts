import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";
import { LOCALES } from "../constants";

const BlogPostSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    excerpt: { type: String, trim: true, maxlength: 320 },
    coverImage: { type: String, trim: true },
    coverImageAlt: { type: String, trim: true, maxlength: 200 },
    contentHtml: { type: String, required: true },
    author: { type: String, trim: true, default: "GOLF AL MAR" },
    locale: { type: String, enum: [...LOCALES], default: "en", index: true },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
    tags: { type: [String], default: [] },
    publishedAt: { type: Date, index: true },
    notifiedSubscribersAt: { type: Date },
  },
  { timestamps: true },
);

// Compound index supports the most common public query — published posts in
// the current locale, newest first — without a full collection scan.
BlogPostSchema.index({ status: 1, locale: 1, publishedAt: -1 });

export type BlogPostDoc = InferSchemaType<typeof BlogPostSchema> & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

export const BlogPost: Model<BlogPostDoc> =
  (models.BlogPost as Model<BlogPostDoc>) ||
  model<BlogPostDoc>("BlogPost", BlogPostSchema);
