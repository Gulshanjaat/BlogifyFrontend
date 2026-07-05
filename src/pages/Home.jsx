import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Categories from "../components/Categories";
import SearchBar from "../components/SearchBar";
import BlogCard from "../components/BlogCard";
import api from "../services/api";

function Home() {

  const [allBlogs, setAllBlogs] = useState([]);
  const [searchBlogs, setSearchBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState("All");

  const getBlogs = async (catId = "") => {
    try {

      const url = catId
        ? `/blog?cat_id=${catId}`
        : "/blog";

      console.log("API URL:", url);

      const res = await api.get(url);

      setAllBlogs(res.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 dark:text-white">

        {/* Hero */}

        <section className="py-28">

          <div className="max-w-6xl mx-auto text-center px-5">

            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Discover Amazing Blogs
            </h1>

            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
              Read latest articles on programming and technology.
            </p>

            <div className="mt-10">
              <SearchBar
                setSearchBlogs={setSearchBlogs}
                setIsSearching={setIsSearching}
              />
            </div>

          </div>

        </section>

        {/* Categories */}

        <section className="max-w-7xl mx-auto px-5">

          <h2 className="text-4xl font-bold text-center mb-10">
            Categories
          </h2>

          <Categories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedCategoryName={selectedCategoryName}
            setSelectedCategoryName={setSelectedCategoryName}
            getBlogs={getBlogs}
          />

        </section>

        {/* Search Results */}

        {isSearching && (

          <section className="max-w-7xl mx-auto px-5 mt-24">

            <h2 className="text-4xl font-bold text-center mb-12 text-purple-600">
              Search Results
            </h2>

            {searchBlogs.length > 0 ? (

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {searchBlogs.map((blog) => (
                  <BlogCard
                    key={blog._id}
                    blog={blog}
                  />
                ))}

              </div>

            ) : (

              <div className="text-center text-gray-500 text-xl">
                No Blogs Found 😔
              </div>

            )}

          </section>

        )}

        {/* All Blogs */}

        <section className="max-w-7xl mx-auto px-5 mt-24">

          <h2 className="text-4xl font-bold text-center mb-12">

            {selectedCategoryName === "All"
              ? "All Blogs"
              : `${selectedCategoryName} Blogs`}

          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {allBlogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
              />
            ))}

          </div>

        </section>

        <Footer />

      </div>
    </>
  );
}

export default Home;