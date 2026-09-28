import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Auth } from "../context/AuthContext";

const Navbar = () => {
  const { logoutUser } = useContext(Auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <nav className="w-full border-b border-gray-800 bg-[#0b0b0b]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-white">
          Your<span className="text-lime-400">App</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="/main"
            className="text-gray-300 hover:text-lime-400 transition"
          >
            Home
          </a>

          <a
            href="/profile"
            className="text-gray-300 hover:text-lime-400 transition"
          >
            Profile
          </a>

          <a
            href="/about"
            className="text-gray-300 hover:text-lime-400 transition"
          >
            About
          </a>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-lime-400 text-black font-medium hover:bg-lime-300 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
