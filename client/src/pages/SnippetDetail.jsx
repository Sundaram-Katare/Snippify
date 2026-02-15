import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSnippetById, updateCode, explainCode } from "../features/snippets/snippetSlice.js";
import { motion, AnimatePresence } from "framer-motion";
import { getProfile } from "../features/auth/authSlice.js";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";

const SnippetDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { snippet, loading, error, explanation } = useSelector((state) => state.snippet);
  const { user } = useSelector((state) => state.auth);
  const [explainLoading, setExplainLoading] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getSnippetById({ id, token: localStorage.getItem("token") }));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const updateCodeHandler = (newCode) => {
    dispatch(updateCode({ id, code: newCode }));
    toast.success("Snippet updated successfully!");
  };

  const handleExplainCode = async () => {
    setShowExplain(true);
    setExplainLoading(true);

    try {
      const result = await dispatch(explainCode({
        id  // Send only the id, not code and language
      })).unwrap();

      setExplainLoading(false);
      toast.success("Code explained successfully! ✨");
    } catch (err) {
      setExplainLoading(false);

      if (err.code === "NO_API_KEY") {
        toast.error("Please Add Gemini API Key");
        setShowExplain(false);
      } else if (err.code === "EXPIRED_API_KEY") {
        toast.error("Gemini API key is expired, Please add another key");
        setShowExplain(false);
      } else {
        toast.error(err.error || "Failed to explain code");
        setShowExplain(false);
      }
    }
  };

  if (loading) return <p>Loading snippet...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!snippet) return <p>No snippet found</p>;

  const isLight = user?.theme === "light";

  return (
    <motion.div
      className={`min-h-screen font-inter px-4 sm:px-8 py-8 ${isLight ? "bg-white text-zinc-900" : "bg-zinc-950 text-zinc-100"
        }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h1
        className="text-3xl sm:text-4xl font-semibold mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {snippet.title}
      </motion.h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* LEFT PANEL */}
        <motion.div
          className={`
            rounded-2xl p-6 shadow-xl
            ${isLight
              ? "bg-[#FFFDF1] text-zinc-900"
              : "bg-zinc-900 text-zinc-100 border border-zinc-800"}
          `}
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold">
                Language:{" "}
                <span className="font-light">{snippet.language}</span>
              </p>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExplainCode}
                disabled={explainLoading}
                className={`px-4 py-2 rounded-xl transition font-medium ${explainLoading
                    ? "opacity-70 cursor-not-allowed"
                    : isLight
                      ? "bg-[#562F00] text-white hover:bg-[#6b3a00]"
                      : "bg-indigo-600 text-white hover:bg-indigo-500"
                  }`}
              >
                {explainLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader size={16} className="animate-spin" />
                    Explaining...
                  </span>
                ) : (
                  "Explain with AI"
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(true)}
                className={`px-4 py-2 rounded-xl transition ${isLight
                  ? "border border-zinc-300 hover:bg-zinc-200"
                  : "border border-zinc-700 hover:bg-zinc-800"
                  }`}
              >
                Update Snippet
              </motion.button>
            </div>
          </div>

          <pre
            className={`text-sm rounded-xl p-5 overflow-x-auto font-mono shadow-inner ${isLight
              ? "bg-white text-zinc-900"
              : "bg-[#0d1117] text-zinc-100"
              }`}
          >
            <code>{snippet.code}</code>
          </pre>

          <p
            className={`mt-4 text-sm leading-relaxed ${isLight ? "text-zinc-900" : "text-zinc-300"
              }`}
          >
            {snippet.description}
          </p>
        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div
          className={`rounded-2xl p-6 shadow-xl min-h-[300px] ${isLight ? "bg-zinc-100" : "bg-zinc-900"
            }`}
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <AnimatePresence>
            {!showExplain && (
              <motion.div
                className="h-full flex items-center justify-center text-center text-zinc-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Click{" "}
                <span className={`mx-1 ${isLight ? "text-[#562F00]" : "text-indigo-400"}`}>
                  Explain with AI
                </span>{" "}
                to see the explanation here
              </motion.div>
            )}

            {showExplain && explainLoading && (
              <motion.div
                className="h-full flex flex-col items-center justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className={`flex items-center gap-3 ${isLight ? "text-[#562F00]" : "text-indigo-400"}`}>
                  <Loader size={24} className="animate-spin" />
                  <span className="text-lg font-medium">Analyzing your code...</span>
                </div>
              </motion.div>
            )}

            {showExplain && !explainLoading && explanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <h3 className={`text-xl font-semibold ${isLight ? "text-zinc-900" : "text-zinc-100"}`}>
                  AI Explanation
                </h3>
                <ul className={`space-y-2 ${isLight ? "text-zinc-700" : "text-zinc-300"}`}>
                  {explanation.explanation && explanation.explanation.map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex gap-3 text-sm leading-relaxed p-2 rounded-lg ${isLight ? "bg-[#FFFDF1]" : "bg-zinc-800"
                        }`}
                    >
                      <span className={`flex-shrink-0 font-semibold ${isLight ? "text-[#562F00]" : "text-indigo-400"}`}>
                        {index + 1}.
                      </span>
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="mt-16">
         <h1 className="text-center text-black md:text-2xl"><strong>NOTE:</strong> The explanation will disappear when the page is refreshed.</h1>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`rounded-2xl p-6 w-full max-w-lg shadow-2xl ${isLight ? "bg-[#FFFDF1]" : "bg-zinc-900"}`}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
            >
              <h3 className={`text-xl font-semibold mb-4 ${isLight ? "text-zinc-900" : "text-zinc-100"}`}>
                Update Snippet
              </h3>

              <textarea
                defaultValue={snippet.code}
                className={`w-full h-40 rounded-xl p-4 font-mono text-sm resize-none ${isLight
                    ? "bg-white text-zinc-900 border border-zinc-300"
                    : "bg-[#0d1117] text-zinc-100 border border-zinc-700"
                  }`}
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className={`px-4 py-2 rounded-xl transition ${isLight
                      ? "border border-zinc-300 text-zinc-900 hover:bg-zinc-200"
                      : "border border-zinc-700 text-zinc-100 hover:bg-zinc-800"
                    }`}
                >
                  Cancel
                </button>
                <button
                  className={`px-4 py-2 rounded-xl transition font-medium ${isLight
                      ? "bg-[#562F00] text-white hover:bg-[#6b3a00]"
                      : "bg-indigo-600 text-white hover:bg-indigo-500"
                    }`}
                  onClick={() => {
                    const newCode = document.querySelector("textarea").value;
                    updateCodeHandler(newCode);
                    setShowModal(false);
                  }}
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SnippetDetail;