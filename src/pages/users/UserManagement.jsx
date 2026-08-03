import React, { useEffect, useState } from 'react';
import { userService } from '../../api/userService';
import { DataTable } from '../../components/tables/DataTable';
import { Button } from '../../components/common/button';
import { Modal } from '../../components/common/modal';
import { Input } from '../../components/common/input';

export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  
  // State form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      setError('');
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError('Gagal memuat pengguna.');
      console.error('Gagal memuat pengguna:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenAddModal = () => {
    setIsEditMode(false);
    setSelectedUserId(null);
    setName('');
    setEmail('');
    setPassword('');
    setRole('member');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setIsEditMode(true);
    setSelectedUserId(user.id);
    setName(user.name || '');
    setEmail(user.email || '');
    setPassword('');
    setRole(user.role || 'member');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        const updateData = { name, email, role };
        if (password) updateData.password = password;
        
        await userService.updateUser(selectedUserId, updateData);
      } else {
        await userService.createUser({ name, email, password, role });
      }

      setIsModalOpen(false);
      fetchUsers();
    } catch (err) {
      setError('Gagal menyimpan data user.');
      console.error('Gagal menyimpan data user:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus user ini?')) {
      try {
        await userService.deleteUser(id);
        fetchUsers();
      } catch (err) {
        setError('Gagal menghapus user.');
        console.error('Gagal menghapus user:', err);
      }
    }
  };

  const columns = [
    { header: 'Nama', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-400 text-lg">Memuat pengguna...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
        {error}
        <button onClick={fetchUsers} className="ml-4 underline font-medium">
          Coba lagi
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Pengguna</h1>
        <Button onClick={handleOpenAddModal}>Tambah User</Button>
      </div>

      <DataTable 
        columns={columns} 
        data={users} 
        onEdit={handleOpenEditModal} 
        onDelete={handleDelete} 
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={isEditMode ? 'Edit User' : 'Tambah User Baru'}
      >
        <form onSubmit={handleSubmit}>
          <Input 
            label="Nama" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <Input 
            label="Email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <Input 
            label="Password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder={isEditMode ? 'Kosongkan jika tidak diubah' : '••••••••'} 
            required={!isEditMode} 
          />
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Batal
            </Button>
            <Button type="submit">
              Simpan
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};