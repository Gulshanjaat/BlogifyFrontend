import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-950 dark:text-white">

      <h1 className="text-8xl font-bold text-purple-600">
        404
      </h1>

      <p className="mt-5 text-xl">
        Page Not Found
      </p>

      <Link
        to="/"
        className="mt-8 bg-purple-600 text-white px-6 py-3 rounded-xl"
      >
        Go Home
      </Link>

    </div>
  );
}

export default NotFound;