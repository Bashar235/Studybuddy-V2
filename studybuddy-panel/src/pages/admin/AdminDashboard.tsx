import {
  BookOpen,
  Users,
  ClipboardList,
  Award,
  TrendingUp,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityItem } from "@/components/dashboard/ActivityItem";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const courseData = [
  { name: "Jan", courses: 12 },
  { name: "Feb", courses: 19 },
  { name: "Mar", courses: 15 },
  { name: "Apr", courses: 25 },
  { name: "May", courses: 32 },
  { name: "Jun", courses: 28 },
];

const studentActivityData = [
  { name: "Mon", active: 320 },
  { name: "Tue", active: 420 },
  { name: "Wed", active: 380 },
  { name: "Thu", active: 450 },
  { name: "Fri", active: 520 },
  { name: "Sat", active: 280 },
  { name: "Sun", active: 190 },
];

const recentActivities = [
  {
    icon: BookOpen,
    iconColor: "bg-primary/10 text-primary",
    title: "New Course Added",
    description: "React Fundamentals by Jane Smith",
    time: "5 min ago",
  },
  {
    icon: Users,
    iconColor: "bg-success/10 text-success",
    title: "New Student Enrolled",
    description: "Michael Johnson joined the platform",
    time: "15 min ago",
  },
  {
    icon: ClipboardList,
    iconColor: "bg-warning/10 text-warning",
    title: "Quiz Completed",
    description: "JavaScript Basics Quiz - 85% avg score",
    time: "1 hour ago",
  },
  {
    icon: Award,
    iconColor: "bg-primary/10 text-primary",
    title: "Certificate Issued",
    description: "Python Programming certificate to Sarah Lee",
    time: "2 hours ago",
  },
];

const chatQuestions = [
  { question: "How do I reset my password?", count: 45 },
  { question: "What is React hooks?", count: 38 },
  { question: "Explain async/await", count: 32 },
  { question: "How to deploy to AWS?", count: 28 },
];

export default function AdminDashboard() {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Admin!</p>
        </div>
        <button className="btn-primary">
          <TrendingUp className="w-4 h-4" />
          View Reports
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Courses"
          value={128}
          change="+12% from last month"
          changeType="positive"
          icon={BookOpen}
        />
        <StatCard
          title="Total Students"
          value="2,847"
          change="+8% from last month"
          changeType="positive"
          icon={Users}
          iconColor="bg-success/10 text-success"
        />
        <StatCard
          title="Total Quizzes"
          value={342}
          change="+15% from last month"
          changeType="positive"
          icon={ClipboardList}
          iconColor="bg-warning/10 text-warning"
        />
        <StatCard
          title="Certificates Issued"
          value={1204}
          change="+23% from last month"
          changeType="positive"
          icon={Award}
          iconColor="bg-chart-4/20 text-chart-4"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Course Enrollment Chart */}
        <div className="dashboard-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="section-title mb-0">Course Enrollments</h3>
            <button className="text-sm text-primary hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="courses" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Student Activity Chart */}
        <div className="dashboard-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="section-title mb-0">Student Activity</h3>
            <select className="input-field w-auto py-1 text-sm">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={studentActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="active"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--success))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="dashboard-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title mb-0">Recent Activity</h3>
            <button className="text-sm text-primary hover:underline">View All</button>
          </div>
          <div className="divide-y divide-border">
            {recentActivities.map((activity, index) => (
              <ActivityItem key={index} {...activity} />
            ))}
          </div>
        </div>

        {/* Recent Chatbot Questions */}
        <div className="dashboard-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title mb-0">Top AI Chat Questions</h3>
            <button className="text-sm text-primary hover:underline flex items-center gap-1">
              View Logs <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {chatQuestions.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm">{item.question}</p>
                </div>
                <span className="badge badge-muted">{item.count} times</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
