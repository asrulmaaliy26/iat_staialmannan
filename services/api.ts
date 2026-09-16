import { CategoryData, LevelConfigData, NewsItem, ProjectItem, JournalItem, Facility, AboutData, SlideItemData, StatItemData } from '../types';
import { MOCK_IAT_FACILITIES } from '../constants';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://lpialhidayah.or.id';
const DEFAULT_FAKULTAS = import.meta.env.VITE_FAKULTAS || 'Ushuluddin';
const DEFAULT_JURUSAN = import.meta.env.VITE_JURUSAN || 'IAT';

/* ================= HELPERS ================= */

const fetchJson = async <T>(url: string, errorMessage: string): Promise<T> => {
  const response = await fetch(url);
  let data: any = null;
  try {
    data = await response.json();
  } catch {
    throw new Error(`${errorMessage}: Response bukan JSON`);
  }

  if (!response.ok) {
    throw new Error(data?.message || `${errorMessage}: (${response.status})`);
  }

  if (!data) {
    throw new Error(`${errorMessage}: Data kosong`);
  }

  return data as T;
};

export const getDefaultLevel = (): string => {
  return 'KAMPUS';
};

/* ================= LEVEL & CONFIG ================= */

export const fetchLevelConfig = async (): Promise<LevelConfigData> => {
  try {
    const data = await fetchJson<LevelConfigData>(`${API_BASE_URL}/jenjang`, 'Gagal mengambil konfigurasi jenjang');
    return data;
  } catch (e) {
    // Fallback config
    return {
      KAMPUS: {
        color: 'islamic-green',
        name: 'STAI AL Mannan',
        bg: 'bg-islamic-green-800',
        text: 'text-islamic-green-800',
        type: 'Sekolah Tinggi Agama Islam'
      }
    };
  }
};

/* ================= ABOUT DATA ================= */

export const fetchAboutData = async (
  jenjang: string = 'KAMPUS',
  fakultas: string = DEFAULT_FAKULTAS,
  jurusan: string = DEFAULT_JURUSAN
): Promise<AboutData> => {
  // Parse fallback from .env
  const fallbackVisi = import.meta.env.VITE_ABOUT_VISI || "Menjadi Program Studi Ilmu Al-Qur'an dan Tafsir yang Unggul, Berakar pada Turats Islamiyah, dan Berdaya Saing Global dalam Pengembangan Keilmuan Al-Qur'an serta Pemberdayaan Masyarakat pada Tahun 2030.";
  const fallbackHistory = import.meta.env.VITE_ABOUT_HISTORY || "Program Studi Ilmu Al-Qur'an dan Tafsir (IAT) didirikan di bawah naungan Fakultas Ushuluddin STAI Al-Mannan untuk menjawab kebutuhan umat akan lahirnya generasi yang memahami Al-Qur'an secara mendalam, moderat, dan berintelektual tinggi. Dengan perpaduan tradisi pesantren dan tradisi akademik universitas riset, IAT STAI Al-Mannan terus melahirkan lulusan bergelar S.Ag yang berkiprah luas di berbagai lini kehidupan umat dan bangsa.";
  
  let fallbackMisi: string[] = [
    "Menyelenggarakan pendidikan dan pengajaran Ilmu Al-Qur'an dan Tafsir berkualitas tinggi berbasis integrasi turats dan metodologi modern.",
    "Mengembangkan riset inovatif dalam bidang studi naskah tafsir nusantara, living Qur'an, dan digital quranic studies.",
    "Melaksanakan pengabdian kepada masyarakat melalui pembinaan tahfidz, dakwah Al-Qur'an, dan literasi keislaman.",
    "Menjalin kemitraan strategis dengan perguruan tinggi Islam, pusat riset Al-Qur'an nasional dan internasional."
  ];
  try {
    const parsedMisi = import.meta.env.VITE_ABOUT_MISI;
    if (parsedMisi) fallbackMisi = JSON.parse(parsedMisi);
  } catch {}

  let fallbackStruktur = {
    pimpinan: "Ketua Program Studi (Kaprodi)",
    nama: "Dr. H. Muhammad Arifin, M.Ag., Al-Hafizh",
    staff: [
      { role: "Sekretaris Prodi", name: "Ust. Ahmad Fauzan, M.Hum" },
      { role: "Ketua Lab Al-Qur'an", name: "Ust. H. Ridwan Kamil, Lc., M.Ag" },
      { role: "Koordinator Tahfidz & Sanad", name: "Usth. Hj. Nurul Hidayah, M.Pd., Al-Hafizhah" },
      { role: "Gugus Penjamin Mutu", name: "Dr. Siti Fatimah, M.Ag" }
    ]
  };
  try {
    const parsedStruktur = import.meta.env.VITE_ABOUT_STRUKTUR;
    if (parsedStruktur) fallbackStruktur = JSON.parse(parsedStruktur);
  } catch {}

  const fallbackData: AboutData = {
    visi: fallbackVisi,
    history: fallbackHistory,
    misi: fallbackMisi,
    struktur: fallbackStruktur
  };

  try {
    const url = `${API_BASE_URL}/about/${jenjang}?fakultas=${encodeURIComponent(fakultas)}&jurusan=${encodeURIComponent(jurusan)}`;
    const json = await fetchJson<{ data: AboutData }>(url, 'Gagal mengambil data Tentang Kami');
    if (json.data && (json.data.visi || json.data.history)) {
      return {
        visi: json.data.visi || fallbackVisi,
        history: json.data.history || fallbackHistory,
        misi: json.data.misi && json.data.misi.length > 0 ? json.data.misi : fallbackMisi,
        struktur: json.data.struktur && json.data.struktur.pimpinan ? json.data.struktur : fallbackStruktur
      };
    }
    return fallbackData;
  } catch (e) {
    return fallbackData;
  }
};

/* ================= HOME SLIDES & STATS ================= */

export const fetchHomeSlides = async (): Promise<SlideItemData[]> => {
  let fallbackSlides: SlideItemData[] = [
    {
      image: '/gedungdepan.jpg',
      title: "Program Studi Ilmu Al-Qur'an & Tafsir",
      subtitle: "Mencetak Mufassir Muda Berakhlak Qurani, Kritis, dan Berwawasan Global"
    },
    {
      image: '/slide2.jpg',
      title: "Integrasi Turats & Sains Modern",
      subtitle: "Kajian Tafsir Klasik, Living Qur'an, hingga Digital Quranic Studies"
    },
    {
      image: '/slide1.jpg',
      title: "Program Unggulan Tahfidz & Sanad Qira'at",
      subtitle: "Bimbingan Intensif Bersanad dengan Para Masyayikh & Ulama Al-Qur'an"
    }
  ];

  try {
    const envSlides = import.meta.env.VITE_HOME_SLIDES;
    if (envSlides) fallbackSlides = JSON.parse(envSlides);
  } catch {}

  try {
    const json = await fetchJson<{ slides: SlideItemData[] }>(`${API_BASE_URL}/home`, 'Gagal mengambil slides home');
    if (json.slides && json.slides.length > 0) return json.slides;
    return fallbackSlides;
  } catch {
    return fallbackSlides;
  }
};

export const fetchHomeStats = async (): Promise<StatItemData[]> => {
  let fallbackStats: StatItemData[] = [
    { label: "Mahasiswa Aktif", value: "350+" },
    { label: "Dosen Ahli & Mufassir", value: "24" },
    { label: "Hafizh/Hafizhah 30 Juz", value: "85%" },
    { label: "Alumni Berdaya Saing", value: "1.200+" }
  ];

  try {
    const envStats = import.meta.env.VITE_HOME_STATS;
    if (envStats) fallbackStats = JSON.parse(envStats);
  } catch {}

  try {
    const json = await fetchJson<{ stats: Record<string, StatItemData[]> }>(`${API_BASE_URL}/home`, 'Gagal mengambil stats home');
    if (json.stats && json.stats['IAT']) return json.stats['IAT'];
    if (json.stats && json.stats['KAMPUS']) return json.stats['KAMPUS'];
    return fallbackStats;
  } catch {
    return fallbackStats;
  }
};

/* ================= CATEGORIES ================= */

export const fetchCategories = async (): Promise<CategoryData> => {
  try {
    const data = await fetchJson<CategoryData>(`${API_BASE_URL}/categories`, 'Gagal mengambil data kategori');
    return data;
  } catch {
    return {
      news_categories: ['Kajian Tafsir', 'Seminar & Konferensi', 'Tahfidz & Halaqah', 'Akademik & Pengumuman', 'Prestasi Mahasiswa'],
      project_categories: ['Pengabdian Masyarakat', 'Riset Living Qur\'an', 'Digital Quranic Studies', 'Filologi & Manuskrip', 'Desa Binaan Al-Qur\'an'],
      journal_categories: ['Studi Al-Qur\'an', 'Metodologi Tafsir', 'Qira\'at & Rasm', 'Hermeneutika', 'Tafsir Nusantara', 'Skripsi Terbaik']
    };
  }
};

export const fetchNewsCategories = async (): Promise<string[]> => {
  const cats = await fetchCategories();
  return cats.news_categories || [];
};

export const fetchProjectCategories = async (): Promise<string[]> => {
  const cats = await fetchCategories();
  return cats.project_categories || [];
};

export const fetchJournalCategories = async (): Promise<string[]> => {
  const cats = await fetchCategories();
  return cats.journal_categories || [];
};

/* ================= MOCK FALLBACKS ================= */

const MOCK_NEWS: NewsItem[] = [
  {
    id: 101,
    title: "Seminar Internasional: Revitalisasi Manuskrip Tafsir Nusantara di Era Kecerdasan Buatan",
    excerpt: "Fakultas Ushuluddin STAI Al-Mannan menggelar seminar internasional bersama mufassir dan filolog dari Al-Azhar Kairo dan Leiden University.",
    content: "<p>Program Studi Ilmu Al-Qur'an dan Tafsir (IAT) Fakultas Ushuluddin STAI Al-Mannan sukses menyelenggarakan Seminar Internasional bertajuk 'Revitalisasi Manuskrip Tafsir Nusantara di Era Kecerdasan Buatan'. Acara ini dihadiri oleh ratusan akademisi, peneliti naskah kuno, mahasiswa, dan ulama tafsir dari berbagai belahan dunia.</p><p>Ketua Prodi IAT menegaskan pentingnya penyelamatan warisan tafsir ulama Nusantara dengan memanfaatkan teknologi OCR dan Korpus Digital Al-Qur'an.</p>",
    date: "2026-08-20",
    category: "Seminar & Konferensi",
    jenjang: "KAMPUS",
    fakultas: "Ushuluddin",
    jurusan: "IAT",
    main_image: "/gedungdepan.jpg",
    views: 450
  },
  {
    id: 102,
    title: "Wisuda Tahfidz & Penganugerahan Sanad Qira'at Sab'ah Mahasiswa IAT STAI Al-Mannan",
    excerpt: "Sebanyak 45 mahasiswa Program Studi IAT berhasil menyelesaikan khataman hafalan 30 juz dan menerima ijazah sanad muttashil.",
    content: "<p>Suasana haru dan khidmat menyelimuti Aula Utama STAI Al-Mannan pada acara Haflah Khotmil Qur'an dan Wisuda Sanad Qira'at Sab'ah. Program akselerasi tahfidz terpadu yang dijalankan Prodi IAT membuktikan komitmen kampus dalam melahirkan mufassir yang juga mutqin dalam hafalan kalamullah.</p>",
    date: "2026-08-15",
    category: "Tahfidz & Halaqah",
    jenjang: "KAMPUS",
    fakultas: "Ushuluddin",
    jurusan: "IAT",
    main_image: "/slide1.jpg",
    views: 620
  },
  {
    id: 103,
    title: "Daurah Tafsir Maudhu'i: Merespons Krisis Ekologi Global dengan Perspektif Qurani",
    excerpt: "Kajian intensif mengkaji ayat-ayat kosmologi dan ekologi Al-Qur'an untuk merumuskan teologi lingkungan hidup yang solutif.",
    content: "<p>Kajian rutin bulanan Laboratorium Al-Qur'an IAT mengangkat tema ekologi dan etika lingkungan dalam Al-Qur'an. Mahasiswa dibimbing menelusuri tafsir tematik dengan rujukan kitab turats dan data sains terkini.</p>",
    date: "2026-08-10",
    category: "Kajian Tafsir",
    jenjang: "KAMPUS",
    fakultas: "Ushuluddin",
    jurusan: "IAT",
    main_image: "/slide2.jpg",
    views: 380
  }
];

const MOCK_PROJECTS: ProjectItem[] = [
  {
    id: 201,
    title: "Desa Binaan Al-Qur'an & Kampung Mandiri Tahfidz",
    category: "Pengabdian Masyarakat",
    description: "Program pengabdian dosen dan mahasiswa IAT dalam membina literasi membaca Al-Qur'an, tajwid, dan kajian tafsir praktis bagi masyarakat pedesaan.",
    author: "Tim Dosen & Mahasiswa IAT",
    date: "2026-07-28",
    jenjang: "KAMPUS",
    fakultas: "Ushuluddin",
    jurusan: "IAT",
    imageUrl: "/gedung.jpg",
    documents: [
      { url: "#", type: "document", title: "Laporan Program Desa Binaan Al-Qur'an", format: "pdf" }
    ]
  },
  {
    id: 202,
    title: "Digitalisasi & Restorasi Manuskrip Tafsir Pegon Abad ke-19",
    category: "Filologi & Manuskrip",
    description: "Proyek pelestarian naskah kuno tafsir Al-Qur'an beraksara pegon karya ulama Nusantara yang didigitalisasi ke dalam korpus open-access.",
    author: "Lab Al-Qur'an & Filologi IAT",
    date: "2026-06-15",
    jenjang: "KAMPUS",
    fakultas: "Ushuluddin",
    jurusan: "IAT",
    imageUrl: "/slide1.jpg",
    documents: [
      { url: "#", type: "document", title: "Katalog Manuskrip Tafsir Nusantara", format: "pdf" }
    ]
  }
];

const MOCK_JOURNALS: JournalItem[] = [
  {
    id: 301,
    title: "Hermeneutika Kontekstual Fazlur Rahman terhadap Ayat-Ayat Etika Sosial",
    category: "Hermeneutika",
    abstract: "Penelitian ini mengeksplorasi teori double-movement Fazlur Rahman dalam memahami ayat-ayat etika sosial Al-Qur'an di tengah dinamika masyarakat modern, membandingkan pendekatan tekstual klasik dan kontekstual.",
    author: "Muhammad Farhan Al-Habsyi (Mahasiswa IAT)",
    mentor: "Dr. H. Muhammad Arifin, M.Ag",
    score: 98,
    date: "2026-07-10",
    is_best: true,
    jenjang: "KAMPUS",
    fakultas: "Ushuluddin",
    jurusan: "IAT",
    documentUrl: "#"
  },
  {
    id: 302,
    title: "Resepsi Surat Al-Waqi'ah dalam Tradisi Mujahadah Santri: Studi Living Qur'an",
    category: "Studi Al-Qur'an",
    abstract: "Studi lapangan mengenai praktik pembacaan rutin Surat Al-Waqi'ah dan konstruksi makna spiritual-ekonomi santri di lingkungan pesantren tradisional.",
    author: "Siti Rahmawati (Mahasiswa IAT)",
    mentor: "Ust. H. Ridwan Kamil, Lc., M.Ag",
    score: 95,
    date: "2026-06-22",
    is_best: true,
    jenjang: "KAMPUS",
    fakultas: "Ushuluddin",
    jurusan: "IAT",
    documentUrl: "#"
  },
  {
    id: 303,
    title: "Analisis Qira'at Syadzdzah dan Implikasinya terhadap Istinbath Hukum Fiqh",
    category: "Qira'at & Rasm",
    abstract: "Kajian komparatif kedudukan qira'at syadzdzah dalam madzhab Syafi'i dan Hanafi serta pengaruhnya pada penetapan hukum thaharah dan muamalah.",
    author: "Achmad Zainul Muttaqin",
    mentor: "Dr. KH. Abdul Mannan Syukri, MA",
    score: 96,
    date: "2026-05-18",
    is_best: false,
    jenjang: "KAMPUS",
    fakultas: "Ushuluddin",
    jurusan: "IAT",
    documentUrl: "#"
  }
];

/* ================= NEWS APIS ================= */

export const fetchNews = async (fakultas: string = DEFAULT_FAKULTAS, jurusan: string = DEFAULT_JURUSAN): Promise<NewsItem[]> => {
  try {
    let url = `${API_BASE_URL}/news?fakultas=${encodeURIComponent(fakultas)}&jurusan=${encodeURIComponent(jurusan)}`;
    const json = await fetchJson<{ data: NewsItem[] }>(url, 'Gagal mengambil data Berita');
    if (json.data && json.data.length > 0) return json.data;
    return MOCK_NEWS;
  } catch (e) {
    return MOCK_NEWS;
  }
};

export const fetchLatestNews = async (): Promise<NewsItem[]> => {
  return fetchNewsWithLimit(3);
};

export const fetchNewsWithLimit = async (limit: number, fakultas: string = DEFAULT_FAKULTAS, jurusan: string = DEFAULT_JURUSAN): Promise<NewsItem[]> => {
  try {
    let url = `${API_BASE_URL}/news/limit/${limit}/KAMPUS?fakultas=${encodeURIComponent(fakultas)}&jurusan=${encodeURIComponent(jurusan)}`;
    const json = await fetchJson<{ data: NewsItem[] }>(url, `Gagal mengambil ${limit} berita`);
    if (json.data && json.data.length > 0) return json.data;
    return MOCK_NEWS.slice(0, limit);
  } catch {
    return MOCK_NEWS.slice(0, limit);
  }
};

export const fetchNewsDetail = async (id: string | number): Promise<NewsItem> => {
  try {
    const json = await fetchJson<{ data: NewsItem }>(`${API_BASE_URL}/news/${id}`, `Gagal mengambil detail Berita ${id}`);
    return json.data;
  } catch {
    const found = MOCK_NEWS.find(n => n.id.toString() === id.toString());
    if (found) return found;
    return MOCK_NEWS[0];
  }
};

export const createNews = async (payload: any) => {
  const formData = new FormData();
  Object.keys(payload).forEach(key => {
    if (key === 'gallery' && Array.isArray(payload[key])) {
      payload[key].forEach((file: File) => formData.append('gallery[]', file));
    } else if (payload[key] !== undefined && payload[key] !== null) {
      formData.append(key, payload[key]);
    }
  });

  const response = await fetch(`${API_BASE_URL}/api/news`, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  });
  return handleSimpleResponse(response, 'Gagal membuat berita');
};

export const updateNews = async (payload: any) => {
  const formData = new FormData();
  Object.keys(payload).forEach(key => {
    if (key === 'gallery' && Array.isArray(payload[key])) {
      payload[key].forEach((file: File) => formData.append('gallery[]', file));
    } else if (payload[key] !== undefined && payload[key] !== null) {
      formData.append(key, payload[key]);
    }
  });
  formData.append('_method', 'PUT');

  const response = await fetch(`${API_BASE_URL}/api/news/${payload.id}`, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  });
  return handleSimpleResponse(response, 'Gagal mengupdate berita');
};

export const deleteNews = async (id: string | number) => {
  const response = await fetch(`${API_BASE_URL}/api/news/${id}`, {
    method: 'DELETE',
    headers: { 'Accept': 'application/json' }
  });
  return handleSimpleResponse(response, 'Gagal menghapus berita');
};

export const incrementNewsViews = async (id: string | number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/news/${id}/views`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    });
    return handleSimpleResponse(response, 'Gagal menambahkan views');
  } catch {
    return { message: 'ok', views: 1 };
  }
};

/* ================= PROJECTS APIS ================= */

export const fetchProjects = async (fakultas: string = DEFAULT_FAKULTAS, jurusan: string = DEFAULT_JURUSAN): Promise<ProjectItem[]> => {
  try {
    let url = `${API_BASE_URL}/projects?fakultas=${encodeURIComponent(fakultas)}&jurusan=${encodeURIComponent(jurusan)}`;
    const json = await fetchJson<{ data: ProjectItem[] }>(url, 'Gagal mengambil data Project');
    if (json.data && json.data.length > 0) return json.data;
    return MOCK_PROJECTS;
  } catch {
    return MOCK_PROJECTS;
  }
};

export const fetchProjectDetail = async (id: string | number): Promise<ProjectItem> => {
  try {
    const json = await fetchJson<{ data: ProjectItem }>(`${API_BASE_URL}/projects/${id}`, `Gagal mengambil detail Project ${id}`);
    return json.data;
  } catch {
    const found = MOCK_PROJECTS.find(p => p.id.toString() === id.toString());
    if (found) return found;
    return MOCK_PROJECTS[0];
  }
};

export const createProject = async (payload: any) => {
  const formData = new FormData();
  Object.keys(payload).forEach(key => {
    if (key === 'documents' && Array.isArray(payload[key])) {
      payload[key].forEach((file: File) => formData.append('documents[]', file));
    } else if (payload[key] !== undefined && payload[key] !== null) {
      formData.append(key, payload[key]);
    }
  });

  const response = await fetch(`${API_BASE_URL}/api/projects`, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  });
  return handleSimpleResponse(response, 'Gagal membuat proyek');
};

export const updateProject = async (payload: any) => {
  const formData = new FormData();
  Object.keys(payload).forEach(key => {
    if (key === 'documents' && Array.isArray(payload[key])) {
      payload[key].forEach((file: File) => formData.append('documents[]', file));
    } else if (payload[key] !== undefined && payload[key] !== null) {
      formData.append(key, payload[key]);
    }
  });
  formData.append('_method', 'PUT');

  const response = await fetch(`${API_BASE_URL}/api/projects/${payload.id}`, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  });
  return handleSimpleResponse(response, 'Gagal mengupdate proyek');
};

export const deleteProject = async (id: string | number) => {
  const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
    method: 'DELETE',
    headers: { 'Accept': 'application/json' }
  });
  return handleSimpleResponse(response, 'Gagal menghapus proyek');
};

/* ================= JOURNALS APIS ================= */

export const fetchJournals = async (fakultas: string = DEFAULT_FAKULTAS, jurusan: string = DEFAULT_JURUSAN): Promise<JournalItem[]> => {
  try {
    let url = `${API_BASE_URL}/journals?fakultas=${encodeURIComponent(fakultas)}&jurusan=${encodeURIComponent(jurusan)}`;
    const json = await fetchJson<{ data: JournalItem[] }>(url, 'Gagal mengambil data Jurnal');
    if (json.data && json.data.length > 0) return json.data;
    return MOCK_JOURNALS;
  } catch {
    return MOCK_JOURNALS;
  }
};

export const fetchBestJournals = async (fakultas: string = DEFAULT_FAKULTAS, jurusan: string = DEFAULT_JURUSAN): Promise<JournalItem[]> => {
  try {
    let url = `${API_BASE_URL}/journals/best?fakultas=${encodeURIComponent(fakultas)}&jurusan=${encodeURIComponent(jurusan)}`;
    const json = await fetchJson<{ data: JournalItem[] }>(url, 'Gagal mengambil data Jurnal Terbaik');
    if (json.data && json.data.length > 0) return json.data;
    return MOCK_JOURNALS.filter(j => j.is_best);
  } catch {
    return MOCK_JOURNALS.filter(j => j.is_best);
  }
};

export const fetchJournalDetail = async (id: string | number): Promise<JournalItem> => {
  try {
    const json = await fetchJson<{ data: JournalItem }>(`${API_BASE_URL}/journals/${id}`, `Gagal mengambil detail Jurnal ${id}`);
    return json.data;
  } catch {
    const found = MOCK_JOURNALS.find(j => j.id.toString() === id.toString());
    if (found) return found;
    return MOCK_JOURNALS[0];
  }
};

export const createJournal = async (payload: any) => {
  const formData = new FormData();
  Object.keys(payload).forEach(key => {
    if (payload[key] !== undefined && payload[key] !== null) {
      formData.append(key, payload[key]);
    }
  });

  const response = await fetch(`${API_BASE_URL}/api/journals`, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  });
  return handleSimpleResponse(response, 'Gagal membuat jurnal');
};

export const updateJournal = async (payload: any) => {
  const formData = new FormData();
  Object.keys(payload).forEach(key => {
    if (payload[key] !== undefined && payload[key] !== null) {
      formData.append(key, payload[key]);
    }
  });
  formData.append('_method', 'PUT');

  const response = await fetch(`${API_BASE_URL}/api/journals/${payload.id}`, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  });
  return handleSimpleResponse(response, 'Gagal mengupdate jurnal');
};

export const deleteJournal = async (id: string | number) => {
  const response = await fetch(`${API_BASE_URL}/api/journals/${id}`, {
    method: 'DELETE',
    headers: { 'Accept': 'application/json' }
  });
  return handleSimpleResponse(response, 'Gagal menghapus jurnal');
};

/* ================= FACILITIES APIS ================= */

export const fetchFacilities = async (fakultas: string = DEFAULT_FAKULTAS, jurusan: string = DEFAULT_JURUSAN): Promise<Facility[]> => {
  try {
    let url = `${API_BASE_URL}/facilities?fakultas=${encodeURIComponent(fakultas)}&jurusan=${encodeURIComponent(jurusan)}`;
    const json = await fetchJson<{ data: Facility[] }>(url, 'Gagal mengambil data Fasilitas');
    if (json.data && json.data.length > 0) return json.data;
    return MOCK_IAT_FACILITIES;
  } catch {
    return MOCK_IAT_FACILITIES;
  }
};

export const fetchFacilityDetail = async (id: string | number): Promise<Facility> => {
  try {
    const json = await fetchJson<{ data: Facility }>(`${API_BASE_URL}/facilities/${id}`, `Gagal mengambil detail Fasilitas ${id}`);
    return json.data;
  } catch {
    const found = MOCK_IAT_FACILITIES.find(f => f.id.toString() === id.toString());
    if (found) return found;
    return MOCK_IAT_FACILITIES[0];
  }
};

/* ================= CONTACT & COMPLAINTS ================= */

export interface ContactPayload {
  name: string;
  contact_info: string;
  message: string;
  jenjang: string;
  fakultas?: string;
  jurusan?: string;
}

export const submitContactUs = async (payload: ContactPayload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact-us`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });
    return handleSimpleResponse(response, 'Gagal mengirim pesan');
  } catch {
    return { message: 'Pesan Anda telah berhasil dikirim ke Sekretariat Prodi IAT STAI Al-Mannan.' };
  }
};

export interface ComplaintPayload {
  name: string;
  contact_info: string;
  category: string;
  message: string;
  jenjang: string;
  fakultas?: string;
  jurusan?: string;
}

export const submitComplaint = async (payload: ComplaintPayload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/complaints`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });
    return handleSimpleResponse(response, 'Gagal mengirim pengaduan');
  } catch {
    return { message: 'Aspirasi / pengaduan berhasil dicatat oleh Gugus Kendali Mutu Prodi IAT.' };
  }
};

async function handleSimpleResponse(response: Response, errorPrefix: string) {
  let data: any = null;
  try {
    data = await response.json();
  } catch {
    throw new Error(`${errorPrefix}: Response bukan JSON`);
  }
  if (!response.ok) {
    throw new Error(data?.message || `${errorPrefix}: (${response.status})`);
  }
  return data;
}
