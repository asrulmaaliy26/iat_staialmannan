import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { useToast } from '../components/ToastProvider';
import { submitContactUs, submitComplaint } from '../services/api';
import { CONTACT_INFO, PRODI_NAME, FAKULTAS_NAME, SCHOOL_NAME, DOMAIN_LINKS } from '../constants';

const Contact: React.FC = () => {
  const { success, error } = useToast();
  const [activeFormTab, setActiveFormTab] = useState<'contact' | 'complaint'>('contact');

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  // Complaint Form State
  const [complaintName, setComplaintName] = useState('');
  const [complaintInfo, setComplaintInfo] = useState('');
  const [complaintCategory, setComplaintCategory] = useState('Akademik & Perkuliahan');
  const [complaintMessage, setComplaintMessage] = useState('');
  const [isSubmittingComplaint, setIsSubmittingComplaint] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactInfo || !contactMessage) {
      error('Mohon lengkapi semua kolom formulir!');
      return;
    }

    setIsSubmittingContact(true);
    try {
      await submitContactUs({
        name: contactName,
        contact_info: contactInfo,
        message: contactMessage,
        jenjang: 'KAMPUS',
        fakultas: 'Ushuluddin',
        jurusan: 'IAT'
      });
      success('Pesan Anda berhasil dikirimkan ke Sekretariat Prodi IAT!');
      setContactName('');
      setContactInfo('');
      setContactMessage('');
    } catch (err: any) {
      error(err.message || 'Gagal mengirim pesan');
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const handleComplaintSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintName || !complaintInfo || !complaintMessage) {
      error('Mohon lengkapi seluruh kolom formulir aspirasi!');
      return;
    }

    setIsSubmittingComplaint(true);
    try {
      await submitComplaint({
        name: complaintName,
        contact_info: complaintInfo,
        category: complaintCategory,
        message: complaintMessage,
        jenjang: 'KAMPUS',
        fakultas: 'Ushuluddin',
        jurusan: 'IAT'
      });
      success('Aspirasi/pengaduan Anda telah dicatat oleh Tim Penjamin Mutu Prodi IAT.');
      setComplaintName('');
      setComplaintInfo('');
      setComplaintMessage('');
    } catch (err: any) {
      error(err.message || 'Gagal mengirim pengaduan');
    } finally {
      setIsSubmittingComplaint(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-emerald-800/40">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-300 border border-emerald-600/40 text-xs font-bold">
              <Phone className="w-3.5 h-3.5 text-amber-400" /> Layanan Informasi & Konsultasi
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Hubungi Sekretariat Prodi IAT STAI Al-Mannan
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Kami siap melayani pertanyaan seputar pendaftaran mahasiswa baru (PMB), kurikulum, beasiswa tahfidz, legalisir ijazah, dan layanan aspirasi akademik.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Info Card Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2.5 pb-4 border-b border-slate-100">
                <MapPin className="w-5 h-5 text-emerald-700" /> Informasi Sekretariat
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lokasi Kampus</p>
                    <p className="text-slate-800 font-semibold leading-relaxed">{CONTACT_INFO.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Telepon & WhatsApp</p>
                    <p className="text-slate-800 font-semibold">{CONTACT_INFO.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Resmi</p>
                    <p className="text-slate-800 font-semibold">{CONTACT_INFO.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Jam Layanan</p>
                    <p className="text-slate-800 font-semibold">{CONTACT_INFO.officeHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* PMB Fast Link */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 sm:p-8 rounded-3xl text-slate-950 space-y-3 shadow-xl">
              <span className="inline-block bg-slate-950 text-amber-400 px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                PMB Online 2026/2027
              </span>
              <h3 className="text-xl font-black leading-snug">
                Pendaftaran Calon Mahasiswa Baru IAT
              </h3>
              <p className="text-xs font-semibold text-slate-900 leading-relaxed">
                Pendaftaran dapat dilakukan secara langsung 24 jam melalui portal SIAKAD STAI Al-Mannan.
              </p>
              <a
                href={DOMAIN_LINKS.PMB}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full py-3 text-center bg-slate-950 text-white font-extrabold text-xs rounded-xl uppercase tracking-wider hover:bg-slate-900 transition-all shadow-md mt-2"
              >
                Kunjungi Portal PMB
              </a>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm space-y-6">
              {/* Form Tabs */}
              <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setActiveFormTab('contact')}
                  className={`flex-1 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
                    activeFormTab === 'contact'
                      ? 'bg-white text-emerald-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" /> Hubungi Kami
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFormTab('complaint')}
                  className={`flex-1 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
                    activeFormTab === 'complaint'
                      ? 'bg-white text-rose-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" /> Layanan Aspirasi / Pengaduan
                </button>
              </div>

              {/* FORM 1: CONTACT */}
              {activeFormTab === 'contact' && (
                <form onSubmit={handleContactSubmit} className="space-y-4 animate-fadeIn">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Nama Lengkap</label>
                    <input
                      type="text"
                      placeholder="Masukkan nama lengkap Anda..."
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Nomor WhatsApp / Email</label>
                    <input
                      type="text"
                      placeholder="Contoh: 08123456789 atau email@example.com"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Pesan / Pertanyaan</label>
                    <textarea
                      rows={5}
                      placeholder="Tuliskan pertanyaan Anda seputar Program Studi IAT..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingContact}
                    className="w-full py-4 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmittingContact ? 'Mengirim Pesan...' : 'Kirim Pesan Sekarang'}
                  </button>
                </form>
              )}

              {/* FORM 2: COMPLAINT / ASPIRASI */}
              {activeFormTab === 'complaint' && (
                <form onSubmit={handleComplaintSubmit} className="space-y-4 animate-fadeIn">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Nama Pelapor / Mahasiswa</label>
                    <input
                      type="text"
                      placeholder="Nama lengkap atau inisial..."
                      value={complaintName}
                      onChange={(e) => setComplaintName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-rose-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Kontak (WhatsApp / Email)</label>
                    <input
                      type="text"
                      placeholder="Kontak untuk tindak lanjut..."
                      value={complaintInfo}
                      onChange={(e) => setComplaintInfo(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-rose-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Kategori Aspirasi / Pengaduan</label>
                    <select
                      value={complaintCategory}
                      onChange={(e) => setComplaintCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-rose-600 font-medium"
                    >
                      <option value="Akademik & Perkuliahan">Akademik & Perkuliahan</option>
                      <option value="Fasilitas & Laboratorium">Fasilitas & Laboratorium</option>
                      <option value="Bimbingan Skripsi & Ujian">Bimbingan Skripsi & Ujian</option>
                      <option value="Program Tahfidz & Sanad">Program Tahfidz & Sanad</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Isi Aspirasi / Pengaduan</label>
                    <textarea
                      rows={5}
                      placeholder="Tuliskan aspirasi atau laporan Anda secara jelas dan santun..."
                      value={complaintMessage}
                      onChange={(e) => setComplaintMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-rose-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingComplaint}
                    className="w-full py-4 bg-rose-800 hover:bg-rose-900 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmittingComplaint ? 'Mengirim Aspirasi...' : 'Kirim Aspirasi ke Gugus Mutu'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
