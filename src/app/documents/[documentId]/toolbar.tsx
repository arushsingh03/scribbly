"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import {
  Bold,
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
      {/* Font family */}
      <Separator orientation="vertical" className=" h-6 bg-purple-500" />
      {/* heading */}
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
