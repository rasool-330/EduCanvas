import { useState, useRef, useEffect } from "react";
import { LogOut, UserCircle, ChevronDown, Share2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { usernameFromProfile } from "../../utils/profileService";

export default function Navbar() {
  const { logout, currentUser, userProfile } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const displayName = usernameFromProfile(userProfile, currentUser?.uid);

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-[#6366f1] text-white">
          <Share2 className="h-4.5 w-4.5" strokeWidth={2.5} />
        </div>
        <span className="text-lg font-bold text-slate-800">
          Edu<span className="text-brand">Canvas</span>
        </span>
      </div>

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          aria-expanded={open}
          aria-haspopup="true"
        >
          <UserCircle className="h-4 w-4 text-brand" aria-hidden="true" />
          {displayName}
          <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
        </button>

        {open && (
          <div className="absolute right-0 z-50 mt-2 w-44 rounded-xl border border-slate-100 bg-white py-1 shadow-lg">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
