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
      <DialogTrigger className="flex items-center  gap-2 !h-12 !bg-white !px-2 rounded-lg border">
        <span className="text-sm">Update Reminder</span>
        <Pencil size={14}></Pencil>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Reminder</DialogTitle>
          <DialogDescription>
            Modify the details of your reminder below. Click <b>Save</b> when
            you’re done.
          </DialogDescription>
        </DialogHeader>
        <UpdateForm></UpdateForm>
      </DialogContent>
    </Dialog>
  );
}
