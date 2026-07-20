import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#09090B] border-t border-zinc-800/80 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center sm:text-left">
          
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-2xl font-extrabold tracking-tight text-blue-500">
              Blogify
            </h2>
            <p className="mt-3 text-zinc-400 text-sm max-w-xs leading-relaxed">
              Modern blog platform built with React, Node.js and MongoDB.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-bold text-zinc-200 tracking-wide mb-4 text-sm sm:text-base">
              Quick Links
            </h3>
            <div className="flex flex-col space-y-2.5 text-zinc-400 text-sm">
              <Link
                to="/dashboard"
                className="font-medium hover:text-blue-400 transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link
                to="/blogs"
                className="font-medium hover:text-blue-400 transition-colors duration-200"
              >
                Blogs
              </Link>
              <Link
                to="/categories"
                className="font-medium hover:text-blue-400 transition-colors duration-200"
              >
                Categories
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-start sm:col-span-2 md:col-span-1">
            <h3 className="font-bold text-zinc-200 tracking-wide mb-4 text-sm sm:text-base">
              Contact Us
            </h3>
            <p className="text-zinc-400 text-sm hover:text-blue-400 transition-colors duration-200 cursor-pointer">
              contact@blogify.com
            </p>
          </div>

        </div>

        <div className="my-8 border-t border-zinc-800/60" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-zinc-500">
          <p>© 2026 Blogify. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;