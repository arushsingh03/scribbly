"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { type Level } from "@tiptap/extension-heading";
import { useEditorStore } from "@/store/use-editor-store";

import {
  Bold,
  ChevronDown,
  ClipboardCopy,
  ClipboardPaste,
  Italic,
  ListTodo,
  LucideIcon,
  MessageSquarePlus,
  Printer,
  RemoveFormatting,
  SpellCheck2,
  Underline,
} from "lucide-react";

const TextColorButton = () => {
  const { editor } = useEditorStore(); 

  const value = editor?.getAttributes("textStyle").color || "#000000";

  // const onChange = (color: ColorResult)
}

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const heading = [
    { label: "Normal Text", value: 0, fontSize: "16x" },
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "24px" },
    { label: "Heading 3", value: 3, fontSize: "20px" },
    { label: "Heading 4", value: 4, fontSize: "18px" },
    { label: "Heading 5", value: 5, fontSize: "16px" },
    { label: "Heading 6", value: 6, fontSize: "14px" },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 10; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }
    return "Normal Text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate text-purple-500">
            {getCurrentHeading()}
          </span>
          <ChevronDown className="ml-2 shrink-0 size-4 text-purple-500" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {heading.map(({ label, value, fontSize }) => (
          <button
            key={value}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
            }}
            className={cn(
              "flex items-center text-purple-500 gap-x-2.5 px-2.5 py-1.5 rounded-sm hover:bg-neutral-200/80",
              (value === 0 && !editor?.isActive("heading")) ||
                (editor?.isActive("heading", { level: value }) &&
                  "bg-neutral-200")
            )}
            style={{ fontSize }}
          >
            <span className="text-sm text-purple-500">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fonts = [
    { label: "Default", value: "inherit" },
    { label: "Arial", value: "Arial, sans-serif" },
    { label: "Arial Black", value: "Arial Black, Gadget, sans-serif" },
    { label: "Arial Narrow", value: "Arial Narrow, sans-serif" },
    { label: "Georgia", value: "Georgia, serif" },
    { label: "Times New Roman", value: "Times New Roman, Times, serif" },
    { label: "Courier New", value: "Courier New', Courier, monospace" },
    { label: "Verdana", value: "Verdana, sans-serif" },
    { label: "Tahoma", value: "Tahoma, sans-serif" },
    { label: "Trebuchet MS", value: "Trebuchet MS, Helvetica, sans-serif" },
    { label: "Comic Sans MS", value: "Comic Sans MS, cursive, sans-serif" },
    { label: "Lucida Console", value: "Lucida Console, Monaco, monospace" },
    { label: "Monaco", value: "Monaco, monospace" },
    {
      label: "Palatino",
      value: "Palatino Linotype, Book Antiqua, Palatino, serif",
    },
    { label: "Impact", value: "Impact, Charcoal, sans-serif" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate text-purple-500">
            {editor?.getAttributes("textStyle").fontFamily || "Default"}
          </span>
          <ChevronDown className="ml-2 shrink-0 size-4 text-purple-500" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            className={cn(
              "flex items-center text-purple-500 gap-x-2.5 px-2.5 py-1.5 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("textStyle").fontFamily === value &&
                "bg-neutral-200"
            )}
            style={{ fontFamily: value }}
          >
            <span className="text-sm text-purple-500">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface ToolBarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolBarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:neutral-200/80",
        isActive && "bg-neutral-200"
      )}
    >
      <Icon className="size-4 text-purple-500" />
    </button>
  );
};

export const Toolbar = () => {
  const { editor } = useEditorStore();

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: ClipboardCopy,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: ClipboardPaste,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: Printer,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheck2,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: Bold,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: Italic,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: Underline,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlus,
        onClick: () => console.log("TODO: Comment"),
        isActive: false, // TODO: Implement comment feature
      },
      {
        label: "List",
        icon: ListTodo,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormatting,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <div className="bg-[#f1f3f9] px-2.5 py-0.5 rounded-[24px] min-h-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className=" h-6 bg-purple-500" />
      <FontFamilyButton />
      <Separator orientation="vertical" className=" h-6 bg-purple-500" />
      <HeadingLevelButton />
      <Separator orientation="vertical" className=" h-6 bg-purple-500" />
      {/* font size */}
      <Separator orientation="vertical" className=" h-6 bg-purple-500" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      {/* Text color */}
      {/* Highlight color */}
      <Separator orientation="vertical" className=" h-6 bg-purple-500" />
      {/* Link */}
      {/* Image */}
      {/* Align */}
      {/* Line height */}
      {/* List */}
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};
