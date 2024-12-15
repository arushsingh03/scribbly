"use client";

import { Room } from "./room";
import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Toolbar } from "./toolbar";
import { api } from "../../../../convex/_generated/api";
import { Preloaded, usePreloadedQuery } from "convex/react";

interface DocPageProps {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
}

export const Document =  ({ preloadedDocument }: DocPageProps) => {
    const document  = usePreloadedQuery(preloadedDocument);

  return (
    <Room>
      <div className="min-h-screen bg-gray-200">
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-white print:hidden">
          <Navbar data={document} />
          <Toolbar />
        </div>
        <div className="pt-[114px] print:pt-0">
          <Editor />
        </div>
      </div>
    </Room>
  );
};
