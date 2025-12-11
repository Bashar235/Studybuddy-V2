import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Play, Clock, ChevronRight, Loader2 } from "lucide-react";
import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { enrollmentsService } from "@/services/api/enrollments.service";
import { progressService } from "@/services/api/progress.service";
import { useToast } from "@/hooks/use-toast";

export default function StudentCourses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const { toast } = useToast();

  // Fetch enrolled courses
  const { data: enrollments, isLoading, error } = useQuery({
    queryKey: ['my-courses'],
    queryFn: () => enrollmentsService.getMyCourses(),
  });

  // Fetch progress for all courses
  const { data: progressData } = useQuery({
    queryKey: ['my-progress'],
    queryFn: () => progressService.getMyProgress(),
  });

  if (error) {
    toast({
      variant: "destructive",
      title: "Error loading courses",
      description: "Failed to fetch your enrolled courses. Please try again.",
    });
  }

  const getProgressForCourse = (courseId: number) => {
    const progress = progressData?.find((p) => p.courseId === courseId);
    return progress?.progressPercentage || 0;
  };

  const filteredEnrollments = enrollments?.filter((enrollment) => {
    const course = enrollment.course;
    if (!course) return false;

    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || course.category === filterCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  const getStatusLabel = (progress: number) => {
    if (progress === 100) return { text: "Completed", class: "badge-success" };
    if (progress > 0) return { text: "In Progress", class: "badge-primary" };
    return { text: "Not Started", class: "badge-muted" };
  };

  // Get unique categories from enrolled courses
  const categories = [...new Set(enrollments?.map((e) => e.course?.category).filter(Boolean))] as string[];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">My Courses</h1>
          <p className="text-muted-foreground mt-1">
            Track your enrolled courses and progress
          </p>
        </div>
      </div>

      {/* Search & Filter */}
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
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="input-field w-auto"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Total Enrolled</p>
          <p className="text-3xl font-semibold mt-1">{enrollments?.length || 0}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">In Progress</p>
          <p className="text-3xl font-semibold mt-1">
            {progressData?.filter((p) => p.progressPercentage > 0 && p.progressPercentage < 100).length || 0}
          </p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-3xl font-semibold mt-1">
            {progressData?.filter((p) => p.progressPercentage === 100).length || 0}
          </p>
        </div>
      </div>

      {/* Course List */}
      {filteredEnrollments.length === 0 ? (
        <div className="dashboard-card p-12 text-center">
          <p className="text-muted-foreground">
            {searchTerm || filterCategory !== "all"
              ? "No courses found matching your filters."
              : "You haven't enrolled in any courses yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEnrollments.map((enrollment) => {
            const course = enrollment.course;
            if (!course) return null;

            const progress = getProgressForCourse(course.courseId);
            const status = getStatusLabel(progress);

            return (
              <div key={enrollment.enrollmentId} className="dashboard-card p-6 hover:shadow-card-hover transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Course Thumbnail */}
                  <div className="w-full lg:w-48 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                    {course.thumbnailUrl ? (
                      <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <Play className="w-12 h-12 text-primary/50" />
                    )}
                  </div>

                  {/* Course Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {course.category && (
                        <span className="badge badge-primary">{course.category}</span>
                      )}
                      <span className={`badge ${status.class}`}>{status.text}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
                    {course.description && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {course.description}
                      </p>
                    )}
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.estimatedDurationHours ? `${course.estimatedDurationHours}h` : 'N/A'}
                      </span>
                      <span className="capitalize">{course.level || 'Beginner'}</span>
                    </div>
                  </div>

                  {/* Progress & Action */}
                  <div className="w-full lg:w-64">
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-medium">{Math.round(progress)}%</span>
                      </div>
                      <ProgressBar value={progress} showLabel={false} />
                    </div>
                    <button className="btn-primary w-full">
                      {progress === 0 ? (
                        <>
                          <Play className="w-4 h-4" />
                          Start Course
                        </>
                      ) : progress === 100 ? (
                        <>
                          <ChevronRight className="w-4 h-4" />
                          Review Course
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Continue
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
