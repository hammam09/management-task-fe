import React, { useEffect, useState } from 'react';
import { projectService } from '../../api/projectService';
import { DataTable } from '../../components/tables/DataTable';
import { Button } from '../../components/common/button';
import { Modal } from '../../components/common/modal';
import { Input } from '../../components/common/input';

export const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    try {
      setError('');
      const data = await projectService.getAllProjects();
      setProjects(data);
    } catch (err) {
      setError('Gagal memuat project.');
      console.error('Gagal memuat project:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setSelectedProjectId(null);
    setProjectName('');
    setDescription('');
    setStatus('pending');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project) => {
    setIsEditMode(true);
    setSelectedProjectId(project.id);
    setProjectName(project.project_name || '');
    setDescription(project.description || '');
    setStatus(project.status || 'pending');
    setIsModalOpen(true);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await projectService.updateProject(selectedProjectId, { project_name: projectName, description, status });
      } else {
        await projectService.createProject({ project_name: projectName, description, status });
      }
      setIsModalOpen(false);
      setProjectName('');
      setDescription('');
      setStatus('pending');
      fetchProjects();
    } catch (err) {
      setError('Gagal menyimpan project.');
      console.error('Gagal menyimpan project:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus project ini?')) {
      try {
        await projectService.deleteProject(id);
        fetchProjects();
      } catch (err) {
        setError('Gagal menghapus project.');
        console.error('Gagal menghapus project:', err);
      }
    }
  };

  const columns = [
    { header: 'Nama Project', accessor: 'project_name' },
    { header: 'Deskripsi', accessor: 'description' },
    { header: 'Status', accessor: 'status' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-400 text-lg">Memuat project...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
        {error}
        <button onClick={fetchProjects} className="ml-4 underline font-medium">
          Coba lagi
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Project</h1>
        <Button onClick={handleOpenAddModal}>Tambah Project</Button>
      </div>

      <DataTable columns={columns} data={projects} onEdit={handleOpenEditModal} onDelete={handleDelete} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isEditMode ? 'Edit Project' : 'Buat Project Baru'}>
        <form onSubmit={handleCreateProject}>
          <Input
            label="Nama Project"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
          <Input
            label="Deskripsi"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
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