"use client";

import React from "react";
import { useBlockStore } from "@/store/block.store";
export default function BlockError() {
  const { isError, error } = useBlockStore();

  if (!isError) return <></>;

  return (
    <>
      <h2 className="p-4 text-red-500">{"Error! Fetching block details"}</h2>
    </>
  );
}
