import axiosClient from './axiosClient';

export const userService = {
  getAllUsers: async () => {
    // GET /users
    const response = await axiosClient.get('/users');
    return response.data;
  },

  createUser: async (userData) => {
    // POST /users[cite: 1]
    const response = await axiosClient.post('/users', userData);
    return response.data;
  },

  getUserById: async (id) => {
    // GET /users/{id}[cite: 1]
    const response = await axiosClient.get(`/users/${id}`);
    return response.data;
  },

  updateUser: async (id, userData) => {
    // PATCH /users/{id} (parsial)[cite: 1]
    const response = await axiosClient.patch(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id) => {
    // DELETE /users/{id}[cite: 1]
    const response = await axiosClient.delete(`/users/${id}`);
    return response.data;
  },
};