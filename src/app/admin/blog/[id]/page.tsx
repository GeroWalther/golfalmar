import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Types } from "mongoose";
import { AdminNav } from "@/components/admin/admin-nav";
import { BlogPostForm } from "@/components/admin/blog/post-form";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/lib/models/blog-post";
import type { Locale } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!Types.ObjectId.isValid(id)) notFound();

  await connectDB();
  const post = await BlogPost.findById(id).lean();
  if (!post) notFound();

  return (
    <>
      <AdminNav />
      <main className="container-page py-10 space-y-6">
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> All posts
        </Link>
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Journal · Edit</p>
            <h1 className="display text-3xl mt-1">{post.title}</h1>
          </div>
          {post.status === "published" && (
            <Link
              href={`/${post.locale ?? "en"}/blog/${post.slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider rounded-md border border-border px-2.5 py-2 hover:bg-muted"
            >
              View live <ExternalLink className="size-3.5" />
            </Link>
          )}
        </header>
        <BlogPostForm
          initial={{
            id: String(post._id),
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt ?? "",
            coverImage: post.coverImage ?? null,
            coverImageAlt: post.coverImageAlt ?? "",
            contentHtml: post.contentHtml,
            author: post.author ?? "GOLF AL MAR",
            locale: (post.locale ?? "en") as Locale,
            status: (post.status as "draft" | "published") ?? "draft",
            tags: post.tags ?? [],
          }}
        />
      </main>
    </>
  );
}
