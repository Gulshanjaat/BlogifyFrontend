import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SingleBlog from "../pages/SingleBlog";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Dashboard";
import BlogList from "../pages/BlogList";
import CategoryList from "../pages/CategoryList";
import EditBlog from "../pages/EditBlog";
import AddBlog from "../pages/AddBlog";
import NotFound from "../pages/NotFound";
import AddCategory from "../pages/AddCategory";

function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/blog/:id"
        element={<SingleBlog />}
      />

      <Route element={<AdminLayout />}>

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/blogs" element={<BlogList />} />

        <Route path="/categories" element={<CategoryList />} />

        <Route path="/add-blog" element={<AddBlog />} />

        <Route path="/edit-blog/:id" element={<EditBlog />} />
        <Route path="/add-category" element={<AddCategory />}   />

      </Route>
      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default AppRoutes;