"use client";

import { SearchIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

const NavbarIcons = () => {
  return (
    <div className="flex items-center gap-4">
      <Button
        asChild
        title="Search"
        size={"icon"}
        variant={"ghost"}
        className="size-5 focus:outline-none"
      >
        <SearchIcon />
      </Button>
      <Link href={"/account"} aria-label="Account" title="Account">
        <UserIcon className="size-5" />
      </Link>
      <Link
        href={"/account"}
        className="relative"
        aria-label="Account"
        title="Account"
      >
        <span className="absolute bottom-3 left-2.5 flex aspect-square h-auto w-4 text-[0.625rem] justify-center rounded-full bg-primary text-primary-foreground">
          0
        </span>
        <ShoppingCartIcon className="size-5" />
      </Link>
      <ModeToggle />
    </div>
  );
};

export default NavbarIcons;
