require("dotenv").config();
const express = require("express");
const cors = require("cors");
const curriculumRoutes = require("./routes/curriculum");
const chatRoutes = require("./routes/chat");
const statsRoutes = require("./routes/stats");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/curriculum", curriculumRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/stats", statsRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
