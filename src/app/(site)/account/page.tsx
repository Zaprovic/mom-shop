import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import User from "./_components/user";
import { Suspense } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateProductForm from "./_components/product-form";
import CategoryCreationForm from "./_components/category-form";
import { db } from "@/db";
import { productsTable, categoriesTable } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import Cards from "./_components/cards";
import { RefreshCwIcon } from "lucide-react";
import { DataTable } from "./_components/product-form/_components/data-table";
import { columns } from "./_components/product-form/_components/data-table/columns";

async function getStats(userId: string) {
  const [productCount] = await db
    .select({ count: count() })
    .from(productsTable)
    .where(eq(productsTable.userId, userId));

  const [categoryCount] = await db
    .select({ count: count() })
    .from(categoriesTable)
    .where(eq(categoriesTable.userId, userId));

  return {
    productCount: productCount.count,
    categoryCount: categoryCount.count,
  };
}

const AccountPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userId = user?.id || "";
  const stats = await getStats(userId);

  const products = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.userId, userId));

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <div className="mb-4 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <Suspense fallback={<div>Cargando...</div>}>
          <User />
        </Suspense>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Dialog modal>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto" size={"sm"}>
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                <span className="-tracking-wider whitespace-nowrap">
                  Agregar nuevo producto
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Productos</DialogTitle>
              </DialogHeader>
              <DialogDescription className="hidden"></DialogDescription>
              <CreateProductForm categories={categories} />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto" size={"sm"}>
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                <span className="-tracking-wider whitespace-nowrap">
                  Agregar nueva categoria
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Categorias</DialogTitle>
              </DialogHeader>
              <CategoryCreationForm />
              <DialogDescription className="hidden"></DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
