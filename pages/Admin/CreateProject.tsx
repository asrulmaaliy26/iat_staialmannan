import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, Image as ImageIcon, FileText, Plus, Trash2, FolderKanban } from 'lucide-react';
import { createProject } from '../../services/api';
import { useToast } from '../../components/ToastProvider';

const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Pengabdian Masyarakat');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('Tim Dosen & Mahasiswa IAT');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);
  const [documentTitles, setDocumentTitles] = useState<string[]>([]);

  const categories = [
    'Pengabdian Masyarakat',
    'Riset Living Qur\'an',
    'Digital Quranic Studies',
    'Filologi & Manuskrip',
    'Desa Binaan Al-Qur\'an'
  ];

  const handleAddDoc = () => {
    setDocumentFiles([...documentFiles, null as any]);
    setDocumentTitles([...documentTitles, '']);
  };

  const handleRemoveDoc = (index: number) => {
    setDocumentFiles(documentFiles.filter((_, i) => i !== index));
    setDocumentTitles(documentTitles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !author.trim()) {
      toast.warning('Mohon lengkapi judul, deskripsi, dan nama peneliti!');
      return;
    }

    setIsSubmitting(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const validDocs = documentFiles.filter((f) => f !== null && f !== undefined);

      let finalImage: File | undefined = imageFile || undefined;
      if (!finalImage) {
        try {
          const res = await fetch('/gedung.jpg');
          const blob = await res.blob();
          finalImage = new File([blob], 'gedung.jpg', { type: blob.type || 'image/jpeg' });
        } catch {
          finalImage = undefined;
        }
      }

      await createProject({
        title,
        category,
        description,
        author,
        date: today,
        jenjang: 'KAMPUS',
        fakultas: 'Ushuluddin',
        jurusan: 'IAT',
        imageUrl: finalImage,
        documents: validDocs.length > 0 ? validDocs : undefined,
        document_titles: documentTitles.length > 0 ? documentTitles : undefined,
      });

      toast.success('Proyek pengabdian / riset berhasil ditambahkan!');
      navigate('/admin/projects');
    } catch (err: any) {
      toast.error(err.message || 'Gagal menyimpan proyek');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">Tambah Proyek Pengabdian & Riset</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Program Studi Ilmu Al-Qur'an dan Tafsir</p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-6 py-3.5 bg-blue-800 hover:bg-blue-900 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-amber-400" /> Menyimpan...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 text-amber-400" /> Simpan Proyek
            </>
          )}
        </button>
      </header>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
            Judul Program / Riset <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Contoh: Digitalisasi Naskah Tafsir Pegon Abad 19..."
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
              placeholder="Contoh: Lab Al-Qur'an & Tim Mahasiswa IAT"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
            Foto Dokumentasi Proyek
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
            Deskripsi & Latar Belakang Kegiatan <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={6}
            placeholder="Jelaskan tujuan kegiatan, metode pelaksanaan, serta dampak bagi masyarakat..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-blue-700"
          />
        </div>

        {/* Documents */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Lampiran Dokumen / Laporan (PDF)
            </label>
            <button
              type="button"
              onClick={handleAddDoc}
              className="flex items-center gap-1 text-xs font-bold text-blue-800 hover:text-blue-950"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah Dokumen
            </button>
          </div>

          <div className="space-y-3">
            {documentFiles.map((_, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row gap-3 items-center">
                <input
                  type="text"
                  placeholder="Judul Dokumen (Contoh: Laporan Akhir Pengabdian)"
                  value={documentTitles[idx] || ''}
                  onChange={(e) => {
                    const next = [...documentTitles];
                    next[idx] = e.target.value;
                    setDocumentTitles(next);
                  }}
                  className="w-full sm:w-1/2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                />
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    if (e.target.files) {
                      const next = [...documentFiles];
                      next[idx] = e.target.files[0];
                      setDocumentFiles(next);
                    }
                  }}
                  className="w-full sm:w-1/2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveDoc(idx)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl self-end sm:self-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
