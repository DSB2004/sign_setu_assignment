import React from "react";
import { useBlocksStore } from "@/store/blocks.store";
import Card from "../card";
import Loading from "../card/loading";
export default function List() {
  const { blocks, isError, isFetching, isLoading, error } = useBlocksStore();

  if (isLoading || isFetching || !blocks) {
    return (
      <div>
        <div className="m-4 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from([1, 2, 3]).map((ele) => (
            <Loading key={ele} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <>
        <h2 className="text-lg text-red-500">
          Error! {error?.message ?? "Failed to get reminders"}
        </h2>
      </>
    );
  }
  return (
    <div>
      <div className=" flex-1  m-4 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-y-auto">
        {blocks.blocks.map((ele) => (
          <Card data={ele} key={ele.id} />
        ))}
      </div>
    </div>
  );
}
