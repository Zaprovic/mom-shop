import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayersIcon, PackageIcon, TagIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import DialogCreateProduct from "./dialog-create-product";
import DialogCreateCategory from "./dialog-create-category";

type props = {
  stats: {
    productCount: number;
    categoryCount: number;
  };
};

const Cards = ({ stats }: props) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-card/50 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Total Productos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold">{stats.productCount}</div>
            <div className="text-primary/70 bg-primary/10 rounded-md p-2">
              <LayersIcon className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Total Categorías
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold">{stats.categoryCount}</div>
            <div className="text-primary/70 bg-primary/10 rounded-md p-2">
              <TagIcon className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Accesos Rápidos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Link
              href="/categories"
              className="hover:bg-muted/50 flex items-center gap-2 rounded-md px-2 py-1 text-sm transition-colors"
            >
              <TagIcon className="text-primary/70 h-4 w-4" /> Ver todas las
              categorías
            </Link>
            <Link
              href="/products"
              className="hover:bg-muted/50 flex items-center gap-2 rounded-md px-2 py-1 text-sm transition-colors"
            >
              <PackageIcon className="text-primary/70 h-4 w-4" /> Ver todos los
              productos
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Acciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <DialogCreateProduct />
            <DialogCreateCategory />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cards;
