import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY || '';

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
      model: 'gemini-3.8-flash',
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

const CANDIDATE_MODELS = ['gemini-3.8-flash', 'gemini-3-flash-preview', 'gemini-flash-latest'];
const getAiClient = () => aiClient;

export interface NewsPromptContext {
  briefDescription?: string;
  title?: string;
  category?: string;
  excerpt?: string;
  jenjang?: string;
  fakultas?: string;
  jurusan?: string;
  images?: (File | Blob | string | null | undefined)[];
}

// Convert File/Blob to Gemini inlineData base64 part
export const fileToGenerativePart = async (file: File | Blob): Promise<{ inlineData: { data: string; mimeType: string } } | null> => {
  return new Promise((resolve) => {
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const resultStr = reader.result as string;
        if (resultStr && resultStr.includes(',')) {
          const base64Data = resultStr.split(',')[1];
          resolve({
            inlineData: {
              data: base64Data,
              mimeType: file.type || 'image/jpeg'
            }
          });
        } else {
          resolve(null);
        }
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    } catch {
      resolve(null);
    }
  });
};

// Convert image URL to Gemini inlineData base64 part
export const urlToGenerativePart = async (url: string): Promise<{ inlineData: { data: string; mimeType: string } } | null> => {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await fileToGenerativePart(blob);
  } catch (e) {
    console.warn('Failed to fetch image URL for AI analysis:', url, e);
    return null;
  }
};

export const generateNewsArticle = async (
  contextOrDescription: string | NewsPromptContext
): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Gagal generate berita: API Key tidak ditemukan.";

  const ctx: NewsPromptContext = typeof contextOrDescription === 'string'
    ? { briefDescription: contextOrDescription }
    : (contextOrDescription || {});

  // 1. Convert all valid images (File, Blob, or URL string) to base64 inlineData
  const imageParts: { inlineData: { data: string; mimeType: string } }[] = [];
  if (ctx.images && Array.isArray(ctx.images)) {
    for (const img of ctx.images) {
      if (!img) continue;
      if (img instanceof File || img instanceof Blob) {
        const part = await fileToGenerativePart(img);
        if (part) {
          imageParts.push(part);
        }
      } else if (typeof img === 'string' && img.trim()) {
        const part = await urlToGenerativePart(img.trim());
        if (part) {
          imageParts.push(part);
        }
      }
    }
  }

  // 2. Build structured base prompt from form metadata
  const promptParts: string[] = [];
  promptParts.push(`Anda adalah jurnalis dan humas profesional untuk Program Studi Ilmu Al-Qur'an dan Tafsir (IAT) STAI Al-Mannan. Tugas Anda adalah menyusun artikel berita kegiatan yang lengkap, menarik, mendalam, dan bernuansa sekolah Islam unggul.`);

    if (imageParts.length > 0) {
    promptParts.push(`\n[ANALISIS FOTO DOKUMENTASI & POSTER - SANGAT PENTING]:
Ada ${imageParts.length} foto kegiatan / poster dokumentasi yang dilampirkan.
INSTRUKSI KHUSUS ANALISIS GAMBAR:
1. BACA SELURUH TEKS YANG TERCANTUM PADA SETIAP FOTO/POSTER!
2. Jika foto berupa poster ucapan selamat (congrats), piagam, atau dokumentasi prestasi:
   - WAJIB catat dan sebutkan SEMUA NAMA LENGKAP SISWA/SANTRI yang tercantum.
   - WAJIB catat dan sebutkan KATEGORI/PREDIKAT JUARA masing-masing (misal: Juara I, Juara II, Juara III, Juara Harapan I, II, III).
   - Cantumkan cabang lomba, kelas siswa, dan nama penyelenggara (seperti DPP AGPAII, Kemenag, dinas, dsb) jika tertera.
   - Sertakan semboyan/moto sekolah yang tertulis di poster (seperti "Mendidik Dengan Hati, Membangun Generasi Qur'ani").
3. Susun daftar rincian juara tersebut secara rapi dan terstruktur di dalam artikel berita menggunakan tag <ul> dan <li> dengan huruf tebal <strong> pada nama siswa dan juaranya.`);
  }

  const baseItems: string[] = [];
  if (ctx.title && ctx.title.trim() && ctx.title !== 'Judul Baru') {
    baseItems.push(`- Judul / Topik Berita: "${ctx.title.trim()}"`);
  }
  if (ctx.category && ctx.category.trim()) {
    baseItems.push(`- Kategori Kegiatan: ${ctx.category.trim()}`);
  }
  if (ctx.jenjang && ctx.jenjang.trim()) {
    baseItems.push(`- Jenjang: ${ctx.jenjang.trim()}`);
  }
  if (ctx.fakultas || ctx.jurusan) {
    baseItems.push(`- Fakultas/Jurusan: ${(ctx.fakultas || '')} ${(ctx.jurusan || '')}`);
  }
  if (ctx.excerpt && ctx.excerpt.trim()) {
    baseItems.push(`- Ringkasan / Poin Awal: "${ctx.excerpt.trim()}"`);
  }

  if (baseItems.length > 0) {
    promptParts.push(`\n[DATA & KONTEKS DASAR (BASE PROMPT)]:\n${baseItems.join('\n')}`);
  }

  if (ctx.briefDescription && ctx.briefDescription.trim()) {
    promptParts.push(`\n[POIN TAMBAHAN / INSTRUKSI KHUSUS DARI ADMIN]:\n"${ctx.briefDescription.trim()}"`);
  } else if (baseItems.length === 0 && imageParts.length === 0) {
    promptParts.push('\nBuatkan artikel berita kegiatan terkini yang menginspirasi.');
  }

    promptParts.push(`\n[KETENTUAN STRUKTUR DAN FORMAT ARTIKEL BERITA]:
1. Awali dengan judul berita yang kuat, menarik, dan representatif di dalam tag <h3>Judul Berita</h3>.
2. Paragraf 1 (Pembuka): Pembuka naratif yang hangat dan penuh rasa syukur atas capaian luar biasa, menyebutkan nama kegiatan dan lembaga penyelenggara.
3. Paragraf 2 (Latar Belakang & Persaingan): Gambaran umum kompetisi, ketatnya persaingan antar sekolah/peserta, dan kesiapan delegasi santri.
4. Paragraf 3 (Daftar Juara & Pemenang): Rincian lengkap prestasi para santri dalam daftar terstruktur (gunakan <ul><li> dengan <strong> untuk nama santri dan juaranya).
5. Paragraf 4 (Apresiasi & Sambutan): Kutipan ucapan selamat dan rasa bangga dari pimpinan sekolah atau guru pembimbing dengan tag <em>.
6. Paragraf 5 (Penutup & Doa): Harapan, motivasi bagi santri lain, doa keberkahan, serta penegasan komitmen mencetak generasi Qur'ani yang unggul.
7. Format output murni HTML. JANGAN sertakan tag <html>, <head>, atau <body>. Jangan gunakan wrapper markdown seperti \`\`\`html.`);

  const promptText = promptParts.join('\n');
  const contentsPayload: any[] = [...imageParts, { text: promptText }];

  let lastError: any = null;
  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model: model,
        contents: contentsPayload.length === 1 && typeof contentsPayload[0].text === 'string'
          ? contentsPayload[0].text
          : contentsPayload,
        config: {
          temperature: 0.7,
        },
      });

      let text = response.text || "";
      text = text.replace(/^\`\`\`html\s*/i, '').replace(/\`\`\`\s*$/i, '').trim();
      if (text) {
        return text;
      }
    } catch (error: any) {
      lastError = error;
      console.warn(`Model ${model} failed for multimodal news generation, trying fallback...`, error?.message);
    }
  }

  console.error("Gemini News Generation Error:", lastError);
  throw new Error(lastError?.message || "Gagal memproses AI");
};
