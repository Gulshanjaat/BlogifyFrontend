import { useEffect, useState } from "react";
import api from "../services/api";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function Dashboard() {


    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

   const getDashboard = async () => {

  try {

    setLoading(true);

    const res = await api.get("/dashboard");

    setData(res.data);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }

};

    useEffect(() => {

        getDashboard();

    }, []);

    if (loading) {

  return (

    <div className="flex justify-center items-center h-[70vh]">

      <div className="text-center">

        <div className="w-14 h-14 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

        <p className="mt-5 text-xl font-semibold text-purple-600">
          Loading Dashboard...
        </p>

      </div>

    </div>

  );

}

    const chartData = [

        {
            name: "Blogs",
            value: data.totalBlogs
        },

        {
            name: "Category",
            value: data.totalCategory
        }

    ];

    return (

        <div>

            <h1 className="text-4xl font-bold mb-10">

                Dashboard

            </h1>

            {/* Cards */}

            <div className="grid md:grid-cols-2 gap-8">

                <div className="bg-white rounded-3xl shadow-lg p-8">

                    <h2 className="text-gray-500">

                        Total Blogs

                    </h2>

                    <h1 className="text-5xl font-bold mt-4 text-purple-600">

                        {data.totalBlogs}

                    </h1>

                </div>

                <div className="bg-white rounded-3xl shadow-lg p-8">
                    <h2 className="text-gray-500">
                        Categories
                    </h2>

                    <h1 className="text-5xl font-bold mt-4 text-purple-600">

                    {data.totalCategories}

                    </h1>

                  

                </div>

            </div>

            {/* Chart */}

            <div className="bg-white rounded-3xl shadow-lg mt-10 p-8">

                <h2 className="text-2xl font-bold mb-5">

                    Overview

                </h2>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >

                    <BarChart data={chartData}>

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="value"
                            radius={[10, 10, 0, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

            {/* Latest Blogs */}

            <div className="bg-white rounded-3xl shadow-lg mt-10 p-8">

                <h2 className="text-2xl font-bold mb-5">

                    Latest Blogs

                </h2>

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left p-3">

                                Title

                            </th>

                            <th className="text-left">

                                Description

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            data.latestBlogs.map((blog)=>(

                                <tr
                                key={blog._id}
                                className="border-b"
                                >

                                    <td className="p-3">

                                        {blog.title}

                                    </td>

                                    <td>

                                        {blog.discription}

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Dashboard;