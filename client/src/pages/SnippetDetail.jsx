import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSnippetById } from "../features/snippets/snippetSlice.js";
import { motion, AnimatePresence } from "framer-motion";
import { getProfile } from "../features/auth/authSlice.js";

const SnippetDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { snippet, loading, error } = useSelector((state) => state.snippet);
  const { user } = useSelector((state) => state.auth);

  const [showExplain, setShowExplain] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getSnippetById({ id, token: localStorage.getItem("token") }));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  if (loading) return <p>Loading snippet...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!snippet) return <p>No snippet found</p>;

  const isLight = user?.theme === "light";

  return (
    <motion.div
      className={`min-h-screen font-inter px-4 sm:px-8 py-8 ${
        isLight ? "bg-white text-zinc-900" : "bg-zinc-950 text-zinc-100"
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
                onClick={() => setShowExplain(true)}
                className={`px-4 py-2 rounded-xl transition font-medium ${
                  isLight
                    ? "bg-[#562F00] text-white"
                    : "bg-indigo-600 text-white hover:bg-indigo-500"
                }`}
              >
                Explain with AI
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(true)}
                className={`px-4 py-2 rounded-xl transition ${
                  isLight
                    ? "border border-zinc-300 hover:bg-zinc-200"
                    : "border border-zinc-700 hover:bg-zinc-800"
                }`}
              >
                Update Snippet
              </motion.button>
            </div>
          </div>

          <pre
            className={`text-sm rounded-xl p-5 overflow-x-auto font-mono shadow-inner ${
              isLight
                ? "bg-white text-zinc-900"
                : "bg-[#0d1117] text-zinc-100"
            }`}
          >
            <code>{snippet.code}</code>
          </pre>

          <p
            className={`mt-4 text-sm leading-relaxed ${
              isLight ? "text-zinc-900" : "text-zinc-300"
            }`}
          >
            {snippet.description}
          </p>
        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div
          className={`rounded-2xl p-6 shadow-xl min-h-[300px] ${
            isLight ? "bg-zinc-100" : "bg-zinc-900"
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
                <span className="mx-1 text-indigo-400">
                  Explain with AI
                </span>{" "}
                to see the explanation here
              </motion.div>
            )}

            {showExplain && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <h3 className="text-xl font-semibold">AI Explanation</h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  AI-generated explanation will appear here.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
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
              className="bg-zinc-900 rounded-2xl p-6 w-full max-w-lg shadow-2xl"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
            >
              <h3 className="text-xl font-semibold mb-4">
                Update Snippet
              </h3>

              <textarea
                defaultValue={snippet.code}
                className="w-full h-40 bg-[#0d1117] text-zinc-100 rounded-xl p-4 font-mono text-sm resize-none"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-white border border-zinc-100 hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500">
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
