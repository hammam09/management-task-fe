import React from 'react';

export const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false }) => {
  const baseStyles = 'px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:shadow-lg hover:shadow-primary-500/40 hover:-translate-y-0.5 focus:ring-primary-500',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:shadow-md focus:ring-slate-400',
    danger: 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:shadow-lg hover:shadow-red-500/40 hover:-translate-y-0.5 focus:ring-red-500',
    success: 'bg-gradient-to-r from-green-600 to-green-500 text-white hover:shadow-lg hover:shadow-green-500/40 hover:-translate-y-0.5 focus:ring-green-500',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};