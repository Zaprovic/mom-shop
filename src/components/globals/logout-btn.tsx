"use client";

import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const LogoutBtn = () => {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  if (isLoading) {
    return <Skeleton className="size-9 rounded-full" />;
  }

  if (isAuthenticated) {
    return (
      <Button variant={"ghost"} size={"icon"} className="rounded-full">
        <LogoutLink>
          <LogOutIcon />
        </LogoutLink>
      </Button>
    );
  }

  return null;
};

export default LogoutBtn;
