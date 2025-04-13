"use client";

import { SearchIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { useCartStore } from "@/stores/cart-store";

const NavbarIcons = () => {
  const { items } = useCartStore();
  return (
    <div className="flex items-center space-x-1 sm:space-x-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-md"
        title="Search"
      >
        <SearchIcon className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-md"
        asChild
      >
        <LoginLink postLoginRedirectURL="/account">
          <UserIcon className="h-4 w-4" />
        </LoginLink>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="relative h-8 w-8 rounded-md"
        asChild
      >
        <Link href="/cart" aria-label="Go to cart" title="Go to cart">
          <ShoppingCartIcon className="h-4 w-4" />
          {items.length > 0 ? (
            <span className="bg-primary text-primary-foreground absolute top-0 right-0 flex aspect-square h-auto w-4 items-center justify-center rounded-full text-[0.625rem]">
              {items.length}
            </span>
          ) : (
            <span className="bg-primary text-primary-foreground absolute top-0 right-0 flex aspect-square h-auto w-4 items-center justify-center rounded-full text-[0.625rem]">
              0
            </span>
          )}
        </Link>
      </Button>

      <ModeToggle />
    </div>
  );
};

export default NavbarIcons;
