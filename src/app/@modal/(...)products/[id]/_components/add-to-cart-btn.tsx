"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { SelectProductWithCategoryType } from "@/types";
import { CheckIcon, ShoppingCartIcon } from "lucide-react";

type props = {
  product: SelectProductWithCategoryType;
};

const AddToCartBtn = ({ product }: props) => {
  const { toggleItem, isInCart } = useCartStore();
  const inCart = isInCart(product.id);

  const handleToggleCart = () => {
    toggleItem(product);
  };

  return (
    <Button
      className={cn("w-full flex-1", {
        "bg-emerald-600 hover:bg-emerald-700": inCart,
      })}
      onClick={handleToggleCart}
    >
      {inCart ? (
        <>
          <CheckIcon className="mr-2 h-4 w-4" />
          ¡En el carrito!
        </>
      ) : (
        <>
          <ShoppingCartIcon className="mr-2 h-4 w-4" />
          Añadir al carrito
        </>
      )}
    </Button>
  );
};

export default AddToCartBtn;
