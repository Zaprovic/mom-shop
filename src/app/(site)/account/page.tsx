import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import User from "./_components/user";
import { Suspense } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateProductForm from "./_components/create-product-form";

const AccountPage = async () => {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <div className="mb-4 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <Suspense fallback={<div>Loading...</div>}>
          <User />
        </Suspense>
        <Dialog modal>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              <span className="-tracking-wider whitespace-nowrap">
                Agregar nuevo producto
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent >
            <DialogHeader>
              <DialogTitle>Agregar nuevo producto</DialogTitle>
            </DialogHeader>
            <CreateProductForm />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AccountPage;
