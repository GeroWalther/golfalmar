"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function ProductStockToggle({
  productId,
  soldOut,
}: {
  productId: string;
  soldOut: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function toggle() {
    startTransition(async () => {
      const res = await fetch(`/api/admin/products/${productId}/stock`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ soldOut: !soldOut }),
      });
      if (!res.ok) {
        toast.error("Could not update stock");
        return;
      }
      toast.success(soldOut ? "Back in stock" : "Marked sold out");
      router.refresh();
    });
  }

  return (
    <Button
      type="button"
      size="sm"
      variant={soldOut ? "default" : "outline"}
      onClick={toggle}
      disabled={pending}
    >
      {pending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : soldOut ? (
        "Mark in stock"
      ) : (
        "Mark sold out"
      )}
    </Button>
  );
}
