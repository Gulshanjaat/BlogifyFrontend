import { Link } from "react-router-dom";


function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-5">

        <div className="grid md:grid-cols-3 gap-10">

          <div>
            <h2 className="text-2xl font-bold text-purple-400">
              Blogify
            </h2>

            <p className="mt-4 text-gray-400">
              Modern blog platform built with
              React, Node.js and MongoDB.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Quick Links
            </h3>

            <div className="space-y-2 text-gray-400">

              {/* <li>Blogs</li> */}

              <Link
                to="/dashboard"
                className="font-medium"
              >
                Dashboard
              </Link><br />

              <Link
                to="/blogs"
                className="font-medium"
              >
                Blogs
              </Link><br />

              <Link
                to="/categories"
                className="font-medium"
              >
                Categories
              </Link>

            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              Contact
            </h3>

            <p className="text-gray-400">
              contact@blogify.com
            </p>
          </div>

        </div>

        <hr className="my-8 border-slate-700" />

        <p className="text-center text-gray-500">
          © 2026 Blogify. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;