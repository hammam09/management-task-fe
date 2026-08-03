import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const DashboardLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItemClass = ({ isActive }) => 
    `block px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 ${
      isActive 
        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 translate-x-1' 
        : 'text-slate-600 hover:bg-white hover:text-primary-600 hover:shadow-sm hover:translate-x-1'
    }`;

  return (
    <div className="min-h-screen flex bg-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-200/40 rounded-full blur-3xl"></div>
      
      {/* Sidebar */}
      <aside className="w-72 glass-panel border-r border-white/60 hidden md:flex flex-col z-10 m-4 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
        <div className="p-8 border-b border-white/40 bg-white/30 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-400 text-white flex items-center justify-center shadow-lg shadow-primary-500/30">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
            <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">Task Manager</h1>
          </div>
          <div className="flex items-center gap-2 mt-4 px-2 py-1.5 bg-white/60 rounded-lg border border-white/50">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-xs font-semibold text-slate-600 truncate">{user?.email || 'User Panel'}</p>
          </div>
        </div>
        <nav className="flex-1 p-5 space-y-2 overflow-y-auto">
          <NavLink to="/dashboard" className={navItemClass}>
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
             Dashboard
          </NavLink>
          <NavLink to="/projects" className={navItemClass}>
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
             Projects
          </NavLink>
          <NavLink to="/tasks" className={navItemClass}>
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
             Tasks
          </NavLink>
          <NavLink to="/users" className={navItemClass}>
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
             Users
          </NavLink>
          <NavLink to="/comments" className={navItemClass}>
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
             Comments
          </NavLink>
        </nav>
        <div className="p-5 border-t border-white/40 bg-white/20">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 bg-red-50/80 text-red-600 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm flex items-center justify-center gap-2 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col z-10 min-w-0">
        <header className="h-20 bg-white/60 backdrop-blur-xl border-b border-white/60 flex items-center justify-between px-8 md:mx-6 md:mt-4 rounded-t-3xl md:rounded-3xl shadow-sm md:mb-4">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 md:hidden">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
             </div>
             <span className="font-extrabold text-xl text-slate-800">Workspace</span>
          </div>
          <button
            onClick={handleLogout}
            className="md:hidden text-sm text-red-600 font-bold flex items-center gap-1 bg-red-50 px-3 py-1.5 rounded-lg"
          >
            Logout
          </button>
          
          <div className="hidden md:flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 shadow-md flex items-center justify-center text-white font-bold border-2 border-white">
                {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
             </div>
          </div>
        </header>
        <main className="flex-1 p-6 md:px-6 md:py-2 overflow-y-auto mb-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};