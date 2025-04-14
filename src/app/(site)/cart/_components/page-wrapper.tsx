"use client";

import { useCartStore } from "@/stores/cart-store";
import NoProducts from "./no-products";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { items } = useCartStore();

  if (items.length === 0) {
    return <NoProducts />;
  }

  return <>{children}</>;
};

export default PageWrapper;
