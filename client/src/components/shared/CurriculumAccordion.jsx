import { useState } from "react";
import { ChevronDown, ChevronUp, Circle, CircleCheck, CheckSquare } from "lucide-react";
import TopicProgressBar from "./TopicProgressBar";
import {
  countCompletedInCourse,
  countCourseTopics,
  makeTopicId,
} from "../../utils/topicCompletions";

function TopicRow({ topic, courseCode, isCompleted, interactive, onMarkComplete, marking }) {
  if (!interactive) {
    return (
      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{topic}</span>
    );
  }

  return (
    <div className="topic-row">
      <div className="topic-row-left">
        {isCompleted ? (
          <CircleCheck className="topic-row-icon topic-row-icon-done" />
        ) : (
          <Circle className="topic-row-icon topic-row-icon-pending" />
        )}
        <span className="topic-row-name">{topic}</span>
      </div>
      <div className="topic-row-actions">
        <span
          className={`topic-status-badge ${
            isCompleted ? "topic-status-badge-done" : "topic-status-badge-pending"
          }`}
        >
          {isCompleted ? "Done" : "Pending"}
        </span>
        <button
          type="button"
          className={`topic-complete-btn flex items-center gap-1 ${
            isCompleted ? "topic-complete-btn-done" : "topic-complete-btn-default"
          }`}
          disabled={isCompleted || marking}
          onClick={() => onMarkComplete(courseCode, topic)}
        >
          <CheckSquare className="h-3.5 w-3.5" aria-hidden="true" />
          {isCompleted ? "✓ Completed" : "Mark complete"}
        </button>
      </div>
    </div>
  );
}

export default function CurriculumAccordion({
  curriculum,
  interactive = false,
  completions = {},
  onMarkComplete,
  markingTopicId = null,
}) {
  const semesters = curriculum?.semesterData || curriculum?.semesters || [];
  const [openSem, setOpenSem] = useState(semesters[0]?.semester ?? 1);

  if (!semesters.length) return null;

  return (
    <div className="space-y-3">
      {semesters.map((sem) => (
        <div key={sem.semester} className="overflow-hidden rounded-xl border border-slate-200">
          <button
            onClick={() => setOpenSem(openSem === sem.semester ? null : sem.semester)}
            className="flex w-full items-center justify-between bg-[#F8FAFC] px-5 py-4 text-left"
          >
            <span className="font-semibold text-slate-800">Semester {sem.semester}</span>
            {openSem === sem.semester ? (
              <ChevronUp className="h-4 w-4 text-slate-500" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-500" aria-hidden="true" />
            )}
          </button>

          {openSem === sem.semester && (
            <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
              {sem.courses.map((course) => {
                const total = countCourseTopics(course);
                const completed = interactive
                  ? countCompletedInCourse(course, completions)
                  : 0;

                return (
                  <div
                    key={course.code}
                    className="rounded-lg border border-slate-100 bg-white p-4 shadow-sm"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <span className="rounded bg-[#EFF6FF] px-2 py-0.5 text-xs font-mono text-brand">
                        {course.code}
                      </span>
                      <span className="text-xs text-slate-500">{course.credits} credits</span>
                    </div>
                    <h4 className="font-medium text-slate-800">{course.name}</h4>
                    <p className="mt-1 text-sm text-slate-500">{course.description}</p>

                    {interactive && (
                      <TopicProgressBar completed={completed} total={total} className="mt-3" />
                    )}

                    <div className={interactive ? "mt-2" : "mt-3 flex flex-wrap gap-1"}>
                      {course.topics.map((topic) => {
                        const topicId = makeTopicId(course.code, topic);
                        return (
                          <TopicRow
                            key={topicId}
                            topic={topic}
                            courseCode={course.code}
                            isCompleted={Boolean(completions[topicId])}
                            interactive={interactive}
                            onMarkComplete={onMarkComplete}
                            marking={markingTopicId === topicId}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}

      {curriculum.capstoneProject && (
        <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-5">
          <h3 className="font-semibold text-brand">Capstone Project</h3>
          <p className="mt-2 text-sm text-slate-600">{curriculum.capstoneProject}</p>
        </div>
      )}
    </div>
  );
}
