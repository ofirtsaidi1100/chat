import { QueryStatus } from '@reduxjs/toolkit/query';
import {
  useFindAllOtherUsersQuery,
  useFindOrCreateUserMutation,
} from '../../store';
import { Link } from 'react-router-dom';

export const Contacts: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, result] = useFindOrCreateUserMutation({
    fixedCacheKey: 'logged-in-user',
  });

  if (!result.data && result.status === QueryStatus.rejected) {
    throw new Error('You need to sign in!');
  }

  const { data: contacts } = useFindAllOtherUsersQuery(result.data?.id ?? '');

  return (
    <aside className="w-fit h-full border-r flex flex-col gap-4 p-4 max-w-[10rem]">
      {contacts?.length === 0 || !contacts ? (
        <div>Find Some Friends You Loser!</div>
      ) : (
        contacts.map((contact) => {
          return (
            <Link
              to={contact.id}
              className="px-4 py-2 rounded border cursor-pointer"
              key={contact.id}
            >{`${contact.firstName} ${contact.lastName}`}</Link>
          );
        })
      )}
    </aside>
  );
};
