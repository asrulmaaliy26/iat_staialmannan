import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { User, GraduationCap, Star, Download, BookOpen, FileCheck } from 'lucide-react';
import { JournalItem } from '../types';

interface JournalCardProps {
  journal: JournalItem;
}

const JournalCard: React.FC<JournalCardProps> = memo(({ journal }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        <div className="flex-1 space-y-4">
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="bg-emerald-900/90 text-emerald-200 border border-emerald-700/50 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
              IAT • Ushuluddin
            </span>
            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold border border-slate-200">
              {journal.category}
            </span>
            {journal.is_best && (
              <span className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 px-3 py-1 rounded-full text-xs font-extrabold shadow-sm">
                <Star className="w-3 h-3 fill-slate-950" /> Skripsi / Jurnal Terbaik
              </span>
            )}
            <span className="text-slate-400 text-xs font-medium ml-auto">{journal.date}</span>
          </div>

          {/* Title */}
          <Link to={`/jurnal/${journal.id}`}>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
              {journal.title}
            </h3>
          </Link>

          {/* Abstract Quote */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-emerald-600" /> Abstrak Karya Ilmiah
            </p>
            <p className="text-slate-600 text-xs sm:text-sm italic line-clamp-3 leading-relaxed">
              "{journal.abstract?.replace(/<[^>]+>/g, '')}"
            </p>
          </div>

          {/* Meta Authors */}
          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Peneliti / Penulis</p>
                <p className="font-bold text-slate-800">{journal.author}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Dosen Pembimbing</p>
                <p className="font-semibold text-slate-700">{journal.mentor}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Score & Action Buttons */}
        <div className="lg:w-48 w-full flex flex-row lg:flex-col items-center justify-between lg:justify-center border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6 gap-4">
          <div className="text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Nilai Munaqasyah</p>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-700">{journal.score}</div>
            <p className="text-[10px] font-bold text-amber-600">Predikat Mumtaz</p>
          </div>

          <div className="flex flex-col gap-2 w-auto sm:w-full">
            {journal.documentUrl && journal.documentUrl !== '#' ? (
              <a
                href={journal.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition-all"
              >
                <Download className="w-3.5 h-3.5" /> Unduh Naskah
              </a>
            ) : (
              <Link
                to={`/jurnal/${journal.id}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-md transition-all"
              >
                <BookOpen className="w-3.5 h-3.5" /> Baca Naskah
              </Link>
            )}
            <Link
              to={`/jurnal/${journal.id}`}
              className="text-center text-slate-500 hover:text-emerald-800 text-xs font-semibold transition-colors"
            >
              Lihat Detail Jurnal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

export default JournalCard;
