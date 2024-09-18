import { useRouter } from 'next/router';
import trpc from '../../../../lib/trpc';
const FileDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: file, isLoading, error } = trpc.file.getFile.useQuery({ id: Number(id) });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading file: {error.message}</p>;

  return (
    <div className="container mx-auto mt-4">
      <h2 className="text-2xl font-bold">{file.filename}</h2>
      <p>Size: {file.size} bytes</p>
      <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
        Download File
      </a>
    </div>
  );
};

export default FileDetailPage;
