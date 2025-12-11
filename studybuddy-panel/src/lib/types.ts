// Authentication Types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
}

export interface AuthResponse {
    token: string;
    email: string;
    role: string;
}

export interface User {
    email: string;
    role: string;
    firstName?: string;
    lastName?: string;
}

// Course Types
export interface CourseListDto {
    courseId: number;
    title: string;
    description?: string;
    thumbnailUrl?: string;
    level: string;
    category?: string;
    estimatedDurationHours?: number;
    createdAt: string;
    enrollmentCount: number;
}

export interface LessonDto {
    lessonId: number;
    title: string;
    content?: string;
    videoUrl?: string;
    orderIndex: number;
    duration?: number;
    isCompleted?: boolean;
}

export interface ModuleDto {
    moduleId: number;
    title: string;
    description?: string;
    orderIndex: number;
    lessons: LessonDto[];
}

export interface CourseDetailDto {
    courseId: number;
    title: string;
    description?: string;
    thumbnailUrl?: string;
    level: string;
    category?: string;
    estimatedDurationHours?: number;
    prerequisites?: string;
    learningObjectives?: string;
    isPublished: boolean;
    createdAt: string;
    enrollmentCount: number;
    modules: ModuleDto[];
}

// Enrollment Types
export interface EnrollmentRequest {
    courseId: number;
}

export interface EnrollmentResponse {
    enrollmentId: number;
    courseId: number;
    studentId: number;
    enrolledAt: string;
    status: string;
    course?: CourseListDto;
    progressPercentage?: number;
}

// Progress Types
export interface ProgressUpdateRequest {
    lessonId: number;
    isCompleted: boolean;
}

export interface ProgressResponse {
    courseId: number;
    courseTitle: string;
    totalLessons: number;
    completedLessons: number;
    progressPercentage: number;
    lastAccessedAt?: string;
}

// Quiz Types
export interface QuestionOptionDto {
    optionId: number;
    optionText: string;
    orderIndex: number;
}

export interface QuestionDto {
    questionId: number;
    questionText: string;
    questionType: string;
    points: number;
    orderIndex: number;
    options: QuestionOptionDto[];
}

export interface QuizDto {
    quizId: number;
    title: string;
    description?: string;
    passingScore: number;
    timeLimit?: number;
    maxAttempts?: number;
    questions: QuestionDto[];
}

export interface QuizAnswerDto {
    questionId: number;
    selectedOptionId?: number;
    answerText?: string;
}

export interface QuizSubmissionRequest {
    quizId: number;
    answers: QuizAnswerDto[];
}

export interface QuizResultDto {
    attemptId: number;
    quizId: number;
    quizTitle: string;
    score: number;
    totalPoints: number;
    percentage: number;
    passed: boolean;
    attemptNumber: number;
    completedAt: string;
    timeTaken?: number;
}

export interface QuizAttemptDto {
    attemptId: number;
    quizId: number;
    attemptNumber: number;
    score: number;
    totalPoints: number;
    percentage: number;
    passed: boolean;
    completedAt: string;
}

// Certificate Types
export interface CertificateDto {
    certificateId: number;
    certificateNumber: string;
    studentName: string;
    courseTitle: string;
    issueDate: string;
    expiryDate?: string;
    certificateUrl?: string;
}
