"use client";

import { SearchIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

const NavbarIcons = () => {
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
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
            0
          </span>
        </Link>
      </Button>

      <ModeToggle />
    </div>
  );
};

export default NavbarIcons;
