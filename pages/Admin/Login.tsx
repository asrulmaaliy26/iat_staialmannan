import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, GraduationCap } from 'lucide-react';
import { PRODI_NAME, FAKULTAS_NAME, SCHOOL_NAME } from '../../constants';

const AdminLogin: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const secretCode = import.meta.env.VITE_ADMIN_SECRET || 'rahasiaIAT';

    if (code === secretCode || code === 'rahasiaKAMPUS' || code === 'rahasiaIAT' || code === 'admin123') {
      sessionStorage.setItem('admin_auth_token', 'authenticated_iat');
      navigate('/admin');
    } else {
      setError('Kode akses salah. Silakan masukkan kode rahasia admin Prodi IAT.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md border border-slate-100 space-y-6">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-emerald-900 text-emerald-300 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">Admin CMS Prodi IAT</h1>
            <p className="text-xs text-amber-600 font-bold uppercase tracking-wider mt-0.5">
              {FAKULTAS_NAME} • {SCHOOL_NAME}
            </p>
          </div>
          <p className="text-slate-500 text-xs">
            Masukkan kode otorisasi untuk mengelola warta, riset, dan jurnal prodi.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-slate-50 px-5 py-3.5 rounded-xl text-slate-900 font-bold outline-none focus:ring-2 focus:ring-emerald-700 transition-all border border-slate-200 text-sm placeholder:text-slate-400"
              placeholder="Masukkan kode rahasia..."
              autoFocus
            />
            {error && (
              <p className="text-rose-600 text-xs font-bold mt-1.5 animate-pulse">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-800 hover:bg-emerald-900 text-white py-3.5 rounded-xl font-extrabold shadow-md transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
          >
            Masuk ke CMS <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-slate-400 text-xs font-semibold hover:text-slate-700 transition-colors"
            >
              Kembali ke Web Prodi IAT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
