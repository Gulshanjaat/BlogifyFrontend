import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import { Loader2, Calendar, Tag, BookOpen } from "lucide-react";

function SingleBlog() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBlogData = async () => {
    try {
      setLoading(true);
      const [blogRes, relatedRes] = await Promise.all([
        api.get(`/blog/${id}`),
        api.get(`/relblog/${id}`)
      ]);
      
      setBlog(blogRes.data.data);
      setRelatedBlogs(relatedRes.data.relatedBlogs || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getBlogData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex flex-col justify-between">
        <Navbar />
        <div className="flex-grow flex justify-center items-center py-20 bg-transparent">
          <div className="text-center flex flex-col items-center gap-3">
            <Loader2 size={40} className="animate-spin text-blue-500" />
            <p className="text-sm font-semibold text-zinc-500 tracking-wide">
              Loading article content...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#09090B] flex flex-col justify-between text-white">
        <Navbar />
        <div className="flex-grow flex justify-center items-center py-20">
          <p className="text-zinc-500 text-lg font-medium">Blog post not found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col justify-between selection:bg-blue-500/30 selection:text-blue-200">
      <Navbar />

      <main className="flex-grow pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          
          <div className="w-full h-[240px] sm:h-[400px] lg:h-[480px] overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-800/60 shadow-2xl relative">
            <img
              src={blog.profile}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full font-semibold tracking-wide">
                <Tag size={12} />
                {blog.cat_id?.cat_name || "Uncategorized"}
              </span>
              <span className="text-zinc-500 flex items-center gap-1.5 font-medium">
                <Calendar size={14} />
                Updated Just Now
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-100 leading-tight">
              {blog.title}
            </h1>

            <div className="border-t border-zinc-900 pt-6 sm:pt-8">
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed sm:leading-loose text-zinc-300 font-normal whitespace-pre-line tracking-wide">
                {blog.discription}
              </p>
            </div>
          </div>

          <div className="mt-20 sm:mt-28 border-t border-zinc-900 pt-12 sm:pt-16">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6 sm:mb-8 text-zinc-200 flex items-center gap-2">
              <BookOpen size={20} className="text-zinc-500" />
              <span>Related Blogs</span>
            </h2>

            {relatedBlogs.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {relatedBlogs.map((item) => (
                  <BlogCard key={item._id} blog={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-zinc-900/20 border border-zinc-800/50 rounded-2xl">
                <p className="text-zinc-500 text-sm sm:text-base font-medium">
                  No related articles found under this category.
                </p>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SingleBlog;