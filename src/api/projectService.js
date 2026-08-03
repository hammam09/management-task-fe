import axiosClient from './axiosClient';

export const projectService = {
  getAllProjects: async () => {
    // GET /projects[cite: 1]
    const response = await axiosClient.get('/projects');
    return response.data;
  },

  createProject: async (projectData) => {
    // POST /projects[cite: 1]
    const response = await axiosClient.post('/projects', projectData);
    return response.data;
  },

  getProjectById: async (id) => {
    // GET /projects/{id}[cite: 1]
    const response = await axiosClient.get(`/projects/${id}`);
    return response.data;
  },

  updateProject: async (id, projectData) => {
    // PATCH /projects/{id} (semua field wajib dikirim)[cite: 1]
    const response = await axiosClient.patch(`/projects/${id}`, projectData);
    return response.data;
  },

  deleteProject: async (id) => {
    // DELETE /projects/{id}[cite: 1]
    const response = await axiosClient.delete(`/projects/${id}`);
    return response.data;
  },
};