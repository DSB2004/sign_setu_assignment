import { Block } from "@/types/block";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
export default function Card({ data }: { data: Block }) {
  const { title, description, timestamp, active, repeat } = data;
  const date = new Date(timestamp);
  const day = date.toLocaleString("default", { weekday: "long" });
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const router = useRouter();

  const handleClick = () => {
    router.push(`/block/${data.id}`);
  };
  return (
    <div className="border rounded-xl p-5 w-full min-w-72 bg-white hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <div className="flex gap-2">
          {active && (
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
              Active
            </span>
          )}
          {repeat && (
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
              Repeat
            </span>
          )}
        </div>
      </div>
      <p className="text-gray-600 mb-2 line-clamp-5">{description}</p>
      <p className="text-gray-500 text-sm">
        {day} at {time}
      </p>
      <div className="mx-2 flex items-end w-full justify-end">
        <Button onClick={handleClick}>Know More</Button>
      </div>
    </div>
  );
}
