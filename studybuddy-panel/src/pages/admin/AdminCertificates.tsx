import { useState } from "react";
import { Search, Download, RefreshCw, Eye, Award } from "lucide-react";

interface Certificate {
  id: string;
  certificateId: string;
  studentName: string;
  studentEmail: string;
  course: string;
  score: number;
  issuedDate: string;
  status: "valid" | "expired" | "revoked";
}

const certificates: Certificate[] = [
  {
    id: "1",
    certificateId: "CERT-2025-001234",
    studentName: "John Doe",
    studentEmail: "john.doe@email.com",
    course: "React Fundamentals",
    score: 92,
    issuedDate: "Dec 1, 2025",
    status: "valid",
  },
  {
    id: "2",
    certificateId: "CERT-2025-001235",
    studentName: "Sarah Smith",
    studentEmail: "sarah.smith@email.com",
    course: "Python for Data Science",
    score: 88,
    issuedDate: "Nov 28, 2025",
    status: "valid",
  },
  {
    id: "3",
    certificateId: "CERT-2025-001236",
    studentName: "Michael Johnson",
    studentEmail: "m.johnson@email.com",
    course: "JavaScript Advanced",
    score: 75,
    issuedDate: "Nov 25, 2025",
    status: "valid",
  },
  {
    id: "4",
    certificateId: "CERT-2024-000892",
    studentName: "Emily Brown",
    studentEmail: "emily.b@email.com",
    course: "UI/UX Design Principles",
    score: 95,
    issuedDate: "Aug 15, 2024",
    status: "expired",
  },
  {
    id: "5",
    certificateId: "CERT-2024-000756",
    studentName: "David Wilson",
    studentEmail: "d.wilson@email.com",
    course: "Machine Learning Basics",
    score: 70,
    issuedDate: "Jun 20, 2024",
    status: "revoked",
  },
];

export default function AdminCertificates() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: Certificate["status"]) => {
    const styles = {
      valid: "badge-success",
      expired: "badge-warning",
      revoked: "badge-muted",
    };
    return <span className={`badge ${styles[status]}`}>{status}</span>;
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Certificate Management</h1>
          <p className="text-muted-foreground mt-1">
            View, validate, and manage issued certificates
          </p>
        </div>
      </div>

      {/* Search & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-2 dashboard-card p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by certificate ID, student name, or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-success/10 rounded-lg">
              <Award className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Issued</p>
              <p className="text-2xl font-semibold">1,204</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-semibold">156</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="dashboard-card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Certificate ID</th>
              <th>Student</th>
              <th>Course</th>
              <th>Score</th>
              <th>Issued Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert) => (
              <tr key={cert.id}>
                <td>
                  <span className="font-mono text-sm">{cert.certificateId}</span>
                </td>
                <td>
                  <div>
                    <p className="font-medium">{cert.studentName}</p>
                    <p className="text-sm text-muted-foreground">{cert.studentEmail}</p>
                  </div>
                </td>
                <td>{cert.course}</td>
                <td>
                  <span
                    className={`font-medium ${
                      cert.score >= 80 ? "text-success" : "text-warning"
                    }`}
                  >
                    {cert.score}%
                  </span>
                </td>
                <td className="text-muted-foreground">{cert.issuedDate}</td>
                <td>{getStatusBadge(cert.status)}</td>
                <td>
                  <div className="flex items-center gap-1">
                    <button
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="View Certificate"
                    >
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="Regenerate"
                    >
                      <RefreshCw className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing 1-{certificates.length} of {certificates.length} certificates
          </p>
          <div className="flex gap-2">
            <button className="btn-outline py-2 px-3">Previous</button>
            <button className="btn-primary py-2 px-3">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
