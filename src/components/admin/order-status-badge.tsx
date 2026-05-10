import { cn } from "@/lib/utils";

const STYLES: Record<string, string> = {
  paid: "bg-volt text-volt-foreground border-transparent",
  fulfilled: "bg-fairway text-fairway-foreground border-transparent",
  cancelled: "bg-muted text-muted-foreground border-border",
  refunded: "bg-destructive/10 text-destructive border-destructive/30",
};

export function OrderStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider",
        STYLES[status] ?? STYLES.paid,
      )}
    >
      {status}
    </span>
  );
}
