import { useState } from "react";
import api from "../services/api";

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

  return (

    <div className="flex justify-center gap-3">

      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Blogs..."
        className="border rounded-lg p-3 w-80"
      />

      <button
        onClick={searchBlog}
        className="bg-purple-600 text-white px-6 rounded-lg"
      >
        Search
      </button>

    </div>

  );
}

export default SearchBar;