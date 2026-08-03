import React, { useEffect, useState } from 'react';
import { commentService } from '../../api/commentService';
import { DataTable } from '../../components/tables/DataTable';
import { Button } from '../../components/common/button';

export const Comments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchComments = async () => {
    try {
      setError('');
      const data = await commentService.getAllComments();
      setComments(data);
    } catch (err) {
      setError('Gagal memuat komentar.');
      console.error('Gagal memuat komentar:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Hapus komentar ini?')) {
      try {
        await commentService.deleteComment(id);
        fetchComments();
      } catch (err) {
        setError('Gagal menghapus komentar.');
        console.error('Gagal menghapus komentar:', err);
      }
    }
  };

  const columns = [
    { header: 'Komentar', accessor: 'comment' },
    { header: 'Task ID', accessor: 'task_id' },
    { header: 'User ID', accessor: 'user_id' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-400 text-lg">Memuat komentar...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
        {error}
        <button
          onClick={fetchComments}
          className="ml-4 underline font-medium"
        >
          Coba lagi
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Daftar Komentar</h1>
      <DataTable columns={columns} data={comments} onDelete={handleDelete} />
    </div>
  );
};