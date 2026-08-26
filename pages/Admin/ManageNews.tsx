import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Eye, Search, Newspaper, Loader2 } from 'lucide-react';
import { fetchNews, deleteNews } from '../../services/api';
import { NewsItem } from '../../types';
import { useToast } from '../../components/ToastProvider';

const ManageNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { success, error } = useToast();

  const loadNews = async () => {
    setLoading(true);
    try {
      const data = await fetchNews('Ushuluddin', 'IAT');
      setNews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) return;
    try {
      await deleteNews(id);
      success('Berita berhasil dihapus!');
      loadNews();
    } catch (err: any) {
      error(err.message || 'Gagal menghapus berita');
    }
  };

  const filteredNews = news.filter((n) =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 sm:p-10 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <Newspaper className="w-6 h-6 text-emerald-700" /> Kelola Warta & Berita IAT
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Daftar seluruh berita, artikel, dan rilis kegiatan Prodi IAT.
          </p>
        </div>
        <Link
          to="/admin/news/create"
          className="px-5 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" /> Tulis Berita Baru
        </Link>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari judul berita..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-700"
          />
        </div>

        {loading ? (
          <div className="text-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-700 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-500">Memuat data berita...</p>
          </div>
        ) : filteredNews.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">Foto</th>
                  <th className="p-4">Judul Berita</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4">Tanggal</th>
                  <th className="p-4">Views</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredNews.map((n) => (
                  <tr key={n.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <img
                        src={n.main_image || '/gedungdepan.jpg'}
                        alt={n.title}
                        className="w-14 h-14 object-cover rounded-xl border border-slate-200"
                      />
                    </td>
                    <td className="p-4 max-w-xs">
                      <p className="font-bold text-slate-900 line-clamp-2">{n.title}</p>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-bold text-[10px]">
                        {n.category}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap">{n.date}</td>
                    <td className="p-4">{n.views || 0}</td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <Link
                        to={`/berita/${n.id}`}
                        target="_blank"
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 inline-block"
                        title="Lihat"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to={`/admin/news/edit/${n.id}`}
                        className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 inline-block"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(n.id)}
                        className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 inline-block"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl">
            <p className="text-xs font-bold text-slate-400">Tidak ada berita yang ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageNews;
