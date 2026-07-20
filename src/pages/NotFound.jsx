import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#09090B] text-zinc-100 px-4 relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-950/10 via-transparent to-transparent pointer-events-none" />

      <div className="text-center relative z-10 max-w-md mx-auto space-y-6 flex flex-col items-center">
        <div className="p-4 bg-zinc-900/50 border border-zinc-800/80 text-zinc-500 rounded-3xl shadow-xl animate-bounce duration-1000">
          <AlertCircle size={48} className="text-blue-500/80" />
        </div>

        <div className="space-y-2">
          <h1 className="text-7xl sm:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-500 select-none">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-200">
            Page Not Found
          </h2>
          <p className="text-sm text-zinc-400 max-w-xs mx-auto leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-2 w-full sm:w-auto">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/10 group cursor-pointer"
          >
            <Home size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            <span>Go Back Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;