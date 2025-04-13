import { Suspense } from "react";
import { Loader2Icon } from "lucide-react";
import { SearchProducts } from "./_components/search-products";
import CategoryTabsWrapper from "./_components/category-tabs-wrapper";

export default async function ProductsPage() {
  return (
    <div>
      <SearchProducts />
      <div className="container mx-auto my-17 max-w-7xl px-4 py-8">
        <Suspense fallback={<Loader />}>
          <CategoryTabsWrapper />
        </Suspense>
      </div>
    </div>
  );
}

// Separate Loader Component
const Loader = () => (
  <div className="flex flex-col items-center text-center">
    <Loader2Icon className="h-10 w-10 animate-spin" />
  </div>
);
