import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export async function generateCurriculum(formData) {
  const response = await axios.post(`${API_URL}/api/curriculum/generate`, formData);
  return response.data;
}

export async function sendChatMessage(message, history, curriculumContext = "") {
  const response = await axios.post(`${API_URL}/api/chat/chat`, {
    message,
    history,
    curriculumContext,
  });
  return response.data;
}
