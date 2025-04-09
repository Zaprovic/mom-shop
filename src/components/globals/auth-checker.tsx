import React from "react";
import { Badge } from "../ui/badge";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const AuthChecker = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();

  const isUserAuth = await isAuthenticated();
  const user = await getUser();

  if (isUserAuth) {
    return (
      <Badge className="text-sm -tracking-wider" variant={"outline"}>
        Hola {user.given_name}
      </Badge>
    );
  }

  return null;
};

export default AuthChecker;
