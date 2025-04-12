import { Suspense } from "react";
import HeroSection from "./_components/01-hero-section";
import ProductsSection from "./_components/02-product-section/02-products-section";

export default function Home() {
  return (
    <div className="mx-5 sm:mx-14">
      <HeroSection />

      <Suspense fallback={<div>Cargando...</div>}>
        <ProductsSection />
      </Suspense>
    </div>
  );
}
