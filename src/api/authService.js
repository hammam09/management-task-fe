import axiosClient from './axiosClient';

export const authService = {
  register: async (userData) => {
    // POST /auth/register
    const response = await axiosClient.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    // POST /auth/login
    const response = await axiosClient.post('/auth/login', credentials);
    return response.data;
  },

  getCurrentUser: async () => {
    // GET /auth/me
    const response = await axiosClient.get('/auth/me');
    return response.data;
  },
};