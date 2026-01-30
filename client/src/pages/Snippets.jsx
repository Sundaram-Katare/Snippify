import { motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSnippet, getSnippets } from "../features/snippets/snippetSlice.js";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import { Link } from "react-router-dom";

// theme
import "prismjs/themes/prism-tomorrow.css";

// REQUIRED DEPENDENCIES (VERY IMPORTANT)
import "prismjs/components/prism-clike";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";

// other languages
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";


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
    const { snippets, loading, error } = useSelector((state) => state.snippet);
    const token = localStorage.getItem("token");

    // fetch snippets once on mount
    useEffect(() => {
        dispatch(getSnippets({ token }));
    }, [dispatch, token]);

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

    return (
        <div className="p-8 relative min-h-screen bg-gray-50">
            {/* Header */}
            <div className="space-y-4 max-w-5xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                    My Snippets
                </h1>
                <p className="text-gray-500 text-sm">
                    Store, search, and manage your reusable code snippets.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="Search snippets..."
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-blue-500 transition"
                    />

                    <button
                        onClick={() => setOpenAddSnippetModal(true)}
                        className="flex items-center justify-center gap-2 
              bg-blue-600 hover:bg-blue-700 
              text-white px-5 py-3 rounded-lg 
              font-semibold transition shadow-sm"
                    >
                        <Plus size={18} />
                        New Snippet
                    </button>
                </div>

                {/* Show snippets of this user */}
                <div className="mt-8">
                    {loading && <p className="text-gray-500">Loading snippets...</p>}
                    {error && <p className="text-red-500">{error}</p>}

                    {snippets.length === 0 && !loading ? (
                        <p className="text-gray-400">No snippets yet. Add one!</p>
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
                <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl"
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <h2 className="text-xl font-bold text-gray-900">Add New Snippet</h2>
                            <button
                                onClick={() => setOpenAddSnippetModal(false)}
                                className="p-2 rounded-full hover:bg-gray-100 transition"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={onSubmit} className="p-6 space-y-5">
                            {/* Title */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    placeholder="e.g. Debounce Function"
                                    className="w-full px-4 py-2.5 rounded-lg border 
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    placeholder="What does this snippet do?"
                                    rows={3}
                                    className="w-full px-4 py-2.5 rounded-lg border 
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Language */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">
                                    Language
                                </label>
                                <select
                                    value={formData.language}
                                    onChange={(e) =>
                                        setFormData({ ...formData, language: e.target.value })
                                    }
                                    className="w-full px-4 py-2.5 rounded-lg border 
                    bg-white focus:outline-none 
                    focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="javascript">JavaScript</option>
                                    <option value="python">Python</option>
                                    <option value="java">Java</option>
                                    <option value="cpp">C++</option>
                                </select>
                            </div>

                            {/* Code Editor */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700">
                                    Code
                                </label>
                                <div className="rounded-lg border overflow-hidden">
                                    <Editor
                                        value={formData.code}
                                        onValueChange={(code) =>
                                            setFormData({ ...formData, code })
                                        }
                                        highlight={(code) =>
                                            Prism.highlight(
                                                code,
                                                Prism.languages[formData.language] ||
                                                Prism.languages.javascript,
                                                formData.language
                                            )
                                        }
                                        padding={14}
                                        className="font-mono text-sm min-h-[180px] focus:outline-none"
                                        style={{
                                            backgroundColor: "#f8fafc",
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="pt-2 flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 
                    text-white px-6 py-2.5 rounded-lg 
                    font-semibold transition shadow-sm"
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

  const addTag = () => {
    if (!tagInput.trim()) return;

    setTags([
      ...tags,
      { name: tagInput, color: getRandomTagColor() },
    ]);
    setTagInput("");
    setAddingTag(false);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-xl p-4 shadow-md bg-gradient-to-br 
        from-gray-900 to-gray-800 text-white relative"
    >
      {/* Title */}
      <h3 className="font-semibold text-lg truncate">
        {snippet.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-300 mt-1 line-clamp-2">
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
            rounded-md bg-blue-600 hover:bg-blue-700 transition"
        >
          View
        </Link>

        {/* Add tag */}
        {!addingTag ? (
          <button
            onClick={() => setAddingTag(true)}
            className="text-xs text-gray-300 hover:text-white"
          >
            + Add tag
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
