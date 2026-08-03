import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { taskService } from '../../api/taskService';

export const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setError('');
        const data = await taskService.getTaskById(id);
        setTask(data);
      } catch (err) {
        setError('Gagal memuat detail tugas.');
        console.error('Gagal mengambil detail tugas:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

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
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{task.title}</h1>
      <p className="text-gray-600 mb-4">{task.description}</p>
      <div className="space-x-2">
        <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-sm font-medium rounded-full">Status: {task.status}</span>
        <span className="px-3 py-1 bg-red-50 text-red-700 text-sm font-medium rounded-full">Prioritas: {task.priority}</span>
      </div>
    </div>
  );
};