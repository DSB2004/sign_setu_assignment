import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UpdateForm from "./form";
export default function Create() {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center  gap-2 !h-12 !bg-white !px-2 rounded-lg border">
        <span className="text-sm">Create Reminder</span>
        <Plus></Plus>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Reminder</DialogTitle>
          <DialogDescription>
            Create new reminders. Hit create to confirm changes
          </DialogDescription>
        </DialogHeader>
        <UpdateForm></UpdateForm>
      </DialogContent>
    </Dialog>
  );
}
