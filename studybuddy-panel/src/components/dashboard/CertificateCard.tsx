import { Award, Download, Eye } from "lucide-react";

interface CertificateCardProps {
  courseName: string;
  completedDate: string;
  score: number;
  certificateId: string;
  onDownload?: () => void;
  onView?: () => void;
}

export function CertificateCard({
  courseName,
  completedDate,
  score,
  certificateId,
  onDownload,
  onView,
}: CertificateCardProps) {
  return (
    <div className="dashboard-card p-4">
      <div className="flex items-start gap-4">
        {/* Certificate Icon */}
        <div className="w-16 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center border border-primary/20">
          <Award className="w-8 h-8 text-primary" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h4 className="font-semibold">{courseName}</h4>
          <p className="text-sm text-muted-foreground mt-1">Completed: {completedDate}</p>
          <p className="text-sm text-muted-foreground">Score: {score}%</p>
          <p className="text-xs text-muted-foreground mt-1">ID: {certificateId}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        {onView && (
          <button onClick={onView} className="btn-outline flex-1">
            <Eye className="w-4 h-4" />
            View
          </button>
        )}
        {onDownload && (
          <button onClick={onDownload} className="btn-primary flex-1">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        )}
      </div>
    </div>
  );
}
