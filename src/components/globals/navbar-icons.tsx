"use client";

import { SearchIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <LoginLink postLoginRedirectURL="/account">
              <UserIcon className="size-5" />
            </LoginLink>
          </TooltipTrigger>
          <TooltipContent>
            <p>Cuenta</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="relative">
            <Link href={"/cart"} aria-label="Go to cart" title="Go to cartt">
              <span className="bg-primary text-primary-foreground absolute bottom-3 left-2.5 flex aspect-square h-auto w-4 justify-center rounded-full text-[0.625rem]">
                0
              </span>
              <ShoppingCartIcon className="size-5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ir al carrito</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <ModeToggle />
    </div>
  );
};

export default NavbarIcons;
