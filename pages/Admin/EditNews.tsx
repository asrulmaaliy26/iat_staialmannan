import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Loader2,
  Image as ImageIcon,
  Tag,
  Plus,
  Trash2
} from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { fetchNewsDetail, updateNews, fetchNewsCategories } from '../../services/api';
import { useToast } from '../../components/ToastProvider';

const EditNews: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('Kajian Tafsir');
  const [content, setContent] = useState('');
  const [currentMainImage, setCurrentMainImage] = useState<string>('');
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);

  useEffect(() => {
    const loadDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const [cats, data] = await Promise.all([
          fetchNewsCategories(),
          fetchNewsDetail(id)
        ]);
        if (cats && cats.length > 0) {
          setCategories(cats);
        }
        setTitle(data.title || '');
        setExcerpt(data.excerpt || '');
        setCategory(data.category || 'Kajian Tafsir');
        setContent(data.content || '');
        setCurrentMainImage(data.main_image || '');
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

    if (!title.trim() || !content.trim()) {
      toast.warning('Judul dan konten wajib diisi');
      return;
    }

    setIsSubmitting(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const validGallery = gallery.filter((f) => f !== null && f !== undefined);

      await updateNews({
        id: Number(id),
        title,
        excerpt,
        content,
        date: today,
        category,
        jenjang: 'KAMPUS',
        fakultas: 'Ushuluddin',
        jurusan: 'IAT',
        main_image: mainImage || undefined,
        gallery: validGallery.length > 0 ? validGallery : undefined,
      });

      toast.success('Berita berhasil diperbarui!');
      navigate('/admin/news');
    } catch (err: any) {
      toast.error(err.message || 'Gagal memperbarui berita');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-800 mx-auto mb-2" />
        <p className="text-xs text-slate-500 font-bold">Memuat data berita...</p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto w-full space-y-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/news"
            className="p-3 bg-slate-100 rounded-2xl text-slate-600 hover:text-slate-900 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">Edit Berita / Warta IAT</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">ID Berita: #{id}</p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
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
            Judul Berita <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-900 text-sm outline-none focus:ring-2 focus:ring-emerald-700"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
            Ringkasan Singkat (Excerpt)
          </label>
          <textarea
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-700"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Kategori
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-700"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Ganti Gambar Utama (Opsional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && setMainImage(e.target.files[0])}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-800 file:text-white"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
            Konten Berita <span className="text-rose-500">*</span>
          </label>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              className="h-80 mb-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNews;
