import React, {  ReactNode } from "react";
import { BlocksProvider } from "@/store/blocks.store";
export default function BlockLayout({ children }: { children: ReactNode }) {
  return <BlocksProvider>{children}</BlocksProvider>;
}
