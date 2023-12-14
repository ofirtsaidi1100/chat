import { UserButton } from "@clerk/clerk-react";
import ChatBubbleLeftRightIcon from "@heroicons/react/24/outline/ChatBubbleLeftRightIcon";
import HomeIcon from "@heroicons/react/24/outline/HomeIcon";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center justify-evenly w-24 h-full border-r">
        <Link className="w-1/2" to="home">
          <HomeIcon />
        </Link>
        <Link className="w-1/2" to="chat">
          <ChatBubbleLeftRightIcon />
        </Link>
        <UserButton/>
      </div>

      <div className="flex flex-col items-center justify-evenly w-40 h-full border-r">
        <h1>My Chats</h1>
        <Link className="w-1/2" to="home">
          <h2>danielle</h2>
        </Link>
        <Link className="w-1/2" to="chat">
          <h2>kinar</h2>
        </Link>
      </div>
    </div>
  );
};
