"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartStore } from "@/stores/cart-store";
import { useEffect, useState } from "react";
import { SelectCategoryType, SelectProductWithCategoryType } from "@/types";
import ProductCard from "@/components/globals/product-card";
import EmptyState from "./empty-state";
import { useSearchProductStore } from "@/stores/product-store";

type CategoryTabsProps = {
  categories: SelectCategoryType[];
  productsWithCategories: SelectProductWithCategoryType[];
};

export function CategoryTabs({
  categories,
  productsWithCategories,
}: CategoryTabsProps) {
  const { query } = useSearchProductStore();
  const { isInCart, toggleItem } = useCartStore();

  const [, setProducts] = useState<SelectProductWithCategoryType[]>(
    productsWithCategories,
  );

  useEffect(() => {
    setProducts(productsWithCategories);
  }, [productsWithCategories]);

  const filterProducts = (products: SelectProductWithCategoryType[]) => {
    if (!query) return products;

    return products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
  };

  return (
    <>
      <Tabs defaultValue={"TODOS"} className="mb-8">
        <TabsList className="flex h-auto w-full flex-wrap justify-center gap-2 p-2">
          {[
            {
              id: 99999,
              name: "TODOS",
            },
            ...categories,
          ].map((cat) => (
            <TabsTrigger
              key={cat.id}
              value={cat.name}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-grow text-center"
            >
              {cat.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent
          value="TODOS"
          className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6"
        >
          {filterProducts(productsWithCategories).length > 0 ? (
            filterProducts(productsWithCategories).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                inCart={isInCart(product.id)}
                toggleItem={toggleItem}
              />
            ))
          ) : (
            <EmptyState message="No se encontraron productos" />
          )}
        </TabsContent>

        {categories.map((category) => {
          const filteredProducts = filterProducts(
            productsWithCategories.filter((product) =>
              product.categories.some((cat) => cat.id === category.id),
            ),
          );

          return (
            <TabsContent
              key={category.id}
              value={category.name}
              className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6"
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    inCart={isInCart(product.id)}
                    toggleItem={toggleItem}
                  />
                ))
              ) : (
                <EmptyState
                  categoryName={`'${category.name.toLocaleLowerCase()}'`}
                  message="No se encontraron productos"
                />
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </>
  );
}
