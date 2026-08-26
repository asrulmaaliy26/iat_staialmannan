import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  BookOpen,
  GraduationCap,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import {
  PRODI_NAME,
  FAKULTAS_NAME,
  SCHOOL_NAME,
  DEGREE_TITLE,
  CONTACT_INFO,
  DOMAIN_LINKS
} from "../constants";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 relative overflow-hidden pt-16 pb-8 border-t-4 border-amber-500">
      {/* Subtle Quranic Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Quranic Verse Banner */}
        <div className="bg-gradient-to-r from-emerald-950/90 via-emerald-900/80 to-slate-900/90 border border-emerald-800/40 rounded-3xl p-6 sm:p-8 mb-12 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-2xl text-amber-400">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <p className="arabic-text text-xl sm:text-2xl text-amber-300 font-bold leading-relaxed">
                  خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
                </p>
                <p className="text-xs sm:text-sm text-emerald-200 mt-1">
                  "Sebaik-baik kalian adalah orang yang mempelajari Al-Qur'an dan mengajarkannya." <span className="text-amber-400 font-semibold">(HR. Bukhari)</span>
                </p>
              </div>
            </div>
            <a
              href={DOMAIN_LINKS.PMB}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold rounded-2xl shadow-lg hover:shadow-amber-500/20 transition-all text-xs uppercase tracking-wider flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Gabung Mahasiswa IAT
            </a>
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Identity & Degree */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/logokampus.jpg"
                alt="Logo STAI Al-Mannan"
                className="w-12 h-12 rounded-full border-2 border-emerald-500/50 shadow-md object-contain"
              />
              <div>
                <h3 className="font-extrabold text-lg text-white tracking-tight">
                  PRODI {PRODI_NAME.toUpperCase()}
                </h3>
                <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  {FAKULTAS_NAME} • {SCHOOL_NAME}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Program Studi berorientasi riset dan turats Islamiyah yang mencetak mufassir muda, akademisi Al-Qur'an, dan da'i berintelektual tinggi dengan gelar resmi <strong>{DEGREE_TITLE}</strong>.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs font-semibold">
                <GraduationCap className="w-4 h-4 text-amber-400" /> Jenjang Strata 1 (S1)
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span> Navigasi Akademik
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/tentang/visi-misi" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Visi, Misi & Tujuan</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
              <li>
                <Link to="/kurikulum" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Struktur Kurikulum & SKS</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
              <li>
                <Link to="/tentang/struktur" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Pimpinan & Dewan Dosen</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
              <li>
                <Link to="/jurnal" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Jurnal & Repositori Skripsi</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
              <li>
                <Link to="/projek" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Pengabdian & Riset Living Qur'an</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
              <li>
                <Link to="/fasilitas" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Laboratorium & Sarana IAT</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Ekosistem STAI Al-Mannan */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Ekosistem Kampus
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={DOMAIN_LINKS.KAMPUS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center justify-between"
                >
                  <span>Portal STAI Al-Mannan (Induk)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                </a>
              </li>
              <li>
                <a
                  href={DOMAIN_LINKS.SIAKAD}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center justify-between"
                >
                  <span>SIAKAD STAI Al-Mannan</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                </a>
              </li>
              <li>
                <a
                  href={DOMAIN_LINKS.PMB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center justify-between"
                >
                  <span>Pendaftaran Mahasiswa Baru (PMB)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors flex items-center justify-between">
                  <span>Layanan Pengaduan & Aspirasi</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-emerald-400 transition-colors flex items-center justify-between">
                  <span>Admin Panel Prodi IAT</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Sekretariat & Kontak */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span> Sekretariat Prodi
            </h4>
            <div className="flex items-start space-x-3 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{CONTACT_INFO.address}</span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{CONTACT_INFO.phone}</span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{CONTACT_INFO.email}</span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-slate-300">
              <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{CONTACT_INFO.officeHours}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Program Studi {PRODI_NAME} — {FAKULTAS_NAME}, {SCHOOL_NAME}. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-[11px]">
            <a href="https://staialmannan.ac.id" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">
              staialmannan.ac.id
            </a>
            <span>•</span>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">
              Hubungi Kami
            </Link>
            <span>•</span>
            <Link to="/admin" className="hover:text-slate-300 transition-colors">
              Admin CMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
