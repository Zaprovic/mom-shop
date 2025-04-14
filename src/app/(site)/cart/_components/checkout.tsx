"use client";

import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { CreditCardIcon, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Checkout = () => {
  const { items } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const totalPrice = items
    .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
    .toString();

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 rounded-xl bg-white p-6 shadow-md dark:border dark:border-gray-700/50 dark:bg-gray-800/50 dark:backdrop-blur-sm">
        <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white">
          Resumen del Pedido
        </h2>

        <div className="mb-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">
              Subtotal (
              {items.reduce((count, item) => count + (item.quantity || 1), 0)}{" "}
              artículos)
            </span>
            <span className="font-medium text-gray-800 dark:text-white">
              {formatCurrency(Number(totalPrice))}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Envío</span>
            <span className="font-medium text-green-600 dark:text-green-400">
              Gratis
            </span>
          </div>
          <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700/50">
            <div className="flex justify-between font-bold">
              <span className="text-gray-800 dark:text-white">Total</span>
              <span className="text-xl text-pink-600 dark:text-pink-400">
                {formatCurrency(Number(totalPrice))}
              </span>
            </div>
            <p className="mt-1 text-right text-xs text-gray-500 dark:text-gray-400">
              Impuestos incluidos
            </p>
          </div>
        </div>

        <button
          className={`flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-pink-600 to-pink-500 py-3.5 font-medium text-white shadow-lg transition-all hover:from-pink-700 hover:to-pink-600 hover:shadow-xl dark:from-pink-500 dark:to-pink-400 dark:hover:from-pink-600 dark:hover:to-pink-500 ${
            isCheckingOut ? "cursor-not-allowed opacity-75" : ""
          }`}
          disabled={isCheckingOut}
          onClick={() => setIsCheckingOut(true)}
        >
          {isCheckingOut ? (
            "Procesando..."
          ) : (
            <>
              <CreditCardIcon size={18} />
              Pagar Seguro
            </>
          )}
        </button>

        <div className="mt-6">
          <Link
            href="/products"
            className="flex items-center justify-center text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400"
          >
            <ShoppingBagIcon size={16} className="mr-2" />
            Seguir Comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
