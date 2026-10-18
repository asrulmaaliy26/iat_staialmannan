import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Loader2,
  Image as ImageIcon,
  Tag,
  Plus,
  Trash2,
  Sparkles,
  Wand2,
  CheckCircle
, Eye, X, ExternalLink } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { fetchNewsDetail, updateNews, fetchNewsCategories } from '../../services/api';
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
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);
  const [briefSketch, setBriefSketch] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSmartAIWrite = async () => {
    setIsGenerating(true);
    try {
      const validImages: (File | string)[] = [];
      if (mainImage) validImages.push(mainImage);
      else if (currentMainImage) validImages.push(currentMainImage);
      gallery.forEach((f) => { if (f) validImages.push(f); });
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
        toast.success('Artikel berhasil diperbarui dengan AI!');
      }
    } catch (error) {
      console.error('Error generating AI news:', error);
      toast.error('Gagal membuat artikel dengan AI.');
    } finally {
      setIsGenerating(false);
    }
  };

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
        setExcerpt(stripHtml(data.excerpt || extractCleanExcerpt(data.content)));
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
        excerpt: stripHtml(excerpt) || extractCleanExcerpt(content),
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
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Ringkasan 1-2 kalimat untuk preview..."
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
              Gambar Utama
            </label>
            {currentMainImage && !mainImage && (
              <div className="mb-3 p-3.5 bg-blue-50 border border-blue-200 rounded-2xl flex items-center gap-4">
                <div 
                  className="relative group cursor-pointer w-16 h-16 rounded-xl overflow-hidden border border-blue-300 shadow-sm flex-shrink-0"
                  onClick={() => setPreviewImage(currentMainImage)}
                  title="Klik untuk melihat foto ukuran penuh"
                >
                  <img src={currentMainImage} alt="Gambar Utama" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-blue-900 font-bold mb-0.5">📷 Gambar Utama Saat Ini</p>
                  <p className="text-[11px] text-blue-700 truncate max-w-xs">{currentMainImage.split('/').pop()}</p>
                  <button
                    type="button"
                    onClick={() => setPreviewImage(currentMainImage)}
                    className="mt-1 text-xs font-bold text-blue-800 hover:text-blue-950 underline flex items-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" /> Klik untuk melihat foto penuh
                  </button>
                </div>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && setMainImage(e.target.files[0])}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-800 file:text-white"
            />
            {mainImage && (
              <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
                <div 
                  className="relative group cursor-pointer w-14 h-14 rounded-xl overflow-hidden border border-emerald-300 shadow-sm flex-shrink-0"
                  onClick={() => setPreviewImage(URL.createObjectURL(mainImage))}
                  title="Klik untuk melihat foto ukuran penuh"
                >
                  <img 
                    src={URL.createObjectURL(mainImage)} 
                    alt="Preview File Baru" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-emerald-900 font-bold mb-0.5">📎 File Baru Dipilih:</p>
                  <p className="text-[11px] text-emerald-700 truncate max-w-xs">{mainImage.name}</p>
                  <button
                    type="button"
                    onClick={() => setPreviewImage(URL.createObjectURL(mainImage))}
                    className="mt-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 underline flex items-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" /> Klik untuk melihat pratinjau
                  </button>
                </div>
              </div>
            )}
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
                  (mainImage ? 1 : (currentMainImage ? 1 : 0)) + gallery.filter(Boolean).length > 0
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-white/10 text-white/50'
                }`}>
                  📷 {(mainImage ? 1 : (currentMainImage ? 1 : 0)) + gallery.filter(Boolean).length} foto siap dianalisis
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
                <span>Perbarui / Buat Berita dengan AI</span>
              </>
            )}
          </button>
        </section>

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
{/* Modal Lightbox untuk Melihat Foto Penuh */}
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

export default EditNews;
