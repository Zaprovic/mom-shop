import CarouselProvider from "@/components/providers/carousel-provider";
import ProductClientProvider from "@/components/providers/product-client-provider";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { getProductsWithCategories } from "@/lib/db";

const CarouselSection = async () => {
  const products = await getProductsWithCategories();

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const randomizedProducts = shuffleArray(products);

  return (
    <CarouselProvider delay={5000}>
      <CarouselContent className="-ml-4">
        {randomizedProducts.map((p, idx) => (
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
