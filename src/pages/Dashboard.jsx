import { useEffect, useState } from "react";
import api from "../services/api";
import { Loader2, LayoutDashboard, FileText, Folder, Eye } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
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
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center flex flex-col items-center gap-3">
          <Loader2 size={40} className="animate-spin text-blue-500" />
          <p className="text-base sm:text-lg font-semibold text-zinc-400">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  const totalBlogsCount = data?.totalBlogs || 0;
  const totalCategoriesCount = data?.totalCategories || data?.totalCategory || 0;

  const chartData = [
    { name: "Blogs", value: totalBlogsCount },
    { name: "Categories", value: totalCategoriesCount },
  ];

  return (
    <div className="w-full max-w-full overflow-x-hidden px-3 sm:px-6 py-4 sm:py-8 text-white space-y-6">
      
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100 flex items-center justify-center sm:justify-start gap-2.5">
          <LayoutDashboard className="text-blue-500 shrink-0" size={26} />
          <span>Dashboard</span>
        </h1>
        <p className="text-zinc-400 mt-1 text-xs sm:text-sm">
          An overview of your platform's metrics and recent activities.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 sm:p-6 relative overflow-hidden group shadow-lg">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h2 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                Total Blogs
              </h2>
              <h1 className="text-3xl sm:text-5xl font-black text-zinc-100 tracking-tight">
                {totalBlogsCount}
              </h1>
            </div>
            <div className="p-3 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-xl shrink-0">
              <FileText size={20} />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 sm:p-6 relative overflow-hidden group shadow-lg">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h2 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                Categories
              </h2>
              <h1 className="text-3xl sm:text-5xl font-black text-zinc-100 tracking-tight">
                {totalCategoriesCount}
              </h1>
            </div>
            <div className="p-3 bg-purple-600/10 border border-purple-500/20 text-purple-400 rounded-xl shrink-0">
              <Folder size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Chart */}
      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 sm:p-6 shadow-lg">
        <h2 className="text-base sm:text-xl font-bold mb-4 text-zinc-200 flex items-center gap-2">
          <Eye size={18} className="text-zinc-500" />
          Analytics Overview
        </h2>
        <div className="w-full h-[250px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f1f23" vertical={false} />
              <XAxis dataKey="name" stroke="#71717a" tickLine={false} dy={5} />
              <YAxis stroke="#71717a" tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#09090b",
                  borderColor: "#27272a",
                  borderRadius: "12px",
                  color: "#f4f4f5",
                }}
                cursor={{ fill: "rgba(39, 39, 42, 0.3)" }}
              />
              <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Latest Blogs Table */}
      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 sm:p-6 shadow-lg overflow-hidden">
        <h2 className="text-base sm:text-xl font-bold mb-4 text-zinc-200">
          Latest Blogs
        </h2>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[400px]">
            <thead>
              <tr className="bg-zinc-950/80 border-b border-zinc-800 text-zinc-400 text-xs font-semibold uppercase">
                <th className="p-3 w-1/3">Title</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 text-xs sm:text-sm text-zinc-300">
              {!data?.latestBlogs || data.latestBlogs.length === 0 ? (
                <tr>
                  <td colSpan="2" className="p-6 text-center text-zinc-500">
                    No recent blogs available.
                  </td>
                </tr>
              ) : (
                data.latestBlogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-zinc-900/40">
                    <td className="p-3 font-semibold text-zinc-100 align-top">
                      <p className="line-clamp-2">{blog.title}</p>
                    </td>
                    <td className="p-3 text-zinc-400 align-top">
                      <p className="line-clamp-2">{blog.discription}</p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;