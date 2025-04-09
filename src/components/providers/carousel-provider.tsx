"use client";

import { ReactNode } from "react";
import { Carousel, CarouselNext, CarouselPrevious } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

type props = {
  delay: number;
  children: ReactNode;
};

const CarouselProvider = ({ delay, children }: props) => {
  return (
    <Carousel
      plugins={[Autoplay({ delay, stopOnInteraction: true })]}
      className="mx-auto max-w-5xl"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      {children}
      <div className="mt-8 flex items-center justify-center gap-2">
        <CarouselPrevious className="static mx-1 transform-none" />
        <CarouselNext className="static mx-1 transform-none" />
      </div>
    </Carousel>
  );
};

export default CarouselProvider;
