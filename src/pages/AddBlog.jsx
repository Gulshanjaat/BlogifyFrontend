import { useEffect, useState, useRef } from "react";
import api from "../services/api";
import toast from "react-hot-toast";



function AddBlog() {
    const [title, setTitle] = useState("");
    const [discription, setDiscription] = useState("");
    const [catId, setCatId] = useState("");
    const [photo, setPhoto] = useState(null);


    const [categories, setCategories] = useState([]);
    const [preview, setPreview] = useState("");


    const fileInputRef = useRef(null);

    const getCategories = async () => {
        try {
            const res = await api.get("/category");

            setCategories(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const imageChange = (e) => {
        setPhoto(e.target.files[0]);

        setPreview(
            URL.createObjectURL(e.target.files[0])
        );
    };

    const submitBlog = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("title", title);
            formData.append("discription", discription);
            formData.append("cat_id", catId);
            formData.append("photo", photo);

            const res = await api.post("/blog", formData);

            toast.success(res.data.message);

            // Reset Form
            setTitle("");
            setDiscription("");
            setCatId("");
            setPhoto(null);
            setPreview("");

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

        } catch (error) {
            toast.error("Failed to add blog");
            console.log(error);
        }

    };


    return (
        <>

            <div className="max-w-3xl mx-auto bg-white  shadow-xl rounded-3xl p-10">

                <h1 className="text-4xl font-bold mb-8">

                    Add Blob

                </h1>
                <form
                    onSubmit={submitBlog}
                    className="space-y-5"
                >

                    <input

                        type="text"


                        placeholder="Blog Title"

                        value={title}

                        onChange={(e) => setTitle(e.target.value)}

                        className="w-full border p-3 rounded-xl"

                    />

                    <textarea

                        rows="5"

                        placeholder="Description"

                        value={discription}

                        onChange={(e) => setDiscription(e.target.value)}

                        className="w-full border p-3 rounded-xl"

                    />

                    <select

                        value={catId}

                        onChange={(e) => setCatId(e.target.value)}

                        className="w-full border p-3 rounded-xl"

                    >

                        <option>

                            Select Category

                        </option>

                        {

                            categories.map((item) => (

                                <option

                                    key={item._id}

                                    value={item._id}

                                >

                                    {item.cat_name}

                                </option>

                            ))

                        }

                    </select>

                    <input

                        type="file"
                        ref={fileInputRef}

                        onChange={imageChange}

                    />

                    {

                        preview && (

                            <img

                                src={preview}

                                className="w-52 rounded-xl"

                            />

                        )

                    }

                    <button

                        className="bg-purple-600 text-white px-8 py-3 rounded-xl"

                    >

                        Add Blog

                    </button>

                </form>


            </div>

        </>
    )

}

export default AddBlog;