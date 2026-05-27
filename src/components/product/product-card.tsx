"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { formatPriceEUR, type Product } from "@/lib/products";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";

export function ProductCard({ product }: { product: Product }) {
  const tProducts = useTranslations("products");
  const locale = useLocale();
  const name = tProducts(`${product.id}.name`);
  const description = tProducts(`${product.id}.shortDescription`);

  return (
    <article className="group flex flex-col rounded-md border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/boutique/${product.slug}`} className="relative block aspect-[4/5] bg-white">
        <Image
          src={product.image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-10 transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/85 backdrop-blur px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition">
          {tProducts("viewProduct")}
          <ArrowUpRight className="size-3" />
        </span>
      </Link>
      <div className="flex flex-col gap-3 p-6">
        <div>
          <Link href={`/boutique/${product.slug}`} className="hover:underline">
            <h3 className="font-heading text-xl font-semibold uppercase tracking-tight">
              {name}
            </h3>
          </Link>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="font-heading text-lg sm:text-xl font-medium tracking-tight">
            {formatPriceEUR(product.priceCents, locale)}
          </p>
          <AddToCartButton
            productId={product.id}
            productName={name}
            variant="default"
            size="default"
            showIcon
          >
            {tProducts("addToCart")}
          </AddToCartButton>
        </div>
      </div>
    </article>
  );
}
