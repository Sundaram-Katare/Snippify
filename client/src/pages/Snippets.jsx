import { motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSnippet } from "../features/snippets/snippetSlice.js";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";

// theme
import "prismjs/themes/prism-tomorrow.css";

// REQUIRED DEPENDENCIES (VERY IMPORTANT)
import "prismjs/components/prism-clike";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";

// other languages
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";

export default function Snippets() {
  const [openAddSnippetModal, setOpenAddSnippetModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    language: "javascript",
    code: "",
  });

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

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
              <h2 className="text-xl font-bold text-gray-900">
                Add New Snippet
              </h2>
              <button
                onClick={() => setOpenAddSnippetModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="p-6 space-y-5">
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

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="What does this snippet do?"
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border 
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

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
                        Prism.languages[formData.language] || Prism.languages.javascript,
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
