import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, UserCog, ExternalLink, Sparkles, GraduationCap } from "lucide-react";
import { DOMAIN_LINKS, PRODI_NAME, FAKULTAS_NAME, SCHOOL_NAME } from "../constants";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Kurikulum", path: "/kurikulum" },
    { name: "Berita & Kajian", path: "/berita" },
    { name: "Pengabdian & Riset", path: "/projek" },
    { name: "Jurnal & Skripsi", path: "/jurnal" },
    { name: "Fasilitas", path: "/fasilitas" },
  ];

  const aboutLinks = [
    { name: "Visi, Misi & Tujuan", path: "/tentang/visi-misi" },
    { name: "Profil Prodi & Gelar S.Ag", path: "/tentang/profil" },
    { name: "Pimpinan & Dewan Dosen", path: "/tentang/struktur" },
    { name: "Profil Lulusan & Karir", path: "/tentang/prestasi" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Bar Info Kampus Induk & Quick Access */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-400 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-800/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {FAKULTAS_NAME} • {SCHOOL_NAME}
            </span>
            <span className="hidden md:inline text-slate-400">
              Portal Resmi Program Studi S1 Ilmu Al-Qur'an dan Tafsir
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-medium">
            <a
              href={DOMAIN_LINKS.KAMPUS}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-islamic-gold-400 transition-colors flex items-center gap-1"
            >
              Web Kampus Induk <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={DOMAIN_LINKS.SIAKAD}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-islamic-gold-400 transition-colors flex items-center gap-1"
            >
              SIAKAD <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={DOMAIN_LINKS.PMB}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-400" /> PMB Online 2026/2027
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo & Brand */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img
                  src="/logokampus.jpg"
                  alt="Logo STAI Al-Mannan"
                  className="w-12 h-12 object-contain rounded-full border-2 border-emerald-600/30 group-hover:rotate-6 transition-all duration-300 drop-shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-0.5 rounded-full ring-2 ring-white">
                  <GraduationCap className="w-3 h-3" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 leading-tight group-hover:text-emerald-800 transition-colors">
                  PRODI {PRODI_NAME.toUpperCase()}
                </span>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                  <span>{FAKULTAS_NAME}</span>
                  <span className="w-1 h-1 rounded-full bg-amber-500"></span>
                  <span className="text-slate-500 font-semibold">{SCHOOL_NAME}</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center space-x-1">
              <Link
                to="/"
                className={`px-3.5 py-2 rounded-xl font-bold text-sm transition-all duration-200 ${
                  isActive("/")
                    ? "bg-emerald-800 text-white shadow-sm"
                    : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                }`}
              >
                Beranda
              </Link>

              {/* About Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
              >
                <button
                  className={`flex items-center px-3.5 py-2 rounded-xl font-bold text-sm transition-all duration-200 ${
                    location.pathname.startsWith("/tentang")
                      ? "bg-emerald-800 text-white shadow-sm"
                      : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                  }`}
                >
                  Profil Prodi
                  <ChevronDown
                    className={`ml-1 w-4 h-4 transition-transform ${
                      isAboutOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`${
                    isAboutOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible translate-y-2"
                  } absolute left-0 mt-0 w-60 bg-white border border-slate-100 shadow-2xl rounded-2xl overflow-hidden py-2 z-50 transition-all duration-200`}
                >
                  {aboutLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-5 py-3 text-xs font-bold transition-colors ${
                        isActive(link.path)
                          ? "bg-emerald-50 text-emerald-800 font-extrabold"
                          : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-xl font-bold text-sm transition-all duration-200 ${
                    isActive(link.path)
                      ? "bg-emerald-800 text-white shadow-sm"
                      : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="/contact"
                className={`px-3.5 py-2 rounded-xl font-bold text-sm transition-all duration-200 ${
                  isActive("/contact")
                    ? "bg-emerald-800 text-white shadow-sm"
                    : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                }`}
              >
                Kontak
              </Link>

              <div className="h-6 w-px bg-slate-200 mx-2"></div>

              {/* Admin Button */}
              <Link
                to="/admin"
                title="Admin Panel Prodi IAT"
                className="p-2 rounded-xl text-slate-400 hover:text-emerald-800 hover:bg-emerald-50 transition-all"
              >
                <UserCog className="w-5 h-5" />
              </Link>

              {/* PMB CTA */}
              <a
                href={DOMAIN_LINKS.PMB}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> PMB Online
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="xl:hidden flex items-center gap-2">
              <a
                href={DOMAIN_LINKS.PMB}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-full text-xs shadow-sm"
              >
                PMB
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
                aria-label="Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="xl:hidden bg-white border-t border-slate-100 py-4 px-4 space-y-2 animate-fadeIn max-h-[80vh] overflow-y-auto">
            <Link
              to="/"
              className={`block px-4 py-3 text-sm font-bold rounded-xl ${
                isActive("/") ? "bg-emerald-800 text-white" : "text-slate-700 bg-slate-50"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Beranda
            </Link>

            {/* Mobile About Accordion */}
            <div className="rounded-xl overflow-hidden">
              <button
                onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-bold rounded-xl transition-all ${
                  location.pathname.startsWith("/tentang") || isMobileAboutOpen
                    ? "bg-emerald-100 text-emerald-900"
                    : "text-slate-700 bg-slate-50"
                }`}
              >
                Profil Prodi
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isMobileAboutOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`space-y-1 pl-4 pr-2 overflow-hidden transition-all duration-300 ease-in-out ${
                  isMobileAboutOpen ? "max-h-96 opacity-100 pt-2" : "max-h-0 opacity-0"
                }`}
              >
                {aboutLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors ${
                      isActive(link.path)
                        ? "text-emerald-800 bg-emerald-50 font-bold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 text-sm font-bold rounded-xl ${
                  isActive(link.path)
                    ? "bg-emerald-800 text-white"
                    : "text-slate-700 bg-slate-50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/contact"
              className={`block px-4 py-3 text-sm font-bold rounded-xl ${
                isActive("/contact")
                  ? "bg-emerald-800 text-white"
                  : "text-slate-700 bg-slate-50"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Kontak & Pengaduan
            </Link>

            <Link
              to="/admin"
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all"
              onClick={() => setIsOpen(false)}
            >
              <UserCog className="w-5 h-5 text-slate-500" />
              Admin Panel Prodi
            </Link>

            <a
              href={DOMAIN_LINKS.PMB}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 text-center text-sm font-extrabold rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md"
              onClick={() => setIsOpen(false)}
            >
              Pendaftaran Mahasiswa Baru (PMB)
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
