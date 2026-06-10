import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import TopicProgressBar from "../shared/TopicProgressBar";
import {
  avatarColor,
  buildDonutSegments,
  countTotalTopics,
  fetchCurriculumCompletions,
  fetchEnrolledStudents,
  progressPercent,
  studentInitials,
} from "../../utils/topicCompletions";

export default function StudentProgressPanel({ curriculum }) {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [studentRows, setStudentRows] = useState([]);
  const [donutData, setDonutData] = useState([]);

  const totalTopics = countTotalTopics(curriculum);

  const loadProgress = useCallback(async () => {
    if (!curriculum?.id) return;
    setLoading(true);
    try {
      const [students, completions] = await Promise.all([
        fetchEnrolledStudents(curriculum.id),
        fetchCurriculumCompletions(curriculum.id),
      ]);

      const completionMap = Object.fromEntries(
        completions.map((c) => [c.studentId, c.completedTopics])
      );

      const rows = students
        .map((student) => {
          const completedTopics = completionMap[student.studentId] || [];
          const completedCount = completedTopics.length;
          return {
            ...student,
            completedCount,
            percent: progressPercent(completedCount, totalTopics),
          };
        })
        .sort((a, b) => b.percent - a.percent);

      setStudentRows(rows);
      setDonutData(buildDonutSegments(rows, totalTopics));
    } finally {
      setLoading(false);
    }
  }, [curriculum?.id, totalTopics]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  return (
    <div className="student-progress-panel">
      <div className="student-progress-header">
        <button
          type="button"
          className="student-progress-title-btn"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          Student progress
          <span className="student-progress-chevron">{open ? "▾" : "▸"}</span>
        </button>
        <button
          type="button"
          className="student-progress-refresh"
          onClick={loadProgress}
          disabled={loading}
          aria-label="Refresh student progress"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="student-progress-body">
          {loading && studentRows.length === 0 ? (
            <p className="student-progress-empty">Loading progress…</p>
          ) : studentRows.length === 0 ? (
            <p className="student-progress-empty">No enrolled students yet.</p>
          ) : (
            <>
              <ul className="student-progress-list">
                {studentRows.map((row) => (
                  <li key={row.studentId} className="student-progress-row-item">
                    <div
                      className="student-progress-avatar"
                      style={{ backgroundColor: avatarColor(row.studentName) }}
                    >
                      {studentInitials(row.studentName)}
                    </div>
                    <div className="student-progress-info">
                      <span className="student-progress-name">{row.studentName}</span>
                      <TopicProgressBar
                        completed={row.completedCount}
                        total={totalTopics}
                        showLabel={false}
                        showPercent={false}
                      />
                    </div>
                    <span
                      className="student-progress-pct-label"
                      style={{ color: row.percent >= 70 ? "#639922" : row.percent >= 30 ? "#EF9F27" : "#E24B4A" }}
                    >
                      {row.percent}%
                    </span>
                  </li>
                ))}
              </ul>

              <div className="student-progress-donut">
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie
                      data={donutData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={42}
                      outerRadius={58}
                      paddingAngle={2}
                      stroke="none"
                    >
                      {donutData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="student-progress-legend">
                  {donutData.map((entry) => (
                    <div key={entry.name} className="student-progress-legend-item">
                      <span
                        className="student-progress-legend-swatch"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="student-progress-legend-label">
                        {entry.name} ({entry.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
