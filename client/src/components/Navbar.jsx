import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfile, logout, switchTheme } from "../features/auth/authSlice";
import { useEffect } from "react";
import { LogOut, Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const changeTheme = () => {
    dispatch(switchTheme());
  };

  const seeProfile = () => {
    if (!user) dispatch(getProfile());
    navigate("/profile");
  };

  const isLight = user?.theme === "light";

  return (
    <div
      className={`flex items-center justify-center w-full ${isLight ? "bg-[#FFFDF1]" : "bg-black"
        }`}
    >
      <nav
        className={`
      z-20 shadow-md my-6
      w-full max-w-[950px]
      flex flex-col md:flex-row
      justify-between items-center
      gap-4 md:gap-0
      px-5 py-4
      rounded-2xl md:rounded-full
      ${isLight
            ? "bg-white text-black"
            : "bg-zinc-900 text-zinc-100 border border-zinc-800"
          }
    `}
      >
        {/* Logo */}
        <h1
          className={`
        text-2xl md:text-4xl font-bold
        ${isLight ? "text-black" : "text-zinc-100"}
      `}
        >
          Snippify
        </h1>

        {isAuthenticated ? (
          <div
            className="
          flex flex-col sm:flex-row
          items-center gap-3 sm:gap-4
          w-full md:w-auto
        "
          >
            <h2
              className={`
            text-sm sm:text-base
            ${isLight ? "text-zinc-700" : "text-zinc-300"}
          `}
            >
              Hello,{" "}
              <span className="font-semibold">
                {user?.name}
              </span>
            </h2>

            <div className="flex items-center gap-3">
              <button
                onClick={changeTheme}
                className={`
              px-4 py-2 rounded-xl text-sm font-medium transition
              ${isLight
                    ? "bg- text-black "
                    : "bg- text-white "
                  }
            `}
              >
                {isLight ? <Moon className="hover:scale-[1.05]" /> : <Sun />}
              </button>

              <button
                onClick={handleLogout}
                className={`
              px-4 py-2 rounded-xl text-sm font-medium transition
              ${isLight
                    ? "bg-[#61B8FF] text-black hover:bg-[#4aa9f5]"
                    : "bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
                  }
            `}
              >
                <LogOut size={24}/>
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className={`
          px-4 py-2 rounded-xl flex items-center gap-1
          text-sm font-semibold transition
          ${isLight
                ? "bg-[#61B8FF] text-black hover:bg-[#4aa9f5]"
                : "bg-indigo-600 text-white hover:bg-indigo-500"
              }
        `}
          >
            Get Started <MdArrowOutward />
          </button>
        )}
      </nav>
    </div>
  );
}