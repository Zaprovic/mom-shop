import CategoriesContainer from "./_components/categories-container";
import { db } from "@/db";
import { categoriesTable } from "@/db/schema";

const CategoriesPage = async () => {
  const categories = await db.select().from(categoriesTable);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
          Categorías
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Explore our carefully curated collections of premium beauty and
          skincare products designed to enhance your natural beauty
        </p>
      </div>

      <CategoriesContainer categories={categories} />
    </div>
  );
};

export default CategoriesPage;
