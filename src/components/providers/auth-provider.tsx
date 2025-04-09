"use client";

import { ReactNode } from "react";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <KindeProvider>{children}</KindeProvider>;
};

export default AuthProvider;
