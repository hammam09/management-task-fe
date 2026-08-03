import axiosClient from './axiosClient';

export const commentService = {
  getAllComments: async () => {
    // GET /comments[cite: 1]
    const response = await axiosClient.get('/comments');
    return response.data;
  },

  createComment: async (commentData) => {
    // POST /comments[cite: 1]
    const response = await axiosClient.post('/comments', commentData);
    return response.data;
  },

  getCommentById: async (id) => {
    // GET /comments/{id}[cite: 1]
    const response = await axiosClient.get(`/comments/${id}`);
    return response.data;
  },

  updateComment: async (id, commentData) => {
    // PATCH /comments/{id}[cite: 1]
    const response = await axiosClient.patch(`/comments/${id}`, commentData);
    return response.data;
  },

  deleteComment: async (id) => {
    // DELETE /comments/{id}[cite: 1]
    const response = await axiosClient.delete(`/comments/${id}`);
    return response.data;
  },
};