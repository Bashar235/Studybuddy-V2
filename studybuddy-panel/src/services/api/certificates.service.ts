import { apiClient } from '@/lib/api.config';
import { CertificateDto } from '@/lib/types';

export const certificatesService = {
    async issueCertificate(courseId: number): Promise<CertificateDto> {
        const response = await apiClient.post<CertificateDto>('/Certificates/issue', courseId);
        return response.data;
    },

    async getMyCertificates(): Promise<CertificateDto[]> {
        const response = await apiClient.get<CertificateDto[]>('/Certificates/my-certificates');
        return response.data;
    },

    async verifyCertificate(certificateNumber: string): Promise<CertificateDto> {
        const response = await apiClient.get<CertificateDto>(`/Certificates/verify/${certificateNumber}`);
        return response.data;
    }
};
