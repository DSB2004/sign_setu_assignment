"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createBlock } from "@/actions/block/create.action";
import { updateBlock } from "@/actions/block/update.action";
import { deleteBlock } from "@/actions/block/delete.action";

import { CreateBlockDTO, UpdateBlockDTO, DeleteBlockDTO } from "@/types/block";

import { toast } from "sonner";

export function useCreateBlock() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: CreateBlockDTO) => {
      return await createBlock(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to create block");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
      queryClient.invalidateQueries({ queryKey: ["upcoming"] });
      toast.success(res.message ?? "Block created successfully");
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
  };
}

export function useUpdateBlock() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: UpdateBlockDTO) => {
      return await updateBlock(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to update block");
        return;
      }
      if (res.id) {
        queryClient.invalidateQueries({ queryKey: ["block", res.id] });
      }
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
      toast.success(res.message ?? "Block updated successfully");
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
  };
}

export function useDeleteBlock() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: DeleteBlockDTO) => {
      return await deleteBlock(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to delete block");
        return;
      }
      if (res.id) {
        queryClient.invalidateQueries({ queryKey: ["block", res.id] });
      }
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
      toast.success(res.message ?? "Block deleted successfully");
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
  };
}
