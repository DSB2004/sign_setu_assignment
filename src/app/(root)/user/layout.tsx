import React, { ReactNode } from "react";
import { UserProvider } from "@/store/user.store";
export default function UserLayout({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
