import { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Mail,
  RotateCcw,
  Award,
  X,
} from "lucide-react";
import { ProgressBar } from "@/components/dashboard/ProgressBar";

interface Student {
  id: string;
  name: string;
  email: string;
  enrolledCourses: number;
  completedCourses: number;
  avgProgress: number;
  certificates: number;
  joinedDate: string;
  status: "active" | "inactive";
}

const students: Student[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    enrolledCourses: 5,
    completedCourses: 3,
    avgProgress: 72,
    certificates: 3,
    joinedDate: "Jan 15, 2025",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah.smith@email.com",
    enrolledCourses: 8,
    completedCourses: 6,
    avgProgress: 89,
    certificates: 6,
    joinedDate: "Feb 20, 2025",
    status: "active",
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "m.johnson@email.com",
    enrolledCourses: 3,
    completedCourses: 1,
    avgProgress: 45,
    certificates: 1,
    joinedDate: "Mar 10, 2025",
    status: "active",
  },
  {
    id: "4",
    name: "Emily Brown",
    email: "emily.b@email.com",
    enrolledCourses: 4,
    completedCourses: 4,
    avgProgress: 100,
    certificates: 4,
    joinedDate: "Nov 5, 2024",
    status: "inactive",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "d.wilson@email.com",
    enrolledCourses: 6,
    completedCourses: 2,
    avgProgress: 38,
    certificates: 2,
    joinedDate: "Apr 1, 2025",
    status: "active",
  },
];

export default function AdminStudents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Manage Students</h1>
          <p className="text-muted-foreground mt-1">
            View and manage student progress and activities
          </p>
        </div>
        <button className="btn-outline">
          <Filter className="w-4 h-4" />
          Export Data
        </button>
      </div>

      {/* Search & Filters */}
      <div className="dashboard-card p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select className="input-field w-auto">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <select className="input-field w-auto">
              <option>All Courses</option>
              <option>React Fundamentals</option>
              <option>Python for Data Science</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="dashboard-card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Enrolled</th>
              <th>Completed</th>
              <th>Progress</th>
              <th>Certificates</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td>{student.enrolledCourses}</td>
                <td>{student.completedCourses}</td>
                <td className="w-40">
                  <ProgressBar value={student.avgProgress} size="sm" />
                </td>
                <td>
                  <span className="flex items-center gap-1">
                    <Award className="w-4 h-4 text-warning" />
                    {student.certificates}
                  </span>
                </td>
                <td className="text-muted-foreground">{student.joinedDate}</td>
                <td>
                  <span
                    className={`badge ${
                      student.status === "active" ? "badge-success" : "badge-muted"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="Send Email"
                    >
                      <Mail className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="Reset Progress"
                    >
                      <RotateCcw className="w-4 h-4 text-muted-foreground" />
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
            Showing 1-{students.length} of {students.length} students
          </p>
          <div className="flex gap-2">
            <button className="btn-outline py-2 px-3">Previous</button>
            <button className="btn-primary py-2 px-3">Next</button>
          </div>
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="modal-overlay" onClick={() => setSelectedStudent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold">Student Details</h2>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-semibold text-primary">
                    {selectedStudent.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedStudent.name}</h3>
                  <p className="text-muted-foreground">{selectedStudent.email}</p>
                  <p className="text-sm text-muted-foreground">
                    Joined {selectedStudent.joinedDate}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                  <p className="text-2xl font-semibold">{selectedStudent.enrolledCourses}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-semibold">{selectedStudent.completedCourses}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Certificates</p>
                  <p className="text-2xl font-semibold">{selectedStudent.certificates}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Avg Progress</p>
                  <p className="text-2xl font-semibold">{selectedStudent.avgProgress}%</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="btn-outline flex-1">
                  <Mail className="w-4 h-4" />
                  Send Message
                </button>
                <button className="btn-primary flex-1">
                  <Award className="w-4 h-4" />
                  View Certificates
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
