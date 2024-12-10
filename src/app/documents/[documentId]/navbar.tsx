"use client";

import Image from "next/image";
import Link from "next/link";
import { DocumentInput } from "./document-input";
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
import { BsFilePdf, BsFiletypeHtml } from "react-icons/bs";
import { CiGrid2V } from "react-icons/ci";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { useEditorStore } from "@/store/use-editor-store";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const Navbar = () => {
  const { editor } = useEditorStore();

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
    onDownload(blob, `document.json`); //TODO USE DOCUMENT NAME
  };

  const onSaveHTML = () => {
    if (!editor) return;

    const content = editor.getHTML();
    const blob = new Blob([content], {
      type: "text/html",
    });
    onDownload(blob, `document.html`); //TODO USE DOCUMENT NAME
  };

  const onSaveText = () => {
    if (!editor) return;

    const content = editor.getText();
    const blob = new Blob([content], {
      type: "text/plain",
    });
    onDownload(blob, `document.txt`); //TODO USE DOCUMENT NAME
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
    <nav className="flex items-center justify-between ">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={36} height={36} />
        </Link>
        <div className="flex flex-col">
          <DocumentInput />
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
                  <MenubarItem>
                    <FilePlus className="size-4 mr-2" />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <FilePen className="size-4 mr-2" />
                    Rename
                  </MenubarItem>
                  <MenubarItem className="!bg-red-300 hover:!bg-red-300/90">
                    <Trash className="size-4 mr-2" />
                    Remove
                  </MenubarItem>
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
    </nav>
  );
};
