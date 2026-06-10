import { Link, useLocation } from "react-router-dom";
import { Share2 } from "lucide-react";

export default function AuthNavbar() {
  const { pathname } = useLocation();
  const isLogin = pathname === "/login";
  const isRegister = pathname === "/register";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 bg-white px-6 lg:px-10">
      <Link to="/" className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-[#6366f1] text-white">
          <Share2 className="h-4.5 w-4.5" strokeWidth={2.5} />
        </div>
        <span className="text-lg font-bold text-slate-800">
          Edu<span className="text-brand">Canvas</span>
        </span>
      </Link>

      <nav className="flex items-center gap-4">
        <a
          href="/#features"
          className="hidden text-sm font-medium text-slate-500 hover:text-slate-800 transition sm:block"
        >
          Features
        </a>
        <Link
          to="/login"
          className={`rounded-full border px-5 py-1.5 text-sm font-semibold transition-all duration-200 ${
            isLogin
              ? "border-brand bg-brand text-white shadow-sm"
              : "border-brand/40 text-brand hover:border-brand hover:bg-brand/5"
          }`}
        >
          Login
        </Link>
        <Link
          to="/register"
          className={`rounded-full px-5 py-1.5 text-sm font-semibold transition-all duration-200 ${
            isRegister
              ? "border border-brand bg-brand text-white shadow-sm"
              : "bg-brand text-white hover:bg-brand-dark shadow-sm hover:shadow"
          }`}
        >
          Sign Up
        </Link>
      </nav>
    </header>
  );
}

