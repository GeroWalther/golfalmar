import { connectDB } from "@/lib/db";
import { BlogPost, type BlogPostDoc } from "@/lib/models/blog-post";

export type PublicPost = {
  _id: string;
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: string;
  coverImageAlt?: string;
  contentHtml: string;
  author?: string;
  locale: string;
  publishedAt: Date;
  updatedAt: Date;
  tags: string[];
};

function toPublic(doc: BlogPostDoc): PublicPost {
  return {
    _id: String(doc._id),
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt ?? undefined,
    coverImage: doc.coverImage ?? undefined,
    coverImageAlt: doc.coverImageAlt ?? undefined,
    contentHtml: doc.contentHtml,
    author: doc.author,
    locale: doc.locale ?? "en",
    publishedAt: doc.publishedAt ?? doc.createdAt,
    updatedAt: doc.updatedAt,
    tags: doc.tags ?? [],
  };
}

export async function listPublishedPosts(
  locale: string,
  limit?: number,
): Promise<PublicPost[]> {
  try {
    await connectDB();
  } catch (e) {
    console.error("[blog/listPublishedPosts] DB connect failed", e);
    return [];
  }
  const query = BlogPost.find({
    status: "published",
    locale: locale as "en" | "de" | "es",
  }).sort({ publishedAt: -1, createdAt: -1 });
  if (limit) query.limit(limit);
  const docs = await query.lean<BlogPostDoc[]>();
  return docs.map((d) => toPublic(d));
}

export async function getPublishedPostBySlug(
  slug: string,
): Promise<PublicPost | null> {
  try {
    await connectDB();
  } catch (e) {
    console.error("[blog/getPublishedPostBySlug] DB connect failed", e);
    return null;
  }
  const doc = await BlogPost.findOne({ slug, status: "published" }).lean();
  return doc ? toPublic(doc as BlogPostDoc) : null;
}

export async function listAllSlugsForSitemap(): Promise<
  { slug: string; locale: string; updatedAt: Date }[]
> {
  try {
    await connectDB();
  } catch {
    return [];
  }
  const docs = await BlogPost.find({ status: "published" })
    .select("slug locale updatedAt publishedAt")
    .lean();
  return docs.map((d) => ({
    slug: d.slug,
    locale: d.locale ?? "en",
    updatedAt: d.updatedAt ?? new Date(),
  }));
}
