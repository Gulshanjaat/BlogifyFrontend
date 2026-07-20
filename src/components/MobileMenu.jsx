import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  const linkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 border ${
      isActive
        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/10"
        : "bg-zinc-900/50 border-zinc-800/80 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 hover:border-zinc-700"
    }`;

  return (
    <>
      <div className="md:hidden flex justify-between items-center px-4 py-4 bg-[#09090B] border-b border-zinc-800/80 text-white sticky top-0 z-40">
        <h1 className="font-extrabold text-xl tracking-tight text-blue-500">
          BLOGIFY
        </h1>
        <button 
          onClick={() => setOpen(true)}
          className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white cursor-pointer transition-colors"
        >
          <Menu size={20} />
        </button>
      </div>

      {open && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={() => setOpen(false)}
        >
          <div 
            className="w-72 h-full bg-[#09090B] border-r border-zinc-800/80 p-5 flex flex-col shadow-2xl transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-4 border-b border-zinc-800/60">
              <span className="font-extrabold text-lg tracking-tight text-blue-500">
               BlogiFy
              </span>
              <button 
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-2.5 flex-1">
              <NavLink 
                to="/" 
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                Home
              </NavLink>
              <NavLink 
                to="/dashboard" 
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                Dashboard
              </NavLink>
              <NavLink 
                to="/blogs" 
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                Blogs
              </NavLink>
              <NavLink 
                to="/categories" 
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                Categories
              </NavLink>
            </div>

            <div className="pt-4 border-t border-zinc-800/60 text-center">
              <p className="text-xs text-zinc-500">© 2026 Blogify</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileMenu;