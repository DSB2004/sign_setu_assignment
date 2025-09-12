"use client";

import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";
import { Block } from "@/types/block";

import { upcomingBlock } from "@/actions/block/upcoming.action";

interface UpcomingStoreInterface {
  isFetching: boolean;
  isError: boolean;
  isLoading: boolean;
  upcoming: Block[] | undefined;
  error: Error | null;
}

const UpcomingStoreContext = createContext<UpcomingStoreInterface | null>(null);

export const UpcomingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const {
    isFetching,
    isError,
    isLoading,
    error,
    data: blocks,
  } = useQuery<Block[]>({
    queryKey: ["upcoming"],
    queryFn: async () => {
      const res = await upcomingBlock({
        path: pathname + searchParams.toString(),
      });
      if (!res.success || !res.blocks) {
        throw new Error(res.message);
      }
      return res.blocks;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <UpcomingStoreContext.Provider
      value={{ isLoading, isError, isFetching, upcoming: blocks, error }}
    >
      {children}
    </UpcomingStoreContext.Provider>
  );
};

export const useUpcomingStore = () => {
  const ctx = useContext(UpcomingStoreContext);
  if (!ctx)
    throw new Error("useUpcomingStore must be used inside <UpcomingProvider>");
  return ctx;
};
