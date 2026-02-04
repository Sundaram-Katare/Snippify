import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfile, logout, switchTheme } from "../features/auth/authSlice";

export default function Navbar() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  const changeTheme = () => {
    console.log("Hello");
      dispatch(switchTheme());
  };

  const seeProfile = () => {
    if (!user) dispatch(getProfile());
    navigate("/profile");
  };

  return (
    <div className="flex items-center justify-center w-full bg-[#ffffff]">
      <nav className="z-20 shadow-md w-[950px] my-8 flex justify-between items-center px-4 py-6 bg-white rounded-full text-black">
        <h1 className="text-2xl md:text-4xl font-bold text-black">Snippify</h1>

        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <h2>
              Hello, <span className="font-semibold">{user?.name}</span>
            </h2>

            <button
              onClick={changeTheme}
              className="bg-[#61B8FF] px-4 py-2 rounded-xl"
            >
              Switch Theme
            </button>

            <button
              onClick={handleLogout}
              className="bg-[#61B8FF] px-4 py-2 rounded-xl"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className="bg-[#61B8FF] px-4 py-2 rounded-xl flex items-center gap-1"
          >
            Get Started <MdArrowOutward />
          </button>
        )}
      </nav>
    </div>
  );
}