import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function DashboardCard({
  label,
  value,
  hint,
  icon,
  accent,
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
  accent?: "fairway" | "volt" | "muted";
}) {
  return (
    <div className="rounded-md border border-border bg-card p-5">
      <div className="flex items-start justify-between">
        <p className="eyebrow">{label}</p>
        {icon && (
          <div
            className={cn(
              "flex size-8 items-center justify-center rounded-md",
              accent === "fairway" && "bg-fairway/10 text-fairway",
              accent === "volt" && "bg-volt/30 text-volt-foreground",
              (!accent || accent === "muted") && "bg-muted text-muted-foreground",
            )}
          >
            {icon}
          </div>
        )}
      </div>
      <p className="mt-3 font-heading text-3xl font-extrabold tracking-tight">
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
