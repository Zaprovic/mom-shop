import { db } from "@/db";
import { CategoryTabs } from "./category-tabs";
import { categoriesTable } from "@/db/schema";
import { getProductsWithCategories } from "@/lib/db";

const CategoryTabsWrapper = async () => {
  const categories = await db.select().from(categoriesTable);

  const productsWithCategories = await getProductsWithCategories();
  return (
    <CategoryTabs
      categories={categories}
      productsWithCategories={productsWithCategories}
    />
  );
};

export default CategoryTabsWrapper;
