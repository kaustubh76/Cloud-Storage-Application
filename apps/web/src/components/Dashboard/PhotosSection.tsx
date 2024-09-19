import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PhotosSection = () => {
  const { data: photos, error } = useSWR('/api/photos', fetcher);

  if (error) return <p>Error loading photos.</p>;
  if (!photos) return <p>Loading photos...</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Photos</h2>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {photos.map((photo: any) => (
          <img
            key={photo.id}
            src={photo.url}
            alt={photo.filename}
            className="w-full h-32 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
};

export default PhotosSection;
