import React, { useState } from 'react';
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  Layers,
  CheckCircle2,
  Download,
  Scroll,
  Award,
  Clock,
  ChevronRight
} from 'lucide-react';
import {
  PRODI_NAME,
  FAKULTAS_NAME,
  SCHOOL_NAME,
  DEGREE_TITLE,
  CURRICULUM_DATA,
  DOMAIN_LINKS
} from '../constants';

const Curriculum: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState<number>(1);

  const activeSemesterData = CURRICULUM_DATA.find((s) => s.semester === selectedSemester) || CURRICULUM_DATA[0];

  const totalAllSks = CURRICULUM_DATA.reduce((acc, curr) => acc + curr.totalSks, 0);

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Wajib Prodi':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Wajib Fakultas':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Wajib Institut':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Pilihan Keahlian':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      case 'Praktikum / Riset':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-emerald-800/40">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-300 border border-emerald-600/40 text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Kurikulum Akademik S1
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Struktur Kurikulum & Sebaran Mata Kuliah IAT
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Dirancang dengan standar Kerangka Kualifikasi Nasional Indonesia (KKNI) & Merdeka Belajar Kampus Merdeka (MBKM), memadukan penguasaan turats klasik dan metodologi riset kontemporer.
            </p>
          </div>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Beban Studi</p>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{totalAllSks} SKS</p>
            <p className="text-xs text-emerald-600 font-semibold mt-1">8 Semester Masa Studi</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Gelar Akademik</p>
            <p className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1">S.Ag</p>
            <p className="text-xs text-slate-500 font-semibold mt-1">Sarjana Agama</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tahfidz Target</p>
            <p className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">30 Juz</p>
            <p className="text-xs text-slate-500 font-semibold mt-1">Bersanad Qira'at Sab'ah</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Akreditasi & MBKM</p>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Terakreditasi</p>
            <p className="text-xs text-emerald-600 font-semibold mt-1">Magang Riset & KKN Tematik</p>
          </div>
        </div>
      </div>

      {/* Interactive Semester Tabs & Course Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Semester Buttons */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Pilih Semester:</p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {CURRICULUM_DATA.map((sem) => {
              const isSelected = selectedSemester === sem.semester;
              return (
                <button
                  key={sem.semester}
                  onClick={() => setSelectedSemester(sem.semester)}
                  className={`py-3 px-2 rounded-xl text-xs font-extrabold transition-all text-center flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-emerald-800 text-white shadow-md'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-emerald-800 border border-slate-100'
                  }`}
                >
                  <span>Semester {sem.semester}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${isSelected ? 'bg-emerald-900 text-emerald-200' : 'bg-slate-200 text-slate-600'}`}>
                    {sem.totalSks} SKS
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Semester Course List */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Struktur Mata Kuliah
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                Semester {activeSemesterData.semester} (Total {activeSemesterData.totalSks} SKS)
              </h2>
            </div>
            <div className="px-4 py-2 bg-emerald-50 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-100">
              {activeSemesterData.courses.length} Mata Kuliah
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {activeSemesterData.courses.map((course, idx) => (
              <div
                key={course.code}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 font-extrabold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {course.code}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                        {course.name}
                      </h3>
                    </div>
                    {course.nameArabic && (
                      <p className="arabic-text text-amber-700 font-bold text-sm mt-0.5">
                        {course.nameArabic}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${getTypeBadge(course.type)}`}>
                    {course.type}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-900 text-white font-extrabold text-xs">
                    {course.sks} SKS
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Capaian Pembelajaran Lulusan (CPL) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-50 text-amber-800 rounded-2xl">
              <Award className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Capaian Pembelajaran Lulusan (CPL)
              </h2>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Standar Kompetensi Sarjana Agama (S.Ag)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Penguasaan Pengetahuan (Knowledge)
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <li>• Menguasai metodologi penafsiran Al-Qur'an (Tahlili, Ijmali, Muqaran, Maudhu'i).</li>
                <li>• Menguasai kaidah tafsir (Qawaidut Tafsir), Asbabun Nuzul, dan Nasikh Mansukh.</li>
                <li>• Memahami khazanah kitab tafsir turats ulama salaf dan hermeneutika modern.</li>
                <li>• Menguasai Bahasa Arab fusha (Nahwu, Sharaf, Balaghah) dan leksikografi Al-Qur'an.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Keterampilan Khusus (Special Skills)
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <li>• Mampu menghafal 30 juz Al-Qur'an dengan tajwid mutqin dan bersanad.</li>
                <li>• Mampu melakukan riset filologi terhadap manuskrip tafsir nusantara.</li>
                <li>• Mampu meneliti living Qur'an dan fenomena resepsi Al-Qur'an di masyarakat.</li>
                <li>• Mengoperasikan software dan korpus digital Al-Qur'an untuk riset modern.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
