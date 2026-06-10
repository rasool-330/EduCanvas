import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Chatbot from "./Chatbot";
import { useAuth } from "../../context/AuthContext";

export default function DashboardLayout() {
  const { userProfile } = useAuth();

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar role={userProfile?.role} />
        <main className="flex-1 overflow-y-auto bg-[#F8F9FC] p-6">
          <Outlet />
        </main>
      </div>
      <Chatbot />
    </div>
  );
}
