import { ClipboardList, Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizCardProps {
  title: string;
  course: string;
  questions: number;
  duration: string;
  status?: "pending" | "completed" | "failed";
  score?: number;
  dueDate?: string;
  onStart?: () => void;
}

export function QuizCard({
  title,
  course,
  questions,
  duration,
  status = "pending",
  score,
  dueDate,
  onStart,
}: QuizCardProps) {
  return (
    <div className="dashboard-card p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "p-2 rounded-lg",
              status === "completed" && "bg-success/10 text-success",
              status === "failed" && "bg-destructive/10 text-destructive",
              status === "pending" && "bg-primary/10 text-primary"
            )}
          >
            {status === "completed" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <ClipboardList className="w-5 h-5" />
            )}
          </div>
          <div>
            <h4 className="font-medium">{title}</h4>
            <p className="text-sm text-muted-foreground">{course}</p>
          </div>
        </div>
        {score !== undefined && (
          <span
            className={cn(
              "badge",
              score >= 70 ? "badge-success" : "badge-warning"
            )}
          >
            {score}%
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
        <span>{questions} questions</span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {duration}
        </span>
      </div>

      {dueDate && status === "pending" && (
        <p className="text-sm text-muted-foreground mt-2">Due: {dueDate}</p>
      )}

      {status === "pending" && onStart && (
        <button onClick={onStart} className="btn-primary w-full mt-4">
          Start Quiz
        </button>
      )}
    </div>
  );
}
