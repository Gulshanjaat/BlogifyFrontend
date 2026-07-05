import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function EditBlog() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = async () => {

    try {

      const res = await api.get(`/blog/${id}`);

      setTitle(res.data.data.title);

      setDiscription(res.data.data.discription);

    } catch (error) {

      console.log(error);

    }

  };

  const updateBlog = async (e) => {

    e.preventDefault();

    try {

      await api.put(`/blog/${id}`, {
        title,
        discription,
      });

      toast.success("Blog Updated Successfully");

      navigate("/blogs");

    } catch (error) {

      toast.error("Update Failed");

    }

  };

  return (

    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-8">

      <h1 className="text-4xl font-bold mb-8">

        Edit Blog

      </h1>

      <form
        onSubmit={updateBlog}
        className="space-y-5"
      >

        <input
          type="text"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className="w-full border p-3 rounded-xl"
        />

        <textarea
          rows="6"
          value={discription}
          onChange={(e)=>setDiscription(e.target.value)}
          className="w-full border p-3 rounded-xl"
        />

        <button
          className="bg-purple-600 text-white px-8 py-3 rounded-xl"
        >

          Update Blog

        </button>

      </form>

    </div>

  );

}

export default EditBlog;