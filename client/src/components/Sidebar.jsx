import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiMenu } from "react-icons/fi";
import { Code, LayoutDashboard, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../features/auth/authSlice";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const isLight = user?.theme === "light";

  return (
    <>
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className={`fixed top-4 left-4 z-50 p-2 rounded-lg lg:hidden ${
            isLight
              ? "bg-[#FFCE99] text-black"
              : "bg-[#111111] text-white border border-white/10"
          }`}
        >
          <FiMenu size={22} />
        </button>
      )}

      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <div
        className={`
          fixed lg:static top-0 left-0 z-50 h-screen flex flex-col justify-between
          transition-all duration-300
          ${isOpen ? "w-64 translate-x-0" : "w-16 -translate-x-full lg:translate-x-0"}
          ${
            isLight
              ? "bg-[#FFCE99] text-black"
              : "bg-[#111111] text-zinc-100 border-r border-white/10"
          }
        `}
      >
        <div>
          <div className="flex items-center justify-between px-4 py-6">
            <h1
              className={`font-bold text-xl transition-opacity duration-200 ${
                isOpen ? "opacity-100" : "opacity-0"
              } ${isLight ? "text-[#562F00]" : "text-white"}`}
            >
              Snippify
            </h1>

            <button
              onClick={toggleSidebar}
              className={`p-1 rounded ${
                isLight ? "text-black" : "text-white"
              }`}
            >
              {isOpen ? (
                <FiChevronLeft size={26} />
              ) : (
                <FiChevronRight size={26} className="hidden lg:block" />
              )}
            </button>
          </div>

          <ul className="space-y-4 px-2 mt-6">
            <li>
              <Link
                to="/dashboard"
                onClick={() =>
                  window.innerWidth < 1024 && toggleSidebar()
                }
                className={`flex items-center gap-3 font-semibold rounded-md px-3 py-2 transition
                  ${
                    location.pathname === "/dashboard"
                      ? isLight
                        ? "bg-[#FF9644] text-black"
                        : "bg-white/10 text-white"
                      : isLight
                      ? "text-black hover:bg-[#FF9644]/40"
                      : "text-zinc-300 hover:bg-white/5"
                  }
                `}
              >
                <LayoutDashboard size={20} />
                {isOpen && "Dashboard"}
              </Link>
            </li>

            <li>
              <Link
                to="/profile"
                onClick={() =>
                  window.innerWidth < 1024 && toggleSidebar()
                }
                className={`flex items-center gap-3 font-semibold rounded-md px-3 py-2 transition
                  ${
                    location.pathname === "/profile"
                      ? isLight
                        ? "bg-[#FF9644] text-black"
                        : "bg-white/10 text-white"
                      : isLight
                      ? "text-black hover:bg-[#FF9644]/40"
                      : "text-zinc-300 hover:bg-white/5"
                  }
                `}
              >
                <User size={20} />
                {isOpen && "Profile"}
              </Link>
            </li>

            <li>
              <Link
                to="/snippets"
                onClick={() =>
                  window.innerWidth < 1024 && toggleSidebar()
                }
                className={`flex items-center gap-3 font-semibold rounded-md px-3 py-2 transition
                  ${
                    location.pathname === "/snippets"
                      ? isLight
                        ? "bg-[#FF9644] text-black"
                        : "bg-white/10 text-white"
                      : isLight
                      ? "text-black hover:bg-[#FF9644]/40"
                      : "text-zinc-300 hover:bg-white/5"
                  }
                `}
              >
                <Code size={20} />
                {isOpen && "Snippets"}
              </Link>
            </li>
          </ul>
        </div>

        <div
          className={`px-4 py-6 text-sm ${
            isLight ? "text-black" : "text-zinc-400"
          }`}
        >
          {isOpen ? "Save it once, use it forever." : "💾"}
        </div>
      </div>
    </>
  );
}
