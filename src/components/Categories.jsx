import { useEffect, useState } from "react";
import api from "../services/api";

function Categories({
  selectedCategory,
  setSelectedCategory,
  selectedCategoryName,
  setSelectedCategoryName,
  getBlogs,
}) {

  const [categories, setCategories] = useState([]);

  const getCategory = async () => {
    try {

      const res = await api.get("/category");

      setCategories(res.data.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const selectCategory = (id, name) => {

    setSelectedCategory(id);

    setSelectedCategoryName(name);

    getBlogs(id);

  };

  return (

    <div className="flex flex-wrap gap-4 justify-center">

      <button

        onClick={() => {

          setSelectedCategory("");

          setSelectedCategoryName("All");

          getBlogs();

        }}

        className={`px-5 py-2 rounded-full transition

          ${selectedCategory === ""
            ? "bg-purple-600 text-white"
            : "bg-purple-100 text-purple-700"}

        `}
      >

        All

      </button>

      {

        categories.map((item) => (

          <button

            key={item._id}

            onClick={() =>
              selectCategory(item._id, item.cat_name)
            }

            className={`px-5 py-2 rounded-full transition

            ${selectedCategory === item._id

                ? "bg-purple-600 text-white"

                : "bg-purple-100 text-purple-700 hover:bg-purple-600 hover:text-white"

              }

            `}

          >

            {item.cat_name}

          </button>

        ))

      }

    </div>

  );

}

export default Categories;