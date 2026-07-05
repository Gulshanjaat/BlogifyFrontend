import { Link } from "react-router-dom";
import ThemeButton from "./ThemeButton";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white dark:bg-slate-900 shadow-md">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex justify-between items-center h-16">

          <h1 className="text-2xl font-bold text-purple-600">
            Blogify
          </h1>

          <div className="flex items-center gap-5">

            {/* <Link
              to="/"
              className="font-medium text-black dark:text-white transition"
            >
              Home
            </Link> */}

            <Link
              to="/dashboard"
              className="font-medium text-black dark:text-white transition"
            >
              Dashboard
            </Link>

            {/* <Link
              to="/login"
              className="font-medium text-black dark:text-white transition"
            >
              Admin
            </Link> */}

            <ThemeButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;