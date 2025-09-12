import React from "react";
import { ReactNode } from "react";
import { UpcomingProvider } from "@/store/upcoming";
export default function HomeLayout({ children }: { children: ReactNode }) {
  return <UpcomingProvider>{children}</UpcomingProvider>;
}
