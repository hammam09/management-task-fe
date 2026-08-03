import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://management-task-be-fxgb.vercel.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menyisipkan token jika diperlukan nanti
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;