// components/SnippetEditor.jsx
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

export default function SnippetEditor({ snippet, onSave }) {
  const [title, setTitle] = useState(snippet?.title || "");
  const [description, setDescription] = useState(snippet?.description || "");
  const [language, setLanguage] = useState(snippet?.language || "javascript");
  const [code, setCode] = useState(snippet?.code || "");

  const handleSave = async () => {
    if (snippet?._id) {
      const { data } = await axios.put(`/api/snippets/${snippet._id}`, {
        title, description, language, code
      });
      onSave(data);
    } else {
      const { data } = await axios.post(`/api/snippets`, {
        title, description, language, code
      });
      onSave(data);
    }
  };

  return (
    <div className="p-4">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 w-full mb-2"
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        className="border p-2 w-full mb-2"
      />
      <select
        value={language}
        onChange={e => setLanguage(e.target.value)}
        className="border p-2 w-full mb-2"
      >
        <option value="javascript">JavaScript</option>
        <option value="java">Java</option>
        <option value="python">Python</option>
        <option value="cpp">C++</option>
      </select>

      <Editor
        height="300px"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={setCode}
      />

      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 mt-3 rounded"
      >
        Save
      </button>
    </div>
  );
}
