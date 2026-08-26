import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Compass,
  Award,
  Users,
  Building2,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Scroll,
  Mail,
  Phone
} from 'lucide-react';
import {
  PRODI_NAME,
  FAKULTAS_NAME,
  SCHOOL_NAME,
  DEGREE_TITLE,
  LECTURERS_DATA,
  GRADUATE_PROFILES,
  DOMAIN_LINKS
} from '../constants';

const About: React.FC = () => {
  const { section } = useParams<{ section?: string }>();
  const [activeTab, setActiveTab] = useState<string>('visi-misi');

  useEffect(() => {
    if (section) {
      setActiveTab(section);
    }
  }, [section]);

  const tabs = [
    { id: 'visi-misi', name: 'Visi, Misi & Tujuan', icon: Compass },
    { id: 'profil', name: 'Profil Prodi & Gelar S.Ag', icon: Building2 },
    { id: 'struktur', name: 'Pimpinan & Dewan Dosen', icon: Users },
    { id: 'prestasi', name: 'Profil Lulusan & Karir', icon: Award },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      {/* Top Banner Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-emerald-800/40">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-300 border border-emerald-600/40 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Profil Lengkap Akademik
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Program Studi {PRODI_NAME}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {FAKULTAS_NAME} • {SCHOOL_NAME} | Menyelenggarakan pendidikan studi Al-Qur'an terpadu, tahfidz bersanad, dan kajian tafsir berbasis turats serta teknologi modern.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap gap-2.5 bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <Link
                key={tab.id}
                to={`/tentang/${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Tab Contents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TAB 1: VISI MISI */}
        {activeTab === 'visi-misi' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Visi Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl">
                  <Compass className="w-6 h-6 text-emerald-700" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">Visi Program Studi</h2>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Cita-Cita Luhur 2030</p>
                </div>
              </div>

              <blockquote className="bg-gradient-to-r from-emerald-50 to-teal-50/50 p-6 sm:p-8 rounded-2xl border-l-4 border-emerald-600 text-emerald-950 font-bold text-base sm:text-lg leading-relaxed italic">
                "{import.meta.env.VITE_ABOUT_VISI || 'Menjadi Program Studi Ilmu Al-Qur\'an dan Tafsir yang Unggul, Berakar pada Turats Islamiyah, dan Berdaya Saing Global dalam Pengembangan Keilmuan Al-Qur\'an serta Pemberdayaan Masyarakat pada Tahun 2030.'}"
              </blockquote>
            </div>

            {/* Misi Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-50 text-amber-800 rounded-2xl">
                  <Award className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">Misi Program Studi</h2>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Langkah Strategis Berkelanjutan</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  "Menyelenggarakan pendidikan dan pengajaran Ilmu Al-Qur'an dan Tafsir berkualitas tinggi berbasis integrasi turats dan metodologi riset modern.",
                  "Mengembangkan riset inovatif dalam bidang studi naskah tafsir nusantara, living Qur'an, hermeneutika, dan digital quranic studies.",
                  "Melaksanakan pengabdian kepada masyarakat melalui pembinaan tahfidz, dakwah Al-Qur'an moderat (wasathiyah), dan literasi keislaman.",
                  "Menjalin kemitraan strategis nasional dan internasional dengan perguruan tinggi Islam, ma'had aly, pusat riset Al-Qur'an, dan lembaga dakwah."
                ].map((misi, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="w-7 h-7 rounded-xl bg-emerald-800 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                      {misi}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tujuan Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                Tujuan Pendidikan Prodi IAT
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Melahirkan Sarjana Agama (S.Ag) yang mutqin dalam hafalan 30 juz Al-Qur'an serta menguasai kaidah dan metodologi tafsir.",
                  "Menghasilkan publikasi ilmiah bereputasi nasional dan internasional di bidang studi Al-Qur'an dan Tafsir.",
                  "Mewujudkan pengabdian masyarakat yang berdampak nyata dalam pengentasan buta aksara Al-Qur'an dan penguatan moderasi beragama.",
                  "Menjadikan lulusan berdaya saing tinggi dalam dunia kerja akademik, pendidikan, kepenyuluhan, dan dakwah digital."
                ].map((tujuan, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-emerald-950/5 border border-emerald-900/10 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Target Kualitas #{i + 1}</span>
                    </div>
                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                      {tujuan}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROFIL PRODI */}
        {activeTab === 'profil' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl">
                  <Building2 className="w-6 h-6 text-emerald-700" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">Identitas Program Studi</h2>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Legalitas & Kelembagaan</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Nama Program Studi:</span>
                  <span className="font-bold text-slate-900">{PRODI_NAME}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Fakultas:</span>
                  <span className="font-bold text-slate-900">{FAKULTAS_NAME}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Perguruan Tinggi Induk:</span>
                  <span className="font-bold text-slate-900">{SCHOOL_NAME}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Gelar Lulusan:</span>
                  <span className="font-bold text-emerald-700">{DEGREE_TITLE}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Jenjang Pendidikan:</span>
                  <span className="font-bold text-slate-900">Strata 1 (S1)</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Total Beban Studi:</span>
                  <span className="font-bold text-slate-900">148 SKS (8 Semester)</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-4">
                <h3 className="text-lg font-black text-slate-900">Sejarah & Latar Belakang Pendirian</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Program Studi Ilmu Al-Qur'an dan Tafsir (IAT) didirikan di bawah naungan Fakultas Ushuluddin STAI Al-Mannan untuk menjawab kebutuhan umat akan lahirnya generasi yang memahami Al-Qur'an secara mendalam, moderat, dan berintelektual tinggi.
                </p>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Dengan memadukan tradisi keilmuan pesantren melalui pengajian kitab kuning klasik (turats) dengan tradisi riset akademik perguruan tinggi modern, IAT STAI Al-Mannan terus berkembang menjadi pusat studi Al-Qur'an yang diperhitungkan di tingkat regional maupun nasional.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DEWAN DOSEN */}
        {activeTab === 'struktur' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center max-w-2xl mx-auto space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
                <Users className="w-3.5 h-3.5 text-emerald-700" /> Dewan Pendidik Berkualitas
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Pimpinan & Dewan Dosen Pengajar Prodi IAT
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                Didukung oleh para ulama, doktor, dan magister lulusan universitas terkemuka dalam dan luar negeri dengan sanad tahfidz muttashil.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {LECTURERS_DATA.map((lecturer) => (
                <div
                  key={lecturer.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="h-56 bg-slate-900 relative overflow-hidden">
                    <img
                      src="/gedung.jpg"
                      alt={lecturer.name}
                      className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md mb-1">
                        {lecturer.role}
                      </span>
                      <h3 className="text-base font-bold text-white leading-tight">
                        {lecturer.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Bidang Keahlian:</span>
                        <span className="font-semibold text-emerald-800">{lecturer.expertise}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Riwayat Pendidikan:</span>
                        <span className="text-slate-600 leading-relaxed block">{lecturer.education}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Mata Kuliah Diampu:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {lecturer.courses.map((c, i) => (
                            <span key={i} className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded-md">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-500 text-xs italic border-t border-slate-100 pt-3 line-clamp-2">
                      "{lecturer.bio}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PROFIL LULUSAN & KARIR */}
        {activeTab === 'prestasi' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-amber-50 text-amber-800 rounded-2xl">
                  <Award className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">Profil Lulusan & Peluang Karir</h2>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Gelar Sarjana Agama (S.Ag)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {GRADUATE_PROFILES.map((prof) => (
                  <div key={prof.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-black text-slate-900">{prof.title}</h3>
                      <span className="arabic-text text-amber-600 font-bold text-sm">{prof.titleArabic}</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{prof.description}</p>
                    <div className="pt-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Peluang Penempatan Karir:</p>
                      <div className="space-y-1">
                        {prof.roles.map((r, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span>{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
