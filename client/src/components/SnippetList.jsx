import { useState } from "react";
import SnippetCard from "./SnippetCard";

const data = [
  { id: 1, title: "Merge Sort", description: "A sorting algorithm that divides the array into halves and merges them back together.", language: "Java" },
  { id: 2, title: "Quick Sort", description: "A sorting algorithm that uses a pivot to partition the array into subarrays and recursively sorts them.", language: "C++" },
  { id: 3, title: "Binary Search", description: "An efficient search algorithm that works on sorted arrays by repeatedly dividing the search interval in half.", language: "Python" },
  { id: 4, title: "Dijkstra's Algorithm", description: "A graph algorithm for finding the shortest paths from a source to all other vertices in a weighted graph.", language: "JavaScript" },
  { id: 5, title: "Depth First Search", description: "A graph traversal algorithm that explores as far as possible along each branch before backtracking.", language: "C" },
  { id: 6, title: "Breadth First Search", description: "A graph traversal algorithm that explores all neighbors at the present depth before moving to the next level.", language: "Go" }
];

const getLanguageColor = (language) => {
  switch (language) {
    case "Java": return "bg-blue-400/80";
    case "JavaScript": return "bg-yellow-400/80";
    case "Python": return "bg-orange-500/80";
    case "C++": return "bg-purple-500/80";
    case "C": return "bg-green-500/80";
    case "Go": return "bg-cyan-400/80";
    default: return "bg-pink-400";
  }
};

export default function SnippetList() {
  const [selectedSnippet, setSelectedSnippet] = useState(null);

  const closeModal = () => setSelectedSnippet(null);

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {data.map((snippet) => (
          <div key={snippet.id}
            className="flex flex-col justify-between bg-white shadow-2xl rounded-3xl p-8 min-h-[300px] max-w-xl w-full hover:shadow-blue-400 transition"
          >
            <div>
              <h2 className="font-inter font-bold text-2xl text-gray-800 mb-4">{snippet.title}</h2>
              <p className="text-gray-600 text-lg mb-5">{snippet.description}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className={`${getLanguageColor(snippet.language)} px-6 py-2 rounded-2xl text-lg font-semibold text-white`}>
                {snippet.language}
              </span>
              <button
                className="bg-black hover:bg-blue-700 text-white text-lg px-6 py-2 rounded-2xl transition duration-150"
                onClick={() => setSelectedSnippet(snippet)}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedSnippet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>
            <SnippetCard snippet={selectedSnippet} />
          </div>
        </div>
      )}
    </div>
  );
}