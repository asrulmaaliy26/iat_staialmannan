import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Filter, BookOpen, Calendar, Eye, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { fetchNews, fetchNewsCategories } from '../services/api';
import { NewsItem } from '../types';
import NewsCard from '../components/NewsCard';

const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [categories, setCategories] = useState<string[]>(['Semua']);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      try {
        const [cats, newsData] = await Promise.all([
          fetchNewsCategories(),
          fetchNews('Ushuluddin', 'IAT')
        ]);
        if (cats && cats.length > 0) {
          setCategories(['Semua', ...cats]);
        }
        setNews(newsData);
      } catch (err) {
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  const filteredNews = useMemo(() => {
    return news.filter((n) => {
      const matchesSearch =
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        activeCategory === 'Semua' ? true : n.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [news, searchTerm, activeCategory]);

  const trendingNews = useMemo(() => {
    return [...news]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 4);
  }, [news]);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-emerald-800/40">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-300 border border-emerald-600/40 text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Warta & Informasi
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Berita, Kajian Tafsir & Agenda Akademik IAT
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Liputan seminar internasional, halaqah kajian tafsir turats, khataman tahfidz, dan prestasi mahasiswa Fakultas Ushuluddin STAI Al-Mannan.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Feed Column */}
          <div className="lg:w-2/3 space-y-8">
            {/* Search & Category Bar */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari judul berita, topik kajian, atau pengumuman..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
                />
              </div>

              {/* Category Pills */}
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

            {/* News Grid / List */}
            {loading ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-700 mx-auto mb-3" />
                <p className="text-slate-500 font-bold text-sm">Memuat Berita IAT...</p>
              </div>
            ) : filteredNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredNews.map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 p-8 space-y-3">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-slate-700">Tidak ada berita yang sesuai</h3>
                <p className="text-xs text-slate-400">Silakan coba gunakan kata kunci pencarian atau kategori lain.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('Semua');
                  }}
                  className="px-4 py-2 bg-emerald-800 text-white text-xs font-bold rounded-xl"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <aside className="lg:w-1/3 space-y-8">
            {/* Trending News */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2.5 pb-4 border-b border-slate-100">
                <TrendingUp className="w-5 h-5 text-amber-500" />
                Berita Terpopuler
              </h3>

              <div className="space-y-4">
                {trendingNews.map((n, idx) => (
                  <Link
                    to={`/berita/${n.id}`}
                    key={n.id}
                    className="flex items-start gap-4 group"
                  >
                    <span className="text-3xl font-black text-slate-200 group-hover:text-emerald-700 transition-colors leading-none">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-800 text-xs sm:text-sm leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
                        {n.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 flex items-center gap-2">
                        <span>{n.date}</span>
                        <span>•</span>
                        <span>{(n.views || 0).toLocaleString()} pembaca</span>
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* PMB Banner Sidebar */}
            <div className="bg-gradient-to-br from-emerald-900 to-slate-950 p-6 sm:p-8 rounded-3xl text-white space-y-4 border border-emerald-800/40 shadow-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" /> PMB 2026/2027
              </div>
              <h4 className="text-xl font-black leading-snug">
                Pendaftaran Mahasiswa Baru Program Studi IAT
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tersedia kuota beasiswa tahfidz 30 juz dan beasiswa kader ulama tafsir.
              </p>
              <a
                href="https://siakad.staialmannan.ac.id/pendaftaran"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md"
              >
                Daftar Online
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default News;
