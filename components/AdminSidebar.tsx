import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Newspaper,
  BookOpen,
  FolderKanban,
  ArrowLeft,
  LayoutDashboard,
  LogOut,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { PRODI_NAME, FAKULTAS_NAME, SCHOOL_NAME } from '../constants';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen = false, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Kelola Berita & Kajian', path: '/admin/news', icon: Newspaper },
    { name: 'Kelola Pengabdian & Riset', path: '/admin/projects', icon: FolderKanban },
    { name: 'Kelola Jurnal & Skripsi', path: '/admin/journals', icon: BookOpen },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth_token');
    navigate('/admin/login');
  };

  return (
    <aside
      className={`
        w-64 bg-slate-950 text-white fixed h-full flex flex-col overflow-y-auto z-50
        border-r border-slate-800 transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight text-white">CMS PRODI IAT</h1>
            <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
              {FAKULTAS_NAME}
            </p>
          </div>
        </div>
        <p className="text-[11px] text-slate-400 font-medium">
          {SCHOOL_NAME}
        </p>
      </div>

      {/* Scope Badge */}
      <div className="p-4 mx-4 my-3 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 flex items-center gap-2.5 text-xs text-emerald-300 font-semibold">
        <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
        <span>Scope: <strong>IAT (Ushuluddin)</strong></span>
      </div>

      {/* Nav Menu */}
      <nav className="p-4 space-y-1.5 flex-grow">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
              isActive(item.path)
                ? 'bg-emerald-800 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <item.icon className="w-4 h-4" /> {item.name}
          </Link>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2 flex-shrink-0">
        <Link
          to="/"
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl hover:bg-slate-900 text-xs font-semibold text-slate-400 hover:text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Lihat Web Prodi
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl hover:bg-rose-950/60 text-xs font-semibold text-rose-400 hover:text-rose-300 border border-rose-900/30 transition-all"
        >
          <LogOut className="w-4 h-4" /> Keluar (Logout)
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
