"use client";

import { useState } from "react";
import { CiWarning } from "react-icons/ci";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface RemoveDialogProps {
  documentId: Id<"documents">;
  children: React.ReactNode;
}

export const RemoveDialog = ({ documentId, children }: RemoveDialogProps) => {
  const remove = useMutation(api.documents.removeById);
  const [isRemoving, setIsRemoving] = useState(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader className="flex items-center space-x-3">
          <CiWarning className="text-indigo-700 size-12" />
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            <span>
              This action is permanent and cannot be undone. Deleting this
              document will remove it and all its data permanently.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="!flex !items-center !justify-between !w-full">
          <AlertDialogCancel
            onClick={(e) => e.stopPropagation()}
            className="px-4 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-md transition"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="px-4 py-2 bg-indigo-700 text-white hover:bg-indigo-600 rounded-md transition"
            disabled={isRemoving}
            onClick={(e) => {
              e.stopPropagation();
              setIsRemoving(true);
              remove({ id: documentId }).finally(() => setIsRemoving(false));
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
