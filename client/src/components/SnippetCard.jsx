import { CiHeart, CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function SnippetCard({ snippet, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [view, setView] = useState(true);

  // Editable fields
  const [title, setTitle] = useState(snippet.title);
  const [description, setDescription] = useState(snippet.description);
  const [language, setLanguage] = useState(snippet.language);
  const [code, setCode] = useState(snippet.code);

  // Save edited snippet
  const handleSave = async () => {
    try {
      const { data } = await axios.put(`/api/snippets/${snippet._id}`, {
        title,
        description,
        language,
        code,
      });
      onUpdate(data); // parent state update
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* View Mode */}
      {view && !isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 relative"
          >
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h1 className="font-inter font-bold text-gray-900 text-2xl">
                  {snippet.title}
                </h1>

                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                  onClick={() => setView(false)}
                >
                  Close
                </button>
              </div>

              <div className="flex flex-col mb-4">
                <h2 className="font-inter font-semibold bg-green-100 text-green-800 rounded-md px-3 py-1 max-w-fit mb-2">
                  NOTE:-
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {snippet.description}
                </p>
              </div>

              <div className="overflow-y-auto h-[200px] mt-2 rounded-lg border border-gray-200 bg-gray-50">
                <Editor
                  height="400px"
                  language={snippet.language}
                  value={snippet.code}
                  theme="vs-dark"
                  options={{ readOnly: true }}
                />
              </div>

              <div className="flex justify-between mt-4 ">
                <h2 className="bg-green-100 text-green-800 rounded-md px-3 py-1 max-w-fit ">
                  {snippet.language}
                </h2>
                <CiEdit
                  size={24}
                  className="cursor-pointer hover:text-blue-500"
                  onClick={() => setIsEditing(true)}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit Mode */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 relative"
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setIsEditing(false)}
            >
              Close
            </button>

            <h2 className="font-bold text-xl mb-4">Edit Snippet</h2>

            <input
              className="border border-gray-300 rounded-md p-2 w-full mb-3"
              placeholder="Edit Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="border border-gray-300 rounded-md p-2 w-full mb-3"
              placeholder="Edit Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <select
              className="border border-gray-300 rounded-md p-2 w-full mb-3"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="javascript">JavaScript</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
            </select>

            <Editor
              height="300px"
              language={language}
              value={code}
              theme="vs-dark"
              onChange={(value) => setCode(value)}
            />

            <div className="flex justify-end mt-4 gap-3">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
