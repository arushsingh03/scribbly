import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Toolbar } from "./toolbar";

interface DocIdPageProps {
  params: Promise<{ documentId: string }>;
}

const DocIdPage = async ({ params }: DocIdPageProps) => {
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-white print:hidden">
        <Navbar />
        <Toolbar />
      </div>
      <div className="pt-[114px] print:pt-0">
        <Editor />
      </div>
    </div>
  );
};

export default DocIdPage;

// #5B21D8 indigo-700
