"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Loader2, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "./rich-text-editor";
import { LOCALES, type Locale } from "@/lib/constants";

export type PostFormValues = {
  id?: string;
  title: string;
  slug?: string;
  excerpt?: string;
  coverImage?: string | null;
  coverImageAlt?: string;
  contentHtml: string;
  author?: string;
  locale: Locale;
  status: "draft" | "published";
  tags?: string[];
};

export function BlogPostForm({ initial }: { initial?: PostFormValues }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const isEdit = Boolean(initial?.id);

  const [form, setForm] = useState<PostFormValues>(
    initial ?? {
      title: "",
      slug: "",
      excerpt: "",
      coverImage: null,
      coverImageAlt: "",
      contentHtml: "",
      author: "GOLF AL MAR",
      locale: "en",
      status: "draft",
      tags: [],
    },
  );

  function update<K extends keyof PostFormValues>(key: K, value: PostFormValues[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function uploadCover(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/blog/upload", {
        method: "POST",
        body: fd,
      });
      let data: { url?: string; error?: string } = {};
      try {
        data = await res.json();
      } catch {
        // server returned non-JSON (e.g. Vercel edge 413 HTML page)
      }
      if (!res.ok) throw new Error(data.error ?? `Upload failed (${res.status})`);
      if (!data.url) throw new Error("Upload succeeded but no URL returned");
      update("coverImage", data.url);
      toast.success("Cover image uploaded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function submit(nextStatus?: "draft" | "published") {
    const payload: PostFormValues = {
      ...form,
      status: nextStatus ?? form.status,
      tags: form.tags?.filter(Boolean) ?? [],
    };
    if (!payload.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!payload.contentHtml.trim() || payload.contentHtml === "<p></p>") {
      toast.error("Write some content first");
      return;
    }
    startTransition(async () => {
      const url = isEdit
        ? `/api/admin/blog/${initial!.id}`
        : "/api/admin/blog";
      const res = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data?.error ?? "Save failed");
        return;
      }
      toast.success(
        nextStatus === "published"
          ? "Published"
          : isEdit
            ? "Saved"
            : "Draft created",
      );
      if (!isEdit && data.id) {
        router.push(`/admin/blog/${data.id}`);
      } else {
        router.refresh();
      }
    });
  }

  async function deletePost() {
    if (!isEdit) return;
    if (!window.confirm("Delete this post permanently?")) return;
    const res = await fetch(`/api/admin/blog/${initial!.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      toast.error("Delete failed");
      return;
    }
    toast.success("Post deleted");
    router.push("/admin/blog");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="eyebrow">
            Title
          </Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="An honest look at sun damage in golf"
            className="text-lg"
          />
        </div>

        <div className="space-y-2">
          <Label className="eyebrow">Content</Label>
          <RichTextEditor
            value={form.contentHtml}
            onChange={(html) => update("contentHtml", html)}
            placeholder="Start writing — use the toolbar to add headings, lists, links and images…"
          />
          <p className="text-xs text-muted-foreground">
            HTML is sanitised on save. Allowed: headings, paragraphs, bold,
            italic, lists, blockquotes, links, images.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt" className="eyebrow">
            Excerpt <span className="opacity-60">(used for the post card and Open Graph description — auto-filled if blank)</span>
          </Label>
          <textarea
            id="excerpt"
            value={form.excerpt ?? ""}
            onChange={(e) => update("excerpt", e.target.value)}
            placeholder="One or two sentences that summarise the post for previews and social shares."
            rows={3}
            maxLength={320}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/40 disabled:opacity-50"
          />
          <p className="text-xs text-muted-foreground text-right">
            {(form.excerpt ?? "").length} / 320
          </p>
        </div>
      </div>

      <aside className="space-y-6">
        <div className="rounded-md border border-border bg-card p-5 space-y-4">
          <p className="eyebrow">Publish</p>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => submit("draft")}
              disabled={pending}
            >
              {pending ? <Loader2 className="size-4 animate-spin" /> : "Save draft"}
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => submit("published")}
              disabled={pending}
            >
              {pending ? <Loader2 className="size-4 animate-spin" /> : "Publish"}
            </Button>
            {isEdit && (
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={deletePost}
                disabled={pending}
                className="ml-auto"
              >
                <Trash2 className="size-3.5" />
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Status:{" "}
            <span className="font-mono uppercase">{form.status}</span>
          </p>
        </div>

        <div className="rounded-md border border-border bg-card p-5 space-y-4">
          <p className="eyebrow">Cover image</p>
          {form.coverImage ? (
            <div className="space-y-3">
              <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-muted">
                <Image
                  src={form.coverImage}
                  alt={form.coverImageAlt ?? form.title}
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              </div>
              <Input
                placeholder="Image alt text"
                value={form.coverImageAlt ?? ""}
                onChange={(e) => update("coverImageAlt", e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => update("coverImage", null)}
              >
                Remove
              </Button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-border p-6 cursor-pointer hover:bg-muted/40 transition">
              {uploading ? (
                <Loader2 className="size-5 animate-spin text-muted-foreground" />
              ) : (
                <Upload className="size-5 text-muted-foreground" />
              )}
              <span className="text-xs text-muted-foreground text-center">
                Click to upload — JPG, PNG, WebP, HEIC (iPhone), max 5MB
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadCover(f);
                }}
              />
            </label>
          )}
          <p className="text-xs text-muted-foreground">
            Recommended: 1200×630 (it's the size most social platforms scrape
            for previews on WhatsApp, Messenger, etc.).
          </p>
        </div>

        <div className="rounded-md border border-border bg-card p-5 space-y-4">
          <p className="eyebrow">Settings</p>
          <div className="space-y-2">
            <Label htmlFor="slug" className="eyebrow text-[10px]">
              Slug (URL)
            </Label>
            <Input
              id="slug"
              value={form.slug ?? ""}
              onChange={(e) => update("slug", e.target.value)}
              placeholder="auto-generated from title"
            />
            <p className="text-[10px] text-muted-foreground">
              /blog/<span className="font-mono">{form.slug || "your-slug"}</span>
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="locale" className="eyebrow text-[10px]">
              Language
            </Label>
            <select
              id="locale"
              value={form.locale}
              onChange={(e) => update("locale", e.target.value as Locale)}
              className="w-full h-10 rounded-md border border-input bg-transparent px-3 text-sm"
            >
              {LOCALES.map((l) => (
                <option key={l} value={l}>
                  {l.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="author" className="eyebrow text-[10px]">
              Author
            </Label>
            <Input
              id="author"
              value={form.author ?? ""}
              onChange={(e) => update("author", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags" className="eyebrow text-[10px]">
              Tags (comma-separated)
            </Label>
            <Input
              id="tags"
              value={(form.tags ?? []).join(", ")}
              onChange={(e) =>
                update(
                  "tags",
                  e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                )
              }
              placeholder="performance, recovery"
            />
          </div>
        </div>
      </aside>
    </div>
  );
}
