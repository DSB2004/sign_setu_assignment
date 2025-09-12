"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateAccount } from "@/hooks/user.hook";
import { useSearchParams, usePathname } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";
import { useUserStore } from "@/store/user.store";
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.email("Please add a valid email"),
  bio: z.string(),
});

export default function UpdateForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { user } = useUserStore();
  const { mutateAsync } = useUpdateAccount();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username,
      email: user?.email,
      bio: user?.bio,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const path = pathname + searchParams.toString();
    await mutateAsync({ ...values, path });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isLoading || form.formState.isSubmitting}
        >
          {form.formState.isLoading || form.formState.isSubmitting ? (
            <Loader className="animate-spin" />
          ) : (
            <>Update Account</>
          )}
        </Button>
      </form>
    </Form>
  );
}
