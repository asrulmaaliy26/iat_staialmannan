import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProjectDetail, fetchProjects } from '../services/api';
import { ProjectItem } from '../types';
import { ArrowLeft, Calendar, User, FileText, Download, FolderKanban, Sparkles } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadDetail = async () => {
      if (!id) return;
      setLoading(true);
      setError(false);
      try {
        const data = await fetchProjectDetail(id);
        setProject(data);

        const all = await fetchProjects('Ushuluddin', 'IAT');
        setRelatedProjects(all.filter((p) => p.id.toString() !== id.toString()).slice(0, 3));
      } catch (err) {
        console.error('Error loading project detail:', err);
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

  if (error || !project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-black text-slate-800 mb-2">Proyek Tidak Ditemukan</h2>
        <p className="text-slate-500 mb-6 text-sm">Data riset atau pengabdian masyarakat yang Anda cari tidak tersedia.</p>
        <Link
          to="/projek"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Riset
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/projek"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-800 font-bold text-xs sm:text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Pengabdian & Riset
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="bg-slate-900 text-amber-300 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-bold shadow-sm">
                    {project.category}
                  </span>
                  <span className="bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-xs font-bold">
                    IAT • Ushuluddin
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                  {project.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" /> {project.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-emerald-600" /> {project.author}
                  </span>
                </div>
              </div>

              {/* Main Image */}
              <div className="rounded-2xl overflow-hidden aspect-video bg-slate-900">
                <img
                  src={project.imageUrl || '/gedung.jpg'}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-black text-slate-900">Ringkasan & Deskripsi Kegiatan</h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              {/* Attached Documents */}
              {project.documents && project.documents.length > 0 && (
                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-700" /> Dokumen & Laporan Terkait
                  </h3>
                  <div className="space-y-2.5">
                    {project.documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-xs sm:text-sm text-slate-800">{doc.title}</p>
                            <p className="text-[10px] text-slate-400 uppercase font-semibold">Format: {doc.format || 'PDF'}</p>
                          </div>
                        </div>
                        {doc.url && doc.url !== '#' && (
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm hover:bg-emerald-900 transition-all"
                          >
                            <Download className="w-3.5 h-3.5" /> Unduh
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-base font-black text-slate-900 pb-3 border-b border-slate-100">
                Proyek Riset Lainnya
              </h3>
              <div className="space-y-4">
                {relatedProjects.map((p) => (
                  <Link
                    to={`/projek/${p.id}`}
                    key={p.id}
                    className="flex items-start gap-3.5 group"
                  >
                    <img
                      src={p.imageUrl || '/gedung.jpg'}
                      alt={p.title}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-800 text-xs leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
                        {p.title}
                      </h4>
                      <p className="text-[10px] text-slate-400">{p.date}</p>
                    </div>
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

export default ProjectDetail;
