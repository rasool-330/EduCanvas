import { fetchEnrolledCurriculaContext, buildCurriculumContextPrompt } from "./profileService";

let cachedContext = null;
let cachedUid = null;

export async function loadChatCurriculumContext(uid, college) {
  if (cachedUid === uid && cachedContext) return cachedContext;

  const enrolled = await fetchEnrolledCurriculaContext(uid, college);
  cachedContext = buildCurriculumContextPrompt(enrolled);
  cachedUid = uid;
  return cachedContext;
}

export function invalidateChatCurriculumContext() {
  cachedContext = null;
  cachedUid = null;
}
