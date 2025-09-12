import React from "react";
import { useBlockStore } from "@/store/block.store";
import { useUserStore } from "@/store/user.store";
export default function UserError() {
  const { isError, error } = useUserStore();

  if (!isError) return <></>;

  return (
    <>
      <h2>{error?.message ?? "Error! Fetching user details"}</h2>
    </>
  );
}
