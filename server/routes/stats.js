const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { getFirestore } = require("../firebaseAdmin");

const router = express.Router();

function isActiveCurriculum(data) {
  if (data?.isPublished !== true) return false;
  if (data?.status && data.status !== "active") return false;
  return true;
}

router.get("/student-count", requireAuth, async (_req, res) => {
  try {
    const db = getFirestore();
    if (!db) {
      return res.status(503).json({ error: "Database unavailable" });
    }

    const snap = await db.collection("users").where("role", "==", "student").count().get();
    res.json({ studentCount: snap.data().count });
  } catch (error) {
    console.error("student-count error:", error);
    res.status(500).json({ error: "Failed to fetch student count" });
  }
});

router.get("/active-curricula-count", requireAuth, async (req, res) => {
  try {
    const db = getFirestore();
    if (!db) {
      return res.status(503).json({ error: "Database unavailable" });
    }

    const college = req.query.college;
    if (!college) {
      return res.status(400).json({ error: "college query parameter is required" });
    }

    const snap = await db
      .collection("curricula")
      .where("college", "==", college)
      .where("isPublished", "==", true)
      .get();

    const activeCurriculaCount = snap.docs.filter((d) => isActiveCurriculum(d.data())).length;
    res.json({ activeCurriculaCount });
  } catch (error) {
    console.error("active-curricula-count error:", error);
    res.status(500).json({ error: "Failed to fetch active curricula count" });
  }
});

module.exports = router;
