import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Play,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { StatCard } from "@/components/dashboard/StatCard";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { QuizCard } from "@/components/dashboard/QuizCard";
import { ProgressBar } from "@/components/dashboard/ProgressBar";

const enrolledCourses = [
  {
    title: "React Fundamentals",
    category: "Web Development",
    progress: 75,
    duration: "8h 30m",
  },
  {
    title: "Python for Data Science",
    category: "Data Science",
    progress: 45,
    duration: "12h",
  },
  {
    title: "JavaScript Advanced Concepts",
    category: "Web Development",
    progress: 20,
    duration: "6h 45m",
  },
];

const upcomingQuizzes = [
  {
    title: "React Hooks Quiz",
    course: "React Fundamentals",
    questions: 15,
    duration: "20 min",
    dueDate: "Dec 8, 2025",
  },
  {
    title: "Python Variables Test",
    course: "Python for Data Science",
    questions: 20,
    duration: "30 min",
    dueDate: "Dec 10, 2025",
  },
];

export default function StudentDashboard() {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Welcome back, John! 👋</h1>
          <p className="text-muted-foreground mt-1">
            Continue your learning journey today
          </p>
        </div>
        <Link to="/student/chat" className="btn-primary">
          <MessageSquare className="w-4 h-4" />
          Chat with AI Tutor
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Enrolled Courses"
          value={5}
          icon={BookOpen}
        />
        <StatCard
          title="Hours Learned"
          value="42.5"
          change="+5.2 this week"
          changeType="positive"
          icon={Clock}
          iconColor="bg-success/10 text-success"
        />
        <StatCard
          title="Quizzes Completed"
          value={12}
          icon={TrendingUp}
          iconColor="bg-warning/10 text-warning"
        />
        <StatCard
          title="Certificates Earned"
          value={3}
          icon={Award}
          iconColor="bg-chart-4/20 text-chart-4"
        />
      </div>

      {/* Continue Learning */}
      <div className="dashboard-card p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title mb-0">Continue Learning</h2>
          <Link to="/student/continue" className="text-sm text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Current Course */}
          <div className="flex-1 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
            <div className="flex items-start justify-between mb-4">
              <span className="badge badge-primary">Currently Learning</span>
              <span className="text-sm text-muted-foreground">75% complete</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">React Fundamentals</h3>
            <p className="text-muted-foreground mb-4">Module 8: React Hooks Deep Dive</p>
            <ProgressBar value={75} className="mb-4" showLabel={false} />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-4 h-4" />
                2h 15m remaining
              </span>
              <button className="btn-primary">
                <Play className="w-4 h-4" />
                Resume Course
              </button>
            </div>
          </div>

          {/* Up Next */}
          <div className="w-full lg:w-80 space-y-4">
            <h4 className="font-medium text-muted-foreground">Up Next</h4>
            {[
              { title: "Understanding useState", duration: "15 min", completed: false },
              { title: "useEffect Explained", duration: "20 min", completed: false },
              { title: "Custom Hooks", duration: "25 min", completed: false },
            ].map((lesson, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 bg-card rounded-full flex items-center justify-center border border-border">
                  <Play className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{lesson.title}</p>
                  <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrolled Courses */}
        <div className="dashboard-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title mb-0">My Courses</h2>
            <Link to="/student/courses" className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {enrolledCourses.map((course, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{course.title}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-muted-foreground">{course.duration}</span>
                    <ProgressBar value={course.progress} className="flex-1 max-w-32" size="sm" showLabel={false} />
                    <span className="text-xs font-medium">{course.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Quizzes */}
        <div className="dashboard-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title mb-0">Upcoming Quizzes</h2>
            <Link to="/student/quizzes" className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingQuizzes.map((quiz, index) => (
              <QuizCard key={index} {...quiz} onStart={() => {}} />
            ))}
          </div>
        </div>
      </div>

      {/* AI Chat Preview */}
      <div className="dashboard-card p-6 mt-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">StudyBuddy AI Assistant</h3>
            <p className="text-sm text-muted-foreground">Get instant help with your learning</p>
          </div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 mb-4">
          <p className="text-sm text-muted-foreground italic">
            "Hi John! I noticed you're working on React Hooks. Would you like me to explain the difference between useEffect and useLayoutEffect?"
          </p>
        </div>
        <Link to="/student/chat" className="btn-outline w-full">
          <MessageSquare className="w-4 h-4" />
          Start a Conversation
        </Link>
      </div>
    </div>
  );
}
