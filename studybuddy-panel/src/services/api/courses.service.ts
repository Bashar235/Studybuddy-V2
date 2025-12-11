import { apiClient } from '@/lib/api.config';
import { CourseListDto, CourseDetailDto } from '@/lib/types';

export const coursesService = {
    async getPublishedCourses(): Promise<CourseListDto[]> {
        const response = await apiClient.get<CourseListDto[]>('/Courses');
        return response.data;
    },

    async getCourseById(id: number): Promise<CourseDetailDto> {
        const response = await apiClient.get<CourseDetailDto>(`/Courses/${id}`);
        return response.data;
    },

    async searchCourses(query: string): Promise<CourseListDto[]> {
        const response = await apiClient.get<CourseListDto[]>('/Courses/search', {
            params: { q: query }
        });
        return response.data;
    }
};
