"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { type Level } from "@tiptap/extension-heading";
import { useEditorStore } from "@/store/use-editor-store";
import { type ColorResult, SketchPicker } from "react-color";

import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  ClipboardCopy,
  ClipboardPaste,
  Highlighter,
  ImageIcon,
  Italic,
  Link2,
  ListCheck,
  ListIcon,
  ListOrdered,
  ListTodo,
  LucideIcon,
  MessageSquarePlus,
  Minus,
  Plus,
  Printer,
  RemoveFormatting,
  Search,
  SpellCheck2,
  Underline,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Font Size Functionality
const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-gray-50"
        onClick={decrement}
      >
        <Minus className="size-4 text-gray-900" />
      </button>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="h-7 w-10 rounded-sm border border-gray-400 bg-transparent text-center text-sm text-gray-900 focus:outline-none focus:ring-0"
        />
      ) : (
        <button
          className="h-7 w-10 text-sm border border-gray-400 text-center rounded-sm bg-transparent cursor-text"
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
        >
          <span className="text-sm">{fontSize}</span>
        </button>
      )}
      <button
        className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-gray-50"
        onClick={increment}
      >
        <Plus className="size-4 text-gray-900" />
      </button>
    </div>
  );
};

// List Functionality
const AlignListButton = () => {
  const { editor } = useEditorStore();

  const lists = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered List",
      icon: ListOrdered,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
    {
      label: "Task List",
      icon: ListCheck,
      isActive: () => editor?.isActive("taskList"),
      onClick: () => editor?.chain().focus().toggleTaskList().run(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-gray-50 px-1.5 overflow-hidden text-sm bg-white shadow-sm">
          <ListIcon className="text-gray-900 size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col fap-y-1 bg-white shadow-lg">
        {lists.map(({ label, onClick, isActive, icon: Icon }) => (
          <button
            key={label}
            onClick={onClick}
            className={cn(
              "flex items-center text-gray-900 gap-x-2.5 px-2.5 py-1.5 rounded-sm hover:bg-gray-50",
              isActive() && "bg-gray-50"
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Align Functionality
const AlignTextButton = () => {
  const { editor } = useEditorStore();

  const alignment = [
    {
      label: "Left",
      value: "left",
      icon: AlignLeft,
    },
    {
      label: "Center",
      value: "center",
      icon: AlignCenter,
    },
    {
      label: "Right",
      value: "right",
      icon: AlignRight,
    },
    {
      label: "Justify",
      value: "justify",
      icon: AlignJustify,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-gray-50 px-1.5 overflow-hidden text-sm bg-white shadow-sm">
          <AlignLeft className="text-gray-900 size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col fap-y-1 bg-white shadow-lg">
        {alignment.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              "flex items-center text-gray-900 gap-x-2.5 px-2.5 py-1.5 rounded-sm hover:bg-gray-50",
              editor?.isActive("textAlign", value) && "bg-gray-50"
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Image Extension functionality
const ImageButton = () => {
  const { editor } = useEditorStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    };

    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-gray-50 px-1.5 overflow-hidden text-sm bg-white shadow-sm">
            <ImageIcon className="size-4 text-gray-900" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white shadow-lg">
          <DropdownMenuItem onClick={onUpload} className="hover:bg-gray-50">
            <Upload className="size-4 mr-2 text-gray-900" /> Upload
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsDialogOpen(true)}
            className="hover:bg-gray-50"
          >
            <Search className="size-4 mr-2 text-gray-900" /> Paste Image URL
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white shadow-lg">
          <DialogHeader>
            <DialogTitle>Insert Image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmit();
              }
            }}
            className="border-gray-300"
          />
          <DialogFooter>
            <Button
              onClick={handleImageUrlSubmit}
              className="bg-gray-600 text-white hover:bg-gray-700"
            >
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Link Extension functionality
const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState("");

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setValue(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-gray-50 px-1.5 overflow-hidden text-sm bg-white shadow-sm">
          <Link2 className="size-4 text-gray-900" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2 bg-white shadow-lg">
        <Input
          placeholder="www.example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border-gray-300"
        />
        <Button
          onClick={() => onChange(value)}
          className="bg-gray-600 text-white hover:bg-gray-700"
        >
          Apply
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Text Highlighter functionality
const TextHighligtButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight").color || "#FFFFFF";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-gray-50 px-1.5 overflow-hidden text-sm bg-white shadow-sm">
          <Highlighter className="text-gray-900 size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 bg-white shadow-lg">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Text Color functionality
const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-gray-50 px-1.5 overflow-hidden text-sm bg-white shadow-sm">
          <span className="text-xs text-gray-900">A</span>
          <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 bg-white shadow-lg">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Heading functionality
const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const heading = [
    { label: "Normal Text", value: 0, fontSize: "16px" },
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
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-gray-50 px-1.5 overflow-hidden text-sm bg-white shadow-sm">
          <span className="truncate text-gray-900">{getCurrentHeading()}</span>
          <ChevronDown className="ml-2 shrink-0 size-4 text-gray-900" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1 bg-white shadow-lg">
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
              "flex items-center text-gray-900 gap-x-2.5 px-2.5 py-1.5 rounded-sm hover:bg-gray-50",
              (value === 0 && !editor?.isActive("heading")) ||
                (editor?.isActive("heading", { level: value }) && "bg-gray-50")
            )}
            style={{ fontSize }}
          >
            <span className="text-sm text-gray-900">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Font Family functionality
const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  // Font array
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
        <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-gray-50 px-1.5 overflow-hidden text-sm bg-white shadow-sm">
          <span className="truncate text-gray-900">
            {editor?.getAttributes("textStyle").fontFamily || "Default"}
          </span>
          <ChevronDown className="ml-2 shrink-0 size-4 text-gray-900" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1 bg-white shadow-lg">
        {fonts.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            className={cn(
              "flex items-center text-gray-900 gap-x-2.5 px-2.5 py-1.5 rounded-sm hover:bg-gray-50",
              editor?.getAttributes("textStyle").fontFamily === value &&
                "bg-gray-50"
            )}
            style={{ fontFamily: value }}
          >
            <span className="text-sm text-gray-900">{label}</span>
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
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-gray-50 bg-white shadow-sm",
        isActive && "bg-gray-50"
      )}
    >
      <Icon className="size-4 text-gray-900" />
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
    <div className="bg-gray-100 px-2.5 py-0.5 rounded-lg min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto shadow-sm">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-gray-50" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-gray-50" />
      <HeadingLevelButton />
      <Separator orientation="vertical" className="h-6 bg-gray-50" />
      <FontSizeButton />
      <Separator orientation="vertical" className="h-6 bg-gray-50" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <TextColorButton />
      <TextHighligtButton />
      <Separator orientation="vertical" className="h-6 bg-gray-50" />
      <LinkButton />
      <ImageButton />
      <AlignTextButton />
      {/* Line height */}
      <AlignListButton />
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};
