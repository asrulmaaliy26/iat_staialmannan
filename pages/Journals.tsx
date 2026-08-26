import React, { useState, useEffect, useMemo } from 'react';
import { Search, BookOpen, Star, Filter, Loader2, Scroll, Download } from 'lucide-react';
import { fetchJournals, fetchBestJournals } from '../services/api';
import { JournalItem } from '../types';
import JournalCard from '../components/JournalCard';

const Journals: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [journals, setJournals] = useState<JournalItem[]>([]);
  const [bestOnly, setBestOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  const categories = [
    'Semua',
    'Studi Al-Qur\'an',
    'Metodologi Tafsir',
    'Qira\'at & Rasm',
    'Hermeneutika',
    'Tafsir Nusantara',
    'Skripsi Terbaik'
  ];

  useEffect(() => {
    const loadJournals = async () => {
      setLoading(true);
      try {
        const data = await fetchJournals('Ushuluddin', 'IAT');
        setJournals(data);
      } catch (err) {
        console.error('Error fetching journals:', err);
      } finally {
        setLoading(false);
      }
    };
    loadJournals();
  }, []);

  const filteredJournals = useMemo(() => {
    return journals.filter((j) => {
      const matchesSearch =
        j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.mentor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.abstract.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        activeCategory === 'Semua' ? true : j.category === activeCategory;
      const matchesBest = bestOnly ? j.is_best : true;
      return matchesSearch && matchesCategory && matchesBest;
    });
  }, [journals, searchTerm, activeCategory, bestOnly]);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-emerald-800/40">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
              <Scroll className="w-3.5 h-3.5" /> Jurnal & Repositori Ilmiah
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Publikasi Karya Ilmiah & Skripsi Terbaik Mahasiswa IAT
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Kumpulan artikel ilmiah, hasil riset munaqasyah skripsi, dan kajian komparatif tafsir mahasiswa Program Studi Ilmu Al-Qur'an dan Tafsir STAI Al-Mannan.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search & Category Filter */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari judul skripsi, tema kajian tafsir, nama mahasiswa atau pembimbing..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-2">
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

            <button
              onClick={() => setBestOnly(!bestOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                bestOnly
                  ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-amber-400'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${bestOnly ? 'fill-slate-950' : 'text-amber-500'}`} />
              Hanya Skripsi Terbaik
            </button>
          </div>
        </div>

        {/* Journals List */}
        {loading ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-700 mx-auto mb-3" />
            <p className="text-slate-500 font-bold text-sm">Memuat Naskah Jurnal & Skripsi...</p>
          </div>
        ) : filteredJournals.length > 0 ? (
          <div className="space-y-6">
            {filteredJournals.map((item) => (
              <JournalCard key={item.id} journal={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 p-8 space-y-3">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-700">Belum ada karya ilmiah yang sesuai</h3>
            <p className="text-xs text-slate-400">Silakan coba gunakan kata kunci pencarian lain.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Journals;
