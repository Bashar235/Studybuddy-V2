import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Upload,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Course {
  id: string;
  title: string;
  category: string;
  status: "published" | "draft" | "archived";
  students: number;
  modules: number;
  lastUpdated: string;
}

const courses: Course[] = [
  {
    id: "1",
    title: "React Fundamentals",
    category: "Web Development",
    status: "published",
    students: 342,
    modules: 12,
    lastUpdated: "Dec 4, 2025",
  },
  {
    id: "2",
    title: "Python for Data Science",
    category: "Data Science",
    status: "published",
    students: 567,
    modules: 18,
    lastUpdated: "Dec 3, 2025",
  },
  {
    id: "3",
    title: "JavaScript Advanced Concepts",
    category: "Web Development",
    status: "draft",
    students: 0,
    modules: 8,
    lastUpdated: "Dec 2, 2025",
  },
  {
    id: "4",
    title: "UI/UX Design Principles",
    category: "Design",
    status: "published",
    students: 234,
    modules: 10,
    lastUpdated: "Dec 1, 2025",
  },
  {
    id: "5",
    title: "Machine Learning Basics",
    category: "AI & ML",
    status: "archived",
    students: 890,
    modules: 15,
    lastUpdated: "Nov 28, 2025",
  },
];

export default function AdminCourses() {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: Course["status"]) => {
    const styles = {
      published: "badge-success",
      draft: "badge-warning",
      archived: "badge-muted",
    };
    return <span className={cn("badge", styles[status])}>{status}</span>;
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Manage Courses</h1>
          <p className="text-muted-foreground mt-1">Create, edit, and manage your courses</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          <Plus className="w-4 h-4" />
          Add New Course
        </button>
      </div>

      {/* Filters */}
      <div className="dashboard-card p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field w-auto"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            <button className="btn-outline">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="dashboard-card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Course Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Students</th>
              <th>Modules</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course.id}>
                <td className="font-medium">{course.title}</td>
                <td>
                  <span className="badge badge-primary">{course.category}</span>
                </td>
                <td>{getStatusBadge(course.status)}</td>
                <td>{course.students.toLocaleString()}</td>
                <td>{course.modules}</td>
                <td className="text-muted-foreground">{course.lastUpdated}</td>
                <td>
                  <div className="flex items-center gap-1">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-destructive" />
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
            Showing 1-{filteredCourses.length} of {courses.length} courses
          </p>
          <div className="flex gap-2">
            <button className="btn-outline py-2 px-3">Previous</button>
            <button className="btn-primary py-2 px-3">Next</button>
          </div>
        </div>
      </div>

      {/* Add Course Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold">Add New Course</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Course Title</label>
                <input
                  type="text"
                  placeholder="Enter course title"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  placeholder="Enter course description"
                  rows={4}
                  className="input-field resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select className="input-field">
                    <option>Web Development</option>
                    <option>Data Science</option>
                    <option>Design</option>
                    <option>AI & ML</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <input type="text" placeholder="e.g., 8 hours" className="input-field" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Course Content</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drag and drop files or{" "}
                    <button className="text-primary hover:underline">browse</button>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supports PDF, videos, SCORM packages
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-border">
              <button onClick={() => setShowModal(false)} className="btn-outline">
                Cancel
              </button>
              <button className="btn-secondary">Save as Draft</button>
              <button className="btn-primary">Publish Course</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
