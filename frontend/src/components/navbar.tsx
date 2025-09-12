import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import LogOut from "./Logout";
import { ChevronDown, Menu } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex justify-between items-center p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md">
      {/* Left side */}
      <div className="text-left">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-md">
          Taskia
        </h1>
        <p className="mt-2 text-lg text-indigo-100">
          Manage your tasks with style 🚀
        </p>
      </div>

      {/* Dropdown Menu */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-white text-indigo-600 font-semibold rounded-xl shadow-md hover:bg-indigo-100 transition"
        >
          <Menu size={18} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <Link
              to="/board"
              className={`block px-4 py-2 hover:bg-indigo-50 transition ${
                location.pathname === "/board" ? "bg-indigo-100 font-bold" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              Board
            </Link>
            <Link
              to="/myProfile"
              className={`block px-4 py-2 hover:bg-indigo-50 transition ${
                location.pathname === "/myProfile"
                  ? "bg-indigo-100 font-bold"
                  : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              My Profile
            </Link>
            <div
              className="block px-4 py-2 hover:bg-red-50 text-red-600 transition cursor-pointer"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <LogOut />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
