import axiosClient from './axiosClient';

export const taskService = {
  getAllTasks: async () => {
    // GET /tasks[cite: 1]
    const response = await axiosClient.get('/tasks');
    return response.data;
  },

  createTask: async (taskData) => {
    // POST /tasks[cite: 1]
    const response = await axiosClient.post('/tasks', taskData);
    return response.data;
  },

  getTaskById: async (id) => {
    // GET /tasks/{id}[cite: 1]
    const response = await axiosClient.get(`/tasks/${id}`);
    return response.data;
  },

  updateTask: async (id, taskData) => {
    // PATCH /tasks/{id} (semua field wajib dikirim)[cite: 1]
    const response = await axiosClient.patch(`/tasks/${id}`, taskData);
    return response.data;
  },

  deleteTask: async (id) => {
    // DELETE /tasks/{id}[cite: 1]
    const response = await axiosClient.delete(`/tasks/${id}`);
    return response.data;
  },
};