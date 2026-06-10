require("dotenv").config();
const express = require("express");
const Groq = require("groq-sdk");

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/generate", async (req, res) => {
  try {
    const { skill, level, semesters, weeklyHours, industryFocus } = req.body;

    if (!skill || !level || !semesters) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const prompt = `
You are an expert educational curriculum designer.
Generate a complete, structured academic curriculum in valid JSON format ONLY.
No explanation, no markdown, only raw JSON.

Parameters:
- Skill: ${skill}
- Education Level: ${level}
- Number of Semesters: ${semesters}
- Weekly Study Hours: ${weeklyHours || "Not specified"}
- Industry Focus: ${industryFocus || "General Technology"}

Return this exact JSON structure:
{
  "title": "<Skill> Learning Plan",
  "skill": "${skill}",
  "level": "${level}",
  "weeklyHours": "${weeklyHours || ""}",
  "industryFocus": "${industryFocus || "General Technology"}",
  "totalCourses": <number>,
  "totalCredits": <number>,
  "semesters": [
    {
      "semester": 1,
      "courses": [
        {
          "code": "CS101",
          "name": "<Course Name>",
          "credits": 4,
          "description": "<2-sentence description>",
          "topics": ["Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5"]
        }
      ]
    }
  ],
  "capstoneProject": "<Capstone project description>"
}

Rules:
- ${semesters} semesters total
- 3 courses per semester
- 4 credits per course
- 5 topics per course
- Topics must be specific, technical, and relevant to ${skill} and ${industryFocus || "General Technology"}
- Courses must progress logically from foundational to advanced
`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.4,
      max_tokens: 4000,
    });

    const raw = completion.choices[0].message.content.trim();
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const curriculum = JSON.parse(cleaned);

    res.json({ success: true, curriculum });
  } catch (error) {
    console.error("Curriculum generation error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to generate curriculum",
    });
  }
});

module.exports = router;
