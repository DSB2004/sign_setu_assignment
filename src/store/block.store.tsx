"use client";

import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams, usePathname } from "next/navigation";
import { Block } from "@/types/block";

import { getBlock } from "@/actions/block/get.action";

interface BlockStoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  block: Block | undefined;
  error: Error | null;
}

const BlockStoreContext = createContext<BlockStoreInterface | null>(null);

export const BlockProvider = ({ children }: { children: React.ReactNode }) => {
  const { id } = useParams();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { isFetching, isError, isLoading, data, error } = useQuery<Block>({
    queryKey: ["block", id],
    queryFn: async () => {
      const res = await getBlock({
        path: pathname + searchParams.toString(),
        id: id?.toString() || "",
      });
      if (!res.success || !res.block) {
        throw new Error(res.message);
      }
      return res.block;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <BlockStoreContext.Provider
      value={{ isLoading, isError, isFetching, block: data, error }}
    >
      {children}
    </BlockStoreContext.Provider>
  );
};

export const useBlockStore = () => {
  const ctx = useContext(BlockStoreContext);
  if (!ctx)
    throw new Error("useBlockStore must be used inside <BlockProvider>");
  return ctx;
};
