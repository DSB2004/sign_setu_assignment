"use client";

import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";
import { GetAllBlockResponse } from "@/types/block";

import { getAllBlock } from "@/actions/block/getAll.action";

interface BlocksStoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  blocks: GetAllBlockResponse | undefined;
  error: Error | null;
}

const BlocksStoreContext = createContext<BlocksStoreInterface | null>(null);

export const BlocksProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const filter = {
    path: pathname + "?" + searchParams.toString(),
    search: searchParams.get("search") || null,
    page: Number(searchParams.get("page")) || null,
    limit: Number(searchParams.get("limit")) || null,
  };
  const {
    isFetching,
    isError,
    isLoading,
    data: blocks,
    error,
  } = useQuery<GetAllBlockResponse>({
    queryKey: ["blocks", filter],
    queryFn: async () => {
      const res = await getAllBlock(filter);
      if (!res.success || !res.blocks) {
        throw new Error(res.message);
      }
      return res;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <BlocksStoreContext.Provider
      value={{ isLoading, isError, isFetching, blocks, error }}
    >
      {children}
    </BlocksStoreContext.Provider>
  );
};

export const useBlocksStore = () => {
  const ctx = useContext(BlocksStoreContext);
  if (!ctx)
    throw new Error("useBlocksStore must be used inside <BlocksProvider>");
  return ctx;
};
