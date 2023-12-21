import { Outlet } from 'react-router-dom';
import { Navbar } from '../features/navbar';
import { useUser } from '@clerk/clerk-react';
import { useFindOrCreateUserMutation } from '../store';

export const Root = () => {
  const { user } = useUser();

  if (!user) {
    throw new Error('You need to log in');
  }

  const [findOrCreate, result] = useFindOrCreateUserMutation();

  findOrCreate({ clerkUserId: user.id });

  console.log(result.data);

  return (
    <div className="w-full h-full flex">
      <Navbar />

      <Outlet />
    </div>
  );
};
