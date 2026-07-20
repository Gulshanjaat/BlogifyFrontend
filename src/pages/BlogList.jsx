import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Loader2, Edit2, Trash2 } from "lucide-react";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const getBlogs = async (catId = "") => {
    try {
      setLoading(true);
      const url = catId ? `/blog?cat_id=${catId}` : "/blog";
      const res = await api.get(url);
      setBlogs(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/blog/${id}`);
      getBlogs();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center flex flex-col items-center gap-3">
          <Loader2 size={40} className="animate-spin text-blue-500" />
          <p className="text-base sm:text-lg font-semibold text-zinc-400">
            Loading Blogs...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden px-3 sm:px-6 py-4 sm:py-8 text-white">
      <div className="mb-6 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100">
          Blog Management
        </h1>
        <p className="text-zinc-400 mt-1 text-xs sm:text-sm">
          Manage, modify or delete your existing blog entries.
        </p>
      </div>

      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-zinc-950/80 border-b border-zinc-800 text-zinc-400 text-xs font-semibold uppercase">
                <th className="p-3.5 w-20">Image</th>
                <th className="p-3.5">Title</th>
                <th className="p-3.5 w-32">Category</th>
                <th className="p-3.5 w-28 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-xs sm:text-sm text-zinc-300">
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-zinc-500 font-medium">
                    No blogs found.
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-zinc-900/30">
                    <td className="p-3.5 align-middle">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-zinc-800 shrink-0">
                        <img
                          src={blog.profile}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    <td className="p-3.5 font-semibold text-zinc-100 align-middle">
                      <p className="line-clamp-2 leading-snug">{blog.title}</p>
                    </td>

                    <td className="p-3.5 align-middle">
                      <span className="inline-block px-2 py-1 rounded-md text-[11px] font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700/50">
                        {blog.category?.cat_name || "Uncategorized"}
                      </span>
                    </td>

                    <td className="p-3.5 align-middle">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => navigate(`/edit-blog/${blog._id}`)}
                          className="p-2 bg-blue-600/10 hover:bg-blue-600 border border-blue-500/20 text-blue-400 hover:text-white rounded-lg transition-all"
                          title="Edit Blog"
                        >
                          <Edit2 size={15} />
                        </button>

                        <button
                          onClick={() => deleteBlog(blog._id)}
                          className="p-2 bg-red-600/10 hover:bg-red-600 border border-red-500/20 text-red-400 hover:text-white rounded-lg transition-all"
                          title="Delete Blog"
                        >
                          <Trash2 size={15} />
                        </button>
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

export default BlogList;