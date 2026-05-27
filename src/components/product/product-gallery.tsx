"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  alt: string;
};

export function ProductGallery({ images, alt }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const safeIdx = Math.min(activeIdx, images.length - 1);
  const active = images[safeIdx];

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-md border border-border bg-white overflow-hidden">
        <Image
          key={active}
          src={active}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-10 sm:p-16"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveIdx(i)}
              aria-label={`View image ${i + 1} of ${images.length}`}
              aria-current={i === safeIdx}
              className={cn(
                "relative aspect-square w-20 sm:w-24 rounded-md border bg-white overflow-hidden transition-colors",
                i === safeIdx
                  ? "border-foreground"
                  : "border-border hover:border-foreground/40",
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="100px"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
