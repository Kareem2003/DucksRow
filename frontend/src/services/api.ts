import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

const BASE_URL = 'https://api.example.com'; // TO BE REPLACED

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
        // You can add auth tokens here
        // const token = await getToken();
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
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
        console.error(`[Error] ${error.message}`, error.response?.data);
        return Promise.reject(handleError(error));
    }
);

const handleError = (error: AxiosError) => {
    // Customize your error handling logic here
    if (error.response) {
        // Server responded with a status other than 2xx
        return {
            message: error.response.data || 'Something went wrong',
            status: error.response.status,
        };
    } else if (error.request) {
        // Request was made but no response received
        return { message: 'Network error. Please try again.', status: 0 };
    } else {
        // Something happened in setting up the request
        return { message: error.message, status: -1 };
    }
};

export default apiClient;
