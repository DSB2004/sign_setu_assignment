"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useDeleteBlock } from "@/hooks/block.hook";
import {
  useSearchParams,
  useParams,
  usePathname,
  useRouter,
} from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";

export default function Delete() {
  const { mutateAsync, isPending } = useDeleteBlock();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { id } = useParams();
  const router = useRouter();
  const handleClick = async () => {
    if (!id) return;
    const path = pathname + searchParams.toString();
    await mutateAsync({ id: id.toString(), path });
    router.push("/block");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 !h-12 !bg-white !px-2 rounded-lg border"
        >
          <span className="text-sm">Delete Reminder</span>
          <Trash2 size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            reminder and remove the data from our servers.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 w-full items-center justify-end">
          <Button
            onClick={handleClick}
            disabled={isPending}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            {isPending ? (
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
            ) : (
              "Delete"
            )}
          </Button>

          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
