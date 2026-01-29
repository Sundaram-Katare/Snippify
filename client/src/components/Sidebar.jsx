export default function Sidebar() {
  return (
    <div className="bg-gradient-to-br from-gray-300 to-gray-400 text-black flex flex-col gap-12 p-12 h-800 w-[340px] rounded-3xl shadow-2xl">
      <div className="flex flex-col items-center gap-5">
        <h1 className="bg-blue-500 px-5 py-3 rounded-2xl text-white text-2xl font-bold shadow-sm">
          Snippify
        </h1>
      </div>
      <div>
        <h2 className="bg-gray-800 px-4 py-2 text-white rounded-xl font-inter mb-8 text-xl font-semibold shadow">
          Quick Links
        </h2>
        <ul className="list-none space-y-8 font-inter text-lg">
          <li>
            <button className="w-full bg-blue-100 text-blue-700 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition font-semibold shadow">
              All Snippets
            </button>
          </li>
          <li>
            <button className="w-full bg-blue-100 text-blue-700 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition font-semibold shadow">
              Favourites
            </button>
          </li>
          <li>
            <button className="w-full bg-blue-100 text-blue-700 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition font-semibold shadow">
              Trash
            </button>
          </li>
          <li>
            <button className="w-full bg-blue-100 text-blue-700 py-3 rounded-xl hover:bg-red-600 hover:text-white transition font-semibold shadow">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
