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
    return <Skeleton className="h-8 w-8 rounded-md" />;
  }

  if (isAuthenticated) {
    return (
      <Button asChild variant="ghost" size="icon" className="h-8 w-8 rounded-md">
        <LogoutLink>
          <LogOutIcon className="h-4 w-4" />
        </LogoutLink>
      </Button>
    );
  }

  return null;
};

export default LogoutBtn;
