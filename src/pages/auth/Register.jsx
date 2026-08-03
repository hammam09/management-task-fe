import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/common/input';
import { Button } from '../../components/common/button';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register({ name, email, password }); // POST /auth/register
      navigate('/login');
    } catch (err) {
      setError('Gagal mendaftarkan akun. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}

      <Input
        label="Nama Lengkap"
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Budi"
        required
      />

      <Input
        label="Email"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="budi@example.com"
        required
      />

      <Input
        label="Password"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password123!"
        required
      />

      <div className="mt-6">
        <Button type="submit" variant="primary" className="w-full" disabled={loading}>
          {loading ? 'Memproses...' : 'Daftar'}
        </Button>
      </div>

      <p className="mt-4 text-center text-sm text-gray-600">
        Sudah punya akun?{' '}
        <Link to="/login" className="text-blue-600 font-medium hover:underline">
          Masuk
        </Link>
      </p>
    </form>
  );
};