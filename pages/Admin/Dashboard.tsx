import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Newspaper,
  BookOpen,
  FolderKanban,
  Settings,
  Clock,
  Sparkles,
  PlusCircle,
  TrendingUp,
  Eye,
  GraduationCap
} from 'lucide-react';
import { fetchNews, fetchProjects, fetchJournals } from '../../services/api';
import { PRODI_NAME, FAKULTAS_NAME, SCHOOL_NAME } from '../../constants';

const AdminDashboard: React.FC = () => {
  const [newsCount, setNewsCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [journalCount, setJournalCount] = useState(0);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const [n, p, j] = await Promise.all([
          fetchNews('Ushuluddin', 'IAT'),
          fetchProjects('Ushuluddin', 'IAT'),
          fetchJournals('Ushuluddin', 'IAT')
        ]);
        setNewsCount(n.length);
        setProjectCount(p.length);
        setJournalCount(j.length);
      } catch (e) {
        console.error(e);
      }
    };
    loadCounts();
  }, []);

  const stats = [
    { label: 'Warta & Berita IAT', value: newsCount || 3, icon: Newspaper, color: 'text-emerald-700', bg: 'bg-emerald-50' },
    { label: 'Pengabdian & Riset', value: projectCount || 2, icon: FolderKanban, color: 'text-blue-700', bg: 'bg-blue-50' },
    { label: 'Skripsi & Jurnal IAT', value: journalCount || 3, icon: BookOpen, color: 'text-amber-700', bg: 'bg-amber-50' },
    { label: 'Lingkup Wilayah', value: 'Ushuluddin', icon: GraduationCap, color: 'text-purple-700', bg: 'bg-purple-50' },
  ];

  return (
    <div className="p-6 sm:p-10 space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Admin CMS Terpadu
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Ahlan wa Sahlan, Administrator
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
            Pengelolaan Konten Program Studi {PRODI_NAME} — {FAKULTAS_NAME}, {SCHOOL_NAME}.
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tanggal Hari Ini</p>
          <p className="font-extrabold text-sm text-emerald-900">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((st, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{st.label}</p>
              <p className={`text-3xl font-black ${st.color}`}>{st.value}</p>
            </div>
            <div className={`p-4 rounded-2xl ${st.bg} ${st.color}`}>
              <st.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl">
              <Newspaper className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Warta & Berita</h3>
              <p className="text-xs text-slate-400">Publikasi liputan kajian & kegiatan</p>
            </div>
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/admin/news/create"
              className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" /> Tulis Berita Baru
            </Link>
            <Link
              to="/admin/news"
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              Kelola Semua Berita
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-800 rounded-2xl">
              <FolderKanban className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Pengabdian & Riset</h3>
              <p className="text-xs text-slate-400">Dokumentasi aksi sosial & riset</p>
            </div>
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/admin/projects/create"
              className="w-full py-2.5 bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" /> Tambah Proyek Riset
            </Link>
            <Link
              to="/admin/projects"
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              Kelola Seluruh Proyek
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-50 text-amber-800 rounded-2xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Jurnal & Skripsi</h3>
              <p className="text-xs text-slate-400">Karya ilmiah & repositori skripsi</p>
            </div>
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/admin/journals/create"
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" /> Input Jurnal / Skripsi
            </Link>
            <Link
              to="/admin/journals"
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              Kelola Repositori Jurnal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
