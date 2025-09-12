"use client";
import React from "react";
import Card from "../card";
import Loading from "../card/loading";
import { useUpcomingStore } from "@/store/upcoming";
export default function Upcoming() {
  const { upcoming, isError, isFetching, isLoading, error } =
    useUpcomingStore();

  if (isLoading || isFetching || !upcoming) {
    return (
      <div className="p-2 mt-5">
        <h2 className="text-xl font-semibold">Upcoming</h2>
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
          Error! {error?.message ?? "Failed to get upcoming reminders"}{" "}
        </h2>
      </>
    );
  }
  return (
    <div className="p-2 mt-5">
      <h2 className="text-xl font-semibold">Upcoming</h2>
      {upcoming.length === 0 ? (
        <div className="text-muted-foreground text-center w-full">
          No upcoming
        </div>
      ) : (
        <></>
      )}
      <div className="m-4 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {upcoming.map((ele) => (
          <Card data={ele} key={ele.id} />
        ))}
      </div>
    </div>
  );
}
