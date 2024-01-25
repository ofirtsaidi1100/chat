import { useParams } from 'react-router-dom';

export const UserChat: React.FC = () => {
  const params = useParams();
  return <div>{JSON.stringify(params)}</div>;
};
