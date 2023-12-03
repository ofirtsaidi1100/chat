import { Outlet } from "react-router-dom";
import { Navbar } from "../features/navbar";

export const Root = () => {
  return (
    <div className="w-full h-full flex">
      <Navbar />

      <Outlet />
    </div>
  );
};
