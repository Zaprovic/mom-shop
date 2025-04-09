import CarouselProvider from "@/components/providers/carousel-provider";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";

const CarouselSection = async () => {
  await new Promise((res) => {
    setTimeout(() => {
      res("Two seconds");
    }, 2000);
  });

  return (
    <CarouselProvider delay={5000}>
      <CarouselContent className="-ml-4">
        {Array.from({ length: 200 }).map((_, idx) => (
          <CarouselItem
            key={idx}
            className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          >
            product
          </CarouselItem>
        ))}
      </CarouselContent>
    </CarouselProvider>
  );
};

export default CarouselSection;
