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
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateBlock } from "@/hooks/block.hook";
import { useSearchParams, usePathname, useParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useBlockStore } from "@/store/block.store";

const formSchema = z.object({
  title: z.string().min(1, { message: "Missing title" }),
  description: z.string().min(1, { message: "Missing description" }),
  timestamp: z.date(),
  active: z.boolean(),
  repeat: z.boolean(),
});

export default function UpdateForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { block } = useBlockStore();
  const { mutateAsync } = useUpdateBlock();
  const { id } = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: block?.title,
      description: block?.description,
      timestamp: !!block ? new Date(block.timestamp) : new Date(),
      repeat: block?.repeat,
      active: block?.active,
    },
  });

  const toLocalDateTimeString = (date: Date) => {
    const tzOffset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - tzOffset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const path = pathname + searchParams.toString();
    if (!id) throw new Error("Id not given");
    await mutateAsync({ ...values, path, id: id.toString() });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
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
          name="description"
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

        <FormField
          control={form.control}
          name="timestamp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input
                  id="datetime"
                  type="datetime-local"
                  className="w-full"
                  value={field.value ? toLocalDateTimeString(field.value) : ""}
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repeat"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Repeat</FormLabel>
                <FormDescription>
                  Receive emails regularly for same alert
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Active</FormLabel>
                <FormDescription>Keep this reminder active</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">
          {form.formState.isLoading || form.formState.isSubmitting ? (
            <Loader className="animate-spin" />
          ) : (
            <>Save</>
          )}
        </Button>
      </form>
    </Form>
  );
}
