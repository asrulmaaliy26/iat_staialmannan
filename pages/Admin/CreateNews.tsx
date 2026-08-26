import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Loader2,
  Image as ImageIcon,
  Tag,
  AlignLeft,
  Plus,
  Trash2,
  Layers,
  Sparkles
} from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { createNews, fetchNewsCategories } from '../../services/api';
import { useToast } from '../../components/ToastProvider';

const CreateNews: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('Kajian Tafsir');
  const [content, setContent] = useState('');
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await fetchNewsCategories();
        if (cats && cats.length > 0) {
          setCategories(cats);
          setCategory(cats[0]);
        }
      } catch (error) {
        setCategories(['Kajian Tafsir', 'Seminar & Konferensi', 'Tahfidz & Halaqah', 'Akademik & Pengumuman', 'Prestasi Mahasiswa']);
      }
    };
    loadCategories();
  }, []);

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleGalleryChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newGallery = [...gallery];
      newGallery[index] = e.target.files[0];
      setGallery(newGallery);
    }
  };

  const addGalleryField = () => {
    setGallery([...gallery, null as any]);
  };

  const removeGalleryField = (index: number) => {
    setGallery(gallery.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.warning('Judul artikel wajib diisi');
      return;
    }
    if (!content.trim()) {
      toast.warning('Konten berita wajib diisi');
      return;
    }

    let finalExcerpt = excerpt.trim();
    if (!finalExcerpt) {
      const strippedContent = content
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      finalExcerpt = strippedContent.substring(0, 160) + '...';
    }

    setIsSubmitting(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const validGallery = gallery.filter((file) => file !== null && file !== undefined);

      let finalMainImage: File | undefined = mainImage || undefined;
      if (!finalMainImage) {
        try {
          const res = await fetch('/gedungdepan.jpg');
          const blob = await res.blob();
          finalMainImage = new File([blob], 'gedungdepan.jpg', { type: blob.type || 'image/jpeg' });
        } catch {
          finalMainImage = undefined;
        }
      }

      await createNews({
        title,
        excerpt: finalExcerpt,
        content,
        date: today,
        category,
        jenjang: 'KAMPUS',
        fakultas: 'Ushuluddin',
        jurusan: 'IAT',
        main_image: finalMainImage,
        gallery: validGallery.length > 0 ? validGallery : undefined,
      });

      toast.success('Berita IAT berhasil dipublikasikan!');
      navigate('/admin/news');
    } catch (err: any) {
      toast.error(err.message || 'Gagal menyimpan berita');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto w-full space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/news"
            className="p-3 bg-slate-100 rounded-2xl text-slate-600 hover:text-slate-900 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">Tulis Berita / Warta IAT</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Program Studi Ilmu Al-Qur'an dan Tafsir (Fakultas Ushuluddin)
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-amber-400" /> Menyimpan...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 text-amber-400" /> Simpan & Publikasikan
            </>
          )}
        </button>
      </header>

      {/* Form Card */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
            Judul Berita / Artikel <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Contoh: Seminar Internasional Tafsir Nusantara dan Living Qur'an..."
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
            placeholder="Ringkasan 1-2 kalimat untuk preview..."
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-700"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Kategori Berita
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
              Gambar Sampul Utama
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleMainImageChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-800 file:text-white"
            />
          </div>
        </div>

        {/* Gallery Fields */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Galeri Foto Tambahan
            </label>
            <button
              type="button"
              onClick={addGalleryField}
              className="flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah Foto
            </button>
          </div>

          <div className="space-y-2.5">
            {gallery.map((_, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleGalleryChange(idx, e)}
                  className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
                <button
                  type="button"
                  onClick={() => removeGalleryField(idx)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Content Editor */}
        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
            Isi Konten Berita <span className="text-rose-500">*</span>
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

export default CreateNews;
