import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function AddCategory() {

    const [catName,setCatName]=useState("");

    const submitCategory=async(e)=>{

        e.preventDefault();

        try{

            const res=await api.post("/cat",{

                cat_name:catName

            });

            toast.success(res.data.message);

            setCatName("");

        }

        catch(error){

            toast.error("Something Went Wrong");

        }

    }

    return(

        <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow">

            <h1 className="text-3xl font-bold mb-8">

                Add Category

            </h1>

            <form
            onSubmit={submitCategory}
            className="space-y-5"
            >

                <input

                value={catName}

                onChange={(e)=>setCatName(e.target.value)}

                placeholder="Category Name"

                className="w-full border p-3 rounded-xl"

                />

                <button

                className="bg-purple-600 text-white px-8 py-3 rounded-xl"

                >

                    Add Category

                </button>

            </form>

        </div>

    )

}

export default AddCategory;