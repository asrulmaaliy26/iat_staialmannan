import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Eye, Search, BookOpen, Star, Loader2 } from 'lucide-react';
import { fetchJournals, deleteJournal } from '../../services/api';
import { JournalItem } from '../../types';
import { useToast } from '../../components/ToastProvider';

const ManageJournals: React.FC = () => {
  const [journals, setJournals] = useState<JournalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { success, error } = useToast();

  const loadJournals = async () => {
    setLoading(true);
    try {
      const data = await fetchJournals('Ushuluddin', 'IAT');
      setJournals(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJournals();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus naskah jurnal / skripsi ini?')) return;
    try {
      await deleteJournal(id);
      success('Jurnal berhasil dihapus!');
      loadJournals();
    } catch (err: any) {
      error(err.message || 'Gagal menghapus jurnal');
    }
  };

  const filtered = journals.filter((j) =>
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 sm:p-10 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-amber-600" /> Kelola Jurnal & Skripsi IAT
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Daftar karya ilmiah, jurnal studi tafsir, dan repositori skripsi mahasiswa.
          </p>
        </div>
        <Link
          to="/admin/journals/create"
          className="px-5 py-3 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" /> Input Jurnal / Skripsi
        </Link>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari judul atau nama peneliti..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-amber-600"
          />
        </div>

        {loading ? (
          <div className="text-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-amber-600 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-500">Memuat data jurnal...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">Judul Karya Ilmiah</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4">Penulis</th>
                  <th className="p-4">Pembimbing</th>
                  <th className="p-4 text-center">Nilai</th>
                  <th className="p-4 text-center">Terbaik</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filtered.map((j) => (
                  <tr key={j.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 max-w-xs font-bold text-slate-900 line-clamp-2">{j.title}</td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-bold text-[10px]">
                        {j.category}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap">{j.author}</td>
                    <td className="p-4 whitespace-nowrap">{j.mentor}</td>
                    <td className="p-4 text-center font-extrabold text-emerald-700">{j.score}</td>
                    <td className="p-4 text-center">
                      {j.is_best ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                          <Star className="w-3 h-3 fill-amber-600 text-amber-600" /> Ya
                        </span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <Link
                        to={`/jurnal/${j.id}`}
                        target="_blank"
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 inline-block"
                        title="Lihat"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to={`/admin/journals/edit/${j.id}`}
                        className="p-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 inline-block"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(j.id)}
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
            <p className="text-xs font-bold text-slate-400">Belum ada data jurnal atau skripsi yang ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageJournals;
