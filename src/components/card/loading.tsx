import { Block } from "@/types/block";
import React from "react";
import { Button } from "../ui/button";

export default function Loading() {
  return (
    <div className="border animate-pulse  rounded-xl p-5 w-full min-w-72 bg-white hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">Title</h2>
        <div className="flex gap-2">
          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
            Active
          </span>

          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
            Repeat
          </span>
        </div>
      </div>
      <p className="text-gray-600 mb-2">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus, qui.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
        neque.
      </p>

      <div className="mx-2 flex items-end w-full justify-end">
        <Button disabled>Know More</Button>
      </div>
    </div>
  );
}
