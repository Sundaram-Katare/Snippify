import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProfile } from "../features/auth/authSlice";
import { FileCode2, Sparkles, Clock, Sparkle, SparklesIcon, LibraryBig, Workflow } from "lucide-react";

const taglines = [
  "What would you like to work on today?",
  "Get AI insights from your code",
  "Pick up from your recent snippets",
];

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const isLight = user?.theme === "light";
  const [index, setIndex] = useState(0);

  // fetch profile
  useEffect(() => {
    if (!user) dispatch(getProfile());
  }, [dispatch, user]);

  // tagline animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);

    return () => clearTimeout(timer);
  }, [index]);

  if (loading) return <p className="p-8">Loading dashboard...</p>;

return (
  <div
    className={`
      min-h-screen transition-colors duration-300 font-inter
      ${
        isLight
          ? "bg-[#FFFDF1] text-[#3b2a1a]"
          : "bg-[#0b0f19] text-zinc-100"
      }
    `}
  >
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
      {/* Greeting */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold font-pacifico text-center mb-6">
        Hello {user?.name}
      </h1>

      {/* Tagline */}
      <div className="h-8 mb-14 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className={`text-lg text-center ${
              isLight ? "text-[#6b4a2f]" : "text-zinc-400"
            }`}
          >
            {taglines[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Big Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Card 1 */}
        <div
          className={`
            p-10 rounded-3xl flex flex-col items-center cursor-pointer transition
            ${
              isLight
                ? "bg-[#FFD7A8] text-[#3b2a1a]"
                : "bg-[#121826] border border-white/10"
            }
          `}
        >
          <h3 className="text-2xl font-semibold mb-4">
            Your Code Library
          </h3>

          <LibraryBig size={64} />
          <p
            className={`text-base leading-relaxed ${
              isLight ? "text-[#5a3c25]" : "text-zinc-400"
            }`}
          >
            All your snippets, structured and searchable.  
            No more digging through old projects or notes.
          </p>
        </div>

        {/* Card 2 */}
        <div
          className={`
            p-10 rounded-3xl flex flex-col items-center cursor-pointer transition
            ${
              isLight
                ? "bg-[#FFA552] text-[#3b2a1a]"
                : "bg-[#121826] border border-white/10"
            }
          `}
        >
          <h3 className="text-2xl font-semibold mb-4">
            AI Code Insights
          </h3>

          <SparklesIcon size={64} />
          <p
            className={`text-base leading-relaxed ${
              isLight ? "text-[#4a2f1a]" : "text-zinc-400"
            }`}
          >
            Understand what your code does, why it exists,  
            and how it can be improved — instantly.
          </p>
        </div>

        {/* Card 3 */}
        <div
          className={`
            p-10 rounded-3xl flex flex-col items-center cursor-pointer transition
            ${
              isLight
                ? "bg-[#5C3600] text-[#FFFDF1]"
                : "bg-[#121826] border border-white/10"
            }
          `}
        >
          <h3 className="text-2xl font-semibold mb-4">
            Pick Up Where You Left
          </h3>
          <Workflow size={64}/>
          <p
            className={`text-base leading-relaxed ${
              isLight ? "text-[#FFE8CC]" : "text-zinc-400"
            }`}
          >
            Jump straight back into your most recent snippets  
            and continue building without friction.
          </p>
        </div>
      </div>
    </div>
  </div>
);
}
