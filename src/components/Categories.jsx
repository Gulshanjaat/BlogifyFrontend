import { useEffect, useState } from "react";
import api from "../services/api";

function Categories({
  selectedCategory,
  setSelectedCategory,
  selectedCategoryName,
  setSelectedCategoryName,
  getBlogs,
}) {
  const [categories, setCategories] = useState([]);

  const getCategory = async () => {
    try {
      const res = await api.get("/category");
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const selectCategory = (id, name) => {
    setSelectedCategory(id);
    setSelectedCategoryName(name);
    getBlogs(id);
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start items-center w-full">
      <button
        onClick={() => {
          setSelectedCategory("");
          setSelectedCategoryName("All");
          getBlogs();
        }}
        className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer border ${
          selectedCategory === ""
            ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/10"
            : "bg-zinc-900/50 border-zinc-800/80 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 hover:border-zinc-700"
        }`}
      >
        All
      </button>

      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => selectCategory(item._id, item.cat_name)}
          className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer border ${
            selectedCategory === item._id
              ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/10"
              : "bg-zinc-900/50 border-zinc-800/80 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 hover:border-zinc-700"
          }`}
        >
          {item.cat_name}
        </button>
      ))}
    </div>
  );
}

export default Categories;