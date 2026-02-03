import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProfile } from "../features/auth/authSlice";

const taglines = [
  "What's for today",
  "Get AI Insights from your code",
  "Visit recently added snippets",
];

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const [index, setIndex] = useState(0);

  // fetch profile
  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    }
  }, [dispatch, user]);

  // tagline animation logic
  useEffect(() => {
    if (index >= taglines.length - 1) {
      const timeout = setTimeout(() => setIndex(0), 3000);
      return () => clearTimeout(timeout);
    }

    const interval = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 3000);

    return () => clearTimeout(interval);
  }, [index]);

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="flex flex-col gap-4 min-h-screen bg-[#ffffff] items-center p-16">
      {/* Greeting */}
      <h1 className="text-6xl font-pacifico font-semibold text-black text-center">
        Hello {user?.name}
      </h1>

      {/* Taglines */}
      <div className="h-10 mt-4">
        <AnimatePresence mode="wait">
          <motion.h2
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-xl font-medium text-gray-700 text-center"
          >
            {taglines[index]}
          </motion.h2>
        </AnimatePresence>
      </div>
    </div>
  );
}
