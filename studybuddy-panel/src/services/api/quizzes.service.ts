import { apiClient } from '@/lib/api.config';
import { QuizDto, QuizSubmissionRequest, QuizResultDto, QuizAttemptDto } from '@/lib/types';

export const quizzesService = {
    async getQuiz(id: number): Promise<QuizDto> {
        const response = await apiClient.get<QuizDto>(`/Quizzes/${id}`);
        return response.data;
    },

    async submitQuiz(quizId: number, submission: QuizSubmissionRequest): Promise<QuizResultDto> {
        const response = await apiClient.post<QuizResultDto>(`/Quizzes/${quizId}/submit`, submission);
        return response.data;
    },

    async getAttempts(quizId: number): Promise<QuizAttemptDto[]> {
        const response = await apiClient.get<QuizAttemptDto[]>(`/Quizzes/${quizId}/attempts`);
        return response.data;
    },

    async getAttemptResult(attemptId: number): Promise<QuizResultDto> {
        const response = await apiClient.get<QuizResultDto>(`/Quizzes/attempts/${attemptId}`);
        return response.data;
    }
};
