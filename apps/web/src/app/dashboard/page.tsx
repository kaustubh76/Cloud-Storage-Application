// apps/web/src/app/dashboard/page.tsx
import UserProfile from './../../components/Dashboard/UserProfile';
import PhotosSection from './../../components/Dashboard/PhotosSection';
import DriveSection from './../../components/Dashboard/DriveSection';
import NotesSection from './../../components/Dashboard/NotesSection';
import { getSession } from 'next-auth/react';
import { db } from './../../server/db';
import { photos, files, notes } from './../../server/db/schema';

// Fetch data on the server
export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  const userId = session.user.id;

  const userPhotos = await db.select().from(photos).where('user_id', userId);
  const userFiles = await db.select().from(files).where('user_id', userId);
  const userNotes = await db.select().from(notes).where('user_id', userId);

  return {
    props: {
      session,
      photos: userPhotos,
      files: userFiles,
      notes: userNotes,
    },
  };
}

const DashboardPage = ({ session, photos, files, notes }: any) => {
  return (
    <div className="p-4">
      <UserProfile session={session} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PhotosSection photos={photos} />
        <DriveSection files={files} />
        <NotesSection notes={notes} />
      </div>
    </div>
  );
};

export default DashboardPage;
