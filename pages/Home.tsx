import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  Users,
  Award,
  ArrowRight,
  Scroll,
  Compass,
  FileText,
  Quote,
  Layers,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import Carousel, { SlideItem } from '../components/Carousel';
import NewsCard from '../components/NewsCard';
import JournalCard from '../components/JournalCard';
import FacilityCard from '../components/FacilityCard';
import FacilityModal from '../components/FacilityModal';
import {
  fetchNews,
  fetchBestJournals,
  fetchFacilities,
  fetchHomeSlides,
  fetchHomeStats
} from '../services/api';
import {
  NewsItem,
  JournalItem,
  Facility,
  StatItemData
} from '../types';
import {
  PRODI_NAME,
  FAKULTAS_NAME,
  SCHOOL_NAME,
  DEGREE_TITLE,
  CORE_PILLARS,
  GRADUATE_PROFILES,
  DOMAIN_LINKS
} from '../constants';

const Home: React.FC = () => {
  const [slides, setSlides] = useState<SlideItem[]>([]);
  const [statsData, setStatsData] = useState<StatItemData[]>([]);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [bestJournals, setBestJournals] = useState<JournalItem[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [slidesData, statsResult, newsData, journalData, facilityData] = await Promise.all([
          fetchHomeSlides(),
          fetchHomeStats(),
          fetchNews('Ushuluddin', 'IAT'),
          fetchBestJournals('Ushuluddin', 'IAT'),
          fetchFacilities('Ushuluddin', 'IAT')
        ]);
        setSlides(slidesData);
        setStatsData(statsResult);
        setNewsList(newsData.slice(0, 3));
        setBestJournals(journalData.slice(0, 2));
        setFacilities(facilityData.slice(0, 4));
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const statIcons = [Users, GraduationCap, BookOpen, Award];
  const stats = statsData.length > 0
    ? statsData.map((s, idx) => ({
        label: s.label,
        value: s.value,
        icon: statIcons[idx % statIcons.length]
      }))
    : [
        { label: "Mahasiswa Aktif", value: "350+", icon: Users },
        { label: "Dosen Ahli & Mufassir", value: "24", icon: GraduationCap },
        { label: "Hafizh/Hafizhah 30 Juz", value: "85%", icon: BookOpen },
        { label: "Alumni Berdaya Saing", value: "1.200+", icon: Award }
      ];

  const getPillarIcon = (name: string) => {
    switch (name) {
      case 'BookOpen': return BookOpen;
      case 'Scroll': return Scroll;
      case 'Compass': return Compass;
      case 'Sparkles': return Sparkles;
      default: return BookOpen;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Hero Carousel */}
      <Carousel slides={slides} />

      {/* 2. Quick Statistics Bar */}
      <section className="relative -mt-16 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((st, i) => {
            const Icon = st.icon;
            return (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Icon className="w-6 sm:w-7 h-6 sm:h-7 text-emerald-700" />
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                    {st.value}
                  </h4>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                    {st.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Sambutan Kaprodi & Profil Singkat */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Foto Kaprodi */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-600 to-amber-500 rounded-3xl opacity-20 blur-xl"></div>
              <div className="relative bg-gradient-to-b from-emerald-950 to-slate-950 rounded-3xl p-4 shadow-2xl border border-emerald-800/40 overflow-hidden">
                <img
                  src="/gedung.jpg"
                  alt="Ketua Program Studi IAT"
                  className="w-full h-96 object-cover rounded-2xl opacity-80"
                />
                <div className="p-6 text-white space-y-1">
                  <span className="inline-block bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-bold mb-2">
                    Ketua Program Studi
                  </span>
                  <h4 className="text-lg font-black leading-tight text-white">
                    Dr. H. Muhammad Arifin, M.Ag., Al-Hafizh
                  </h4>
                  <p className="text-xs text-emerald-300">
                    Pakar Tafsir Maudhu'i & Qira'at Sab'ah
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sambutan Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              Sambutan Ketua Program Studi
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              Mendidik Generasi Mufassir yang Mutafaqqih fid-Din & Berwawasan Global
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Assalamu'alaikum Warahmatullahi Wabarakatuh. Selamat datang di portal resmi Program Studi Ilmu Al-Qur'an dan Tafsir (IAT), Fakultas Ushuluddin, STAI Al-Mannan.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Program Studi IAT hadir untuk menjawab tantangan zaman melalui integrasi khazanah tafsir turats ulama salaf dengan metodologi hermeneutika kontemporer serta teknologi riset Al-Qur'an digital. Kami berkomitmen mengantarkan setiap mahasiswa meraih gelar <strong>{DEGREE_TITLE}</strong> yang tidak hanya menguasai hafalan dan kaidah tafsir, tetapi juga mampu memberikan solusi Qurani bagi problematika peradaban masyarakat modern.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-xs text-slate-900">Kurikulum Terakreditasi</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">Integrasi 148 SKS dengan standar KKNI & MBKM.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-xs text-slate-900">Sanad Tahfidz Muttashil</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">Bimbingan intensif talaqqi sanad Qira'at Sab'ah.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Link
                to="/tentang/visi-misi"
                className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                Selengkapnya Tentang IAT <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/kurikulum"
                className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 shadow-sm transition-all"
              >
                Lihat Kurikulum
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pilar Keunggulan IAT */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-700/60 text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Pilar Keunggulan Akademik
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              4 Pilar Utama Pendidikan Studi Al-Qur'an di STAI Al-Mannan
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Kombinasi komprehensif antara ketajaman spiritual, kedalaman turats klasik, kepekaan sosial, dan kecakapan teknologi digital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {CORE_PILLARS.map((pillar) => {
              const Icon = getPillarIcon(pillar.icon);
              return (
                <div
                  key={pillar.id}
                  className="bg-slate-950/80 border border-slate-800 hover:border-emerald-500/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 shadow-xl group"
                >
                  <div className="space-y-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <p className="arabic-text text-amber-400 text-lg font-bold">
                      {pillar.arabic}
                    </p>
                    <h3 className="text-xl font-black text-white leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 font-bold">
                    <span>Program Unggulan</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Profil Lulusan & Prospek Karir */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
            Capaian Lulusan
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Profil Lulusan & Peluang Karir Sarjana Agama (S.Ag)
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Lulusan Prodi IAT dipersiapkan mengisi peran strategis keumatan dan profesional di berbagai instansi pemerintah, lembaga riset, maupun industri media dakwah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {GRADUATE_PROFILES.map((prof) => (
            <div
              key={prof.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6 text-emerald-700" />
                </div>
                <p className="arabic-text text-amber-600 font-bold text-base">
                  {prof.titleArabic}
                </p>
                <h3 className="text-lg font-black text-slate-900 leading-snug">
                  {prof.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {prof.description}
                </p>

                <div className="pt-2 space-y-1.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Profesi Sasaran:</p>
                  {prof.roles.map((r, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Berita & Agenda Kajian Terkini */}
      <section className="py-20 bg-emerald-950/5 border-y border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold uppercase tracking-wider mb-3">
                <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                Warta & Kajian Ilmiah
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Berita & Kegiatan Prodi IAT Terkini
              </h2>
            </div>
            <Link
              to="/berita"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
            >
              Lihat Semua Berita <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsList.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Karya & Skripsi Terbaik Mahasiswa */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold uppercase tracking-wider mb-3">
              <Scroll className="w-3.5 h-3.5 text-amber-700" />
              Publikasi & Riset
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Jurnal & Repositori Skripsi Terbaik
            </h2>
          </div>
          <Link
            to="/jurnal"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
          >
            Akses Seluruh Repositori <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-6">
          {bestJournals.map((item) => (
            <JournalCard key={item.id} journal={item} />
          ))}
        </div>
      </section>

      {/* 8. Fasilitas Khusus Prodi IAT */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-700/60 text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Sarana Pembelajaran
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Fasilitas & Laboratorium Riset Berstandar Modern
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Mendukung kenyamanan belajar, riset naskah kuno, hafalan bersanad, dan produksi konten dakwah digital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {facilities.map((fac) => (
              <FacilityCard
                key={fac.id}
                facility={fac}
                onClick={(item) => setSelectedFacility(item)}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/fasilitas"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-all shadow-lg"
            >
              Lihat Seluruh Fasilitas Prodi <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Mutiara Ulama & Testimoni */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-900 to-slate-950 rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden border border-emerald-800/40">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Quote className="w-48 h-48" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
              <Quote className="w-3.5 h-3.5" /> Untaian Mutiara Mufassir
            </div>

            <blockquote className="text-xl sm:text-2xl font-bold leading-relaxed text-slate-100">
              "Menyelami Al-Qur'an bukan sekadar membaca baris demi baris teks, melainkan menggali samudra hikmah yang menghidupkan hati dan memandu akal budi manusia menuju pencerahan."
            </blockquote>

            <div className="flex items-center gap-4 pt-4">
              <img
                src="/logokampus.jpg"
                alt="Logo STAI Al-Mannan"
                className="w-12 h-12 rounded-full border-2 border-amber-400 object-contain bg-white"
              />
              <div>
                <h5 className="font-black text-white text-base">Civitas Akademika Prodi IAT</h5>
                <p className="text-xs text-emerald-300">{FAKULTAS_NAME} • {SCHOOL_NAME}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Call to Action PMB Online */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 text-slate-950">
          <div className="space-y-3 text-center lg:text-left">
            <span className="inline-block bg-slate-950 text-amber-400 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              Penerimaan Mahasiswa Baru 2026/2027
            </span>
            <h2 className="text-2xl sm:text-4xl font-black leading-tight">
              Wujudkan Cita-Cita Menjadi Mufassir & Akademisi Qurani
            </h2>
            <p className="text-slate-900 text-xs sm:text-sm font-semibold max-w-2xl">
              Tersedia Jalur Beasiswa Tahfidz 30 Juz, Beasiswa Prestasi Akademik/Kitab Kuning, serta Fasilitas Asrama Pesantren Kampus.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
            <a
              href={DOMAIN_LINKS.PMB}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-slate-950 hover:bg-slate-900 text-white font-extrabold rounded-2xl shadow-xl transition-all text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" /> Daftar Online Sekarang
            </a>
            <Link
              to="/contact"
              className="px-6 py-4 bg-white/80 hover:bg-white text-slate-950 font-bold rounded-2xl transition-all text-xs sm:text-sm shadow-md"
            >
              Konsultasi Pendaftaran
            </Link>
          </div>
        </div>
      </section>

      {/* Facility Detail Modal */}
      <FacilityModal
        facility={selectedFacility}
        onClose={() => setSelectedFacility(null)}
      />
    </div>
  );
};

export default Home;
