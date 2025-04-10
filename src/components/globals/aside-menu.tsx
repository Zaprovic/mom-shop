"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  LogOutIcon,
  MenuIcon,
  ShoppingCartIcon,
  TagIcon,
  Layers,
} from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { Skeleton } from "../ui/skeleton";

const AsideMenu = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { isAuthenticated, isLoading, getUser } = useKindeBrowserClient();

  const user = getUser();

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild className="inline-block md:hidden">
        <Button variant="ghost" size="icon" className="focus:outline-none">
          <MenuIcon className="size-5" />
          <span className="sr-only">Open mobile menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex w-[300px] flex-col border-r p-0 shadow-lg"
      >
        <SheetHeader className="bg-primary/5 border-b p-6">
          <SheetTitle className="text-primary text-2xl font-semibold tracking-tight">
            YeseCommerce
          </SheetTitle>
        </SheetHeader>

        {/* User info at the top */}
        {isLoading ? (
          <div className="bg-secondary/10 border-b px-6 py-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="mt-2 h-4 w-48" />
          </div>
        ) : isAuthenticated ? (
          <div className="bg-secondary/10 border-b px-6 py-4">
            <span className="text-primary block text-base font-medium">
              Hola {user?.given_name || "Usuario"}
            </span>
            <span className="text-muted-foreground mt-1 text-xs">
              {user?.email || ""}
            </span>
          </div>
        ) : null}

        {/* Mobile Navigation Links */}
        <div className="flex-1 overflow-auto px-4 py-6">
          <div className="space-y-1">
            <Link
              href="/categories"
              className="hover:bg-secondary/20 hover:text-primary flex items-center rounded-md px-3 py-3 text-base transition-colors"
              onClick={() => setIsSheetOpen(false)}
            >
              <TagIcon className="text-primary/70 mr-3 h-5 w-5" />
              Categorias
            </Link>
            <Link
              href="/products"
              className="hover:bg-secondary/20 hover:text-primary flex items-center rounded-md px-3 py-3 text-base transition-colors"
              onClick={() => setIsSheetOpen(false)}
            >
              <Layers className="text-primary/70 mr-3 h-5 w-5" />
              Productos
            </Link>
            <Link
              href="/cart"
              className="hover:bg-secondary/20 hover:text-primary flex items-center rounded-md px-3 py-3 text-base transition-colors"
              onClick={() => setIsSheetOpen(false)}
            >
              <ShoppingCartIcon className="text-primary/70 mr-3 h-5 w-5" />
              Carrito
            </Link>
          </div>
        </div>

        {/* Logout button at the bottom */}
        {isAuthenticated && (
          <div className="mt-auto border-t p-4">
            <Button
              variant="outline"
              className="text-destructive/80 hover:text-destructive hover:bg-destructive/10 border-destructive/20 w-full justify-start"
              size="sm"
              asChild
            >
              <LogoutLink className="flex w-full justify-between">
                <span className="flex-1">Cerrar sesión</span>
                <LogOutIcon className="h-4 w-4" />
              </LogoutLink>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default AsideMenu;
