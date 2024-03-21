import { useParams } from 'react-router-dom';
import {
  useFindOrCreateUserMutation,
  useFindUserByIdQuery,
  useLazyGetMessagesQuery,
  useSendMessageMutation,
} from '../store';
import { Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const UserChat: React.FC = () => {
  const { userId: contactClerkId } = useParams();
  const { data: contactClerk } = useFindUserByIdQuery(contactClerkId ?? '');
  const [_, { data: loggedInUser }] = useFindOrCreateUserMutation({
    fixedCacheKey: 'logged-in-user',
  });
  const [findContact, { data: contact }] = useFindOrCreateUserMutation({
    fixedCacheKey: 'contact',
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null); // Reference for textarea element
  const [message, setMessage] = useState('');
  const [sendMessage] = useSendMessageMutation();
  const [trigger, { data: messages, isLoading }] = useLazyGetMessagesQuery();

  useEffect(() => {
    if (contact && loggedInUser) {
      trigger({
        senderId: loggedInUser.id ?? '',
        receiverId: contact.id ?? '',
      });
    }
  }, [contact, loggedInUser, trigger]);

  useEffect(() => {
    findContact({ clerkUserId: contactClerkId ?? '' });
  }, [contactClerkId, findContact]);

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
    setMessage(event.target.value);
    adjustTextareaHeight(); // Adjust textarea height on change
  };

  return (
    <div className="w-full h-full flex gap-4 justify-start items-center flex-col">
      {contactClerk ? (
        <div className="h-fit w-full flex justify-start items-center gap-4 border-b p-4">
          <img
            className="aspect-square rounded-full h-10"
            src={contactClerk.imageUrl}
            alt="Profile Pic"
          />
          <div>{`${contactClerk.firstName} ${contactClerk.lastName}`}</div>
        </div>
      ) : (
        <p>Contact not found</p>
      )}
      <div className="w-full h-full flex flex-col justify-end items-center p-4">
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            messages?.map((message) => (
              <div key={message.id}>{message.content}</div>
            ))
          )}
        </div>
        <div className="p-4 w-full h-fit flex gap-4">
          <textarea
            ref={textareaRef} // Assign the ref to the textarea element
            className="border py-2 px-4 rounded-3xl w-full resize-none overflow-auto"
            onChange={handleTextareaChange} // Call handleTextareaChange on change
          />
          <button
            className="rounded-full bg-blue-400 w-fit h-fit p-3 flex justify-center items-center mt-auto [&_*]:stroke-white"
            onClick={() => {
              if (!contact || !loggedInUser) {
                // TODO: show toast
                return;
              }
              sendMessage({
                content: message,
                receiverId: contact.id,
                senderId: loggedInUser?.id,
              });
            }}
          >
            <Send className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
