import { useState } from "react";
import { ClipboardList, Clock, CheckCircle, XCircle, Play, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Quiz {
  id: string;
  title: string;
  course: string;
  questions: number;
  duration: string;
  passScore: number;
  status: "pending" | "completed" | "failed";
  score?: number;
  completedDate?: string;
  dueDate?: string;
}

const quizzes: Quiz[] = [
  {
    id: "1",
    title: "React Hooks Quiz",
    course: "React Fundamentals",
    questions: 15,
    duration: "20 min",
    passScore: 70,
    status: "pending",
    dueDate: "Dec 8, 2025",
  },
  {
    id: "2",
    title: "Python Variables Test",
    course: "Python for Data Science",
    questions: 20,
    duration: "30 min",
    passScore: 60,
    status: "pending",
    dueDate: "Dec 10, 2025",
  },
  {
    id: "3",
    title: "JSX Fundamentals Quiz",
    course: "React Fundamentals",
    questions: 10,
    duration: "15 min",
    passScore: 70,
    status: "completed",
    score: 90,
    completedDate: "Dec 4, 2025",
  },
  {
    id: "4",
    title: "React Components Quiz",
    course: "React Fundamentals",
    questions: 12,
    duration: "20 min",
    passScore: 70,
    status: "completed",
    score: 85,
    completedDate: "Dec 2, 2025",
  },
  {
    id: "5",
    title: "Data Types in Python",
    course: "Python for Data Science",
    questions: 15,
    duration: "25 min",
    passScore: 65,
    status: "failed",
    score: 55,
    completedDate: "Nov 30, 2025",
  },
];

export default function StudentQuizzes() {
  const [activeTab, setActiveTab] = useState<"pending" | "completed" | "failed">("pending");

  const filteredQuizzes = quizzes.filter((quiz) => {
    if (activeTab === "pending") return quiz.status === "pending";
    if (activeTab === "completed") return quiz.status === "completed";
    if (activeTab === "failed") return quiz.status === "failed";
    return true;
  });

  const pendingCount = quizzes.filter((q) => q.status === "pending").length;
  const completedCount = quizzes.filter((q) => q.status === "completed").length;
  const failedCount = quizzes.filter((q) => q.status === "failed").length;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Quizzes</h1>
          <p className="text-muted-foreground mt-1">
            Test your knowledge and track your performance
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="stat-card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <ClipboardList className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-semibold">{pendingCount}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-success/10 rounded-lg">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Passed</p>
              <p className="text-2xl font-semibold">{completedCount}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-destructive/10 rounded-lg">
              <XCircle className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Failed</p>
              <p className="text-2xl font-semibold">{failedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 bg-muted rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("pending")}
          className={cn(
            "px-4 py-2 rounded-md text-sm font-medium transition-colors",
            activeTab === "pending"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Pending ({pendingCount})
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={cn(
            "px-4 py-2 rounded-md text-sm font-medium transition-colors",
            activeTab === "completed"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Passed ({completedCount})
        </button>
        <button
          onClick={() => setActiveTab("failed")}
          className={cn(
            "px-4 py-2 rounded-md text-sm font-medium transition-colors",
            activeTab === "failed"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Failed ({failedCount})
        </button>
      </div>

      {/* Quiz List */}
      <div className="space-y-4">
        {filteredQuizzes.map((quiz) => (
          <div key={quiz.id} className="dashboard-card p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* Icon */}
              <div
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0",
                  quiz.status === "pending" && "bg-primary/10",
                  quiz.status === "completed" && "bg-success/10",
                  quiz.status === "failed" && "bg-destructive/10"
                )}
              >
                {quiz.status === "pending" && (
                  <ClipboardList className="w-7 h-7 text-primary" />
                )}
                {quiz.status === "completed" && (
                  <CheckCircle className="w-7 h-7 text-success" />
                )}
                {quiz.status === "failed" && (
                  <XCircle className="w-7 h-7 text-destructive" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{quiz.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{quiz.course}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span>{quiz.questions} questions</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {quiz.duration}
                  </span>
                  <span>Pass score: {quiz.passScore}%</span>
                </div>
              </div>

              {/* Status & Action */}
              <div className="text-right">
                {quiz.status === "pending" && (
                  <>
                    <p className="text-sm text-muted-foreground mb-2">
                      Due: {quiz.dueDate}
                    </p>
                    <button className="btn-primary">
                      <Play className="w-4 h-4" />
                      Start Quiz
                    </button>
                  </>
                )}
                {quiz.status === "completed" && (
                  <>
                    <p className="text-2xl font-bold text-success mb-1">
                      {quiz.score}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Completed {quiz.completedDate}
                    </p>
                  </>
                )}
                {quiz.status === "failed" && (
                  <>
                    <p className="text-2xl font-bold text-destructive mb-1">
                      {quiz.score}%
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Failed {quiz.completedDate}
                    </p>
                    <button className="btn-outline">
                      <ArrowRight className="w-4 h-4" />
                      Retry Quiz
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredQuizzes.length === 0 && (
          <div className="dashboard-card p-12 text-center">
            <ClipboardList className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No quizzes found</h3>
            <p className="text-muted-foreground">
              {activeTab === "pending"
                ? "You have no pending quizzes at the moment."
                : activeTab === "completed"
                ? "You haven't passed any quizzes yet."
                : "Great job! You haven't failed any quizzes."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
