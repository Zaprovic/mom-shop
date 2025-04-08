import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative mx-auto h-fit max-w-6xl py-20 lg:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-16 px-16 md:flex-row">
        <div className="z-10 pt-10 text-center lg:w-1/2 lg:pt-16 lg:text-left">
          <h2 className="mb-4 text-4xl font-bold -tracking-wider lg:text-5xl">
            Descubre tu belleza natural
          </h2>
          <p className="mb-8 text-lg text-pretty lg:text-xl">
            Productos de cuidado de la piel premium hechos con ingredientes
            organicos para un brillo radiante y saludable
          </p>

          <div>
            <Link
              href={"/products"}
              className="rounded-lg border px-8 py-3 font-medium transition"
            >
              Comprar ahora
            </Link>
          </div>
        </div>

        <figure className="relative mt-8 hidden h-[40vh] rounded-xl md:mt-0 md:h-[60vh] md:w-1/2 lg:block">
          <Image
            src={"/images/beauty-01.webp"}
            alt="Main hero section image"
            fill
            priority
            className="rounded-xl object-contain drop-shadow-lg"
          />
        </figure>
      </div>
    </section>
  );
};

export default HeroSection;
