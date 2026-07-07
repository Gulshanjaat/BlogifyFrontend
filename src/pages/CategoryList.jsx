import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function CategoryList() {

    const [categories, setCategories] = useState([]);
    const [editId, setEditId] = useState("");
    const [editName, setEditName] = useState("");
    const [loading, setLoading] = useState(true);

    const deleteCategory = async (id) => {

        const ok = window.confirm("Delete Category ?");

        if (!ok) return;

        try {

            await api.delete(`/category/${id}`);

            toast.success("Category Deleted");

            getCategory();

        }

        catch {

            toast.error("Delete Failed");

        }

    }

    const updateCategory = async () => {

        try {

            await api.put(`/category/${editId}`, {

                cat_name: editName

            });

            toast.success("Updated");

            setEditId("");

            getCategory();

        }

        catch {

            toast.error("Error");

        }

    }

   const getCategory = async () => {
  try {

    setLoading(true);

    const res = await api.get("/category");

    setCategories(res.data.data);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }
};

    useEffect(() => {

        getCategory();

    }, []);


    if (loading) {

  return (

    <div className="flex justify-center items-center h-[70vh]">

      <div className="text-center">

        <div className="w-14 h-14 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

        <p className="mt-5 text-xl font-semibold text-purple-600">
          Loading Categories...
        </p>

      </div>

    </div>

  );

}

    return (

        <div>

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold">

                    Category Management

                </h1>

                

            </div>

            <table className="w-full bg-white rounded-xl shadow">

                <thead>

                    <tr className="bg-purple-600 text-white">

                        <th className="p-4">Category</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        categories.map((item) => (

                            <tr
                                key={item._id}
                                className="border-b"
                            >

                                <td className="p-4">

                                    {

                                        editId === item._id ?

                                            <input

                                                value={editName}

                                                onChange={(e) => setEditName(e.target.value)}

                                                className="border p-2 rounded"

                                            />

                                            :

                                            item.cat_name

                                    }

                                </td>

                                <td>

                                    {

                                        editId === item._id ?

                                            <button

                                                onClick={updateCategory}

                                                className="bg-green-500 text-white px-4 py-2 rounded mr-3"

                                            >

                                                Save

                                            </button>

                                            :

                                            <button

                                                onClick={() => {

                                                    setEditId(item._id);

                                                    setEditName(item.cat_name);

                                                }}

                                                className="bg-blue-500 text-white px-4 py-2 rounded mr-3"

                                            >

                                                Edit

                                            </button>

                                    }

                                    <button

                                        onClick={() => deleteCategory(item._id)}

                                        className="bg-red-500 text-white px-4 py-2 rounded"

                                    >

                                        Delete

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default CategoryList;