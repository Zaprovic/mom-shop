import CarouselProvider from "@/components/providers/carousel-provider";
import ProductClientProvider from "@/components/providers/product-client-provider";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { db } from "@/db";
import {
  categoriesTable,
  productCategoryTable,
  productsTable,
} from "@/db/schema";
import { eq } from "drizzle-orm";

const CarouselSection = async () => {
  async function getProductsWithCategories() {
    const products = await db
      .select({
        id: productsTable.id,
        userId: productsTable.userId,
        name: productsTable.name,
        price: productsTable.price,
        brand: productsTable.brand,
        mainImage: productsTable.mainImage,
        createdAt: productsTable.createdAt,
        updatedAt: productsTable.updatedAt,
        description: productsTable.description,
        images: productsTable.images,
        benefits: productsTable.benefits,
        howToUse: productsTable.howToUse,
        ingredients: productsTable.ingredients,
        inStock: productsTable.inStock,
        discountPercentage: productsTable.discountPercentage,
      })
      .from(productsTable);

    const productsWithCategories = await Promise.all(
      products.map(async (p) => {
        const categories = await db
          .select({
            id: categoriesTable.id,
            userId: categoriesTable.userId,
            name: categoriesTable.name,
            isActive: categoriesTable.isActive,
          })
          .from(productCategoryTable)
          .innerJoin(
            categoriesTable,
            eq(categoriesTable.id, productCategoryTable.categoryId),
          )
          .where(eq(productCategoryTable.productId, p.id));
        return {
          ...p,
          categories,
        };
      }),
    );
    return productsWithCategories;
  }

  const ps = await getProductsWithCategories();

  return (
    <CarouselProvider delay={5000}>
      <CarouselContent className="-ml-4">
        {ps.map((p, idx) => (
          <CarouselItem
            key={idx}
            className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          >
            <ProductClientProvider product={p} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </CarouselProvider>
  );
};

export default CarouselSection;
