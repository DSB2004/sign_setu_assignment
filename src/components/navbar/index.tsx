"use client";
import React from "react";
import Image from "next/image";
import { Home, User, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const router = useRouter();
  return (
    <aside className="w-56  h-full flex flex-col">
      <div className="p-2 flex items-center gap-2">
        <Image src={"/logo.png"} alt={"logo"} width={30} height={30}></Image>
        <h2 className="font-semibold ">Quiet Hours</h2>
      </div>

      <div className="bg-[#F6F5F5] p-4 rounded-md flex flex-col flex-1 gap-4">
        <div
          onClick={() => router.push("/")}
          className="bg-white flex gap-2 items-center p-2 rounded"
        >
          <Home></Home>
          <h5>Home</h5>
        </div>
        <div
          onClick={() => router.push("/user")}
          className="bg-white flex gap-2 items-center p-2 rounded"
        >
          <User></User>
          <h5>Profile</h5>
        </div>
        <div
          onClick={() => router.push("/block")}
          className="bg-white flex gap-2 items-center p-2 rounded"
        >
          <Clock></Clock>
          <h5>Reminder</h5>
        </div>
      </div>
    </aside>
  );
}
