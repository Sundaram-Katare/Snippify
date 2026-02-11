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
    min-h-screen w-full font-inter transition-colors duration-300
    ${
      isLight
        ? "bg-[#FFFDF1] text-[#3b2a1a]"
        : "bg-[#0f172a] text-zinc-100"
    }
  `}
>
  {!isLight && (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-40 left-1/3 w-[500px] h-[500px] bg-indigo-500/10 blur-[160px]" />
      <div className="absolute bottom-20 right-1/3 w-[420px] h-[420px] bg-cyan-400/10 blur-[140px]" />
    </div>
  )}

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
    <div className="flex flex-col sm:flex-row items-center gap-6 mb-14">
      <img
        src="https://static.vecteezy.com/system/resources/previews/012/447/668/non_2x/3d-illustration-design-avatar-profile-dog-corgi-free-png.png"
        alt="profile"
        className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 shadow-md ${
          isLight ? "border-[#FFD7A8]" : "border-white/10"
        }`}
      />

      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-semibold flex items-center justify-center sm:justify-start gap-2">
          <User size={22} />
          {user?.name}
        </h1>
        <p
          className={`mt-1 flex items-center justify-center sm:justify-start gap-2 text-sm ${
            isLight ? "text-[#6b4a2f]" : "text-zinc-400"
          }`}
        >
          <Mail size={16} />
          {user?.email}
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
      <div
        className={`
          rounded-3xl p-6 sm:p-8
          ${
            isLight
              ? "bg-[#FFE8CC] border border-[#FFD7A8]"
              : "bg-[#111827] border border-white/10"
          }
        `}
      >
        <h2 className="text-lg font-semibold mb-6">
          Preferences
        </h2>

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
                  : "bg-[#1f2937] text-white hover:bg-[#374151]"
              }
            `}
          >
            Switch to {isLight ? "Dark" : "Light"}
          </button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Key size={18} />
              <span>API Key</span>
            </div>

            <button
              onClick={() => setShowKey(!showKey)}
              className={`p-2 rounded-lg ${
                isLight ? "hover:bg-black/5" : "hover:bg-white/5"
              }`}
            >
              {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {user?.geminiApiKey && (
            <div
              className={`mb-3 px-4 py-2.5 rounded-lg text-sm font-mono break-all ${
                isLight
                  ? "bg-[#FFFDF1] border border-[#FFD7A8]"
                  : "bg-[#020617] border border-white/10"
              }`}
            >
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
            className={`
              w-full px-4 py-2.5 rounded-lg border mb-3 focus:outline-none
              ${
                isLight
                  ? "bg-[#FFFDF1] border-[#FFD7A8]"
                  : "bg-[#020617] border-white/10 text-zinc-100"
              }
            `}
          />

          <button
            onClick={handleSaveApiKey}
            disabled={!apiKey}
            className={`
              w-full flex items-center justify-center gap-2
              py-2.5 rounded-xl font-medium transition
              ${
                isLight
                  ? "bg-[#FFA552] text-[#3b2a1a] hover:bg-[#ff9a3d]"
                  : "bg-[#1f2937] text-white hover:bg-[#374151]"
              }
            `}
          >
            <Save size={18} />
            {user?.geminiApiKey ? "Update API Key" : "Save API Key"}
          </button>
        </div>
      </div>

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
              rounded-3xl p-6 sm:p-8
              ${
                isLight
                  ? "bg-[#FFD7A8] text-[#3b2a1a]"
                  : "bg-[#111827] border border-white/10"
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
