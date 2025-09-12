"use client";
import React from "react";
import Search from "@/components/blocks/search";
import List from "@/components/blocks/list";
import { useBlocksStore } from "@/store/blocks.store";
import TablePagination from "@/components/blocks/pagination";
export default function page() {
  const { blocks, isError, isFetching, isLoading } = useBlocksStore();

  return (
    <div className="flex flex-col gap-4  w-full ">
      <Search></Search>
      <List></List>
      {!blocks || isFetching || isLoading || isError ? (
        <></>
      ) : (
        <>
          <TablePagination
            totalPages={blocks.totalPages}
            page={blocks.page}
          ></TablePagination>
        </>
      )}
    </div>
  );
}
