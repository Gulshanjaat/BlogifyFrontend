import { Link } from "react-router-dom";
import ThemeButton from "./ThemeButton";

function Navbar() {
  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md bg-[#09090B]/80 border-b border-zinc-800/80 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-blue-500">
            Blogify
          </h1>

          <div className="flex items-center gap-4 sm:gap-5">

            {/* <Link
              to="/"
              className="font-medium text-black dark:text-white transition"
            >
              Home
            </Link> */}

            <Link
              to="/dashboard"
              className="text-sm sm:text-base font-semibold text-zinc-300 hover:text-white transition-colors duration-200"
            >
              Dashboard
            </Link>

            {/* <Link
              to="/login"
              className="font-medium text-black dark:text-white transition"
            >
              Admin
            </Link> */}

            <div className="flex items-center justify-center min-w-[40px]">
              <ThemeButton />
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;