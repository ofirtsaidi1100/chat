import { Outlet } from 'react-router-dom';
import { Navbar } from '../features/navbar';
import { useUser } from '@clerk/clerk-react';
import { useFindOrCreateUserMutation } from '../store';
import { useEffect } from 'react';

export const Root = () => {
  const { user } = useUser();

  if (!user) {
    throw new Error('You need to log in');
  }

  const [findOrCreate] = useFindOrCreateUserMutation();

  useEffect(() => {
    findOrCreate({ clerkUserId: user.id });
  }, [findOrCreate, user.id]);

  return (
    <div className="w-full h-full flex">
      <Navbar />

      <Outlet />
    </div>
  );
};
