import { Outlet } from 'react-router-dom';
import { Contacts } from '../features/contacts';

export const Chat = () => {
  return (
    <div className="flex w-full h-full">
      <Contacts />
      <Outlet />
    </div>
  );
};
