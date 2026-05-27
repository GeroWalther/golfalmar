import { NextResponse } from "next/server";
import { z } from "zod";
import { Types } from "mongoose";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/lib/models/blog-post";
import { sanitizeBlogHtml } from "@/lib/blog/sanitize";
import { slugify, autoExcerpt } from "@/lib/blog/utils";
import { broadcastJournalPost } from "@/lib/journal-broadcast";

export const runtime = "nodejs";

const Body = z.object({
  title: z.string().min(2).max(200).optional(),
  slug: z.string().max(80).optional(),
  excerpt: z.string().max(320).optional(),
  coverImage: z.string().max(500).optional().nullable(),
  coverImageAlt: z.string().max(200).optional(),
  contentHtml: z.string().min(1).optional(),
  author: z.string().max(120).optional(),
  locale: z.enum(["en", "de", "es"]).optional(),
  status: z.enum(["draft", "published"]).optional(),
  tags: z.array(z.string().max(40)).max(20).optional(),
});

async function uniqueSlugExcept(base: string, currentId: string): Promise<string> {
  let slug = base || "post";
  let suffix = 0;
  while (
    await BlogPost.findOne({ slug, _id: { $ne: currentId } })
      .select("_id")
      .lean()
  ) {
    suffix += 1;
    slug = `${base}-${suffix}`;
  }
  return slug;
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "bad id" }, { status: 400 });
  }
  let parsed;
  try {
    parsed = Body.parse(await req.json());
  } catch (e) {
    return NextResponse.json({ error: "invalid body", detail: String(e) }, { status: 400 });
  }
  await connectDB();
  const post = await BlogPost.findById(id);
  if (!post) return NextResponse.json({ error: "not found" }, { status: 404 });

  if (parsed.title !== undefined) post.title = parsed.title.trim();
  if (parsed.slug !== undefined) {
    const next = slugify(parsed.slug);
    if (next && next !== post.slug) {
      post.slug = await uniqueSlugExcept(next, id);
    }
  }
  if (parsed.contentHtml !== undefined) {
    post.contentHtml = sanitizeBlogHtml(parsed.contentHtml);
  }
  if (parsed.excerpt !== undefined) {
    post.excerpt = parsed.excerpt.trim() || autoExcerpt(post.contentHtml);
  }
  if (parsed.coverImage !== undefined) {
    post.coverImage = parsed.coverImage || undefined;
  }
  if (parsed.coverImageAlt !== undefined) {
    post.coverImageAlt = parsed.coverImageAlt;
  }
  if (parsed.author !== undefined) post.author = parsed.author.trim();
  if (parsed.locale !== undefined) post.locale = parsed.locale;
  if (parsed.tags !== undefined) post.tags = parsed.tags;
  if (parsed.status !== undefined) {
    if (parsed.status === "published" && post.status !== "published") {
      post.publishedAt = post.publishedAt ?? new Date();
    }
    post.status = parsed.status;
  }
  await post.save();

  // Broadcast the post to subscribers exactly once — only after the post
  // becomes published AND we haven't already notified for this post.
  let broadcast: { sent: number; recipients: number } | undefined;
  if (post.status === "published" && !post.notifiedSubscribersAt) {
    try {
      broadcast = await broadcastJournalPost({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt ?? undefined,
        coverImage: post.coverImage ?? undefined,
        locale: post.locale ?? "en",
      });
      post.notifiedSubscribersAt = new Date();
      await post.save();
    } catch (e) {
      console.error("[admin/blog PATCH] broadcast failed", e);
    }
  }

  return NextResponse.json({
    ok: true,
    slug: post.slug,
    status: post.status,
    broadcast,
  });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "bad id" }, { status: 400 });
    }
    await connectDB();
    const result = await BlogPost.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[admin/blog DELETE] failed", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "delete failed" },
      { status: 500 },
    );
  }
}
