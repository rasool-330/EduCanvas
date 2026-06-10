import { progressBarColor } from "../../utils/topicCompletions";

export default function TopicProgressBar({
  completed,
  total,
  showLabel = true,
  showPercent = true,
  className = "",
}) {
  const percent = total ? Math.round((completed / total) * 100) : 0;
  const fillColor = progressBarColor(percent);

  return (
    <div className={`topic-progress-wrap ${className}`}>
      {showLabel && (
        <span className="topic-progress-count">
          {completed} of {total} topics completed
        </span>
      )}
      <div className="topic-progress-row">
        <div className="topic-progress-track">
          <div
            className="topic-progress-fill"
            style={{ width: `${percent}%`, backgroundColor: fillColor }}
          />
        </div>
        {showPercent && (
          <span className="topic-progress-pct" style={{ color: fillColor }}>
            {percent}%
          </span>
        )}
      </div>
    </div>
  );
}
