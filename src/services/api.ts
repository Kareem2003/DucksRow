import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { LoginPayload, RegisterPayload, AuthResponse } from '../types';

const BASE_URL = 'http://192.168.2.1:8080';

const apiClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Request Interceptor
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log(`[Response] ${response.status} ${response.config.url}`);
        return response;
    },
    (error: AxiosError) => {
        // Don't log 401 errors as errors to avoid noisy console output for expected auth failures
        if (error.response?.status !== 401) {
            console.error(`[Error] ${error.message}`, error.response?.data);
        }
        return Promise.reject(handleError(error));
    }
);

const handleError = (error: AxiosError) => {
    if (error.response) {
        const data = error.response.data as any;
        return {
            message: data?.error || data?.message || 'Something went wrong',
            status: error.response.status,
        };
    } else if (error.request) {
        return { message: 'Network error. Please try again.', status: 0 };
    } else {
        return { message: error.message, status: -1 };
    }
};

export const authService = {
    login: async (payload: LoginPayload): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/login', payload);
        const { user, token } = response.data;
        useAuthStore.getState().login(user, token);
        return response.data;
    },
    register: async (payload: RegisterPayload): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/register', payload);
        const { user, token } = response.data;
        useAuthStore.getState().login(user, token);
        return response.data;
    },
    logout: async () => {
        try {
            await apiClient.post('/auth/logout');
        } catch (error) {
            console.error('Logout failed', error);
        } finally {
            useAuthStore.getState().logout();
        }
    },
};

export default apiClient;
