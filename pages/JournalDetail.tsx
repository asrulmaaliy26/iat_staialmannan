import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchJournalDetail, fetchJournals } from '../services/api';
import { JournalItem } from '../types';
import { ArrowLeft, User, GraduationCap, Star, Download, FileCheck, BookOpen, Calendar, Award } from 'lucide-react';

const JournalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [journal, setJournal] = useState<JournalItem | null>(null);
  const [relatedJournals, setRelatedJournals] = useState<JournalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadDetail = async () => {
      if (!id) return;
      setLoading(true);
      setError(false);
      try {
        const data = await fetchJournalDetail(id);
        setJournal(data);

        const all = await fetchJournals('Ushuluddin', 'IAT');
        setRelatedJournals(all.filter((j) => j.id.toString() !== id.toString()).slice(0, 3));
      } catch (err) {
        console.error('Error loading journal detail:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    window.scrollTo(0, 0);
    loadDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-800"></div>
      </div>
    );
  }

  if (error || !journal) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-black text-slate-800 mb-2">Jurnal Tidak Ditemukan</h2>
        <p className="text-slate-500 mb-6 text-sm">Naskah jurnal atau skripsi yang Anda cari tidak tersedia.</p>
        <Link
          to="/jurnal"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Repositori Jurnal
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/jurnal"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-800 font-bold text-xs sm:text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Repositori Jurnal & Skripsi
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article */}
          <div className="lg:col-span-8 space-y-8">
            <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="bg-emerald-900/90 text-emerald-200 border border-emerald-700/50 px-3.5 py-1 rounded-full text-xs font-bold shadow-sm">
                    IAT • Ushuluddin
                  </span>
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {journal.category}
                  </span>
                  {journal.is_best && (
                    <span className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 px-3 py-1 rounded-full text-xs font-extrabold shadow-sm">
                      <Star className="w-3 h-3 fill-slate-950" /> Skripsi / Jurnal Terbaik
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                  {journal.title}
                </h1>

                <div className="flex items-center gap-4 text-xs text-slate-400 font-medium pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" /> Tanggal Ujian Munaqasyah: {journal.date}
                  </span>
                </div>
              </div>

              {/* Score & Author Meta Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-emerald-600" /> Peneliti / Penulis
                  </p>
                  <p className="font-extrabold text-sm text-slate-900">{journal.author}</p>
                  <p className="text-[11px] text-slate-500">Mahasiswa IAT STAI Al-Mannan</p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-600" /> Dosen Pembimbing
                  </p>
                  <p className="font-extrabold text-sm text-slate-900">{journal.mentor}</p>
                  <p className="text-[11px] text-slate-500">Dewan Dosen Ushuluddin</p>
                </div>

                <div className="space-y-1 sm:border-l sm:border-slate-200 sm:pl-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-emerald-600" /> Nilai Sidang
                  </p>
                  <p className="font-black text-2xl text-emerald-700">{journal.score}</p>
                  <p className="text-[11px] font-bold text-amber-600">Predikat: Mumtaz</p>
                </div>
              </div>

              {/* Abstract */}
              <div className="space-y-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-emerald-700" /> Abstrak Penelitian
                </h3>
                <div className="p-6 bg-emerald-950/5 rounded-2xl border border-emerald-900/10 text-slate-700 text-sm sm:text-base leading-relaxed italic whitespace-pre-line">
                  "{journal.abstract?.replace(/<[^>]+>/g, '')}"
                </div>
              </div>

              {/* Download / Access Document CTA */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  <p>Hak Cipta © Karya Ilmiah Mahasiswa Program Studi Ilmu Al-Qur'an dan Tafsir.</p>
                </div>
                {journal.documentUrl && journal.documentUrl !== '#' ? (
                  <a
                    href={journal.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Unduh Naskah Lengkap (PDF)
                  </a>
                ) : (
                  <button
                    onClick={() => alert('Naskah fisik lengkap tersedia di Ruang Baca Perpustakaan Turats STAI Al-Mannan.')}
                    className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" /> Baca di Perpustakaan
                  </button>
                )}
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-base font-black text-slate-900 pb-3 border-b border-slate-100">
                Skripsi & Jurnal Terkait
              </h3>
              <div className="space-y-4">
                {relatedJournals.map((j) => (
                  <Link
                    to={`/jurnal/${j.id}`}
                    key={j.id}
                    className="block p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-100 transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                      <span className="text-emerald-800">{j.category}</span>
                      <span>Nilai: {j.score}</span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-xs leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
                      {j.title}
                    </h4>
                    <p className="text-[11px] text-slate-500">Penulis: {j.author}</p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default JournalDetail;
