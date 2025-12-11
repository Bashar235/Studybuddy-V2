import { Link } from "react-router-dom";
import { GraduationCap, Users, BookOpen, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">StudyBuddy</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link to="/login" className="btn-outline">
              Sign In
            </Link>
            <Link to="/register" className="btn-primary">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to <span className="text-primary">StudyBuddy</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            A modern educational platform designed for effective learning.
            Explore both dashboards to see the complete system.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Admin Card */}
            <Link
              to="/admin"
              className="dashboard-card p-8 text-left hover:shadow-lg transition-all group"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-3">Admin Dashboard</h2>
              <p className="text-muted-foreground mb-6">
                Manage courses, quizzes, students, certificates, and analytics.
                Full control over the learning platform.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>• Course & Quiz Management</li>
                <li>• Student Progress Tracking</li>
                <li>• Certificate Administration</li>
                <li>• Reports & Analytics</li>
                <li>• AI Chat Logs</li>
              </ul>
              <span className="inline-flex items-center text-primary font-medium group-hover:gap-3 transition-all gap-2">
                Enter Admin Dashboard
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            {/* Student Card */}
            <Link
              to="/student"
              className="dashboard-card p-8 text-left hover:shadow-lg transition-all group"
            >
              <div className="w-16 h-16 bg-success/10 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-2xl font-semibold mb-3">Student Dashboard</h2>
              <p className="text-muted-foreground mb-6">
                Access courses, track progress, take quizzes, chat with AI tutor,
                and earn certificates.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li>• My Courses & Progress</li>
                <li>• Continue Learning</li>
                <li>• Quizzes & Assessments</li>
                <li>• AI Chat Tutor</li>
                <li>• Certificates</li>
              </ul>
              <span className="inline-flex items-center text-success font-medium group-hover:gap-3 transition-all gap-2">
                Enter Student Dashboard
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Course Management</h3>
              <p className="text-sm text-muted-foreground">
                Create, organize, and deliver courses with modules, lessons, and multimedia content.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered Learning</h3>
              <p className="text-sm text-muted-foreground">
                StudyBuddy AI Assistant provides instant help and personalized learning support.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-warning" />
              </div>
              <h3 className="font-semibold mb-2">Progress Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive analytics and progress tracking for both admins and students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2025 StudyBuddy. Professional Educational Platform UI Demo.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
