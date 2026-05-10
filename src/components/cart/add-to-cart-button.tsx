"use client";

import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useCart } from "./cart-provider";
import { ShoppingBag } from "lucide-react";

interface AddToCartButtonProps extends Omit<ButtonProps, "onClick"> {
  productId: string;
  productName: string;
  quantity?: number;
  showIcon?: boolean;
}

export function AddToCartButton({
  productId,
  productName,
  quantity = 1,
  showIcon = true,
  children,
  className,
  variant = "default",
  size = "default",
  ...props
}: AddToCartButtonProps) {
  const t = useTranslations("cart");
  const tProducts = useTranslations("products");
  const { addItem, setOpen } = useCart();

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        addItem(productId, quantity);
        toast.success(t("added"), { description: productName });
        setOpen(true);
      }}
      {...props}
    >
      {showIcon && <ShoppingBag className="size-4" />}
      {children ?? tProducts("addToCart")}
    </Button>
  );
}
