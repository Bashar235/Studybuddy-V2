import { apiClient } from '@/lib/api.config';
import { ProgressUpdateRequest, ProgressResponse } from '@/lib/types';

export const progressService = {
    async updateProgress(lessonId: number, isCompleted: boolean): Promise<void> {
        const request: ProgressUpdateRequest = { lessonId, isCompleted };
        await apiClient.post('/Progress', request);
    },

    async getCourseProgress(courseId: number): Promise<ProgressResponse> {
        const response = await apiClient.get<ProgressResponse>(`/Progress/course/${courseId}`);
        return response.data;
    },

    async getMyProgress(): Promise<ProgressResponse[]> {
        const response = await apiClient.get<ProgressResponse[]>('/Progress/my-progress');
        return response.data;
    }
};
