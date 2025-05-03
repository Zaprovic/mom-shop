import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  AlertCircle,
  ArrowUpRightSquare,
  BadgeCheck,
  Truck,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getProductsWithCategories,
  getSingleProductWithCategory,
} from "@/lib/db";
import AddToCartBtn from "./_components/add-to-cart-btn";
import { formatCurrency } from "@/lib/utils";
import ModalProvider from "@/components/providers/modal-provider";

export async function generateStaticParams() {
  const products = await getProductsWithCategories();

  return products.map((p) => ({
    id: p.id.toString(),
  }));
}

export default async function ProductModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productWithCategory = await getSingleProductWithCategory(Number(id));

  if (!productWithCategory) {
    return (
      <ModalProvider>
        <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
          <AlertCircle className="h-16 w-16 text-rose-500" />
          <p className="text-lg font-semibold">Producto no encontrado</p>
          <p className="text-sm">
            El producto que buscas no existe o ha sido eliminado.
          </p>
        </div>
      </ModalProvider>
    );
  }

  return (
    <ModalProvider>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-lg shadow-md">
            {productWithCategory.discountPercentage != null &&
              productWithCategory.discountPercentage > 0 && (
                <div className="absolute top-2 left-2 z-10">
                  <Badge className="bg-rose-500 font-medium text-white">
                    {productWithCategory.discountPercentage}% OFF
                  </Badge>
                </div>
              )}
            <Image
              src={productWithCategory.mainImage ?? "/images/beauty-01.webp"}
              alt={productWithCategory.name}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(max-width: 640px) 100vw, 400px"
              priority
            />
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {productWithCategory.categories.map((category) => (
                <Badge
                  key={category.id}
                  className="bg-primary/10 text-primary text-xs"
                >
                  {category.name}
                </Badge>
              ))}
            </div>

            <div>
              <h2 className="line-clamp-3 text-2xl font-bold -tracking-wider text-balance">
                {productWithCategory.name}
              </h2>

              {productWithCategory.discountPercentage &&
              productWithCategory.discountPercentage > 0 ? (
                <div className="mt-2 flex items-center gap-2">
                  <p className="text-primary text-2xl font-bold -tracking-wider">
                    {formatCurrency(
                      productWithCategory.price *
                        (1 -
                          (productWithCategory.discountPercentage ?? 0) / 100),
                    )}
                  </p>
                  <p className="text-sm text-gray-500 line-through">
                    {formatCurrency(productWithCategory.price)}
                  </p>
                </div>
              ) : (
                <p className="text-primary mt-2 text-2xl font-bold -tracking-wider">
                  {formatCurrency(productWithCategory.price)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 rounded-md p-3">
                <div
                  className={`h-3 w-3 rounded-full ${productWithCategory.inStock ? "bg-emerald-500" : "bg-rose-500"}`}
                ></div>
                <p className="text-sm font-medium">
                  {productWithCategory.inStock ? "En Stock" : "Agotado"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: Destacados y Botones */}
        <div className="rounded-lg border p-4">
          {/* Destacados del Producto */}
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <BadgeCheck size={18} className="text-primary" />
              <span className="text-xs">Productos Auténticos</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={18} className="text-primary" />
              <span className="text-xs">Envío Rápido</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCcw size={18} className="text-primary" />
              <span className="text-xs">Devoluciones en 30 días</span>
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck size={18} className="text-primary" />
              <span className="text-xs">Calidad Garantizada</span>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <AddToCartBtn product={productWithCategory} />
            <Button
              variant="outline"
              className="border-primary text-primary flex items-center justify-center gap-2"
            >
              {/* <Heart size={18} /> */}
              Favoritos
            </Button>
          </div>
        </div>

        {/* SECCIÓN 3: Descripción del Producto */}
        <div className="w-full rounded-md p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <h3 className="text-base font-semibold">
              Descripción del Producto
            </h3>
            <div className="h-px flex-1"></div>
          </div>
          <p className="line-clamp-5 text-sm leading-relaxed -tracking-wider text-pretty">
            {productWithCategory.description}
          </p>

          {/* Enlace para Ver Detalles Completos */}
          <Button
            variant="link"
            className="text-primary mt-4 flex w-full items-center justify-center gap-1"
            asChild
          >
            <Link
              href={`/products/${productWithCategory.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver detalles completos del producto
              <ArrowUpRightSquare size={14} />
            </Link>
          </Button>
        </div>
      </div>
    </ModalProvider>
  );
}
