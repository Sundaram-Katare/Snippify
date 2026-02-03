import React from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Code, LayoutDashboard, Settings, User } from "lucide-react";

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div
      className={`bg-[#FFCE99] text-black h-full transition-all duration-300
        ${isOpen ? "w-64" : "w-16"} flex flex-col justify-between`}
    >
      {/* Top Section */}
      <div>
        <div className="relative flex items-center justify-between px-4 py-6">
          <h1 className={`text-[#61B8FF] font-bold text-xl transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
            Snippify
          </h1>
          <button
            onClick={toggleSidebar}
            className={`text-[#562F00] text-xl ${!isOpen ? "absolute left-0": ""}`}
          >
            {isOpen ? <FiChevronLeft size={36} color="orange" /> : <FiChevronRight size={36} color="orange" />}
          </button>
        </div>

        <ul className="space-y-4 px-4 mt-6">
          <li>
            <Link to="/dashboard" className={` ${location.pathname === "/dashboard" ? "bg-[#FF9644]" : ""} text-[#000000]   font-semibold rounded-md px-2 py-1 block`}>
              { isOpen ? "Dashboard" : <LayoutDashboard />}
            </Link>
          </li>
          <li>
            <Link to="/settings" className={` ${location.pathname === "/settings" ? "bg-[#FF9644]" : ""} text-[#000000]  font-semibold rounded-md px-2 py-1 block`}>
              { isOpen ? "Settings" : <Settings />}
            </Link>
          </li>
          <li>
            <Link to="/profile" className={` ${location.pathname === "/profile" ? "bg-[#FF9644]" : ""} text-[#000000]  font-semibold rounded-md px-2 py-1 block`}>
              { isOpen ? "Profile" : <User />}
            </Link>
          </li>
          <li>
            <Link to={"/snippets"} className={` ${location.pathname === "/snippets" ? "bg-[#FF9644]" : ""} text-[#000000]  font-semibold rounded-md px-2 py-1 block`}>
             { isOpen ? "Snippets" : <Code />}
            </Link>
          </li>
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="px-4 py-6 text-sm text-gray-400">
        {isOpen ? "Save it once, use it forever." : "💾"}
      </div>
    </div>
  );
}