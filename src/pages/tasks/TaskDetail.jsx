import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { taskService } from '../../api/taskService';
import { commentService } from '../../api/commentService';
import { AuthContext } from '../../context/AuthContext';
import { Button } from '../../components/common/button';

export const TaskDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext) || {};
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTaskAndComments = async () => {
    try {
      setError('');
      const [taskData, allComments] = await Promise.all([
        taskService.getTaskById(id),
        commentService.getAllComments()
      ]);
      setTask(taskData);
      const taskComments = allComments.filter(c => c.task_id === parseInt(id) || String(c.task_id) === String(id));
      setComments(taskComments);
    } catch (err) {
      setError('Gagal memuat detail tugas.');
      console.error('Gagal mengambil detail tugas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskAndComments();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await commentService.createComment({
        comment: newComment,
        task_id: parseInt(id),
        user_id: user?.id || 1
      });
      setNewComment('');
      fetchTaskAndComments();
    } catch (err) {
      console.error('Gagal menambah komentar:', err);
      alert('Gagal menambah komentar');
    }
  };

  if (loading) return <div className="text-gray-500">Memuat detail tugas...</div>;

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  if (!task) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{task.title}</h1>
        <p className="text-gray-600 mb-4">{task.description}</p>
        <div className="space-x-2">
          <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-sm font-medium rounded-full">Status: {task.status}</span>
          <span className="px-3 py-1 bg-red-50 text-red-700 text-sm font-medium rounded-full">Prioritas: {task.priority}</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Komentar</h2>
        
        <div className="space-y-4 mb-6">
          {comments.length > 0 ? (
            comments.map((c) => (
              <div key={c.id} className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-sm font-semibold text-slate-700 mb-1">User ID: {c.user_id}</p>
                <p className="text-slate-600">{c.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-slate-500 italic">Belum ada komentar.</p>
          )}
        </div>

        <form onSubmit={handleAddComment} className="mt-4 flex flex-col items-end gap-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Tulis komentar..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-y min-h-[100px]"
            required
          />
          <Button type="submit">Kirim Komentar</Button>
        </form>
      </div>
    </div>
  );
};