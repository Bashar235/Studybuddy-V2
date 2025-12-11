import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItemProps {
  icon: LucideIcon;
  iconColor?: string;
  title: string;
  description: string;
  time: string;
}

export function ActivityItem({
  icon: Icon,
  iconColor = "bg-primary/10 text-primary",
  title,
  description,
  time,
}: ActivityItemProps) {
  return (
    <div className="flex items-start gap-4 py-3">
      <div className={cn("p-2 rounded-lg flex-shrink-0", iconColor)}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{title}</p>
        <p className="text-sm text-muted-foreground truncate">{description}</p>
      </div>
      <span className="text-xs text-muted-foreground whitespace-nowrap">{time}</span>
    </div>
  );
}
