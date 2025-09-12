"use client";
import React from "react";
import { useBlockStore } from "@/store/block.store";
export default function View() {
  const { isLoading, isFetching, isError, block } = useBlockStore();

  if (isError || !block || isFetching || isLoading) return <></>;
  const date = new Date(block.timestamp);
  const day = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        {block.title}
      </h2>
      <p className="text-gray-600 mb-3">{block.description}</p>
      <p className="text-sm text-gray-500">
        {day} at {time}
      </p>
    </div>
  );
}
