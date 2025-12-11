import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "success" | "warning";
}

export function ProgressBar({
  value,
  max = 100,
  className,
  showLabel = true,
  size = "md",
  color = "primary",
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  };

  const colorClasses = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
  };

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("progress-bar", sizeClasses[size])}>
        <div
          className={cn("progress-bar-fill", colorClasses[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-muted-foreground mt-1">{Math.round(percentage)}% complete</p>
      )}
    </div>
  );
}
