import { useState } from "react";
import { Search, MessageSquare, User, Clock, Filter, Eye } from "lucide-react";

interface ChatLog {
  id: string;
  studentName: string;
  studentEmail: string;
  question: string;
  response: string;
  timestamp: string;
  topic: string;
}

const chatLogs: ChatLog[] = [
  {
    id: "1",
    studentName: "John Doe",
    studentEmail: "john.doe@email.com",
    question: "How do I create a React component?",
    response: "A React component can be created as either a function or a class. The simplest way is to create a function component...",
    timestamp: "Dec 6, 2025 10:30 AM",
    topic: "React",
  },
  {
    id: "2",
    studentName: "Sarah Smith",
    studentEmail: "sarah.smith@email.com",
    question: "What is the difference between == and === in JavaScript?",
    response: "The == operator performs type coercion before comparison, while === is a strict equality operator that checks both value and type...",
    timestamp: "Dec 6, 2025 10:15 AM",
    topic: "JavaScript",
  },
  {
    id: "3",
    studentName: "Michael Johnson",
    studentEmail: "m.johnson@email.com",
    question: "Can you explain Python decorators?",
    response: "Decorators in Python are a way to modify or extend the behavior of functions or classes without directly changing their source code...",
    timestamp: "Dec 6, 2025 09:45 AM",
    topic: "Python",
  },
  {
    id: "4",
    studentName: "Emily Brown",
    studentEmail: "emily.b@email.com",
    question: "How do I center a div in CSS?",
    response: "There are several ways to center a div in CSS. The most modern approach is using Flexbox: display: flex; justify-content: center; align-items: center;",
    timestamp: "Dec 6, 2025 09:30 AM",
    topic: "CSS",
  },
  {
    id: "5",
    studentName: "David Wilson",
    studentEmail: "d.wilson@email.com",
    question: "What is machine learning supervised learning?",
    response: "Supervised learning is a type of machine learning where the model is trained on labeled data. The algorithm learns to map inputs to outputs based on example input-output pairs...",
    timestamp: "Dec 6, 2025 09:00 AM",
    topic: "Machine Learning",
  },
];

export default function AdminChatLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLog, setSelectedLog] = useState<ChatLog | null>(null);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">AI Chat Logs</h1>
          <p className="text-muted-foreground mt-1">
            View student interactions with the AI tutor
          </p>
        </div>
        <button className="btn-outline">
          <Filter className="w-4 h-4" />
          Export Logs
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Total Chats Today</p>
          <p className="text-2xl font-semibold mt-1">234</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Active Sessions</p>
          <p className="text-2xl font-semibold mt-1">18</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Avg Response Time</p>
          <p className="text-2xl font-semibold mt-1">1.2s</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
          <p className="text-2xl font-semibold mt-1">94%</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="dashboard-card p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by student, question, or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select className="input-field w-auto">
              <option>All Topics</option>
              <option>React</option>
              <option>JavaScript</option>
              <option>Python</option>
              <option>CSS</option>
            </select>
            <select className="input-field w-auto">
              <option>Today</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chat Logs List */}
      <div className="space-y-4">
        {chatLogs.map((log) => (
          <div key={log.id} className="dashboard-card p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{log.studentName}</p>
                    <span className="badge badge-primary">{log.topic}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{log.studentEmail}</p>
                  <div className="p-3 bg-muted/50 rounded-lg mb-2">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Student Question:
                    </p>
                    <p className="text-sm mt-1">{log.question}</p>
                  </div>
                  <div className="p-3 bg-primary/5 rounded-lg">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      AI Response:
                    </p>
                    <p className="text-sm mt-1 line-clamp-2">{log.response}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {log.timestamp}
                </span>
                <button
                  onClick={() => setSelectedLog(log)}
                  className="btn-outline py-1.5 px-3 text-sm"
                >
                  <Eye className="w-4 h-4" />
                  View Full
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Chat Modal */}
      {selectedLog && (
        <div className="modal-overlay" onClick={() => setSelectedLog(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{selectedLog.studentName}</p>
                    <p className="text-sm text-muted-foreground">{selectedLog.timestamp}</p>
                  </div>
                </div>
                <span className="badge badge-primary">{selectedLog.topic}</span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="chat-bubble-user">
                <p className="text-sm">{selectedLog.question}</p>
              </div>
              <div className="chat-bubble-ai">
                <p className="text-sm">{selectedLog.response}</p>
              </div>
            </div>
            <div className="p-4 border-t border-border flex justify-end">
              <button onClick={() => setSelectedLog(null)} className="btn-outline">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
