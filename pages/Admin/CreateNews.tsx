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
  Sparkles,
  Wand2,
  CheckCircle
, Eye, X, ExternalLink } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { createNews, fetchNewsCategories } from '../../services/api';
import { generateNewsArticle } from '../../services/gemini';
import { useToast } from '../../components/ToastProvider';

// Helper to strip HTML tags and decode entities into plain text
const stripHtml = (html?: string) => {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#[0-9]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

// Helper to extract clean excerpt from content body (skips first heading)
const extractCleanExcerpt = (contentHtml?: string) => {
  if (!contentHtml) return '';
  const contentWithoutHeading = contentHtml.replace(/^<h[1-6][^>]*>.*?<\/h[1-6]>/is, '');
  const plainText = stripHtml(contentWithoutHeading || contentHtml);
  return plainText.substring(0, 160).trim() + (plainText.length > 160 ? '...' : '');
};

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
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [briefSketch, setBriefSketch] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSmartAIWrite = async () => {
    setIsGenerating(true);
    try {
      const validImages = [mainImage, ...gallery].filter(
        (img): img is File => !!img && img instanceof File
      );
      const generatedHtml = await generateNewsArticle({
        briefDescription: briefSketch.trim() || undefined,
        title: title.trim() || undefined,
        category: category || undefined,
        excerpt: excerpt.trim() || undefined,
        jenjang: 'KAMPUS',
        jurusan: "Ilmu Al-Qur'an dan Tafsir (IAT)",
        fakultas: 'Ushuluddin',
        images: validImages
      });

      if (generatedHtml) {
        setContent(generatedHtml);
        // Auto-extract title if title is empty
        if (!title.trim()) {
          const titleMatch = generatedHtml.match(/<h[1-3][^>]*>(.*?)<\/h[1-3]>/i);
          if (titleMatch && titleMatch[1]) {
            setTitle(stripHtml(titleMatch[1]));
          }
        }
        // Auto-extract clean excerpt if empty
        if (!excerpt.trim()) {
          setExcerpt(extractCleanExcerpt(generatedHtml));
        }
        toast.success('Artikel berhasil dibuat dengan AI!');
      }
    } catch (error) {
      console.error('Error generating AI news:', error);
      toast.error('Gagal membuat artikel dengan AI.');
    } finally {
      setIsGenerating(false);
    }
  };

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

    let finalExcerpt = stripHtml(excerpt) || extractCleanExcerpt(content);

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
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Ringkasan Singkat (Excerpt)
            </label>
            <button
              type="button"
              onClick={() => {
                const sourceText = content || excerpt;
                if (!sourceText.trim()) {
                  toast.warning("Konten masih kosong.");
                  return;
                }
                setExcerpt(extractCleanExcerpt(sourceText));
                toast.success("Ringkasan berhasil dibersihkan / diekstrak!");
              }}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 transition-colors bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-xl border border-emerald-200 shadow-sm"
              title="Bersihkan tag HTML dan ekstrak ringkasan dari konten"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Bersihkan / Ekstrak dari Konten
            </button>
          </div>
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

        {/* Multimodal AI News Assistant Card */}
        <section className="bg-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-800/60">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-black flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" /> AI News Assistant (Multimodal)
            </h3>
            <span className="text-[10px] bg-white/10 text-amber-300 font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
              Gemini Vision AI
            </span>
          </div>

          <p className="text-xs text-emerald-200/80 mb-5 leading-relaxed">
            AI otomatis membaca <strong>semua foto yang diunggah</strong>, judul, ringkasan, dan kategori sebagai <em>base prompt</em>.
          </p>

          {/* Base Prompt Status Indicator */}
          <div className="bg-black/30 rounded-2xl p-4 mb-5 border border-white/10 space-y-2 text-xs">
            <p className="font-bold text-amber-300 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" /> Konteks Dasar (Base Prompt)
            </p>
            <div className="space-y-1 text-slate-200">
              <p className="truncate"><span className="text-white/60">Judul:</span> {title.trim() ? title : <span className="text-white/40 italic">Otomatis dibuat dari AI</span>}</p>
              <p><span className="text-white/60">Kategori:</span> <span className="font-semibold text-emerald-300">{category || 'Kajian Tafsir'}</span></p>
              <p className="flex items-center gap-2">
                <span className="text-white/60">Foto Terdeteksi:</span>
                <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
                  (mainImage ? 1 : 0) + gallery.filter(Boolean).length > 0
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-white/10 text-white/50'
                }`}>
                  📷 {(mainImage ? 1 : 0) + gallery.filter(Boolean).length} foto siap dianalisis
                </span>
              </p>
              {excerpt.trim() && (
                <p className="line-clamp-2 text-white/70 italic text-[11px]">
                  "{excerpt}"
                </p>
              )}
            </div>
          </div>

          {/* Additional Prompt Input */}
          <label className="text-xs font-bold text-slate-300 block mb-2">
            Poin / Instruksi Tambahan (Opsional)
          </label>
          <textarea
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-3.5 text-xs sm:text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-amber-400 mb-4"
            placeholder="Tambahkan poin khusus jika ada (contoh: 'Tekankan pesan dari Dekan Fakultas Ushuluddin', 'Sebutkan pembicara utama...'). Jika kosong, AI akan langsung menganalisis foto dan data di atas..."
            value={briefSketch}
            onChange={(e) => setBriefSketch(e.target.value)}
          ></textarea>

          <button
            type="button"
            onClick={handleSmartAIWrite}
            disabled={isGenerating}
            className="w-full bg-amber-400 text-emerald-950 font-black py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 text-xs sm:text-sm"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-emerald-950" />
                <span>AI Menganalisis Foto & Menulis...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 text-emerald-950" />
                <span>Buat Berita dengan AI</span>
              </>
            )}
          </button>
        </section>

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
      {/* Lightbox Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setPreviewImage(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[92vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/20 p-3 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex justify-between items-center px-4 py-2 border-b border-white/10 text-white mb-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-400" /> Pratinjau Foto Penuh
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={previewImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-bold"
                  title="Buka ukuran asli di tab baru"
                >
                  <ExternalLink className="w-4 h-4" /> Buka Ukuran Asli
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewImage(null)}
                  className="p-2 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white transition-colors"
                  title="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="overflow-auto max-h-[80vh] w-full flex items-center justify-center p-2">
              <img
                src={previewImage}
                alt="Preview Foto"
                className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNews;
