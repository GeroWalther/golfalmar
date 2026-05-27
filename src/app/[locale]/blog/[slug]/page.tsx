import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BlogPostJsonLd } from "@/components/seo/blog-post-jsonld";
import { getPublishedPostBySlug, listPublishedPosts } from "@/lib/blog/queries";
import { readingMinutes } from "@/lib/blog/utils";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-dynamic";

function buildOgImage(coverImage: string | undefined): string {
  if (!coverImage) return `${SITE_URL}/opengraph-image`;
  if (coverImage.startsWith("http")) return coverImage;
  return `${SITE_URL}${coverImage}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPublishedPostBySlug(slug, locale);
  if (!post) return {};

  const url = `${SITE_URL}/${post.locale}/blog/${post.slug}`;
  const ogImage = buildOgImage(post.coverImage);
  const ogLocale =
    post.locale === "de" ? "de_DE" : post.locale === "es" ? "es_ES" : "en_US";

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      siteName: "GOLF AL MAR",
      locale: ogLocale,
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt ?? post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
    other: {
      // Helpful for older crawlers and some chat-app previews
      "article:published_time": post.publishedAt.toISOString(),
      "article:modified_time": post.updatedAt.toISOString(),
    },
  };
  void locale;
}

export async function generateStaticParams() {
  // Pre-resolve published slugs at build time so the first hit is fast.
  // Falls back to dynamic rendering for any post created after build.
  try {
    const posts = await listPublishedPosts("en");
    const de = await listPublishedPosts("de");
    const es = await listPublishedPosts("es");
    return [
      ...posts.map((p) => ({ locale: "en", slug: p.slug })),
      ...de.map((p) => ({ locale: "de", slug: p.slug })),
      ...es.map((p) => ({ locale: "es", slug: p.slug })),
    ];
  } catch {
    return [];
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getPublishedPostBySlug(slug, locale);
  if (!post) notFound();

  const minutes = readingMinutes(post.contentHtml);
  const dateFmt = format(post.publishedAt, "d MMMM yyyy");

  return (
    <article className="container-page py-12 sm:py-16">
      <BlogPostJsonLd post={post} />

      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> All posts
      </Link>

      <header className="mt-8 max-w-3xl mx-auto text-center">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {dateFmt} · {minutes} min read
          {post.author ? ` · ${post.author}` : ""}
        </p>
        <h1 className="display text-3xl sm:text-5xl mt-4 tracking-[-0.02em]">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </header>

      {post.coverImage && (
        <div className="relative mt-10 mx-auto max-w-5xl aspect-[16/9] rounded-md overflow-hidden bg-sand">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt ?? post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
      )}

      <div
        className="prose-blog mt-12 mx-auto max-w-3xl"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {post.tags.length > 0 && (
        <div className="mt-16 mx-auto max-w-3xl flex flex-wrap gap-2 border-t border-border pt-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
