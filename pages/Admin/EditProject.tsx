import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, Image as ImageIcon, FileText } from 'lucide-react';
import { fetchProjectDetail, updateProject } from '../../services/api';
import { useToast } from '../../components/ToastProvider';

const EditProject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Pengabdian Masyarakat');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const categories = [
    'Pengabdian Masyarakat',
    'Riset Living Qur\'an',
    'Digital Quranic Studies',
    'Filologi & Manuskrip',
    'Desa Binaan Al-Qur\'an'
  ];

  useEffect(() => {
    const loadDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await fetchProjectDetail(id);
        setTitle(data.title || '');
        setCategory(data.category || 'Pengabdian Masyarakat');
        setDescription(data.description || '');
        setAuthor(data.author || '');
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadDetail();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !author.trim()) {
      toast.warning('Mohon lengkapi seluruh kolom!');
      return;
    }

    setIsSubmitting(true);
    try {
      const today = new Date().toISOString().split('T')[0];

      await updateProject({
        id: Number(id),
        title,
        category,
        description,
        author,
        date: today,
        jenjang: 'KAMPUS',
        fakultas: 'Ushuluddin',
        jurusan: 'IAT',
        imageUrl: imageFile || undefined,
      });

      toast.success('Proyek riset berhasil diperbarui!');
      navigate('/admin/projects');
    } catch (err: any) {
      toast.error(err.message || 'Gagal memperbarui proyek');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-800 mx-auto mb-2" />
        <p className="text-xs text-slate-500 font-bold">Memuat data proyek...</p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto w-full space-y-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/projects"
            className="p-3 bg-slate-100 rounded-2xl text-slate-600 hover:text-slate-900 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">Edit Proyek Riset IAT</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">ID Proyek: #{id}</p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-6 py-3.5 bg-blue-800 hover:bg-blue-900 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-amber-400" /> Memperbarui...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 text-amber-400" /> Simpan Perubahan
            </>
          )}
        </button>
      </header>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
            Judul Proyek / Pengabdian <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-700"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Kategori Proyek
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-700"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Peneliti / Tim Pelaksana <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
            Ganti Foto Proyek (Opsional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-800 file:text-white"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
            Deskripsi & Latar Belakang <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-700"
          />
        </div>
      </div>
    </div>
  );
};

export default EditProject;
