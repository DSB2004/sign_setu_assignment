import React from "react";
import Navbar from "@/components/navbar";
import Header from "@/components/header";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <div className="flex gap-4 p-4 bg-white h-screen">
        <Navbar></Navbar>
        <div className="flex gap-2 p-4 rounded-md  items-start flex-col bg-[#F6F5F5] flex-1">
          <Header></Header>
          <div className="flex-1  w-full overflow-y-auto">{children}</div>
        </div>
      </div>
    </>
  );
}
