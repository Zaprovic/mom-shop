import { Button } from "@/components/ui/button";
import { ArrowLeft, SearchX, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function EmptyState({
  message,
  categoryName = null,
}: {
  message: string;
  categoryName?: string | null;
}) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center gap-4 py-16 text-center sm:py-24">
      <div className="bg-muted rounded-full p-6 sm:p-8">
        <SearchX className="text-muted-foreground h-10 w-10 sm:h-12 sm:w-12" />
      </div>
      <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        No se encontraron productos
      </h3>
      <p className="text-muted-foreground max-w-md sm:max-w-lg">
        {message}
        {categoryName && <span className="font-medium"> {categoryName}</span>}
      </p>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row">
        <Button asChild variant="outline" size="lg" className="gap-2">
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            Ver todos los productos
          </Link>
        </Button>
        <Button asChild size="lg" className="gap-2">
          <Link href="/categories">
            <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
            Explorar categorías
          </Link>
        </Button>
      </div>
    </div>
  );
}
