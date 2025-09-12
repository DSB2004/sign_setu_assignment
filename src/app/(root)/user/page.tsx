"use client";
import React from "react";
import { useUserStore } from "@/store/user.store";
import Loading from "@/components/user/loading";
import View from "@/components/user/view";
import UserError from "@/components/user/error";
export default function page() {
  const { isLoading, isFetching, isError, user } = useUserStore();

  if (isError) {
    return <UserError />;
  }

  if (isLoading || isFetching || !user) {
    return <Loading />;
  }

  return <View />;
}
