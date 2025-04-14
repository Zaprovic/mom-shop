"use client";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  ShoppingBagIcon,
  Trash2Icon,
} from "lucide-react";
import Image from "next/image";

const ProductsInCart = () => {
  const { items, removeItem, updateQuantity } = useCartStore();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(Number(id), newQuantity);
  };
  return (
    <div className="p-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center gap-4 border-b border-gray-200 py-6 last:border-0 sm:flex-row dark:border-gray-700/50"
        >
          <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg shadow-sm">
            {item.mainImage ? (
              <Image
                src={item.mainImage}
                alt={item.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-700">
                <ShoppingBagIcon
                  size={24}
                  className="text-gray-400 dark:text-gray-500"
                />
              </div>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {item.name}
            </h3>
            <p className="mt-1 line-clamp-4 text-sm text-balance text-gray-500 dark:text-gray-300">
              {item.description}
            </p>
            <div className="mt-2 font-medium text-pink-600 dark:text-pink-400">
              {formatCurrency(item.price)}
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-full bg-gray-50 px-3 py-1 dark:bg-gray-700/50">
            <button
              onClick={() =>
                handleQuantityChange(
                  item.id.toString(),
                  (item.quantity || 1) - 1,
                )
              }
              aria-label="Decrease quantity"
              className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-200 hover:text-pink-600 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-pink-400"
            >
              <MinusCircleIcon size={18} />
            </button>

            <span className="w-8 text-center font-medium text-gray-800 dark:text-white">
              {item.quantity || 1}
            </span>

            <button
              onClick={() =>
                handleQuantityChange(
                  item.id.toString(),
                  (item.quantity || 1) + 1,
                )
              }
              aria-label="Increase quantity"
              className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-200 hover:text-pink-600 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-pink-400"
            >
              <PlusCircleIcon size={18} />
            </button>
          </div>

          <Button
            onClick={() => removeItem(item.id)}
            className="rounded-full bg-gray-50 p-2 text-gray-400 transition-all hover:bg-red-50 hover:text-red-500 dark:bg-gray-700/50 dark:text-gray-400 dark:hover:bg-red-900/30 dark:hover:text-red-400"
            aria-label="Remove item"
          >
            <Trash2Icon size={18} />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ProductsInCart;
