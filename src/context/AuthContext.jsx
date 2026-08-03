import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../api/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk inisialisasi state dari localStorage saat aplikasi dimuat
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        try {
          // Validasi token dengan mengambil data user
          const data = await authService.getCurrentUser();
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
        } catch (error) {
          // Token tidak valid, bersihkan storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Fungsi untuk handle proses login
  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      
      // Asumsi API mengembalikan token dan data user (misal di dalam data.token & data.user)
      if (data.token) {
        localStorage.setItem('token', data.token);
        
        // Simpan data user ke state & local storage (sesuaikan dengan response API asli Anda)
        const userData = data.user || { email: credentials.email };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      }
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Fungsi untuk handle proses register
  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      return data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  // Fungsi untuk logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};