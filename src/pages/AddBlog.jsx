import { useEffect, useState, useRef } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { ImagePlus, Loader2 } from "lucide-react";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [catId, setCatId] = useState("");
  const [photo, setPhoto] = useState(null);
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const getCategories = async () => {
    try {
      const res = await api.get("/category");
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const imageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const submitBlog = async (e) => {
    e.preventDefault();
    if (!title || !discription || !catId || !photo) {
      toast.error("Please fill all fields and select an image");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("discription", discription);
      formData.append("cat_id", catId);
      formData.append("photo", photo);

      const res = await api.post("/blog", formData);
      toast.success(res.data.message || "Blog added successfully");

      setTitle("");
      setDiscription("");
      setCatId("");
      setPhoto(null);
      setPreview("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error("Failed to add blog");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 sm:py-8">
      <div className="bg-zinc-900/50 border border-zinc-800/80 shadow-2xl rounded-2xl p-5 sm:p-8 lg:p-10 text-white">
        
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Add New Blog
          </h1>
          <p className="text-zinc-400 mt-1.5 text-xs sm:text-sm">
            Share your thoughts, stories, and ideas with the world.
          </p>
        </div>

        <form onSubmit={submitBlog} className="space-y-5sm:space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-zinc-300">Blog Title</label>
            <input
              type="text"
              placeholder="Enter a catchy title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 outline-none focus:border-zinc-700 text-sm sm:text-base transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-zinc-300">Description</label>
            <textarea
              rows="6"
              placeholder="Write your content here..."
              value={discription}
              onChange={(e) => setDiscription(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 outline-none focus:border-zinc-700 text-sm sm:text-base transition-colors resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-semibold text-zinc-300">Category</label>
            <select
              value={catId}
              onChange={(e) => setCatId(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 outline-none focus:border-zinc-700 text-sm sm:text-base transition-colors appearance-none cursor-pointer"
            >
              <option value="" className="text-zinc-600">Select Category</option>
              {categories.map((item) => (
                <option key={item._id} value={item._id} className="text-zinc-300 bg-zinc-950">
                  {item.cat_name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-semibold text-zinc-300">Cover Image</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={imageChange}
              accept="image/*"
              className="hidden"
              id="blog-image-upload"
            />
            
            <label
              htmlFor="blog-image-upload"
              className="flex flex-col items-center justify-center w-full min-h-[140px] sm:min-h-[160px] bg-zinc-950/40 border-2 border-dashed border-zinc-800 rounded-xl hover:border-zinc-700 hover:bg-zinc-950/80 transition-all duration-200 cursor-pointer p-4 text-center group"
            >
              {preview ? (
                <div className="relative w-full max-h-60 overflow-hidden rounded-lg flex justify-center items-center">
                  <img src={preview} alt="Preview" className="max-h-56 object-cover rounded-lg shadow-md" />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-zinc-200 transition-colors">
                    <ImagePlus size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs sm:text-sm font-medium text-zinc-300 group-hover:text-zinc-200">
                      Click to upload image
                    </p>
                    <p className="text-[10px] sm:text-xs text-zinc-500">
                      Supports JPG, PNG, WEBP (Max 5MB)
                    </p>
                  </div>
                </div>
              )}
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/10 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Publishing...
              </>
            ) : (
              "Publish Blog"
            )}
          </button>
        </form>

      </div>
    </div>
  );
}

export default AddBlog;