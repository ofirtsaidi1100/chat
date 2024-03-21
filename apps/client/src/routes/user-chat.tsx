import { useParams } from 'react-router-dom';
import { useFindUserByIdQuery } from '../store';
import { Send } from 'lucide-react';
import { useRef } from 'react';

export const UserChat: React.FC = () => {
  const { userId } = useParams();
  const { data: user } = useFindUserByIdQuery(userId ?? '');
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Reference for textarea element

  // Function to adjust textarea height based on content
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset textarea height
      const maxRows = 4;
      const lineHeight = parseFloat(
        getComputedStyle(textareaRef.current).lineHeight || '0'
      );
      const maxHeight = maxRows * lineHeight;
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        maxHeight
      )}px`; // Set textarea height to content height or maximum height
    }
  };

  // Event handler for textarea change
  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    adjustTextareaHeight(); // Adjust textarea height on change
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
            ref={textareaRef} // Assign the ref to the textarea element
            className="border py-2 px-4 rounded-3xl w-full resize-none overflow-auto"
            onChange={handleTextareaChange} // Call handleTextareaChange on change
          />
          <button className="rounded-full bg-blue-400 w-fit h-fit p-3 flex justify-center items-center mt-auto [&_*]:stroke-white">
            <Send className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
