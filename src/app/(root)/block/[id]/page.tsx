"use client";

import React from "react";
import { useBlockStore } from "@/store/block.store";
import BlockError from "@/components/block/error";
import View from "@/components/block/view";
import Loading from "@/components/block/loading";
import Update from "@/components/block/update";
import Delete from "@/components/block/delete";
export default function page() {
  const { isLoading, isFetching, isError, block } = useBlockStore();

  if (isError) {
    return <BlockError />;
  }

  if (isLoading || isFetching || !block) {
    return <Loading />;
  }

  return (
    <div className="w-full border">
      <div className="flex gap-2 items-center justify-end">
        <Update></Update>
        <Delete></Delete>
      </div>
      <View />
    </div>
  );
}
