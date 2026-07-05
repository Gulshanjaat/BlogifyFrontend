import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";

function SingleBlog() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const getBlog = async () => {
    try {
      const res = await api.get(`/blog/${id}`);

      setBlog(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRelatedBlogs = async () => {
    try {
      const res = await api.get(`/relblog/${id}`);

      setRelatedBlogs(res.data.relatedBlogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlog();
    getRelatedBlogs();
  }, [id]);

  if (!blog) {
    return (
      <h1 className="text-center mt-20 text-3xl">
        Loading...
      </h1>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 dark:text-white">

        <div className="max-w-6xl mx-auto px-5 py-10">

          <img
            src={`http://localhost:2020/uploads/${blog.profile}`}
            alt={blog.title}
            className="w-full h-500px object-cover rounded-3xl shadow-lg"
          />

          <div className="mt-10">

            <span className="bg-purple-600 text-white px-4 py-2 rounded-full">
              {blog.cat_id.cat_name}
            </span>

            <h1 className="text-5xl font-bold mt-6">
              {blog.title}
            </h1>

            <p className="mt-8 text-lg leading-9 text-gray-700 dark:text-gray-300">
              {blog.discription}
            </p>

          </div>

          <div className="mt-24">

            <h2 className="text-4xl font-bold mb-10">
              Related Blogs
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {relatedBlogs.map((item) => (
                <BlogCard
                  key={item._id}
                  blog={item}
                />
              ))}

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default SingleBlog;