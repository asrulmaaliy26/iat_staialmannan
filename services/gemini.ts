import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.GEMINI_API_KEY || '';

let aiClient: GoogleGenAI | null = null;
if (apiKey && apiKey !== 'PLACEHOLDER_API_KEY') {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (e) {
    console.error('Error initializing Gemini AI:', e);
  }
}

const SYSTEM_PROMPT = `
Anda adalah Asisten Virtual Cerdas Program Studi Ilmu Al-Qur'an dan Tafsir (IAT), Fakultas Ushuluddin, STAI Al-Mannan.
Tugas Anda adalah membantu calon mahasiswa, mahasiswa aktif, dosen, dan masyarakat umum mengenai:
1. Profil Prodi IAT STAI Al-Mannan (Gelar S.Ag, Fakultas Ushuluddin, STAI Al-Mannan).
2. Kurikulum, mata kuliah unggulan (Tafsir Maudhu'i, Qawaidut Tafsir, Living Qur'an, Filologi Manuskrip, Tahfidz 30 Juz Bersanad, Hermeneutika, Digital Quranic Studies).
3. Prospek Karir Lulusan: Mufassir/Peneliti Qur'an, Dosen/Akademisi, Da'i/Penyuluh Agama Kemenag, Konsultan Keagamaan, Praktisi Media Dakwah Digital.
4. Informasi Pendaftaran Mahasiswa Baru (PMB) online melalui portal: https://siakad.staialmannan.ac.id/pendaftaran.
5. Fasilitas Prodi: Laboratorium Al-Qur'an & Studi Digital, Pojok Tahfidz & Sanad Qira'at, Perpustakaan Kitab Turats & Tafsir, Studio Podcast & Multimedia Qurani.
6. Jawaban harus ramah, santun, islami (gunakan salam Islami), informatif, padat, dan akurat.
`;

export const getSchoolAssistantResponse = async (userMessage: string): Promise<string> => {
  if (!aiClient) {
    // Fallback intelligent responses for IAT
    const msg = userMessage.toLowerCase();
    if (msg.includes('daftar') || msg.includes('pmb') || msg.includes('syarat') || msg.includes('biaya')) {
      return "Assalamu'alaikum Warahmatullahi Wabarakatuh. Pendaftaran Mahasiswa Baru (PMB) Program Studi Ilmu Al-Qur'an dan Tafsir (IAT) Fakultas Ushuluddin STAI Al-Mannan dibuka secara online melalui portal: https://siakad.staialmannan.ac.id/pendaftaran. Terdapat juga beasiswa Tahfidz Al-Qur'an dan Beasiswa Prestasi!";
    }
    if (msg.includes('gelar') || msg.includes('lulus') || msg.includes('sarjana')) {
      return "Lulusan Program Studi Ilmu Al-Qur'an dan Tafsir (IAT) STAI Al-Mannan memperoleh gelar akademik resmi **Sarjana Agama (S.Ag)** dengan prospek karir luas sebagai Peneliti Al-Qur'an, Mufassir, Akademisi/Dosen, Penyuluh Agama Kemenag, Konsultan Keagamaan, dan Da'i Profesional.";
    }
    if (msg.includes('mata kuliah') || msg.includes('kurikulum') || msg.includes('pelajaran') || msg.includes('sks')) {
      return "Kurikulum Prodi IAT mencakup 148 SKS yang ditempuh dalam 8 semester, dengan keunggulan integrasi Turats Tafsir Klasik, Hermeneutika Al-Qur'an, Living Qur'an, Filologi Manuskrip Nusantara, serta Program Tahfidz 30 Juz Bersanad Qira'at Sab'ah.";
    }
    if (msg.includes('dosen') || msg.includes('pengajar') || msg.includes('kaprodi')) {
      return "Ketua Program Studi IAT adalah Dr. H. Muhammad Arifin, M.Ag., Al-Hafizh. Dosen-dosen kami merupakan para ulama, doktor, dan magister lulusan Timur Tengah (Al-Azhar, Yaman, Makkah) dan UIN terkemuka yang memiliki sanad tahfidz muttashil.";
    }
    if (msg.includes('fasilitas') || msg.includes('lab') || msg.includes('perpustakaan')) {
      return "Fasilitas unggulan Prodi IAT meliputi: Laboratorium Al-Qur'an & Studi Digital (Maktabah Syamilah & Korpus Digital), Pojok Tahfidz & Halaqah Qira'at Bersanad, Perpustakaan Kitab Turats & Tafsir, serta Studio Podcast Dakwah Qurani Modern.";
    }
    return "Assalamu'alaikum Warahmatullahi Wabarakatuh. Selamat datang di Portal Program Studi Ilmu Al-Qur'an dan Tafsir (IAT) Fakultas Ushuluddin STAI Al-Mannan. Ada yang bisa kami bantu terkait kurikulum, pendaftaran PMB, profil dosen, atau kegiatan akademik IAT?";
  }

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT + '\n\nPertanyaan: ' + userMessage }] }
      ]
    });
    return response.text || "Maaf, saya tidak dapat memproses jawaban saat ini.";
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "Assalamu'alaikum Warahmatullahi Wabarakatuh. Silakan hubungi Sekretariat Prodi IAT STAI Al-Mannan melalui WhatsApp +62 812-3456-7890 atau email iat@staialmannan.ac.id untuk informasi lebih lanjut.";
  }
};
