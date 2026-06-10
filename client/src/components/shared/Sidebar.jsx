import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  GraduationCap,
  CloudUpload,
  PieChart,
  User,
  Library,
  Clock,
} from "lucide-react";

const teacherLinks = [
  { to: "/teacher/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/teacher/generate", label: "Generate", icon: Sparkles },
  { to: "/teacher/curricula", label: "My Curricula", icon: BookOpen },
  { to: "/teacher/students", label: "Manage Students", icon: GraduationCap },
  { to: "/teacher/resources", label: "Resources", icon: CloudUpload },
  { to: "/teacher/analytics", label: "Analytics", icon: PieChart },
  { to: "/teacher/profile", label: "Profile", icon: User },
];

const studentLinks = [
  { to: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/student/browse", label: "Browse Curricula", icon: Library },
  { to: "/student/history", label: "History", icon: Clock },
  { to: "/student/profile", label: "Profile", icon: User },
];

export default function Sidebar({ role }) {
  const links = role === "teacher" ? teacherLinks : studentLinks;
  const menuLabel = role === "teacher" ? "FACULTY MENU 🎓" : "STUDENT MENU 📚";

  return (
    <aside className="w-60 shrink-0 border-r border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-4 py-4">
        <p className="text-xs font-bold tracking-wider text-slate-400">{menuLabel}</p>
      </div>
      <nav className="space-y-0.5 p-3">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "sidebar-active pl-[9px]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
              }`
            }
          >
            <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
