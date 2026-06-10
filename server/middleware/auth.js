const { getAuth, initFirebaseAdmin } = require("../firebaseAdmin");

async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  initFirebaseAdmin();
  const auth = getAuth();

  if (!auth) {
    return res.status(503).json({ error: "Auth service unavailable" });
  }

  try {
    const decoded = await auth.verifyIdToken(token);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = { requireAuth };
