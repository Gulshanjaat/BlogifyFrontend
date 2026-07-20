import { useState } from "react";
import api from "../services/api";
import { Search } from "lucide-react";

function SearchBar({ setSearchBlogs, setIsSearching }) {
  const [keyword, setKeyword] = useState("");

  const searchBlog = async () => {
    if (keyword.trim() === "") {
      setSearchBlogs([]);
      setIsSearching(false);
      return;
    }

    try {
      const res = await api.get(`/search?keyword=${keyword}`);
      setSearchBlogs(res.data.data);
      setIsSearching(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchBlog();
    }
  };

  return (
    <div className="flex items-center justify-center gap-2.5 w-full max-w-md mx-auto px-2 sm:px-0">
      <div className="relative flex-1">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search blogs..."
          className="w-full bg-zinc-900/50 border border-zinc-800/80 rounded-xl pl-4 pr-10 py-3 text-zinc-100 placeholder-zinc-500 outline-none focus:border-zinc-700 text-sm sm:text-base transition-colors shadow-inner"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
          <Search size={18} />
        </div>
      </div>

      <button
        onClick={searchBlog}
        className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-sm sm:text-base px-5 sm:px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/10 cursor-pointer h-full whitespace-nowrap"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;