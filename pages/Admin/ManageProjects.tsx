import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Eye, Search, FolderKanban, Loader2 } from 'lucide-react';
import { fetchProjects, deleteProject } from '../../services/api';
import { ProjectItem } from '../../types';
import { useToast } from '../../components/ToastProvider';

const ManageProjects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { success, error } = useToast();

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects('Ushuluddin', 'IAT');
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus data riset / proyek ini?')) return;
    try {
      await deleteProject(id);
      success('Proyek berhasil dihapus!');
      loadProjects();
    } catch (err: any) {
      error(err.message || 'Gagal menghapus proyek');
    }
  };

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 sm:p-10 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <FolderKanban className="w-6 h-6 text-blue-700" /> Kelola Pengabdian & Riset IAT
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Daftar kegiatan pengabdian masyarakat, desa binaan tahfidz, dan riset Al-Qur'an.
          </p>
        </div>
        <Link
          to="/admin/projects/create"
          className="px-5 py-3 bg-blue-800 hover:bg-blue-900 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" /> Tambah Proyek Riset
        </Link>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari judul proyek..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-700"
          />
        </div>

        {loading ? (
          <div className="text-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-blue-700 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-500">Memuat data proyek...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">Foto</th>
                  <th className="p-4">Judul Proyek</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4">Peneliti / Tim</th>
                  <th className="p-4">Tanggal</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <img
                        src={p.imageUrl || '/gedung.jpg'}
                        alt={p.title}
                        className="w-14 h-14 object-cover rounded-xl border border-slate-200"
                      />
                    </td>
                    <td className="p-4 max-w-xs font-bold text-slate-900 line-clamp-2">{p.title}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 font-bold text-[10px]">
                        {p.category}
                      </span>
                    </td>
                    <td className="p-4">{p.author}</td>
                    <td className="p-4 whitespace-nowrap">{p.date}</td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <Link
                        to={`/projek/${p.id}`}
                        target="_blank"
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 inline-block"
                        title="Lihat"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        to={`/admin/projects/edit/${p.id}`}
                        className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 inline-block"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id)}
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
            <p className="text-xs font-bold text-slate-400">Belum ada proyek pengabdian & riset yang ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProjects;
