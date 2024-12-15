"use client";

import jsPDF from "jspdf";
import Link from "next/link";
import Image from "next/image";
import html2canvas from "html2canvas";
import { CiGrid2V } from "react-icons/ci";
import { DocumentInput } from "./document-input";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { useEditorStore } from "@/store/use-editor-store";
import { BsFilePdf, BsFiletypeHtml } from "react-icons/bs";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Bold,
  Edit,
  File,
  FileJson,
  FilePen,
  FilePlus,
  FileText,
  Grid2X2,
  Grid3X3,
  Inspect,
  Italic,
  LetterText,
  Printer,
  Redo2,
  RemoveFormatting,
  Save,
  Strikethrough,
  Text,
  Trash,
  Underline,
  Undo2,
} from "lucide-react";
import { toast } from "sonner";
import { Inbox } from "./inbox";
import { Avatars } from "./avatar";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { Doc } from "../../../../convex/_generated/dataModel";

import { RenameDialog } from "@/components/rename-dialog";
import { RemoveDialog } from "@/components/remove-dialog";

interface NavbarProps {
  data: Doc<"documents">;
}

export const Navbar = ({ data }: NavbarProps) => {
  const router = useRouter();
  const { editor } = useEditorStore();

  const mutation = useMutation(api.documents.create);

  const onNewDocument = () => {
    mutation({
      title: "Untitled Document",
      initialContent: "",
    })
      .then((id) => {
        toast.success("Document Created!", {
          style: { background: "#4338ca", color: "#fff" },
        });
        router.push(`/documents/${id}`);
      })
      .catch(() => {
        toast.error("Oops! Something went wrong.", {
          style: { background: "#4338ca", color: "#fff" },
        });
      });
  };

  const tableOptions = [
    {
      label: "Single Cell Table (1x1)",
      icon: <CiGrid2V className="size-4" />,
      rows: 1,
      cols: 1,
    },
    {
      label: "Compact Table (2x2)",
      icon: <Grid2X2 className="size-4" />,
      rows: 2,
      cols: 2,
    },
    {
      label: "Detailed Table (3x3)",
      icon: <Grid3X3 className="size-4" />,
      rows: 3,
      cols: 3,
    },
    {
      label: "Pro Table (4x4)",
      icon: <TfiLayoutGrid4Alt className="size-4" />,
      rows: 4,
      cols: 4,
    },
  ];

  const insetTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  const onSaveJSON = () => {
    if (!editor) return;

    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });
    onDownload(blob, `${data.title}.json`);
  };

  const onSaveHTML = () => {
    if (!editor) return;

    const content = editor.getHTML();
    const blob = new Blob([content], {
      type: "text/html",
    });
    onDownload(blob, `${data.title}.html`);
  };

  const onSaveText = () => {
    if (!editor) return;

    const content = editor.getText();
    const blob = new Blob([content], {
      type: "text/plain",
    });
    onDownload(blob, `${data.title}.txt`);
  };

  const onSavePdf = async () => {
    const page = document.getElementById("editor");
    if (!page) return;

    const canvas = await html2canvas(page as HTMLElement, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("page.pdf");
  };

  return (
    <nav className="flex items-center justify-between bg-white rounded-md">
      <div className="flex gap-2 items-center">
        <Link href="/" className="pl-2">
          <Image src="/logo.svg" alt="logo" width={36} height={36} />
        </Link>
        <div className="flex flex-col">
          <DocumentInput title={data.title} id={data._id} />
          <div className="flex">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  <File className="size-4 mr-2" />
                  File
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <Save className="size-4 mr-2" />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={onSaveJSON}>
                        <FileJson className="size-4 mr-2" />
                        JSON
                      </MenubarItem>
                      <MenubarItem onClick={onSaveHTML}>
                        <BsFiletypeHtml className="size-4 mr-2" />
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={onSavePdf}>
                        <BsFilePdf className="size-4 mr-2" />
                        PDF
                      </MenubarItem>
                      <MenubarItem onClick={onSaveText}>
                        <FileText className="size-4 mr-2" />
                        TEXT
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem onClick={onNewDocument}>
                    <FilePlus className="size-4 mr-2" />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <RenameDialog documentId={data._id} initialTitle={data.title}>
                    <MenubarItem
                      className="!bg-indigo-300 hover:!bg-indigo-300/90 mb-1 border-[2px] border-black"
                      onClick={(e) => e.stopPropagation()}
                      onSelect={(e) => e.preventDefault()}
                    >
                      <FilePen className="size-4 mr-2" />
                      Rename
                    </MenubarItem>
                  </RenameDialog>
                  <RemoveDialog documentId={data._id}>
                    <MenubarItem
                      className="!bg-red-300 hover:!bg-red-300/90 border-[2px] border-black"
                      onClick={(e) => e.stopPropagation()}
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Trash className="size-4 mr-2" />
                      Remove
                    </MenubarItem>
                  </RemoveDialog>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <Printer className="size-4 mr-2" />
                    Print <MenubarShortcut>⌘P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  <Edit className="size-4 mr-2" />
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().undo().run()}
                  >
                    <Undo2 className="size-4 mr-2" />
                    Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().redo().run()}
                  >
                    <Redo2 className="size-4 mr-2" />
                    Redo <MenubarShortcut>⌘Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  <Inspect className="size-4 mr-2" />
                  Inset
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Table</MenubarSubTrigger>
                    <MenubarSubContent>
                      {tableOptions.map((option, index) => (
                        <MenubarItem
                          key={index}
                          onClick={() =>
                            insetTable({ rows: option.rows, cols: option.cols })
                          }
                        >
                          {option.icon}
                          <span className="ml-2">{option.label}</span>
                        </MenubarItem>
                      ))}
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  <LetterText className="size-4 mr-2" />
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <Text className="size-4 mr-2" />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent className="w-[200px]">
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleBold().run()
                        }
                      >
                        <Bold className="size-4 mr-2" />
                        Bold <MenubarShortcut>⌘B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleItalic().run()
                        }
                      >
                        <Italic className="size-4 mr-2" />
                        Italic <MenubarShortcut>⌘I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleUnderline().run()
                        }
                      >
                        <Underline className="size-4 mr-2" />
                        Underline <MenubarShortcut>⌘U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleStrike().run()
                        }
                      >
                        <Strikethrough className="size-4 mr-2" />
                        Strikethough <MenubarShortcut>⌘S</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    onClick={() =>
                      editor?.chain().focus().unsetAllMarks().run()
                    }
                  >
                    <RemoveFormatting className="size-4 mr-2" />
                    Clear Formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <Avatars />
        <Inbox />
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>
    </nav>
  );
};
