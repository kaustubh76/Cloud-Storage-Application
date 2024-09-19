import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const NotesSection = () => {
  const { data: notes, error } = useSWR('/api/notes', fetcher);

  if (error) return <p>Error loading notes.</p>;
  if (!notes) return <p>Loading notes...</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Notes</h2>
      <ul className="mt-4">
        {notes.map((note: any) => (
          <li key={note.id} className="mb-2">
            <h3 className="font-semibold">{note.title}</h3>
            <p>{note.content}</p>
            <small>{new Date(note.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesSection;
