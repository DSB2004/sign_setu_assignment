import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Create from "./create";
export default function Header() {
  const date = new Date();

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" }); // 👈 Full month name
  const year = date.getFullYear();
  return (
    <header className="flex justify-between items-center w-full p-2">
      <div>
        <h2 className="text-2xl font-semibold">Welcome John Doe</h2>
        <p>
          {day} {month} {year}
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <Create></Create>
        <Image src={"/user.png"} width={50} height={50} alt=""></Image>
      </div>
    </header>
  );
}
