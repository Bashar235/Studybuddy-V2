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
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { TrendingUp, TrendingDown, Users, BookOpen, Award, MessageSquare } from "lucide-react";

const coursePopularityData = [
  { name: "React", enrollments: 342 },
  { name: "Python", enrollments: 567 },
  { name: "JavaScript", enrollments: 289 },
  { name: "UI/UX", enrollments: 234 },
  { name: "ML", enrollments: 445 },
  { name: "Node.js", enrollments: 198 },
];

const quizPerformanceData = [
  { name: "Week 1", avgScore: 72 },
  { name: "Week 2", avgScore: 75 },
  { name: "Week 3", avgScore: 68 },
  { name: "Week 4", avgScore: 82 },
  { name: "Week 5", avgScore: 78 },
  { name: "Week 6", avgScore: 85 },
];

const studentActivityData = [
  { name: "Jan", students: 120 },
  { name: "Feb", students: 180 },
  { name: "Mar", students: 220 },
  { name: "Apr", students: 280 },
  { name: "May", students: 350 },
  { name: "Jun", students: 420 },
];

const aiChatData = [
  { name: "Mon", chats: 145 },
  { name: "Tue", chats: 230 },
  { name: "Wed", chats: 198 },
  { name: "Thu", chats: 267 },
  { name: "Fri", chats: 312 },
  { name: "Sat", chats: 156 },
  { name: "Sun", chats: 89 },
];

const completionRateData = [
  { name: "Completed", value: 68, color: "hsl(var(--success))" },
  { name: "In Progress", value: 24, color: "hsl(var(--primary))" },
  { name: "Not Started", value: 8, color: "hsl(var(--muted))" },
];

export default function AdminAnalytics() {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Platform performance and insights
          </p>
        </div>
        <div className="flex gap-2">
          <select className="input-field w-auto">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This Year</option>
          </select>
          <button className="btn-primary">Export Report</button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Students</p>
              <p className="text-3xl font-semibold mt-1">2,847</p>
              <div className="flex items-center gap-1 mt-2 text-success text-sm">
                <TrendingUp className="w-4 h-4" />
                +12.5%
              </div>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <Users className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Course Completions</p>
              <p className="text-3xl font-semibold mt-1">1,204</p>
              <div className="flex items-center gap-1 mt-2 text-success text-sm">
                <TrendingUp className="w-4 h-4" />
                +8.2%
              </div>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-success" />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Quiz Score</p>
              <p className="text-3xl font-semibold mt-1">76.4%</p>
              <div className="flex items-center gap-1 mt-2 text-destructive text-sm">
                <TrendingDown className="w-4 h-4" />
                -2.1%
              </div>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <Award className="w-6 h-6 text-warning" />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">AI Chat Sessions</p>
              <p className="text-3xl font-semibold mt-1">1,397</p>
              <div className="flex items-center gap-1 mt-2 text-success text-sm">
                <TrendingUp className="w-4 h-4" />
                +24.8%
              </div>
            </div>
            <div className="p-3 bg-chart-4/20 rounded-lg">
              <MessageSquare className="w-6 h-6 text-chart-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Course Popularity */}
        <div className="dashboard-card p-6">
          <h3 className="section-title">Course Popularity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={coursePopularityData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis
                type="category"
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="enrollments" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quiz Performance */}
        <div className="dashboard-card p-6">
          <h3 className="section-title">Quiz Performance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={quizPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[60, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="avgScore"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--success))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Growth */}
        <div className="lg:col-span-2 dashboard-card p-6">
          <h3 className="section-title">Student Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={studentActivityData}>
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
              <Area
                type="monotone"
                dataKey="students"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary) / 0.2)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Completion Rate */}
        <div className="dashboard-card p-6">
          <h3 className="section-title">Course Completion Rate</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={completionRateData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {completionRateData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {completionRateData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Chat Usage */}
      <div className="dashboard-card p-6 mt-6">
        <h3 className="section-title">AI Chat Usage (This Week)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={aiChatData}>
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
            <Bar dataKey="chats" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
