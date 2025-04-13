"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, formatCurrency } from "@/lib/utils";
import { SelectProductType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";

export const columns: ColumnDef<SelectProductType>[] = [
  {
    accessorKey: "mainImage",
    header: "Imagen",
    cell: ({ row }) => {
      const image = row.getValue("mainImage");
      const productName = row.getValue("name");
      return (
        <figure className="relative h-12 w-12 overflow-hidden rounded-md border">
          <Image
            src={image as string}
            alt={productName as string}
            fill
            className="object-cover"
          />
        </figure>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Producto",
  },
  {
    accessorKey: "brand",
    header: "Marca",
  },
  {
    accessorKey: "price",
    header: "Precio",
    cell: ({ row }) => {
      const price = row.getValue("price");
      const formattedPrice = formatCurrency(price as number);
      return formattedPrice;
    },
  },
  {
    accessorKey: "inStock",
    header: "Estado",
    cell: ({ row }) => {
      const inStock = row.getValue("inStock");
      return (
        <Badge
          className={cn({
            "text-primary bg-rose-500": !inStock,
            "text-primary bg-emerald-500 dark:bg-emerald-600": inStock,
          })}
        >
          {inStock ? "Disponible" : "Agotado"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center justify-between">
              <span>Editar</span>
              <EditIcon className="h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center justify-between">
              <span>Borrar</span>
              <Trash2Icon className="h-4 w-4 text-rose-500" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
