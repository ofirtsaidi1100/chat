import { useParams } from 'react-router-dom';
import { useFindUserByIdQuery } from '../store';
import { Send } from 'lucide-react';

export const UserChat: React.FC = () => {
  const { userId } = useParams();
  const { data: user } = useFindUserByIdQuery(userId ?? '');

  return (
    <div className="w-full h-full flex gap-4 justify-start items-center flex-col">
      {/* <p>User ID: {userId}</p> */}
      {user ? (
        <div className="h-fit w-full flex justify-start items-center gap-4 border-b p-4">
          <img
            className="aspect-square rounded-full h-10"
            src={user.imageUrl}
            alt="Profile Pic"
          />
          <div>{`${user.firstName} ${user.lastName}`}</div>
        </div>
      ) : (
        <p>User not found</p>
      )}
      <div className="w-full h-full flex flex-col justify-end items-center p-4">
        <div className="p-4 w-full h-fit flex gap-4">
          <input type="text" className="border py-2 px-4 rounded-3xl w-full" />
          <button className="rounded-full bg-blue-400 w-fit h-fit p-3 flex justify-center items-center [&_*]:stroke-white">
            <Send className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
