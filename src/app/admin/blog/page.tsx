import Link from "next/link";
import { Plus, ExternalLink } from "lucide-react";
import { AdminNav } from "@/components/admin/admin-nav";
import { Button } from "@/components/ui/button";
import { connectDB } from "@/lib/db";
import { BlogPost, type BlogPostDoc } from "@/lib/models/blog-post";

export const dynamic = "force-dynamic";

export default async function AdminBlogListPage() {
  let posts: BlogPostDoc[] = [];
  let dbError = false;
  try {
    await connectDB();
    posts = await BlogPost.find({})
      .sort({ updatedAt: -1 })
      .limit(200)
      .lean<BlogPostDoc[]>();
  } catch (e) {
    console.error("[admin/blog]", e);
    dbError = true;
  }

  const dateFmt = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <AdminNav />
      <main className="container-page py-10 space-y-6">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-2">
            <p className="eyebrow">Journal</p>
            <h1 className="display text-3xl">Posts</h1>
          </div>
          <Button asChild>
            <Link href="/admin/blog/new">
              <Plus className="size-4" /> New post
            </Link>
          </Button>
        </header>

        {dbError ? (
          <p className="text-sm text-destructive">
            Could not connect to the database. Check MONGODB_URI.
          </p>
        ) : posts.length === 0 ? (
          <div className="rounded-md border border-dashed border-border p-16 text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              No posts yet — write the first one.
            </p>
            <Button asChild>
              <Link href="/admin/blog/new">
                <Plus className="size-4" /> New post
              </Link>
            </Button>
          </div>
        ) : (
          <div className="rounded-md border border-border overflow-x-auto bg-card">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="bg-muted/40 text-left">
                <tr className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Locale</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Updated</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr
                    key={String(p._id)}
                    className="border-t border-border/60 hover:bg-muted/30"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/blog/${p._id}`}
                        className="font-semibold hover:underline"
                      >
                        {p.title}
                      </Link>
                      <div className="text-xs text-muted-foreground font-mono mt-0.5">
                        /blog/{p.slug}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs uppercase">
                      {p.locale ?? "en"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${
                          p.status === "published"
                            ? "bg-fairway text-fairway-foreground border-transparent"
                            : "bg-muted text-muted-foreground border-border"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-muted-foreground whitespace-nowrap">
                      {dateFmt.format(p.updatedAt ?? p.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {p.status === "published" && (
                        <Link
                          href={`/${p.locale ?? "en"}/blog/${p.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground"
                        >
                          View <ExternalLink className="size-3" />
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}
