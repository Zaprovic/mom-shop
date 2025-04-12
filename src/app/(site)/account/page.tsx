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
import { categoriesTable } from "@/db/schema";

const AccountPage = async () => {
  const categories = await db.select().from(categoriesTable);
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
