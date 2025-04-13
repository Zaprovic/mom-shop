import { SelectProductWithCategoryType } from "@/types";
import { Card, CardContent, CardFooter } from "../ui/card";
import { cn, formatCurrency } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  AlertCircleIcon,
  CheckIcon,
  HeartIcon,
  Minus,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type props = {
  product: SelectProductWithCategoryType;
  inCart?: boolean;
  toggleItem?: (p: SelectProductWithCategoryType) => void;
};

const ProductCard = ({ product, inCart, toggleItem }: props) => {
  return (
    <Card
      className={cn("relative m-0 h-96 overflow-hidden p-0 transition-all", {
        "opacity-80": !product.inStock,
        "hover:shadow-lg dark:hover:shadow-emerald-900/10": product.inStock,
        "ring-1 ring-emerald-500 dark:ring-emerald-400": inCart,
      })}
    >
      {product.discountPercentage != null && product.discountPercentage > 0 && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-rose-500 font-medium text-white dark:bg-rose-600">
            {product.discountPercentage}% OFF
          </Badge>
        </div>
      )}

      {!product.inStock && (
        <div className="bg-black-50 absolute inset-0 z-20 flex items-center justify-center dark:bg-black/70">
          <Badge className="bg-gray-800 px-4 py-2 text-xs font-bold text-white dark:bg-gray-700">
            Agotado
          </Badge>
        </div>
      )}
      <div className="absolute top-2 right-2 z-20 flex gap-1">
        <Button
          variant={"secondary"}
          size={"icon"}
          className="size-8 rounded-full opacity-90 backdrop-blur-sm hover:opacity-100"
        >
          <HeartIcon className="dar:text-gray-300 size-4 text-gray-600 hover:text-rose-500 dark:hover:text-rose-400" />
        </Button>

        {product.inStock && (
          <Button
            size={"icon"}
            variant={inCart ? "default" : "secondary"}
            onClick={() => toggleItem && toggleItem(product)}
            aria-label={inCart ? "Quitar del carrito" : "Agregar al carrito"}
            title={inCart ? "Quitar del carrito" : "Agregar al carrito"}
            className={cn(
              "size-8 rounded-full opacity-90 backdrop-blur-sm hover:opacity-100",
              {
                "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700":
                  inCart,
              },
            )}
          >
            {inCart ? (
              <MinusIcon className="size-4 text-gray-100 dark:text-gray-300" />
            ) : (
              <PlusIcon className="size-4 text-gray-100 dark:text-gray-300" />
            )}
          </Button>
        )}
      </div>

      <figure className="relative h-64 w-full overflow-hidden bg-gray-50 dark:bg-neutral-800">
        {inCart && product.inStock && (
          <div className="absolute bottom-0 left-0 z-10 bg-emerald-500 px-2 py-1 text-xs text-white shadow-sm dark:bg-emerald-600">
            <CheckIcon className="mr-1 inline-block size-3" />
            En el carrito
          </div>
        )}

        <Image
          src={product.mainImage}
          alt={product.name}
          fill
          className={cn("object-contain p-2", {
            grayscale: !product.inStock,
          })}
        />
      </figure>

      <CardContent className="p-4 pt-3">
        <div className="flex items-start justify-between">
          <h3 className="text-foreground line-clamp-1 text-base font-semibold">
            {product.name.charAt(0).toUpperCase() +
              product.name.slice(1).toLowerCase()}
          </h3>
        </div>
        <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div className="flex flex-col">
          {product.discountPercentage && product.discountPercentage > 0 ? (
            <>
              <p className="text-primary dark:text-secondary-foreground font-semibold">
                {formatCurrency(
                  (1 - product.discountPercentage / 100) * product.price,
                )}
              </p>
              <p className="text-muted-foreground text-xs line-through">
                {formatCurrency(product.price)}
              </p>
            </>
          ) : (
            <p className="text-primary dark:text-primary-foreground font-semibold">
              {product.price}
            </p>
          )}
        </div>

        {!product.inStock ? (
          <Button
            variant={"outline"}
            size={"sm"}
            disabled
            className="cursor-not-allowed opacity-70"
          >
            <AlertCircleIcon className="mr-1 size-3.75" />
            <span className="text-sm">Agotado</span>
          </Button>
        ) : (
          <Button
            asChild
            variant={inCart ? "outline" : "default"}
            size={"sm"}
            className={cn({
              "border-emerald-500 text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400 dark:hover:border-emerald-400 dark:hover:bg-emerald-400/10":
                inCart,
            })}
          >
            <Link href={`/products/${product.id}`}>
              {inCart ? "Ver detalles" : "Detalles"}
            </Link>
          </Button>
        )}
      </CardFooter>

      {inCart && product.inStock && (
        <div className="absolute top-0 left-0 m-2 size-3 rounded-full bg-emerald-500 shadow-sm dark:bg-emerald-400"></div>
      )}
    </Card>
  );
};

export default ProductCard;
