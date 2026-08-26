import React, { useState, useEffect, useMemo } from 'react';
import { Search, FolderKanban, Filter, Loader2, Sparkles, FileText } from 'lucide-react';
import { fetchProjects } from '../services/api';
import { ProjectItem } from '../types';
import ProjectCard from '../components/ProjectCard';

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    'Semua',
    'Pengabdian Masyarakat',
    'Riset Living Qur\'an',
    'Digital Quranic Studies',
    'Filologi & Manuskrip',
    'Desa Binaan Al-Qur\'an'
  ];

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const data = await fetchProjects('Ushuluddin', 'IAT');
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        activeCategory === 'Semua' ? true : p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [projects, searchTerm, activeCategory]);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-emerald-800/40">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-300 border border-emerald-600/40 text-xs font-bold">
              <FolderKanban className="w-3.5 h-3.5 text-amber-400" /> Riset & Aksi Sosial
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Pengabdian Masyarakat & Proyek Riset Al-Qur'an
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Dokumentasi program kerja dosen dan mahasiswa IAT dalam riset living Qur'an, pembinaan desa tahfidz, dan digitalisasi manuskrip tafsir nusantara.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search & Filter */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari judul proyek, topik pengabdian, atau nama peneliti..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Kategori:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        {loading ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-700 mx-auto mb-3" />
            <p className="text-slate-500 font-bold text-sm">Memuat Proyek Pengabdian & Riset...</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((item) => (
              <ProjectCard key={item.id} project={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 p-8 space-y-3">
            <FolderKanban className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-700">Belum ada data proyek yang sesuai</h3>
            <p className="text-xs text-slate-400">Silakan ubah kata kunci pencarian atau kategori filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
