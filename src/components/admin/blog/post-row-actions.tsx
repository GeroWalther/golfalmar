"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ExternalLink, Loader2, Pencil, Trash2 } from "lucide-react";

export function BlogPostRowActions({
  id,
  slug,
  locale,
  status,
}: {
  id: string;
  slug: string;
  locale: string;
  status: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function onDelete() {
    if (!window.confirm("Delete this post permanently? This cannot be undone."))
      return;
    startTransition(async () => {
      const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      let body: { error?: string } = {};
      try {
        body = await res.json();
      } catch {
        // non-JSON response
      }
      if (!res.ok) {
        toast.error(body.error ?? `Delete failed (${res.status})`);
        return;
      }
      toast.success("Post deleted");
      router.refresh();
    });
  }

  return (
    <div className="flex items-center justify-end gap-4 text-xs font-mono uppercase tracking-wider">
      <Link
        href={`/admin/blog/${id}`}
        className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
      >
        <Pencil className="size-3" /> Edit
      </Link>
      {status === "published" && (
        <Link
          href={`/${locale}/blog/${slug}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          View <ExternalLink className="size-3" />
        </Link>
      )}
      <button
        type="button"
        onClick={onDelete}
        disabled={pending}
        className="inline-flex items-center gap-1 text-destructive/80 hover:text-destructive disabled:opacity-50"
      >
        {pending ? (
          <Loader2 className="size-3 animate-spin" />
        ) : (
          <Trash2 className="size-3" />
        )}{" "}
        Delete
      </button>
    </div>
  );
}
