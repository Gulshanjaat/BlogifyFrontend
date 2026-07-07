import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const getBlogs = async (catId = "") => {
        try {

            setLoading(true);

            const url = catId
                ? `/blog?cat_id=${catId}`
                : "/blog";

            const res = await api.get(url);

            setBlogs(res.data.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    const deleteBlog = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this blog?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/blog/${id}`);

            getBlogs();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBlogs();
    }, []);

    if (loading) {

        return (

            <div className="flex justify-center items-center h-[70vh]">

                <div className="text-center">

                    <div className="w-14 h-14 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

                    <p className="mt-5 text-xl font-semibold text-purple-600">
                        Loading Blogs...
                    </p>

                </div>

            </div>

        );

    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-blue-700">
                    Blog Management
                </h1>


            </div>

            <div className="overflow-x-auto bg-white  rounded-2xl shadow">

                <table className="w-full">

                    <thead>

                        <tr className="bg-purple-600 text-white">

                            <th className="p-4">Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {blogs.map((blog) => (

                            <tr
                                key={blog._id}
                                className="border-b"
                            >

                                <td className="p-4">

                                    <img
                                        src={blog.profile}
                                        className="w-20 h-20 rounded-lg object-cover"
                                    />

                                </td>

                                <td>{blog.title}</td>

                                <td>{blog.cat_id?.cat_name}</td>

                                <td>

                                    <button
                                        onClick={() => navigate(`/edit-blog/${blog._id}`)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-3"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteBlog(blog._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>



        </div>
    );
}

export default BlogList;