import { Editor } from "./editor";

interface DocIdPageProps {
  params: Promise<{ documentId: string }>;
}

const DocIdPage = async ({ params }: DocIdPageProps) => {
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-[#fafbfd]">
      <Editor />
    </div>
  );
};

export default DocIdPage;
