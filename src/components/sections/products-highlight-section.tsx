import { useTranslations } from "next-intl";
import { ProductGrid } from "@/components/product/product-grid";

export function ProductsHighlightSection() {
  const t = useTranslations("products");
  return (
    <section id="products" className="container-page py-24">
      <div className="flex flex-col gap-4 mb-12 max-w-2xl">
        <p className="eyebrow">{t("highlightEyebrow")}</p>
        <h2 className="display text-4xl sm:text-6xl">Two essentials. Endless rounds.</h2>
      </div>
      <ProductGrid />
    </section>
  );
}
