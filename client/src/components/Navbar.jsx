import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfile, logout } from "../features/auth/authSlice";

export default function Navbar() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  const seeProfile = () => {
    if (!user) dispatch(getProfile());
    navigate("/profile");
  };

  return (
    <nav className="flex justify-between px-4 py-6">
      <h1 className="text-4xl font-bold text-[#61B8FF]">Snippify</h1>

      {isAuthenticated ? (
        <div className="flex items-center gap-3">
          <h2>Hello, <span className="font-semibold">{user?.name}</span></h2>

          <button
            onClick={seeProfile}
            className="bg-[#61B8FF] px-4 py-2 rounded-xl"
          >
            Profile
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
  );
}
