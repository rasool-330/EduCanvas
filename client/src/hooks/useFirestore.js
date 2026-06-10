import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

export async function logTeacherAction(uid, action, curriculumId, title, snapshot) {
  await addDoc(collection(db, "teacherHistory", uid, "entries"), {
    curriculumId,
    title,
    action,
    timestamp: serverTimestamp(),
    snapshot,
  });
}

export async function logStudentAction(uid, action, curriculumId, title) {
  await addDoc(collection(db, "studentHistory", uid, "entries"), {
    curriculumId,
    title,
    action,
    timestamp: serverTimestamp(),
  });
}

export async function getEnrollmentCount(curriculumId) {
  const { getDocs, collection: col } = await import("firebase/firestore");
  const snapshot = await getDocs(col(db, "enrollments", curriculumId, "students"));
  return snapshot.size;
}
