import { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  X,
  GripVertical,
  CheckCircle,
  Circle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Quiz {
  id: string;
  title: string;
  course: string;
  questions: number;
  passScore: number;
  attempts: number;
  avgScore: number;
  status: "active" | "inactive";
}

const quizzes: Quiz[] = [
  {
    id: "1",
    title: "React Basics Quiz",
    course: "React Fundamentals",
    questions: 20,
    passScore: 70,
    attempts: 245,
    avgScore: 78,
    status: "active",
  },
  {
    id: "2",
    title: "Python Variables Test",
    course: "Python for Data Science",
    questions: 15,
    passScore: 60,
    attempts: 389,
    avgScore: 82,
    status: "active",
  },
  {
    id: "3",
    title: "JavaScript Functions",
    course: "JavaScript Advanced Concepts",
    questions: 25,
    passScore: 75,
    attempts: 0,
    avgScore: 0,
    status: "inactive",
  },
  {
    id: "4",
    title: "Design Principles",
    course: "UI/UX Design Principles",
    questions: 18,
    passScore: 65,
    attempts: 156,
    avgScore: 71,
    status: "active",
  },
];

export default function AdminQuizzes() {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [questions, setQuestions] = useState([
    { id: 1, type: "mcq", question: "", options: ["", "", "", ""], correctAnswer: 0 },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: questions.length + 1, type: "mcq", question: "", options: ["", "", "", ""], correctAnswer: 0 },
    ]);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Manage Quizzes</h1>
          <p className="text-muted-foreground mt-1">Create and manage course quizzes</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          <Plus className="w-4 h-4" />
          Create Quiz
        </button>
      </div>

      {/* Search */}
      <div className="dashboard-card p-4 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="dashboard-card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Quiz Title</th>
              <th>Course</th>
              <th>Questions</th>
              <th>Pass Score</th>
              <th>Attempts</th>
              <th>Avg Score</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz.id}>
                <td className="font-medium">{quiz.title}</td>
                <td className="text-muted-foreground">{quiz.course}</td>
                <td>{quiz.questions}</td>
                <td>{quiz.passScore}%</td>
                <td>{quiz.attempts}</td>
                <td>
                  <span
                    className={cn(
                      "font-medium",
                      quiz.avgScore >= quiz.passScore ? "text-success" : "text-warning"
                    )}
                  >
                    {quiz.avgScore > 0 ? `${quiz.avgScore}%` : "-"}
                  </span>
                </td>
                <td>
                  <span
                    className={cn(
                      "badge",
                      quiz.status === "active" ? "badge-success" : "badge-muted"
                    )}
                  >
                    {quiz.status}
                  </span>
                </td>
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
      </div>

      {/* Create Quiz Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold">Create New Quiz</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Quiz Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Quiz Title</label>
                  <input
                    type="text"
                    placeholder="Enter quiz title"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Link to Course</label>
                  <select className="input-field">
                    <option>Select a course</option>
                    <option>React Fundamentals</option>
                    <option>Python for Data Science</option>
                    <option>JavaScript Advanced Concepts</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Pass Score (%)</label>
                  <input
                    type="number"
                    placeholder="70"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Time Limit (minutes)</label>
                  <input
                    type="number"
                    placeholder="30"
                    className="input-field"
                  />
                </div>
              </div>

              {/* Questions */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium">Questions</label>
                  <button onClick={addQuestion} className="btn-outline py-1.5 px-3 text-sm">
                    <Plus className="w-4 h-4" />
                    Add Question
                  </button>
                </div>

                <div className="space-y-4">
                  {questions.map((q, index) => (
                    <div key={q.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start gap-3">
                        <GripVertical className="w-5 h-5 text-muted-foreground mt-2 cursor-grab" />
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground">
                              Q{index + 1}.
                            </span>
                            <select className="input-field w-auto py-1 text-sm">
                              <option>Multiple Choice</option>
                              <option>True/False</option>
                              <option>Short Answer</option>
                            </select>
                          </div>
                          <input
                            type="text"
                            placeholder="Enter your question"
                            className="input-field"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            {q.options.map((_, optIndex) => (
                              <div key={optIndex} className="flex items-center gap-2">
                                <button
                                  className={cn(
                                    "flex-shrink-0",
                                    q.correctAnswer === optIndex
                                      ? "text-success"
                                      : "text-muted-foreground"
                                  )}
                                >
                                  {q.correctAnswer === optIndex ? (
                                    <CheckCircle className="w-5 h-5" />
                                  ) : (
                                    <Circle className="w-5 h-5" />
                                  )}
                                </button>
                                <input
                                  type="text"
                                  placeholder={`Option ${optIndex + 1}`}
                                  className="input-field py-2"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        <button className="p-1 hover:bg-muted rounded transition-colors">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-border">
              <button onClick={() => setShowModal(false)} className="btn-outline">
                Cancel
              </button>
              <button className="btn-secondary">Save Draft</button>
              <button className="btn-primary">Create Quiz</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
