import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, BookOpen, Star, FileText } from 'lucide-react';
import { createJournal } from '../../services/api';
import { useToast } from '../../components/ToastProvider';

const CreateJournal: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Studi Al-Qur\'an');
  const [abstract, setAbstract] = useState('');
  const [author, setAuthor] = useState('');
  const [mentor, setMentor] = useState('');
  const [score, setScore] = useState<number>(95);
  const [isBest, setIsBest] = useState(false);
  const [docFile, setDocFile] = useState<File | null>(null);

  const categories = [
    'Studi Al-Qur\'an',
    'Metodologi Tafsir',
    'Qira\'at & Rasm',
    'Hermeneutika',
    'Tafsir Nusantara',
    'Skripsi Terbaik'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !abstract.trim() || !author.trim() || !mentor.trim()) {
      toast.warning('Mohon lengkapi judul, abstrak, nama penulis, dan pembimbing!');
      return;
    }

    setIsSubmitting(true);
    try {
      const today = new Date().toISOString().split('T')[0];

      await createJournal({
        title,
        category,
        abstract,
        author,
        mentor,
        score,
        date: today,
        is_best: isBest,
        jenjang: 'KAMPUS',
        fakultas: 'Ushuluddin',
        jurusan: 'IAT',
        documentUrl: docFile || undefined,
      });

      toast.success('Karya ilmiah / skripsi berhasil didaftarkan!');
      navigate('/admin/journals');
    } catch (err: any) {
      toast.error(err.message || 'Gagal menyimpan jurnal');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto w-full space-y-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/journals"
            className="p-3 bg-slate-100 rounded-2xl text-slate-600 hover:text-slate-900 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">Input Jurnal / Skripsi Baru</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Program Studi Ilmu Al-Qur'an dan Tafsir</p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Simpan Karya Ilmiah
            </>
          )}
        </button>
      </header>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
            Judul Karya Ilmiah / Skripsi <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Contoh: Hermeneutika Kontekstual Fazlur Rahman terhadap Ayat-Ayat Sosial..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 text-sm outline-none focus:ring-2 focus:ring-amber-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Kategori Studi
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-amber-600"
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
              Nilai Sidang Munaqasyah (0 - 100)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 text-sm outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Penulis / Peneliti (Mahasiswa) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Nama lengkap mahasiswa..."
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 text-sm outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Dosen Pembimbing <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Contoh: Dr. H. Muhammad Arifin, M.Ag"
              value={mentor}
              onChange={(e) => setMentor(e.target.value)}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 text-sm outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
            Abstrak Penelitian <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={5}
            placeholder="Tuliskan latar belakang masalah, metodologi, dan temuan utama..."
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-amber-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Naskah Lengkap PDF
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => e.target.files && setDocFile(e.target.files[0])}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-600 file:text-white"
            />
          </div>

          <div className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              id="is_best"
              checked={isBest}
              onChange={(e) => setIsBest(e.target.checked)}
              className="w-5 h-5 accent-amber-600 rounded"
            />
            <label htmlFor="is_best" className="text-xs font-bold text-slate-800 cursor-pointer flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Tetapkan sebagai Skripsi / Jurnal Terbaik
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJournal;
