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
import CategoryCreationForm from "./category-form";

const DialogCreateCategory = () => {
  return (
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
  );
};

export default DialogCreateCategory;
