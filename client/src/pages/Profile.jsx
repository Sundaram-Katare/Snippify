import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
        ${isLight
          ? "bg-gray-50 text-gray-900"
          : "bg-gradient-to-br from-[#05070d] via-[#0b1220] to-[#020617] text-zinc-100"
        }
      `}
    >
      {/* glow */}
      {!isLight && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 left-1/3 w-[500px] h-[500px] bg-indigo-500/20 blur-[160px]" />
          <div className="absolute bottom-20 right-1/3 w-[420px] h-[420px] bg-cyan-400/20 blur-[140px]" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-14">
          <img
            src="https://i.pravatar.cc/200"
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
          />

          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-semibold flex items-center gap-2">
              <User size={22} />
              {user?.name}
            </h1>
            <p
              className={`mt-1 flex items-center gap-2 ${isLight ? "text-gray-600" : "text-zinc-400"
                }`}
            >
              <Mail size={16} />
              {user?.email}
            </p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Card */}
          <div
            className={`
              rounded-2xl p-6
              ${isLight
                ? "bg-white shadow-sm"
                : "bg-white/5 backdrop-blur border border-white/10"
              }
            `}
          >
            <h2 className="text-lg font-semibold mb-4">Preferences</h2>

            {/* Theme */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Palette size={18} />
                <span>Theme</span>
              </div>

              <button
                onClick={() => dispatch(switchTheme())}
                className={`
                  px-4 py-2 rounded-xl font-medium transition
                  ${isLight
                    ? "bg-black text-white hover:bg-zinc-800"
                    : "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-[0_0_25px_rgba(99,102,241,0.45)]"
                  }
                `}
              >
                Switch to {isLight ? "Dark" : "Light"}
              </button>
            </div>

            {/* API Key */}
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Key size={18} />
                  <span>API Key</span>
                </div>

                <button
                  onClick={() => setShowKey(!showKey)}
                  className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10"
                >
                  {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Existing Key (read-only display) */}
              {user?.geminiApiKey && (
                <div
                  className={`
        mb-3 px-4 py-2.5 rounded-lg text-sm font-mono break-all
        ${isLight
                      ? "bg-gray-100 text-gray-800"
                      : "bg-black/40 text-zinc-200 border border-white/10"
                    }
      `}
                >
                  {showKey
                    ? user.geminiApiKey
                    : "•".repeat(Math.min(user.geminiApiKey.length, 24))}
                </div>
              )}

              {/* Input for add / update */}
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={
                  user?.geminiApiKey ? "Update API key" : "Add your API key"
                }
                className={`
      w-full px-4 py-2.5 rounded-lg border mb-3
      focus:outline-none
      ${isLight
                    ? "border-gray-300 bg-white"
                    : "border-white/10 bg-black/30 text-white"
                  }
    `}
              />

              {/* Save button */}
              <button
                onClick={() => dispatch(updateApiKey({ apiKey }))}
                className={`
      w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium transition
      ${isLight
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gradient-to-r from-emerald-500 to-teal-400 text-black shadow-[0_0_25px_rgba(52,211,153,0.45)]"
                  }
    `}
                disabled={!apiKey}
              >
                <Save size={18} />
                {user?.geminiApiKey ? "Update API Key" : "Save API Key"}
              </button>
            </div>

          </div>

          {/* Right Stats */}
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
                  rounded-2xl p-6
                  ${isLight
                    ? "bg-white shadow-sm"
                    : "bg-white/5 backdrop-blur border border-white/10"
                  }
                `}
              >
                <p className="text-sm opacity-70">{item.label}</p>
                <p className="mt-2 text-xl font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
