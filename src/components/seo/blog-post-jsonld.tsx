import { BUSINESS, SITE_URL } from "@/lib/constants";
import type { PublicPost } from "@/lib/blog/queries";

export function BlogPostJsonLd({ post }: { post: PublicPost }) {
  const url = `${SITE_URL}/${post.locale}/blog/${post.slug}`;
  const image = post.coverImage
    ? post.coverImage.startsWith("http")
      ? post.coverImage
      : `${SITE_URL}${post.coverImage}`
    : `${SITE_URL}/opengraph-image`;

  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [image],
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Organization",
      name: post.author ?? BUSINESS.name,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/opengraph-image`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    inLanguage: post.locale,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
