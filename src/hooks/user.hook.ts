"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createAccount } from "@/actions/user/create.action";
import { updateAccount } from "@/actions/user/update.action";

import {
  CreateAccountDTO,
  UpdateAccountDTO,
  UploadAvatarDTO,
} from "@/types/user";

import { toast } from "sonner";

export function useCreateAccount() {
  const mutation = useMutation({
    mutationFn: async (data: CreateAccountDTO) => {
      return await createAccount(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to create user account");
        return;
      }
      toast.success(res.message ?? "User account created successfully");
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

export function useUpdateAccount() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: UpdateAccountDTO) => {
      return await updateAccount(data);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message ?? "Failed to update user account");
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["user"] });

      toast.success(res.message ?? "Account updated successfully");
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
