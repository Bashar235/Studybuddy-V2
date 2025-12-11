import { Clock, Users, Play } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

interface CourseCardProps {
  title: string;
  category: string;
  progress?: number;
  thumbnail?: string;
  duration?: string;
  students?: number;
  showProgress?: boolean;
  onContinue?: () => void;
}

export function CourseCard({
  title,
  category,
  progress = 0,
  thumbnail,
  duration,
  students,
  showProgress = true,
  onContinue,
}: CourseCardProps) {
  return (
    <div className="dashboard-card overflow-hidden group">
      {/* Thumbnail */}
      <div className="relative h-40 bg-muted">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Play className="w-12 h-12 text-primary/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
      </div>

      {/* Content */}
      <div className="p-4">
        <span className="badge badge-primary text-xs">{category}</span>
        <h3 className="font-semibold mt-2 line-clamp-2">{title}</h3>

        {/* Meta */}
        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
          {duration && (
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {duration}
            </span>
          )}
          {students !== undefined && (
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {students}
            </span>
          )}
        </div>

        {/* Progress */}
        {showProgress && (
          <div className="mt-4">
            <ProgressBar value={progress} />
          </div>
        )}

        {/* Action */}
        {onContinue && (
          <button onClick={onContinue} className="btn-primary w-full mt-4">
            <Play className="w-4 h-4" />
            {progress > 0 ? "Continue" : "Start Course"}
          </button>
        )}
      </div>
    </div>
  );
}
