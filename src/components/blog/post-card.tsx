import Image from "next/image";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { PublicPost } from "@/lib/blog/queries";
import { readingMinutes } from "@/lib/blog/utils";

export function PostCard({ post }: { post: PublicPost }) {
  const minutes = readingMinutes(post.contentHtml);
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-md border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow"
    >
      {post.coverImage && (
        <div className="relative aspect-[16/9] bg-sand">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt ?? post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-col gap-3 p-6 flex-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {format(post.publishedAt, "d MMM yyyy")} · {minutes} min read
        </p>
        <h3 className="font-heading text-xl sm:text-2xl font-semibold uppercase tracking-tight leading-tight">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <span className="mt-auto inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
          Read more <ArrowUpRight className="size-3.5" />
        </span>
      </div>
    </Link>
  );
}
