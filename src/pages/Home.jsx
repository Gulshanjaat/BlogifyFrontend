import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Categories from "../components/Categories";
import SearchBar from "../components/SearchBar";
import BlogCard from "../components/BlogCard";
import api from "../services/api";
import { Loader2, Sparkles, BookOpen } from "lucide-react";

function Home() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [searchBlogs, setSearchBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState("All");
  const [loading, setLoading] = useState(true);

  const getBlogs = async (catId = "") => {
    try {
      setLoading(true);
      const url = catId ? `/blog?cat_id=${catId}` : "/blog";
      const res = await api.get(url);
      setAllBlogs(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090B] text-zinc-900 dark:text-white flex flex-col justify-between selection:bg-blue-500/30 selection:text-blue-500 dark:selection:text-blue-200 transition-colors duration-200">
      <Navbar />

      <main className="flex-grow pb-16 sm:pb-24">
        
        {/* Hero Section */}
        <section className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" />
          
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-semibold tracking-wide uppercase mx-auto">
              <Sparkles size={12} />
              <span>Welcome to the Knowledge Base</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-400 leading-none py-1">
              Discover Amazing Blogs
            </h1>
            
            <p className="max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              Read the latest articles on programming, design architectures, and upcoming technology trends.
            </p>
            
            <div className="pt-4 max-w-xl mx-auto">
              <SearchBar
                setSearchBlogs={setSearchBlogs}
                setIsSearching={setIsSearching}
              />
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <div className="border-t border-zinc-200 dark:border-zinc-900 pt-12 sm:pt-16">
            <Categories
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedCategoryName={selectedCategoryName}
              setSelectedCategoryName={setSelectedCategoryName}
              getBlogs={getBlogs}
            />
          </div>
        </section>

        {/* Search Results */}
        {isSearching && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 animate-in fade-in duration-300">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6 sm:mb-8 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <span>Search Results</span>
              <span className="text-xs font-medium px-2 py-0.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md">
                {searchBlogs.length} found
              </span>
            </h2>

            {searchBlogs.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {searchBlogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-zinc-100/50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800/50 rounded-2xl">
                <p className="text-zinc-500 dark:text-zinc-400 text-base sm:text-lg font-medium">
                  No matching blogs found. Try a different keyword.
                </p>
              </div>
            )}
          </section>
        )}

        {/* Main Articles Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          {!isSearching && (
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6 sm:mb-8 text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
              <BookOpen size={20} className="text-zinc-500" />
              <span>{selectedCategoryName === "All" ? "All Articles" : selectedCategoryName}</span>
            </h2>
          )}

          {loading ? (
            <div className="text-center py-20 bg-transparent">
              <div className="inline-flex flex-col items-center gap-3">
                <Loader2 size={36} className="animate-spin text-blue-500" />
                <p className="text-sm font-semibold text-zinc-500 tracking-wide">
                  Loading articles...
                </p>
              </div>
            </div>
          ) : (
            <>
              {allBlogs.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {allBlogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                  ))}
                </div>
              ) : (
                <>
                  {!isSearching && (
                    <div className="text-center py-16 bg-zinc-100/50 dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-800/50 rounded-2xl">
                      <p className="text-zinc-500 dark:text-zinc-400 text-base sm:text-lg font-medium">
                        No blogs published under this category yet.
                      </p>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default Home;  