import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdateForm from "./form";
import { Pencil } from "lucide-react";
export default function Update() {
  return (
    <Dialog>
      <DialogTrigger className="flex w-fit items-center  gap-2 !h-12 !bg-white !px-2 rounded-lg border">
        <span className="text-sm">Update Account</span>
        <Pencil size={12}></Pencil>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Account</DialogTitle>
          <DialogDescription>
            Make changes to your account details here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <UpdateForm></UpdateForm>
      </DialogContent>
    </Dialog>
  );
}
