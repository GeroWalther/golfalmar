"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Status = "paid" | "fulfilled" | "cancelled" | "refunded";

const TRANSITIONS: Record<Status, Status[]> = {
  paid: ["fulfilled", "cancelled", "refunded"],
  fulfilled: ["refunded"],
  cancelled: [],
  refunded: [],
};

const LABELS: Record<Status, string> = {
  fulfilled: "Mark fulfilled · send shipped email",
  paid: "Re-open as paid",
  cancelled: "Cancel order",
  refunded: "Mark refunded",
};

export function OrderStatusActions({
  orderId,
  currentStatus,
  hasTracking,
}: {
  orderId: string;
  currentStatus: Status;
  hasTracking: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const allowed = TRANSITIONS[currentStatus] ?? [];

  function update(next: Status) {
    if (next === "fulfilled" && !hasTracking) {
      toast.error("Add a tracking number first.");
      return;
    }
    startTransition(async () => {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data?.error ?? "Could not update status");
        return;
      }
      if (data?.warning) {
        toast.warning(data.warning);
      } else if (next === "fulfilled") {
        toast.success("Marked fulfilled — shipped email sent.");
      } else {
        toast.success(`Status updated to ${next}`);
      }
      router.refresh();
    });
  }

  if (allowed.length === 0) {
    return (
      <p className="text-xs text-muted-foreground">
        No further status actions available.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {allowed.map((s) => {
        const disabled =
          pending || (s === "fulfilled" && !hasTracking);
        return (
          <Button
            key={s}
            type="button"
            size="sm"
            variant={s === "fulfilled" ? "default" : "outline"}
            onClick={() => update(s)}
            disabled={disabled}
            title={
              s === "fulfilled" && !hasTracking
                ? "Add a tracking number first"
                : undefined
            }
          >
            {pending ? <Loader2 className="size-4 animate-spin" /> : LABELS[s]}
          </Button>
        );
      })}
    </div>
  );
}
