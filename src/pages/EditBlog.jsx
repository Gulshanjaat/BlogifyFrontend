import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import { Loader2, ArrowLeft, Save, Heading, AlignLeft } from "lucide-react";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const getBlog = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/blog/${id}`);
      setTitle(res.data.data.title);
      setDiscription(res.data.data.discription);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load blog data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  const updateBlog = async (e) => {
    e.preventDefault();
    if (!title.trim() || !discription.trim()) {
      toast.error("Fields cannot be empty");
      return;
    }

    try {
      setActionLoading(true);
      await api.put(`/blog/${id}`, {
        title,
        discription,
      });
      toast.success("Blog Updated Successfully");
      navigate("/blogs");
    } catch (error) {
      toast.error("Update Failed");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] bg-transparent">
        <div className="text-center flex flex-col items-center gap-3">
          <Loader2 size={40} className="animate-spin text-blue-500" />
          <p className="text-lg font-semibold text-zinc-400">
            Fetching Blog Content...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 sm:py-8 text-white">
      <button
        onClick={() => navigate("/blogs")}
        className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors mb-6 text-sm font-medium cursor-pointer group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        <span>Back to Blogs</span>
      </button>

      <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100">
            Edit Blog Post
          </h1>
          <p className="text-zinc-400 mt-1.5 text-xs sm:text-sm">
            Modify the title and description below to update your published content.
          </p>
        </div>

        <form onSubmit={updateBlog} className="space-y-5 sm:space-y-6">
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-400 flex items-center gap-2">
              <Heading size={16} className="text-zinc-500" />
              <span>Blog Title</span>
            </label>
            <input
              type="text"
              value={title}
              disabled={actionLoading}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 outline-none focus:border-zinc-700 sm:text-sm transition-colors disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-400 flex items-center gap-2">
              <AlignLeft size={16} className="text-zinc-500" />
              <span>Description Content</span>
            </label>
            <textarea
              rows="8"
              value={discription}
              disabled={actionLoading}
              onChange={(e) => setDiscription(e.target.value)}
              placeholder="Write your story here..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 outline-none focus:border-zinc-700 sm:text-sm transition-colors resize-y min-h-[150px] disabled:opacity-50 leading-relaxed"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
            <button
              type="button"
              disabled={actionLoading}
              onClick={() => navigate("/blogs")}
              className="px-5 py-3 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 text-zinc-300 hover:text-zinc-100 rounded-xl transition-all font-semibold text-sm cursor-pointer text-center disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {actionLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Update Blog</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBlog;