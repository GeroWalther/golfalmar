"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/subscribers", label: "Newsletter" },
  { href: "/admin/blog", label: "Journal" },
];

function isItemActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

export function AdminNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background sticky top-0 z-30">
      <div className="container-page flex h-14 items-center justify-between gap-3">
        <div className="flex items-center gap-6 min-w-0">
          <Link href="/admin" className="flex items-center gap-2 shrink-0">
            <span className="block size-2 rounded-full bg-fairway" />
            <span className="font-mono text-xs uppercase tracking-[0.22em]">
              <span className="hidden sm:inline">GOLF AL MAR · </span>Admin
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {ITEMS.map((item) => {
              const active = isItemActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-1.5 text-sm font-mono uppercase tracking-wider rounded-md transition",
                    active
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md border border-border hover:bg-muted"
          >
            <ExternalLink className="size-3.5" /> View site
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open navigation"
                className="md:hidden inline-flex items-center justify-center size-10 rounded-md hover:bg-muted"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col p-0 w-72">
              <SheetHeader className="px-6 pt-6 text-left">
                <SheetTitle className="font-mono text-xs uppercase tracking-[0.22em]">
                  GOLF AL MAR · Admin
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4 mt-6">
                {ITEMS.map((item) => {
                  const active = isItemActive(pathname, item.href);
                  return (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "px-3 py-2.5 text-sm font-mono uppercase tracking-wider rounded-md transition",
                          active
                            ? "bg-foreground text-background"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted",
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
              <div className="mt-auto px-4 pb-6 pt-4 border-t border-border">
                <SheetClose asChild>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md border border-border hover:bg-muted"
                  >
                    <ExternalLink className="size-3.5" /> View site
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
