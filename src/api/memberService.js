import axiosClient from './axiosClient';

export const memberService = {
  getAllMembers: async (params = {}) => {
    // GET /project_members (mendukung query opsional project_id atau user_id)[cite: 1]
    const response = await axiosClient.get('/project_members', { params });
    return response.data;
  },

  addMember: async (memberData) => {
    // POST /project_members[cite: 1]
    const response = await axiosClient.post('/project_members', memberData);
    return response.data;
  },

  getMemberById: async (id) => {
    // GET /project_members/{id}[cite: 1]
    const response = await axiosClient.get(`/project_members/${id}`);
    return response.data;
  },

  updateMember: async (id, memberData) => {
    // PATCH /project_members/{id} (parsial)[cite: 1]
    const response = await axiosClient.patch(`/project_members/${id}`, memberData);
    return response.data;
  },

  deleteMember: async (id) => {
    // DELETE /project_members/{id}[cite: 1]
    const response = await axiosClient.delete(`/project_members/${id}`);
    return response.data;
  },
};