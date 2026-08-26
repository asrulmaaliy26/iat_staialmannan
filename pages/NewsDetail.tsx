import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchNewsDetail, fetchNews, incrementNewsViews } from '../services/api';
import { NewsItem } from '../types';
import { ArrowLeft, Calendar, Eye, ZoomIn, X, User, Share2, BookOpen } from 'lucide-react';
import 'react-quill-new/dist/quill.snow.css';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadDetail = async () => {
      if (!id) return;
      setLoading(true);
      setError(false);
      try {
        const data = await fetchNewsDetail(id);
        setNews(data);

        // Fetch related
        const all = await fetchNews('Ushuluddin', 'IAT');
        setRelatedNews(all.filter((n) => n.id.toString() !== id.toString()).slice(0, 3));
      } catch (err) {
        console.error('Error fetching detail:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    window.scrollTo(0, 0);
    loadDetail();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    incrementNewsViews(id).then((res) => {
      if (res && res.views) {
        setNews((prev) => (prev ? { ...prev, views: res.views } : prev));
      }
    });
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: news?.title || 'Berita IAT STAI Al-Mannan',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Tautan berita berhasil disalin ke clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-800"></div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-black text-slate-800 mb-2">Berita Tidak Ditemukan</h2>
        <p className="text-slate-500 mb-6 text-sm">Berita yang Anda cari mungkin telah dipindahkan atau dihapus.</p>
        <Link
          to="/berita"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Warta
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link & Share */}
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/berita"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-800 font-bold text-xs sm:text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Warta Berita
          </Link>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-emerald-800 hover:border-emerald-300 text-xs font-bold shadow-sm transition-all"
          >
            <Share2 className="w-4 h-4 text-emerald-600" /> Bagikan Berita
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article */}
          <div className="lg:col-span-8 space-y-8">
            <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm space-y-6">
              {/* Header Tags */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="bg-emerald-900/90 text-emerald-200 border border-emerald-700/50 px-3.5 py-1 rounded-full text-xs font-bold shadow-sm">
                    {news.category || 'Kajian IAT'}
                  </span>
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                    Fakultas Ushuluddin
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                  {news.title}
                </h1>

                <div className="flex items-center gap-4 text-xs text-slate-400 font-medium pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" /> {news.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-emerald-600" /> {(news.views || 0).toLocaleString()} pembaca
                  </span>
                </div>
              </div>

              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900">
                <img
                  src={news.main_image || '/gedungdepan.jpg'}
                  alt={news.title}
                  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                  onClick={() => setSelectedImage(news.main_image)}
                />
              </div>

              {/* Article Content */}
              <div className="ql-snow">
                <div
                  className="ql-editor font-sans text-sm sm:text-base text-slate-700 leading-relaxed !p-0 !overflow-visible
                  [&_p]:!mb-4
                  [&_h1]:font-black [&_h1]:text-slate-900 [&_h1]:!mb-3 [&_h1]:!mt-6
                  [&_h2]:font-black [&_h2]:text-slate-900 [&_h2]:!mb-3 [&_h2]:!mt-6
                  [&_h3]:font-black [&_h3]:text-slate-900 [&_h3]:!mb-3 [&_h3]:!mt-6
                  [&_ul]:!mb-4 [&_ol]:!mb-4 [&_li]:!mb-1
                  [&_a]:text-emerald-700 [&_a]:underline hover:[&_a]:text-emerald-800
                  [&_strong]:font-bold [&_strong]:text-slate-900
                  [&_img]:rounded-2xl [&_img]:shadow-md [&_img]:w-full [&_img]:!my-6"
                  dangerouslySetInnerHTML={{
                    __html: (news.content || '')
                      .replace(/&nbsp;/g, ' ')
                      .replace(/\n/g, '</p><p>')
                  }}
                />
              </div>

              {/* Footer Author Info */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Diterbitkan Oleh</p>
                    <p className="text-xs font-bold text-slate-800">Redaksi Prodi IAT STAI Al-Mannan</p>
                  </div>
                </div>
              </div>
            </article>

            {/* Gallery Section */}
            {news.gallery && news.gallery.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <ZoomIn className="w-5 h-5 text-emerald-700" /> Galeri Foto Dokumentasi
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {news.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className="aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md hover:scale-105 transition-all"
                    >
                      <img src={img} alt={`Galeri ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-base font-black text-slate-900 pb-3 border-b border-slate-100">
                Berita Terkait Lainnya
              </h3>
              <div className="space-y-4">
                {relatedNews.map((item) => (
                  <Link
                    to={`/berita/${item.id}`}
                    key={item.id}
                    className="flex items-start gap-3.5 group"
                  >
                    <img
                      src={item.main_image}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-800 text-xs leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-slate-400">{item.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Image Modal Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default NewsDetail;
