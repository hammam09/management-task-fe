import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/common/input';
import { Button } from '../../components/common/button';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ email, password }); // POST /auth/login
      navigate('/dashboard');
    } catch (err) {
      setError('Gagal masuk. Periksa kembali email dan password Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}
      
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
        placeholder="••••••••"
        required
      />

      <div className="mt-6">
        <Button type="submit" variant="primary" className="w-full" disabled={loading}>
          {loading ? 'Memproses...' : 'Masuk'}
        </Button>
      </div>

      <p className="mt-4 text-center text-sm text-gray-600">
        Belum punya akun?{' '}
        <Link to="/register" className="text-blue-600 font-medium hover:underline">
          Daftar di sini
        </Link>
      </p>
    </form>
  );
};