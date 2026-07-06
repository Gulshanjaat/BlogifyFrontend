import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">

      <img
        src={`https://blogify-0rc8.onrender.com/uploads/${blog.profile}`}
        alt={blog.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl font-bold line-clamp-2">
          {blog.title}
        </h2>

        <p className="mt-3 text-gray-600 dark:text-gray-400 line-clamp-3">
          {blog.discription}
        </p>

        <Link
          to={`/blog/${blog._id}`}
          className="inline-block mt-5 text-purple-600 font-semibold"
        >
          Read More →
        </Link>

      </div>
    </div>
  );
}

export default BlogCard;