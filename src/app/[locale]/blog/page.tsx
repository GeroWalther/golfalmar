import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PostCard } from "@/components/blog/post-card";
import { listPublishedPosts } from "@/lib/blog/queries";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const title = t("title");
  const description = t("subtitle");
  const url = `${SITE_URL}/${locale}/blog`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: "GOLF AL MAR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = await listPublishedPosts(locale);

  return (
    <div className="container-page py-16 sm:py-24">
      <header className="max-w-3xl mb-12 sm:mb-16">
        <p className="eyebrow mb-4">GOLF AL MAR</p>
        <h1 className="display text-4xl sm:text-6xl">{t("title")}</h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          {t("subtitle")}
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="rounded-md border border-dashed border-border p-16 text-center">
          <p className="text-sm text-muted-foreground">{t("empty")}</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p._id} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
