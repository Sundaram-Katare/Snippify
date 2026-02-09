import { motion } from "framer-motion";
import { Delete, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSnippet, getSnippets, deleteSnippet } from "../features/snippets/snippetSlice.js";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import { Link } from "react-router-dom";

import "prismjs/themes/prism-tomorrow.css";

import "prismjs/components/prism-clike";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";

import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import { getProfile } from "../features/auth/authSlice.js";


const TAG_COLORS = [
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
    "bg-yellow-100 text-yellow-700",
    "bg-red-100 text-red-700",
];

const getRandomTagColor = () =>
    TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)];

export default function Snippets() {
    const [openAddSnippetModal, setOpenAddSnippetModal] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        language: "javascript",
        code: "",
    });

    const dispatch = useDispatch();
    const { snippets, user, loading, error } = useSelector((state) => state.snippet);
    const { user: authUser } = useSelector((state) => state.auth);
    const token = localStorage.getItem("token");

    useEffect(() => {
        dispatch(getSnippets({ token }));
    }, [dispatch, token]);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createSnippet({ formData, token }));
        setOpenAddSnippetModal(false);
        setFormData({
            title: "",
            description: "",
            language: "javascript",
            code: "",
        });
    };

    console.log(authUser);
    const isLight = authUser?.theme === "light";

    return (
  <div
    className={`p-8 relative min-h-screen ${
      isLight
        ? "bg-[#ffffff] text-gray-900"
        : "bg-[#000000] text-zinc-100"
    }`}
  >
    {/* Header */}
    <div className="space-y-4 max-w-5xl">
      <h1
        className={`text-4xl font-bold tracking-tight ${
          isLight ? "text-gray-900" : "text-zinc-100"
        }`}
      >
        My Snippets
      </h1>

      <p className={isLight ? "text-gray-500 text-sm" : "text-zinc-400 text-sm"}>
        Store, search, and manage your reusable code snippets.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        {/* <input
          type="text"
          placeholder="Search snippets..."
          className={`flex-1 px-4 py-3 rounded-lg border transition
            focus:outline-none focus:ring-2
            ${
              isLight
                ? "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                : "bg-zinc-900 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:ring-indigo-500 focus:border-indigo-500"
            }
          `}
        /> */}

        <button
          onClick={() => setOpenAddSnippetModal(true)}
          className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold transition shadow-sm
            ${
              isLight
                ? "bg-[#562F00] hover:bg-[#6b3a00] text-white"
                : "bg-indigo-600 hover:bg-indigo-500 text-white"
            }
          `}
        >
          <Plus size={18} />
          New Snippet
        </button>
      </div>

      {/* Snippets */}
      <div className="mt-8">
        {loading && (
          <p className={isLight ? "text-gray-500" : "text-zinc-400"}>
            Loading snippets...
          </p>
        )}
        {error && <p className="text-red-500">{error}</p>}

        {snippets.length === 0 && !loading ? (
          <p className={isLight ? "text-gray-400" : "text-zinc-500"}>
            No snippets yet. Add one!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {snippets.map((snippet) => (
              <SnippetCard key={snippet._id} snippet={snippet} />
            ))}
          </div>
        )}
      </div>
    </div>

    {/* Modal */}
    {openAddSnippetModal && (
  <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-y-auto px-4 py-6 flex items-start sm:items-center justify-center">
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`w-full max-w-3xl rounded-3xl flex flex-col max-h-[90vh]
        ${
          isLight
            ? "bg-[#FFFDF1] text-[#3b2a1a]"
            : "bg-[#121826] text-zinc-100 border border-white/10"
        }
      `}
    >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-black/10">
            <h2 className="text-2xl font-semibold">Add New Snippet</h2>
            <button
              onClick={() => setOpenAddSnippetModal(false)}
              className="text-xl opacity-70 hover:opacity-100"
            >
              ✕
            </button>
          </div>

          {/* Modal Body */}
          <form onSubmit={onSubmit} className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block mb-2 font-medium">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none
                    ${
                      isLight
                        ? "bg-white border-[#e6d8c3]"
                        : "bg-black/30 border-white/10"
                    }
                  `}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 font-medium">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-3 rounded-xl border resize-none focus:outline-none
                    ${
                      isLight
                        ? "bg-white border-[#e6d8c3]"
                        : "bg-black/30 border-white/10"
                    }
                  `}
                  required
                />
              </div>

              {/* Language */}
              <div>
                <label className="block mb-2 font-medium">Language</label>
                <select
                  value={formData.language}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      language: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none
                    ${
                      isLight
                        ? "bg-white border-[#e6d8c3]"
                        : "bg-black/30 border-white/10"
                    }
                  `}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
              </div>

              {/* Code */}
              <div>
                <label className="block mb-2 font-medium">Code</label>
                <textarea
                  rows={5}
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  placeholder="Paste or write your code here..."
                  className={`w-full px-4 py-4 rounded-xl border font-mono text-sm resize-y focus:outline-none
                    ${
                      isLight
                        ? "bg-white border-[#e6d8c3]"
                        : "bg-black/40 border-white/10 text-zinc-100"
                    }
                  `}
                  required
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-4 px-8 py-6 border-t border-black/10">
              <button
                type="button"
                onClick={() => setOpenAddSnippetModal(false)}
                className={`px-6 py-3 rounded-xl ${
                  isLight ? "bg-[#e6d8c3]" : "bg-white/10"
                }`}
              >
                Cancel
              </button>

              <button
                type="submit"
                className={`px-6 py-3 rounded-xl font-semibold ${
                  isLight
                    ? "bg-[#5C3600] text-[#FFFDF1]"
                    : "bg-white text-black"
                }`}
              >
                Save Snippet
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    )}
  </div>
);
}


function SnippetCard({ snippet }) {
    const [tags, setTags] = useState(snippet.tags || []);
    const [addingTag, setAddingTag] = useState(false);
    const [tagInput, setTagInput] = useState("");

    const dispatch = useDispatch();

    const addTag = () => {
        if (!tagInput.trim()) return;

        setTags([
            ...tags,
            { name: tagInput, color: getRandomTagColor() },
        ]);
        setTagInput("");
        setAddingTag(false);
    };

    const deleteSnippetHandler = () => {
      dispatch(deleteSnippet({ id: snippet._id, token: localStorage.getItem("token") }));
    };

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="rounded-xl p-4 shadow-md bg-[#FFFDF1] text-black relative"
        >
            {/* Title */}
            <h3 className="font-semibold text-lg truncate">
                {snippet.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-900 mt-1 line-clamp-2">
                {snippet.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, idx) => (
                    <span
                        key={idx}
                        className={`px-2 py-1 text-xs rounded-full ${tag.color}`}
                    >
                        #{tag.name}
                    </span>
                ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-4">
                {/* View */}
                <Link
                    to={`/snippets/${snippet._id}`}
                    target="_blank"
                    className="text-sm font-semibold px-3 py-1.5 
            rounded-md bg-[#562F00] hover:bg-[#562F00] text-white transition"
                >
                    View
                </Link>

                {/* Add tag */}
                {!addingTag ? (
                    <button
                        onClick={deleteSnippetHandler}
                        className="text-xs text-gray-900 hover:text-black"
                    >
                        <Delete size={16} />
                    </button>
                ) : (
                    <div className="flex items-center gap-1">
                        <input
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            className="w-20 px-2 py-1 text-xs rounded bg-gray-700 
                text-white outline-none"
                            placeholder="tag"
                            autoFocus
                        />
                        <button
                            onClick={addTag}
                            className="text-xs px-2 py-1 rounded bg-green-600"
                        >
                            Add
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
