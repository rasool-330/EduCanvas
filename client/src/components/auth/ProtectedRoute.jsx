import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { currentUser, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
      </div>
    );
  }

  if (!currentUser) return <Navigate to="/login" replace />;

  if (role && userProfile?.role !== role) {
    const redirect = userProfile?.role === "teacher" ? "/teacher/dashboard" : "/student/dashboard";
    return <Navigate to={redirect} replace />;
  }

  return children;
}
