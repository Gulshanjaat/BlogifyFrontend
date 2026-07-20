import { NavLink } from "react-router-dom";
import { Home, LayoutDashboard, FileText, PlusCircle, Folders } from "lucide-react";

function Sidebar() {
  const menus = [
    {
      name: "Home",
      path: "/",
      icon: <Home size={18} />
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />
    },
    {
      name: "Blogs",
      path: "/blogs",
      icon: <FileText size={18} />
    },
    {
      name: "Add Blog",
      path: "/add-blog",
      icon: <PlusCircle size={18} />
    },
    {
      name: "Categories",
      path: "/categories",
      icon: <Folders size={18} />
    },
    {
      name: "Add Category",
      path: "/add-category",
      icon: <Folders size={18} />
    },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-[#09090B] border-r border-zinc-800/80 text-white h-screen sticky top-0 flex-shrink-0 select-none">
      
      <div className="px-6 py-6 border-b border-zinc-800/60 flex items-center justify-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-blue-500">
          BLOGIFY
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 custom-scrollbar">
        {menus.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 border group ${
                isActive
                  ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/10"
                  : "bg-transparent border-transparent text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 hover:border-zinc-800"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`transition-colors duration-200 ${
                  isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
                }`}>
                  {item.icon}
                </div>
                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-zinc-800/60 text-center">
        <p className="text-xs text-zinc-500 font-medium">v1.0.0 • © 2026</p>
      </div>
    </aside>
  );
}

export default Sidebar;