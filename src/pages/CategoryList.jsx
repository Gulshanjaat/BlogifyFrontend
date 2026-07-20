import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { Loader2, Edit2, Trash2, Check, X, Folders } from "lucide-react";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const getCategory = async () => {
    try {
      setLoading(true);
      const res = await api.get("/category");
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    const ok = window.confirm("Delete Category ?");
    if (!ok) return;

    try {
      await api.delete(`/category/${id}`);
      toast.success("Category Deleted");
      getCategory();
    } catch {
      toast.error("Delete Failed");
    }
  };

  const updateCategory = async () => {
    if (!editName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      setActionLoading(true);
      await api.put(`/category/${editId}`, {
        cat_name: editName,
      });
      toast.success("Updated");
      setEditId("");
      getCategory();
    } catch {
      toast.error("Error updating category");
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center flex flex-col items-center gap-3">
          <Loader2 size={40} className="animate-spin text-blue-500" />
          <p className="text-base sm:text-lg font-semibold text-zinc-400">
            Loading Categories...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto overflow-x-hidden px-3 sm:px-6 py-4 sm:py-8 text-white">
      <div className="mb-6 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100 flex items-center justify-center sm:justify-start gap-2.5">
          <Folders className="text-blue-500 shrink-0" size={26} />
          <span>Category Management</span>
        </h1>
        <p className="text-zinc-400 mt-1 text-xs sm:text-sm">
          Review, edit, or delete categories registered on your database.
        </p>
      </div>

      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[350px]">
            <thead>
              <tr className="bg-zinc-950/80 border-b border-zinc-800 text-zinc-400 text-xs font-semibold uppercase">
                <th className="p-3.5">Category Name</th>
                <th className="p-3.5 w-28 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-xs sm:text-sm text-zinc-300">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="2" className="p-8 text-center text-zinc-500 font-medium">
                    No categories found.
                  </td>
                </tr>
              ) : (
                categories.map((item) => (
                  <tr key={item._id} className="hover:bg-zinc-900/30">
                    <td className="p-3.5 font-medium text-zinc-100 align-middle">
                      {editId === item._id ? (
                        <input
                          type="text"
                          value={editName}
                          disabled={actionLoading}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-zinc-100 outline-none focus:border-zinc-700 text-xs sm:text-sm"
                        />
                      ) : (
                        item.cat_name
                      )}
                    </td>

                    <td className="p-3.5 align-middle">
                      <div className="flex items-center justify-center gap-1.5">
                        {editId === item._id ? (
                          <>
                            <button
                              onClick={updateCategory}
                              disabled={actionLoading}
                              className="p-1.5 bg-green-600/10 hover:bg-green-600 border border-green-500/20 text-green-400 hover:text-white rounded-lg transition-all"
                              title="Save"
                            >
                              {actionLoading ? (
                                <Loader2 size={15} className="animate-spin" />
                              ) : (
                                <Check size={15} />
                              )}
                            </button>

                            <button
                              onClick={() => setEditId("")}
                              disabled={actionLoading}
                              className="p-1.5 bg-zinc-800/60 hover:bg-zinc-700 border border-zinc-700/50 text-zinc-400 hover:text-zinc-200 rounded-lg transition-all"
                              title="Cancel"
                            >
                              <X size={15} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setEditId(item._id);
                                setEditName(item.cat_name);
                              }}
                              className="p-2 bg-blue-600/10 hover:bg-blue-600 border border-blue-500/20 text-blue-400 hover:text-white rounded-lg transition-all"
                              title="Edit"
                            >
                              <Edit2 size={15} />
                            </button>

                            <button
                              onClick={() => deleteCategory(item._id)}
                              className="p-2 bg-red-600/10 hover:bg-red-600 border border-red-500/20 text-red-400 hover:text-white rounded-lg transition-all"
                              title="Delete"
                            >
                              <Trash2 size={15} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CategoryList;