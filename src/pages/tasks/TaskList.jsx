import React, { useEffect, useState } from 'react';
import { taskService } from '../../api/taskService';
import { DataTable } from '../../components/tables/DataTable';
import { Button } from '../../components/common/button';
import { Modal } from '../../components/common/modal';
import { Input } from '../../components/common/input';
import { formatDateTime } from '../../utils/dateFormatter';

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [priority, setPriority] = useState('medium');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      setError('');
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError('Gagal memuat tugas.');
      console.error('Gagal memuat tugas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setSelectedTaskId(null);
    setTitle('');
    setDescription('');
    setStatus('todo');
    setPriority('medium');
    setDeadline('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setIsEditMode(true);
    setSelectedTaskId(task.id);
    setTitle(task.title || '');
    setDescription(task.description || '');
    setStatus(task.status || 'todo');
    setPriority(task.priority || 'medium');
    setDeadline(task.deadline ? task.deadline.slice(0, 16) : '');
    setIsModalOpen(true);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const taskData = {
        title,
        description,
        status,
        priority,
        deadline: new Date(deadline).toISOString(),
      };

      if (isEditMode) {
        await taskService.updateTask(selectedTaskId, taskData);
      } else {
        await taskService.createTask(taskData);
      }

      setIsModalOpen(false);
      setTitle('');
      setDescription('');
      setStatus('todo');
      setPriority('medium');
      setDeadline('');
      fetchTasks();
    } catch (err) {
      setError('Gagal menyimpan tugas.');
      console.error('Gagal menyimpan tugas:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus tugas ini?')) {
      try {
        await taskService.deleteTask(id);
        fetchTasks();
      } catch (err) {
        setError('Gagal menghapus tugas.');
        console.error('Gagal menghapus tugas:', err);
      }
    }
  };

  const columns = [
    { header: 'Judul Tugas', accessor: 'title' },
    { header: 'Status', accessor: 'status' },
    { header: 'Prioritas', accessor: 'priority' },
    { header: 'Deadline', accessor: (row) => formatDateTime(row.deadline) },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-400 text-lg">Memuat tugas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
        {error}
        <button onClick={fetchTasks} className="ml-4 underline font-medium">
          Coba lagi
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Tugas</h1>
        <Button onClick={handleOpenAddModal} className="w-full sm:w-auto">Tambah Tugas</Button>
      </div>

      <DataTable columns={columns} data={tasks} onEdit={handleOpenEditModal} onDelete={handleDelete} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isEditMode ? 'Edit Tugas' : 'Buat Tugas Baru'}>
        <form onSubmit={handleCreateTask}>
          <Input label="Judul" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Input label="Deskripsi" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <Input label="Deadline" type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 border rounded-lg">
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Prioritas</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full px-3 py-2 border rounded-lg">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
