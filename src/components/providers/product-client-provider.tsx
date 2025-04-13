"use client";

import { SelectProductWithCategoryType } from "@/types";
import ProductCard from "../globals/product-card";

// this provider will leverage zustand for state management

type props = {
  product: SelectProductWithCategoryType;
};
const ProductClientProvider = ({ product }: props) => {
  return <ProductCard product={product} />;
};

export default ProductClientProvider;
