import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

const NoProducts = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
      <div className="rounded-full bg-gray-100 p-6 dark:bg-gray-800/50">
        <ShoppingBag size={64} className="text-pink-500 dark:text-pink-400" />
      </div>
      <h2 className="mt-6 mb-2 text-2xl font-bold text-gray-800 dark:text-gray-50">
        Tu carrito está vacío
      </h2>
      <p className="mb-8 max-w-md text-gray-500 dark:text-gray-400">
        Parece que aún no has añadido nada a tu carrito. Explora nuestros
        productos y encuentra algo que te encante.
      </p>
      <Link
        href="/products"
        className="rounded-md bg-gradient-to-r from-pink-600 to-pink-500 px-8 py-3 text-white shadow-lg transition-all hover:from-pink-700 hover:to-pink-600 hover:shadow-xl dark:from-pink-500 dark:to-pink-400 dark:hover:from-pink-600 dark:hover:to-pink-500"
      >
        Explorar Productos
      </Link>
    </div>
  );
};

export default NoProducts;
