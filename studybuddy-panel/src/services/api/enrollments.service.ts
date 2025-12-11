import { apiClient } from '@/lib/api.config';
import { EnrollmentRequest, EnrollmentResponse } from '@/lib/types';

export const enrollmentsService = {
    async enroll(courseId: number): Promise<EnrollmentResponse> {
        const request: EnrollmentRequest = { courseId };
        const response = await apiClient.post<EnrollmentResponse>('/Enrollments', request);
        return response.data;
    },

    async getMyCourses(): Promise<EnrollmentResponse[]> {
        const response = await apiClient.get<EnrollmentResponse[]>('/Enrollments/my-courses');
        return response.data;
    },

    async checkEnrollment(courseId: number): Promise<boolean> {
        const response = await apiClient.get<{ isEnrolled: boolean }>(`/Enrollments/check/${courseId}`);
        return response.data.isEnrolled;
    }
};
