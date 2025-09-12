"use client";
import React from "react";
import { useBlockStore } from "@/store/block.store";
import { Skeleton } from "../ui/skeleton";
export default function View() {
  const { isLoading, isFetching, block } = useBlockStore();

  if (isFetching || isLoading || !block)
    return (
      <div className="border p-4 animate-pulse space-y-3 w-full">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-72 rounded bg-white" />
        </div>
        <Skeleton className="h-4 w-full rounded bg-white" />
        <Skeleton className="h-4 w-full rounded bg-white" />
        <Skeleton className="h-4 w-2/3 rounded bg-white" />
        <Skeleton className="h-3 w-24 rounded mt-2 bg-white" />
      </div>
    );
  return <></>;
}
