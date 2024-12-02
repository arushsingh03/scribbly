import { Editor } from "./editor";

interface DocIdPageProps {
  params: Promise<{ documentId: string }>;
}

const DocIdPage = async ({ params }: DocIdPageProps) => {
  const { documentId } = await params;

  return (
    <div>
      Doc Id : {documentId}
      <Editor />
    </div>
  );
};

export default DocIdPage;
