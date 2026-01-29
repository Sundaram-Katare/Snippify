import SnippetList from "./SnippetList";
import SnippetEditor from "./SnippetEditor";
import { useState } from "react";

export default function AddComponent() {
  const [open, settOpen] = useState(false);

  return (
    <>
      <div className="p-4 w-full">
        <div className="flex flex-row justify-between px-2">
          <h1 className="text-2xl font-bold font-inter">Dashboard</h1>
          <button className="flex flex-row items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                  onClick={() => settOpen(!open)}
          >
            + Add Component
          </button>
        </div>

        {open && <SnippetEditor />}
        <br />
        <SnippetList />
      </div>
    </>
  )
}