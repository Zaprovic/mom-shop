import React from "react";

const CartLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-800 sm:text-left dark:text-white">
        Your Shopping Cart
      </h1>
      {children}
    </div>
  );
};

export default CartLayout;
