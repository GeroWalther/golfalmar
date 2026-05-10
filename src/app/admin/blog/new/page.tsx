import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminNav } from "@/components/admin/admin-nav";
import { BlogPostForm } from "@/components/admin/blog/post-form";

export default function NewBlogPostPage() {
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
        <header>
          <p className="eyebrow">Journal</p>
          <h1 className="display text-3xl mt-1">New post</h1>
        </header>
        <BlogPostForm />
      </main>
    </>
  );
}
