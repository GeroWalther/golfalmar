import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { PostCard } from "@/components/blog/post-card";
import { listPublishedPosts } from "@/lib/blog/queries";

export async function LatestPostsSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = await listPublishedPosts(locale, 3);
  if (posts.length === 0) return null;

  return (
    <section className="container-page py-24 border-t border-border">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <p className="eyebrow">{t("latestEyebrow")}</p>
          <h2 className="display text-4xl sm:text-5xl mt-3">
            {t("latestTitle")}
          </h2>
        </div>
        <LinkButton href="/blog" variant="outline" size="lg">
          {t("latestCta")}
          <ArrowUpRight className="size-4" />
        </LinkButton>
      </div>
      <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <PostCard key={p._id} post={p} />
        ))}
      </div>
    </section>
  );
}
