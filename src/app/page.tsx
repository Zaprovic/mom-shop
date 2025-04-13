import { Suspense } from "react";
import HeroSection from "./_components/01-hero-section";
import ProductsSection from "./_components/02-product-section";
import { Skeleton } from "@/components/ui/skeleton";
import CategoriesSection from "./_components/03-categories-section";

export default function Home() {
  return (
    <div className="mx-5 sm:mx-14">
      <HeroSection />

      <Suspense
        fallback={
          <section className="mx-auto border-b py-16">
            <div className="mx-auto max-w-6xl px-4">
              {/* Section title skeleton */}
              <Skeleton className="mx-auto mb-4 h-10 w-52" />

              {/* Section description skeleton */}
              <Skeleton className="mx-auto mb-12 h-5 w-64 max-w-md" />

              {/* Carousel items skeleton - reduced number and adjusted size */}
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex flex-col space-y-3">
                      {/* Product image - reduced height */}
                      <Skeleton className="h-[180px] w-full rounded-md" />
                      {/* Product title */}
                      <Skeleton className="h-5 w-3/5" />
                      {/* Product price */}
                      <Skeleton className="h-4 w-1/5" />
                    </div>
                  ))}
              </div>

              {/* View more button skeleton */}
              <div className="mt-10 text-center">
                <Skeleton className="mx-auto h-9 w-36 rounded-lg" />
              </div>
            </div>
          </section>
        }
      >
        <ProductsSection />
      </Suspense>

      <CategoriesSection />
    </div>
  );
}
