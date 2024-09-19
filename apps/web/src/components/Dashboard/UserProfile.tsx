
const UserProfile = ({ session }: any) => {
  if (!session) return null;

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-xl font-semibold">User Profile</h2>
      <p>Name: {session.user?.name}</p>
      <p>Email: {session.user?.email}</p>
    </div>
  );
};

export default UserProfile;
