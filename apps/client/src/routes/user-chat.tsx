import { useParams } from 'react-router-dom';
import { useFindUserByIdQuery } from '../store';
import { Send } from 'lucide-react';
import { useState } from 'react';

export const UserChat: React.FC = () => {
  const { userId } = useParams();
  const { data: user } = useFindUserByIdQuery(userId ?? '');
  const [textareaValue, setTextareaValue] = useState('');
  const [textareaRows, setTextareaRows] = useState(1);

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setTextareaValue(value);
    const numLines = value.split('\n').length;
    setTextareaRows(Math.min(4, numLines)); // Limit to maximum of 4 rows
  };

  return (
    <div className="w-full h-full flex gap-4 justify-start items-center flex-col">
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
          <textarea
            className="border py-2 px-4 rounded-3xl w-full resize-none overflow-auto"
            value={textareaValue}
            rows={textareaRows}
            onChange={handleTextareaChange}
          />
          <button className="rounded-full bg-blue-400 w-fit h-fit p-3 flex justify-center items-center mt-auto [&_*]:stroke-white">
            <Send className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
