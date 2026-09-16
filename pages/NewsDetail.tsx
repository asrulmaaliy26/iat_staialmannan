import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchNewsDetail, fetchNews, incrementNewsViews } from '../services/api';
import { NewsItem } from '../types';
import { ArrowLeft, Calendar, Eye, ZoomIn, X, User, Share2, Clock } from 'lucide-react';
import 'react-quill-new/dist/quill.snow.css';

// Helper to format date and time in Indonesian locale with hours, minutes, seconds
const formatNewsDateTime = (dateStr?: string, createdAtStr?: string) => {
  if (!dateStr && !createdAtStr) {
    return {
      dateText: '-',
      timeText: '00:00:00 WIB',
      fullText: '-'
    };
  }

  let dateObj: Date = new Date();
  const d = dateStr ? new Date(dateStr) : null;
  const c = createdAtStr ? new Date(createdAtStr) : null;

  if (c && !isNaN(c.getTime()) && (c.getHours() !== 0 || c.getMinutes() !== 0 || c.getSeconds() !== 0)) {
    if (d && !isNaN(d.getTime())) {
      dateObj = new Date(d.getFullYear(), d.getMonth(), d.getDate(), c.getHours(), c.getMinutes(), c.getSeconds());
    } else {
      dateObj = c;
    }
  } else if (d && !isNaN(d.getTime())) {
    dateObj = d;
  } else if (c && !isNaN(c.getTime())) {
    dateObj = c;
  }

  try {
    const dateText = dateObj.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const timeText = dateObj.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(/\./g, ':') + ' WIB';

    return {
      dateText,
      timeText,
      fullText: `${dateText} • ${timeText}`
    };
  } catch {
    return {
      dateText: dateStr || '-',
      timeText: '00:00:00 WIB',
      fullText: dateStr || '-'
    };
  }
};

const formatShortDate = (dateStr?: string) => {
  if (!dateStr) return '-';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
};

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
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

  const dateTimeInfo = formatNewsDateTime(news.date, news.created_at);

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
              {/* 1. Header Tags (Kategori & Jenjang di paling atas sebelum judul) */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="bg-emerald-900/90 text-emerald-200 border border-emerald-700/50 px-3.5 py-1 rounded-full text-xs font-bold shadow-sm">
                  {news.category || 'Kajian IAT'}
                </span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                  Fakultas Ushuluddin
                </span>
              </div>

              {/* 2. Judul Berita (Di atas gambar) */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                {news.title}
              </h1>

              {/* 3. Tanggal & Jam Upload (Kecil di atas gambar) */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-500 font-medium pb-4 border-b border-slate-100">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <span>{dateTimeInfo.dateText}</span>
                </div>
                <span className="hidden sm:inline text-slate-300">•</span>
                <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700 font-semibold text-xs border border-slate-200">
                  <Clock className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{dateTimeInfo.timeText}</span>
                </div>
                <span className="hidden sm:inline text-slate-300">•</span>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Redaksi IAT</span>
                </div>
              </div>

              {/* 4. Main Image Container (Dokumentasi jelas tanpa ketutupan, views di dalam gambar) */}
              <div 
                className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 shadow-md group cursor-pointer"
                onClick={() => setSelectedImage(news.main_image || '/gedungdepan.jpg')}
              >
                {!imgLoaded && (
                  <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center z-10">
                    <div className="w-10 h-10 border-4 border-slate-300 border-t-emerald-700 rounded-full animate-spin"></div>
                  </div>
                )}
                <img
                  src={news.main_image || '/gedungdepan.jpg'}
                  alt={news.title}
                  className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImgLoaded(true)}
                />

                {/* Ambient overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors pointer-events-none"></div>

                {/* Floating Views Badge inside image */}
                <div className="absolute top-4 right-4 z-20 pointer-events-none">
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md text-white text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg">
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{news.views || 0} Dilihat</span>
                  </div>
                </div>

                {/* Zoom hover indicator */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-black/50 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 border border-white/30 hidden md:flex items-center gap-2 text-white text-xs font-semibold px-4 shadow-xl">
                    <ZoomIn className="text-white w-4 h-4" />
                    <span>Klik untuk memperbesar</span>
                  </div>
                </div>
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
                      .replace(/\u00A0/g, ' ')
                      .replace(/\n/g, '</p><p>')
                      .replace(/<p><\/p>/g, '<p><br></p>')
                      .replace(/<p>\s*<\/p>/g, '<p><br></p>')
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
                    className="flex items-start gap-3.5 group p-2 rounded-2xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 flex-shrink-0">
                      <img
                        src={item.main_image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=400&auto=format&fit=crop';
                        }}
                      />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <h4 className="font-bold text-slate-800 text-xs leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-[10px] font-medium text-slate-400">{formatShortDate(item.date)}</p>
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
