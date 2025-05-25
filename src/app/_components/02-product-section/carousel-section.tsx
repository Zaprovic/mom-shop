import CarouselProvider from "@/components/providers/carousel-provider";
import ProductClientProvider from "@/components/providers/product-client-provider";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { getProductsWithCategories } from "@/lib/db";
import { shuffleArray } from "@/lib/utils";

const CarouselSection = async () => {
  const products = await getProductsWithCategories();
  const randomizedProducts = shuffleArray(products);

  const RandomizedProducts = () => {
    return randomizedProducts.map((product, idx) => (
      <CarouselItem
        key={idx}
        className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
      >
        <ProductClientProvider product={product} />
      </CarouselItem>
    ));
  };

  return (
    <CarouselProvider delay={5000}>
      <CarouselContent className="-ml-4">
        <RandomizedProducts />
      </CarouselContent>
    </CarouselProvider>
  );
};

export default CarouselSection;
