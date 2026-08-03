import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { projectService } from '../../api/projectService';
import { taskService } from '../../api/taskService';
import { userService } from '../../api/userService';

export const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalProjects: '-', totalTasks: '-', totalUsers: '-' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, tasksRes, usersRes] = await Promise.all([
          projectService.getAllProjects(),
          taskService.getAllTasks(),
          userService.getAllUsers(),
        ]);
        setStats({
          totalProjects: projectsRes.length,
          totalTasks: tasksRes.length,
          totalUsers: usersRes.length,
        });
      } catch (error) {
        console.error('Gagal memuat statistik dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Selamat Datang, {user?.name || 'Pengguna'}!</h1>
      <p className="text-gray-600 mb-6">Berikut adalah ringkasan sistem manajemen tugas Anda.</p>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow border border-gray-200 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 uppercase">Total Projects</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalProjects}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 uppercase">Total Tasks</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalTasks}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 uppercase">Users Registered</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalUsers}</p>
          </div>
        </div>
      )}
    </div>
  );
};