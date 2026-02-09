import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-hot-toast';
import {
  Eye,
  EyeOff,
  Mail,
  User,
  Key,
  Palette,
  Save,
} from "lucide-react";
import {
  getProfile,
  switchTheme,
  updateApiKey,
} from "../features/auth/authSlice.js";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const isLight = user?.theme === "light";

  const [showKey, setShowKey] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const handleSaveApiKey = async () => {
  try {
    await dispatch(updateApiKey({ apiKey })).unwrap();
    toast.success("API key updated successfully 🔐");
    setApiKey(""); // clear input after save
  } catch (err) {
    toast.error(err || "Failed to update API key");
  }
};


  useEffect(() => {
    if (!user) dispatch(getProfile());
  }, [dispatch, user]);

  const updateKey = async () => {
    await dispatch(updateApiKey);
    setApiKey(user?.geminiApiKey || "");
  }

  if (loading) return <p className="p-8">Loading profile...</p>;

  return (
  <div
    className={`
      min-h-screen font-inter transition-colors duration-300
      ${
        isLight
          ? "bg-[#FFFDF1] text-[#3b2a1a]"
          : "bg-gradient-to-br from-[#05070d] via-[#0b1220] to-[#020617] text-zinc-100"
      }
    `}
  >
    {/* dark glow stays same */}
    {!isLight && (
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-1/3 w-[500px] h-[500px] bg-indigo-500/20 blur-[160px]" />
        <div className="absolute bottom-20 right-1/3 w-[420px] h-[420px] bg-cyan-400/20 blur-[140px]" />
      </div>
    )}

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16">
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-14">
        <img
          src="https://i.pravatar.cc/200"
          alt="profile"
          className="w-28 h-28 rounded-full border-4 border-[#FFD7A8] shadow-md"
        />

        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-semibold flex items-center gap-2">
            <User size={22} />
            {user?.name}
          </h1>
          <p className="mt-1 flex items-center gap-2 text-[#6b4a2f]">
            <Mail size={16} />
            {user?.email}
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Preferences Card */}
        <div
          className={`
            rounded-3xl p-8
            ${
              isLight
                ? "bg-[#FFE8CC] border border-[#FFD7A8]"
                : "bg-white/5 backdrop-blur border border-white/10"
            }
          `}
        >
          <h2 className="text-lg font-semibold mb-6">
            Preferences
          </h2>

          {/* Theme */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Palette size={18} />
              <span>Theme</span>
            </div>

            <button
              onClick={() => dispatch(switchTheme())}
              className={`
                px-5 py-2.5 rounded-xl font-medium transition
                ${
                  isLight
                    ? "bg-[#5C3600] text-[#FFFDF1] hover:bg-[#6b3a00]"
                    : "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white"
                }
              `}
            >
              Switch to {isLight ? "Dark" : "Light"}
            </button>
          </div>

          {/* API Key */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Key size={18} />
                <span>API Key</span>
              </div>

              <button
                onClick={() => setShowKey(!showKey)}
                className="p-2 rounded-lg hover:bg-black/5"
              >
                {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Existing key */}
            {user?.geminiApiKey && (
              <div className="mb-3 px-4 py-2.5 rounded-lg text-sm font-mono bg-[#FFFDF1] border border-[#FFD7A8] break-all">
                {showKey
                  ? user.geminiApiKey
                  : "•".repeat(Math.min(user.geminiApiKey.length, 24))}
              </div>
            )}

            <input
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={
                user?.geminiApiKey ? "Update API key" : "Add your API key"
              }
              className="
                w-full px-4 py-2.5 rounded-lg border mb-3
                bg-[#FFFDF1] border-[#FFD7A8]
                focus:outline-none
              "
            />

            <button
              onClick={handleSaveApiKey}
              disabled={!apiKey}
              className="
                w-full flex items-center justify-center gap-2
                py-2.5 rounded-xl font-medium
                bg-[#FFA552] text-[#3b2a1a]
                hover:bg-[#ff9a3d] transition
              "
            >
              <Save size={18} />
              {user?.geminiApiKey ? "Update API Key" : "Save API Key"}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { label: "Account Type", value: "User" },
            { label: "Theme", value: user?.theme },
            { label: "Total Snippets", value: user?.snippets?.length || 0 },
            { label: "Region", value: "India" },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`
                rounded-3xl p-8
                ${
                  isLight
                    ? "bg-[#FFD7A8] text-[#3b2a1a]"
                    : "bg-white/5 backdrop-blur border border-white/10"
                }
              `}
            >
              <p className="text-sm opacity-70">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
}
