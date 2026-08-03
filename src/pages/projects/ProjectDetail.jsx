import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { projectService } from '../../api/projectService';

export const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setError('');
        const data = await projectService.getProjectById(id);
        setProject(data);
      } catch (err) {
        setError('Gagal memuat detail project.');
        console.error('Gagal mengambil detail project:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div className="text-gray-500">Memuat detail...</div>;

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{project.project_name}</h1>
      <p className="text-gray-600 mb-4">{project.description}</p>
      <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">
        Status: {project.status}
      </div>
    </div>
  );
};