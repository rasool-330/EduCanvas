import { useEffect, useState } from "react";
import { X, CheckCircle, GraduationCap, BookOpen, Users } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  fetchStudentProfileStats,
  fetchTeacherProfileStats,
  formatCreatedAt,
  usernameFromProfile,
} from "../../utils/profileService";
import { avatarColor, studentInitials } from "../../utils/topicCompletions";

function ProfileSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="mx-auto h-20 w-20 rounded-full bg-slate-100" />
      <div className="h-4 rounded bg-slate-100" />
      <div className="h-4 w-2/3 rounded bg-slate-100" />
      <div className="h-24 rounded bg-slate-100" />
    </div>
  );
}

export default function ProfileModal({ open, onClose }) {
  const { currentUser, userProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [extra, setExtra] = useState(null);

  useEffect(() => {
    if (!open || !currentUser || !userProfile) return;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        if (userProfile.role === "student") {
          const data = await fetchStudentProfileStats(currentUser.uid, userProfile.college);
          setExtra(data);
        } else {
          const data = await fetchTeacherProfileStats(currentUser.uid);
          setExtra(data);
        }
      } catch {
        setError("Failed to load profile details.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [open, currentUser, userProfile]);

  if (!open) return null;

  const isStudent = userProfile?.role === "student";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 id="profile-modal-title" className="text-lg font-semibold text-slate-800">
            Profile
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
            aria-label="Close profile"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-5">
          {loading ? (
            <ProfileSkeleton />
          ) : error ? (
            <p className="text-center text-sm text-red-500">{error}</p>
          ) : (
            <>
              <div className="flex flex-col items-center text-center">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white"
                  style={{ backgroundColor: avatarColor(userProfile.name) }}
                >
                  {studentInitials(userProfile.name)}
                </div>
                <p className="mt-3 text-xl font-semibold text-slate-800">{userProfile.name}</p>
                <p className="text-sm capitalize text-brand">{userProfile.role}</p>
              </div>

              <hr className="my-5 border-slate-100" />

              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Username</dt>
                  <dd className="font-medium text-slate-800">
                    {usernameFromProfile(userProfile, currentUser.uid)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Email</dt>
                  <dd className="break-all text-right font-medium text-slate-800">
                    {userProfile.email || currentUser.email}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Institution</dt>
                  <dd className="text-right font-medium text-slate-800">{userProfile.college}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Member since</dt>
                  <dd className="font-medium text-slate-800">
                    {formatCreatedAt(userProfile.createdAt)}
                  </dd>
                </div>
              </dl>

              <hr className="my-5 border-slate-100" />

              {isStudent ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <GraduationCap className="h-4 w-4 text-brand" aria-hidden="true" />
                    Enrolled Curricula ({extra?.enrolledCurricula?.length || 0})
                  </div>
                  {extra?.enrolledCurricula?.length ? (
                    <ul className="max-h-32 space-y-1 overflow-y-auto text-sm text-slate-600">
                      {extra.enrolledCurricula.map((c) => (
                        <li key={c.id} className="rounded bg-slate-50 px-3 py-1.5">
                          {c.title}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-400">No enrollments yet.</p>
                  )}
                  <div className="flex items-center justify-between rounded-lg bg-[#EAF3DE] px-4 py-3">
                    <span className="flex items-center gap-2 text-sm font-medium text-[#27500A]">
                      <CheckCircle className="h-4 w-4" aria-hidden="true" />
                      Topics completed
                    </span>
                    <span className="text-lg font-bold text-[#27500A]">
                      {extra?.topicsCompleted ?? 0}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <BookOpen className="h-4 w-4 text-brand" aria-hidden="true" />
                    Curricula created ({extra?.curricula?.length || 0})
                  </div>
                  {extra?.curricula?.length ? (
                    <ul className="max-h-32 space-y-1 overflow-y-auto text-sm text-slate-600">
                      {extra.curricula.map((c) => (
                        <li key={c.id} className="rounded bg-slate-50 px-3 py-1.5">
                          {c.title}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-400">No published curricula yet.</p>
                  )}
                  <div className="flex items-center justify-between rounded-lg bg-[#EFF6FF] px-4 py-3">
                    <span className="flex items-center gap-2 text-sm font-medium text-brand">
                      <Users className="h-4 w-4" aria-hidden="true" />
                      Total students enrolled
                    </span>
                    <span className="text-lg font-bold text-brand">{extra?.totalStudents ?? 0}</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
