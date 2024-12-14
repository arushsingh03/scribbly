"use client";

import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { toast } from "sonner";

interface RenameDialogProps {
  documentId: Id<"documents">;
  initialTitle: string;
  children: React.ReactNode;
}

export const RenameDialog = ({
  documentId,
  children,
  initialTitle,
}: RenameDialogProps) => {
  const update = useMutation(api.documents.updateById);
  const [isUpdating, setIsUpdating] = useState(false);

  const [title, setTitle] = useState(initialTitle);
  const [open, setOpen] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);

    update({ id: documentId, title: title.trim() || "Untitled" })
      .then(() => {
        setOpen(false),
          toast.success("Document renamed successfully.", {
            style: {
              background: "#4338ca",
              color: "#fff",
            },
          });
      })
      .catch(() =>
        toast.error("Oops! Something went wrong.", {
          style: {
            background: "#4338ca",
            color: "#fff",
          },
        })
      )
      .finally(() => {
        setIsUpdating(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmit}>
          <DialogHeader className="flex items-center space-x-3">
            <MdDriveFileRenameOutline className="text-indigo-700 size-12" />
            <DialogTitle>Rename Document</DialogTitle>
            <DialogDescription className="text-center">
              Update the document name to reflect its new purpose or content.
              This change will be immediately saved and visible to all
              collaborators
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Document Name"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <DialogFooter className="!flex !items-center !justify-between !w-full">
            <Button
              className="px-4 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-md transition"
              type="button"
              disabled={isUpdating}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="px-4 py-2 bg-indigo-700 text-white hover:bg-indigo-600 rounded-md transition"
              type="submit"
              disabled={isUpdating}
              onClick={(e) => e.stopPropagation()}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
