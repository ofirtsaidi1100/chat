import { useFindOrCreateUserMutation } from '../../store';

export const Contacts: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, result] = useFindOrCreateUserMutation({
    fixedCacheKey: 'logged-in-user',
  });

  return <div></div>;
};
