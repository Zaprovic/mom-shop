import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircleIcon } from "lucide-react";
import React from "react";
import CreateProductForm from "./product-form";
import { db } from "@/db";
import { categoriesTable } from "@/db/schema";

const DialogCreateProduct = async () => {
  const categories = await db.select().from(categoriesTable);
  return (
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
  );
};

export default DialogCreateProduct;
