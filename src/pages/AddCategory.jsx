import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { Folders, Loader2 } from "lucide-react";

function AddCategory() {
  const [catName, setCatName] = useState("");
  const [loading, setLoading] = useState(false);

  const submitCategory = async (e) => {
    e.preventDefault();
    if (!catName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/cat", {
        cat_name: catName,
      });

      toast.success(res.data.message || "Category added successfully");
      setCatName("");
    } catch (error) {
      toast.error("Something Went Wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 sm:py-8">
      <div className="bg-zinc-900/50 border border-zinc-800/80 shadow-2xl rounded-2xl p-5 sm:p-8 text-white">
        
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center justify-center sm:justify-start gap-2.5">
            <Folders className="text-blue-500" size={24} />
            <span>Add Category</span>
          </h1>
          <p className="text-zinc-400 mt-1.5 text-xs sm:text-sm">
            Create a new category to organize your platform's blogs.
          </p>
        </div>

        <form onSubmit={submitCategory} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-zinc-300">
              Category Name
            </label>
            <input
              type="text"
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
              placeholder="e.g. Technology, Lifestyle, Finance"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 outline-none focus:border-zinc-700 text-sm sm:text-base transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/10 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Adding...
              </>
            ) : (
              "Add Category"
            )}
          </button>
        </form>

      </div>
    </div>
  );
}

export default AddCategory;