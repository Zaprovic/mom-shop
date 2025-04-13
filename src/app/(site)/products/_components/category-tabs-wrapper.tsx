import { db } from "@/db";
import { CategoryTabs } from "./category-tabs";
import {
  categoriesTable,
  productCategoryTable,
  productsTable,
} from "@/db/schema";
import { eq } from "drizzle-orm";

const CategoryTabsWrapper = async () => {
  const categories = await db.select().from(categoriesTable);
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

  const productsWithCategories = await getProductsWithCategories();
  return (
    <CategoryTabs
      categories={categories}
      productsWithCategories={productsWithCategories}
    />
  );
};

export default CategoryTabsWrapper;
