import React from "react";
import { Badge } from "../ui/badge";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const AuthChecker = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return null;
  }
  return (
    <Badge className="px-2 py-0.5 text-xs font-normal" variant="outline">
      Hola {user?.given_name}
    </Badge>
  );
};

export default AuthChecker;
