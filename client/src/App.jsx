import { Routes, Route } from "react-router-dom";
import CoverPage from "./components/shared/CoverPage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardLayout from "./components/shared/DashboardLayout";
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import GenerateCurriculum from "./components/teacher/GenerateCurriculum";
import PostedCurricula from "./components/teacher/PostedCurricula";
import TeacherHistory from "./components/teacher/TeacherHistory";
import ManageStudents from "./components/teacher/ManageStudents";
import Resources from "./components/teacher/Resources";
import Analytics from "./components/teacher/Analytics";
import ProfilePage from "./components/shared/ProfilePage";
import StudentDashboard from "./components/student/StudentDashboard";
import BrowseCurricula from "./components/student/BrowseCurricula";
import CurriculumDetail from "./components/student/CurriculumDetail";
import StudentHistory from "./components/student/StudentHistory";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CoverPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/teacher"
        element={
          <ProtectedRoute role="teacher">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="generate" element={<GenerateCurriculum />} />
        <Route path="curricula" element={<PostedCurricula />} />
        <Route path="students" element={<ManageStudents />} />
        <Route path="resources" element={<Resources />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="history" element={<TeacherHistory />} />
      </Route>

      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="browse" element={<BrowseCurricula />} />
        <Route path="curriculum/:id" element={<CurriculumDetail />} />
        <Route path="history" element={<StudentHistory />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}
