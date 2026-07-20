import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function BlogCard({ blog }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl hover:border-blue-500/40 hover:bg-zinc-900/80 transition-all duration-300 flex flex-col h-full group">
      
      <div className="relative overflow-hidden aspect-video w-full max-h-52">
        <img
          src={blog.profile}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-100 line-clamp-2 group-hover:text-blue-400 transition-colors duration-200">
            {blog.title}
          </h2>

          <p className="mt-2.5 text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
            {blog.description || blog.discription}
          </p>
        </div>

        <div className="mt-5">
          <Link
            to={`/blog/${blog._id}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-500 hover:text-blue-400 transition-colors group/link"
          >
            <span>Read More</span>
            <ArrowRight size={15} className="transform group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

    </div>
  );
}

export default BlogCard;