"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function OrderTrackingForm({
  orderId,
  initialNumber,
  initialUrl,
}: {
  orderId: string;
  initialNumber?: string | null;
  initialUrl?: string | null;
}) {
  const router = useRouter();
  const [trackingNumber, setTrackingNumber] = useState(initialNumber ?? "");
  const [trackingUrl, setTrackingUrl] = useState(initialUrl ?? "");
  const [pending, startTransition] = useTransition();

  function save() {
    startTransition(async () => {
      const res = await fetch(`/api/admin/orders/${orderId}/tracking`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trackingNumber: trackingNumber.trim() || null,
          trackingUrl: trackingUrl.trim() || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data?.error ?? "Could not save tracking");
        return;
      }
      toast.success("Tracking saved");
      router.refresh();
    });
  }

  function clearTracking() {
    setTrackingNumber("");
    setTrackingUrl("");
    startTransition(async () => {
      const res = await fetch(`/api/admin/orders/${orderId}/tracking`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackingNumber: null, trackingUrl: null }),
      });
      if (!res.ok) {
        toast.error("Could not clear tracking");
        return;
      }
      toast.success("Tracking cleared");
      router.refresh();
    });
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="trackingNumber" className="eyebrow">
            Tracking number
          </Label>
          <Input
            id="trackingNumber"
            placeholder="e.g. 1Z999AA10123456784"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            disabled={pending}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="trackingUrl" className="eyebrow">
            Tracking URL (optional)
          </Label>
          <Input
            id="trackingUrl"
            type="url"
            placeholder="https://www.ups.com/track?tracknum=…"
            value={trackingUrl}
            onChange={(e) => setTrackingUrl(e.target.value)}
            disabled={pending}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" size="sm" onClick={save} disabled={pending}>
          {pending ? <Loader2 className="size-4 animate-spin" /> : "Save tracking"}
        </Button>
        {(initialNumber || initialUrl) && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={clearTracking}
            disabled={pending}
          >
            <Trash2 className="size-3.5" /> Clear
          </Button>
        )}
        {initialUrl && (
          <a
            href={initialUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground ml-auto"
          >
            Open <ExternalLink className="size-3" />
          </a>
        )}
      </div>
      {!trackingNumber.trim() && (
        <p className="text-xs text-muted-foreground">
          Tracking number is required before you can mark this order as fulfilled.
        </p>
      )}
    </div>
  );
}
