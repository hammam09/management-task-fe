import React from 'react';

export const Input = ({ label, id, type = 'text', value, onChange, placeholder, required = false, error, className = '' }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-slate-700 mb-1.5 ml-0.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 focus:bg-white placeholder-slate-400 ${
          error ? 'border-red-400 focus:ring-red-500/50 focus:border-red-500' : 'border-slate-200 hover:border-slate-300'
        }`}
      />
      {error && <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{error}</p>}
    </div>
  );
};