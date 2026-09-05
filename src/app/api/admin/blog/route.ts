import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/lib/models/blog-post";
import { sanitizeBlogHtml } from "@/lib/blog/sanitize";
import { slugify, autoExcerpt } from "@/lib/blog/utils";
import { broadcastJournalPost } from "@/lib/journal-broadcast";
import { LOCALES } from "@/lib/constants";

export const runtime = "nodejs";

const Body = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().max(80).optional(),
  excerpt: z.string().max(320).optional(),
  coverImage: z.string().max(500).optional().nullable(),
  coverImageAlt: z.string().max(200).optional(),
  contentHtml: z.string().min(1),
  author: z.string().max(120).optional(),
  locale: z.enum(LOCALES).default("en"),
  status: z.enum(["draft", "published"]).default("draft"),
  tags: z.array(z.string().max(40)).max(20).optional(),
});

async function uniqueSlug(base: string): Promise<string> {
  let slug = base || "post";
  let suffix = 0;
  while (await BlogPost.findOne({ slug }).lean()) {
    suffix += 1;
    slug = `${base}-${suffix}`;
  }
  return slug;
}

export async function POST(req: Request) {
  let parsed;
  try {
    parsed = Body.parse(await req.json());
  } catch (e) {
    return NextResponse.json({ error: "invalid body", detail: String(e) }, { status: 400 });
  }
  await connectDB();

  const safeHtml = sanitizeBlogHtml(parsed.contentHtml);
  const baseSlug = slugify(parsed.slug || parsed.title);
  const slug = await uniqueSlug(baseSlug);

  const doc = await BlogPost.create({
    slug,
    title: parsed.title.trim(),
    excerpt: parsed.excerpt?.trim() || autoExcerpt(safeHtml),
    coverImage: parsed.coverImage || undefined,
    coverImageAlt: parsed.coverImageAlt || parsed.title,
    contentHtml: safeHtml,
    author: parsed.author?.trim() || "GOLF AL MAR",
    locale: parsed.locale,
    status: parsed.status,
    tags: parsed.tags ?? [],
    publishedAt: parsed.status === "published" ? new Date() : undefined,
  });

  let broadcast: { sent: number; recipients: number } | undefined;
  if (doc.status === "published") {
    try {
      broadcast = await broadcastJournalPost({
        slug: doc.slug,
        title: doc.title,
        excerpt: doc.excerpt ?? undefined,
        coverImage: doc.coverImage ?? undefined,
        locale: doc.locale ?? "en",
      });
      doc.notifiedSubscribersAt = new Date();
      await doc.save();
    } catch (e) {
      console.error("[admin/blog POST] broadcast failed", e);
    }
  }

  return NextResponse.json({
    ok: true,
    id: String(doc._id),
    slug: doc.slug,
    broadcast,
  });
}
