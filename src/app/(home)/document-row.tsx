import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { SiGoogledocs } from "react-icons/si";
import { DocumentMenu } from "./document-menu";
import { Building2, CircleUser } from "lucide-react";
import { Doc } from "../../../convex/_generated/dataModel";
import { TableCell, TableRow } from "@/components/ui/table";

interface DocumentRowProps {
  document: Doc<"documents">;
}

export const DocumentRow = ({ document }: DocumentRowProps) => {
  const router = useRouter();

  return (
    <TableRow
      onClick={() => router.push(`/documents/${document._id}`)}
      className="cursor-pointer hover:bg-primary/5"
    >
      <TableCell className="w-[50px] font-medium">
        <SiGoogledocs className="h-6 w-6 fill-indigo-600" />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
      <TableCell className="text-black hidden md:flex items-center gap-2 ">
        {document.organizationId ? (
          <Building2 className="size-4 text-indigo-600" />
        ) : (
          <CircleUser className="size-4 text-indigo-600" />
        )}
        {document.organizationId ? "Organization" : "Personal"}
      </TableCell>
      <TableCell className="text-black hidden md:table-cell">
        {format(new Date(document._creationTime), "MMM dd, yyyy")}
      </TableCell>
      <TableCell className="flex justify-end">
        <DocumentMenu
          documentId={document._id}
          title={document.title}
          onNewTab={() => window.open(`/documents/${document._id}`, "_blank")}
        />
      </TableCell>
    </TableRow>
  );
};
