import { apiClient } from '@/lib/api.config';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '@/lib/types';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    email: string;
    role: string;
    nameid: string;
    exp: number;
}

export const authService = {
    async login(credentials: LoginRequest): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/Auth/login', credentials);
        const { token, email, role } = response.data;

        // Store token and user info
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify({ email, role }));

        return response.data;
    },

    async register(data: RegisterRequest): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/Auth/register', data);
        const { token, email, role } = response.data;

        // Store token and user info
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify({ email, role }));

        return response.data;
    },

    logout(): void {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    },

    getCurrentUser(): User | null {
        const userStr = localStorage.getItem('user');
        if (!userStr) return null;

        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    },

    getToken(): string | null {
        return localStorage.getItem('authToken');
    },

    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) return false;

        try {
            const decoded = jwtDecode<JwtPayload>(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp > currentTime;
        } catch {
            return false;
        }
    },

    getUserRole(): string | null {
        const user = this.getCurrentUser();
        return user?.role || null;
    }
};
