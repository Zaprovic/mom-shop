import { CategoryCard } from "@/components/globals/category-card";
import CarouselProvider from "@/components/providers/carousel-provider";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { db } from "@/db";
import { categoriesTable } from "@/db/schema";
import { hashString } from "@/lib/utils";
import React from "react";

const CategoriesSection = async () => {
  const categories = await db.select().from(categoriesTable);
  return (
    <section className="border-border mx-auto border-b py-16">
      <div className="px-4">
        <h2 className="mb-12 text-center text-3xl font-bold -tracking-wider">
          Comprar por Categoría
        </h2>

        <CarouselProvider delay={4000}>
          <CarouselContent>
            {categories.map((category) => {
              const colorIndex = hashString(category.name);

              return (
                <CarouselItem
                  key={category.id}
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <CategoryCard category={category} colorIndex={colorIndex} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </CarouselProvider>
      </div>
    </section>
  );
};

export default CategoriesSection;
