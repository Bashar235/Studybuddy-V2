import { useState } from "react";
import { Play, Clock, CheckCircle, Circle, Lock, ChevronDown, ChevronUp, ClipboardList, Award, BookOpen } from "lucide-react";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { cn } from "@/lib/utils";

interface Module {
  id: string;
  title: string;
  duration: string;
  lessons: {
    id: string;
    title: string;
    duration: string;
    completed: boolean;
    hasQuiz: boolean;
    locked: boolean;
  }[];
  completed: boolean;
}

const courseModules: Module[] = [
  {
    id: "1",
    title: "Introduction to React",
    duration: "45 min",
    completed: true,
    lessons: [
      { id: "1-1", title: "What is React?", duration: "10 min", completed: true, hasQuiz: false, locked: false },
      { id: "1-2", title: "Setting Up Your Environment", duration: "15 min", completed: true, hasQuiz: false, locked: false },
      { id: "1-3", title: "Your First React Component", duration: "20 min", completed: true, hasQuiz: true, locked: false },
    ],
  },
  {
    id: "2",
    title: "JSX Fundamentals",
    duration: "1h 15min",
    completed: true,
    lessons: [
      { id: "2-1", title: "Understanding JSX Syntax", duration: "20 min", completed: true, hasQuiz: false, locked: false },
      { id: "2-2", title: "Expressions in JSX", duration: "25 min", completed: true, hasQuiz: false, locked: false },
      { id: "2-3", title: "Conditional Rendering", duration: "30 min", completed: true, hasQuiz: true, locked: false },
    ],
  },
  {
    id: "3",
    title: "React Hooks Deep Dive",
    duration: "2h",
    completed: false,
    lessons: [
      { id: "3-1", title: "Understanding useState", duration: "25 min", completed: true, hasQuiz: false, locked: false },
      { id: "3-2", title: "useEffect Explained", duration: "30 min", completed: false, hasQuiz: false, locked: false },
      { id: "3-3", title: "Custom Hooks", duration: "35 min", completed: false, hasQuiz: false, locked: false },
      { id: "3-4", title: "useContext & useReducer", duration: "30 min", completed: false, hasQuiz: true, locked: false },
    ],
  },
  {
    id: "4",
    title: "Advanced Patterns",
    duration: "1h 45min",
    completed: false,
    lessons: [
      { id: "4-1", title: "Higher-Order Components", duration: "30 min", completed: false, hasQuiz: false, locked: true },
      { id: "4-2", title: "Render Props Pattern", duration: "35 min", completed: false, hasQuiz: false, locked: true },
      { id: "4-3", title: "Compound Components", duration: "40 min", completed: false, hasQuiz: true, locked: true },
    ],
  },
];

export default function StudentContinue() {
  const [expandedModules, setExpandedModules] = useState<string[]>(["3"]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const totalLessons = courseModules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = courseModules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.completed).length,
    0
  );
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Continue Learning</h1>
          <p className="text-muted-foreground mt-1">
            Pick up where you left off
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Current Course Header */}
          <div className="dashboard-card p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <span className="badge badge-primary mb-2">Web Development</span>
                <h2 className="text-xl font-semibold">React Fundamentals</h2>
                <p className="text-muted-foreground">by Jane Smith</p>
              </div>
              <button className="btn-primary">
                <Play className="w-4 h-4" />
                Resume Learning
              </button>
            </div>
            <ProgressBar value={progressPercent} />
            <p className="text-sm text-muted-foreground mt-2">
              {completedLessons} of {totalLessons} lessons completed
            </p>
          </div>

          {/* Course Modules */}
          <div className="space-y-4">
            {courseModules.map((module, moduleIndex) => (
              <div key={module.id} className="dashboard-card overflow-hidden">
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        module.completed
                          ? "bg-success/10 text-success"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {module.completed ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="font-semibold">{moduleIndex + 1}</span>
                      )}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">{module.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {module.lessons.length} lessons • {module.duration}
                      </p>
                    </div>
                  </div>
                  {expandedModules.includes(module.id) ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>

                {expandedModules.includes(module.id) && (
                  <div className="border-t border-border">
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className={cn(
                          "flex items-center gap-4 px-4 py-3 border-b border-border last:border-0",
                          lesson.locked && "opacity-50"
                        )}
                      >
                        <div className="flex-shrink-0">
                          {lesson.completed ? (
                            <CheckCircle className="w-5 h-5 text-success" />
                          ) : lesson.locked ? (
                            <Lock className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <Circle className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{lesson.title}</p>
                            {lesson.hasQuiz && (
                              <span className="badge badge-warning text-xs">Quiz</span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                        </div>
                        {!lesson.locked && (
                          <button
                            className={cn(
                              "btn-outline py-1.5 px-3 text-sm",
                              !lesson.completed && "btn-primary"
                            )}
                          >
                            {lesson.completed ? "Review" : "Start"}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          {/* Progress Card */}
          <div className="dashboard-card p-6">
            <h3 className="font-semibold mb-4">Your Progress</h3>
            <div className="text-center mb-4">
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${progressPercent * 3.52} 352`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">{progressPercent}%</span>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lessons Completed</span>
                <span className="font-medium">{completedLessons}/{totalLessons}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Modules Completed</span>
                <span className="font-medium">
                  {courseModules.filter((m) => m.completed).length}/{courseModules.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time Remaining</span>
                <span className="font-medium">2h 15m</span>
              </div>
            </div>
          </div>

          {/* Course Info */}
          <div className="dashboard-card p-6">
            <h3 className="font-semibold mb-4">Course Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Duration</p>
                  <p className="font-medium">8h 30m</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <BookOpen className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Modules</p>
                  <p className="font-medium">12 modules</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <ClipboardList className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quizzes</p>
                  <p className="font-medium">4 quizzes</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-chart-4/20 rounded-lg">
                  <Award className="w-5 h-5 text-chart-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Certificate</p>
                  <p className="font-medium">Available upon completion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
