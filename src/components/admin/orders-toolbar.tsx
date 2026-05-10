"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Download, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STATUSES = ["all", "paid", "fulfilled", "cancelled", "refunded"] as const;

export function OrdersToolbar() {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  const currentStatus = params.get("status") ?? "all";
  const currentQ = params.get("q") ?? "";
  const [q, setQ] = useState(currentQ);

  function setStatus(next: string) {
    const sp = new URLSearchParams(Array.from(params.entries()));
    if (next === "all") sp.delete("status");
    else sp.set("status", next);
    sp.delete("page");
    startTransition(() => router.push(`/admin/orders?${sp.toString()}`));
  }

  function applySearch(value: string) {
    const sp = new URLSearchParams(Array.from(params.entries()));
    if (!value) sp.delete("q");
    else sp.set("q", value);
    sp.delete("page");
    startTransition(() => router.push(`/admin/orders?${sp.toString()}`));
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        pending && "opacity-70",
      )}
    >
      <div className="inline-flex items-center gap-1 rounded-md border border-border p-1 text-xs">
        {STATUSES.map((s) => {
          const active = s === currentStatus;
          return (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={cn(
                "px-2.5 py-1 rounded font-mono uppercase tracking-wider",
                active
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {s}
            </button>
          );
        })}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          applySearch(q.trim());
        }}
        className="flex items-center gap-2"
      >
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search email or name…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-8 w-64"
          />
          {q && (
            <button
              type="button"
              onClick={() => {
                setQ("");
                applySearch("");
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <Button type="submit" size="sm" variant="outline" disabled={pending}>
          Search
        </Button>
        <a
          href="/api/admin/orders/export"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider rounded-md border border-border px-2.5 py-2 hover:bg-muted"
        >
          <Download className="size-3.5" />
          CSV
        </a>
      </form>
    </div>
  );
}
