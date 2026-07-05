import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import {
    FaHome,
    FaBlog,
    FaList,
    FaMoon,   
    FaTachometerAlt
} from "react-icons/fa";

function Sidebar() {

    const menus = [
        {
            name: "Home",
            path: "/",
            icon: <FaHome />
        },
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FaTachometerAlt/>
        },
        {
            name: "Blogs",
            path: "/blogs",
            icon: <FaBlog />
        },
        {
            name: "Add Blog",
            path: "/add-blog",
            icon: <FaPlus />
        },
        {
            name: "Categories",
            path: "/categories",
            icon: <FaList />
        },
        {
            name: "Add Category",

            path: "/add-category",

            icon: <FaPlus />
        },

    ];

    return (

        <aside className="hidden md:flex flex-col w-72 bg-slate-900 text-white min-h-screen">

            <div className="text-center py-8 border-b border-slate-700">

                <h1 className="text-3xl font-bold text-purple-500">
                    BLOGIFY
                </h1>

            </div>

            <div className="flex-1 mt-10">

                {

                    menus.map((item, index) => (
                        <NavLink

                            key={index}

                            to={item.path}

                            className={({ isActive }) =>

                                `flex items-center gap-4 px-8 py-4 m-2 rounded-xl transition

            ${isActive
                                    ? "bg-purple-600"
                                    : "hover:bg-slate-700"

                                }`

                            }

                        >

                            {item.icon}

                            {item.name}

                        </NavLink>
                    ))

                }

            </div>



        </aside>

    );

}

export default Sidebar;