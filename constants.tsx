import { CurriculumSemester, LecturerItem, GraduateProfileItem } from './types';

export const PRODI_NAME = "Ilmu Al-Qur'an dan Tafsir";
export const PRODI_CODE = "IAT";
export const FAKULTAS_NAME = "Fakultas Ushuluddin";
export const SCHOOL_NAME = "STAI Al-Mannan";
export const DEGREE_TITLE = "Sarjana Agama (S.Ag)";

export const DOMAIN_LINKS: Record<string, string> = {
  IAT: "https://iat.staialmannan.ac.id",
  KAMPUS: "https://staialmannan.ac.id",
  SIAKAD: "https://siakad.staialmannan.ac.id",
  PMB: "https://siakad.staialmannan.ac.id/pendaftaran",
  MI: "https://mi.lpialhidayah.or.id",
  SMPT: "https://smpt.lpialhidayah.or.id",
  MA: "https://ma.lpialhidayah.or.id",
  MADIN: "https://madin.lpialhidayah.or.id",
  TPQ: "https://tpq.lpialhidayah.or.id",
  UMUM: "https://lpialhidayah.or.id",
};

export const CONTACT_INFO = {
  address: "Kompleks Kampus STAI Al-Mannan, Gedung Fakultas Ushuluddin Lt. 2, Jl. Raya Pendidikan No. 45, Jawa Timur",
  phone: "+62 812-3456-7890",
  whatsapp: "+62 812-3456-7890",
  email: "iat@staialmannan.ac.id",
  officeHours: "Senin - Sabtu: 08.00 - 16.00 WIB",
  googleMapsUrl: "https://maps.google.com/?q=STAI+Al-Mannan",
  social: {
    instagram: "https://instagram.com/iat_staialmannan",
    youtube: "https://youtube.com/@iatstaialmannan",
    facebook: "https://facebook.com/iatstaialmannan",
    tiktok: "https://tiktok.com/@iatstaialmannan",
  }
};

export const CORE_PILLARS = [
  {
    id: 1,
    title: "Tahfidz & Sanad Qira'at",
    arabic: "تحفيظ القرآن والقراءات المتواترة",
    desc: "Program akselerasi tahfidz 30 juz dilengkapi talaqqi dan sanad Qira'at Sab'ah/Asyrah yang tersambung hingga Rasulullah SAW bersama para masyayikh bersanad.",
    icon: "BookOpen",
    color: "from-emerald-600 to-teal-700"
  },
  {
    id: 2,
    title: "Turats & Hermeneutika Tafsir",
    arabic: "التراث التفسيري والهرمنيوطيقا المعاصرة",
    desc: "Penguasaan mendalam kitab-kitab tafsir induk (Thabari, Ibnu Katsir, Al-Alusi, dsb) dipadukan dengan pendekatan metodologi hermeneutika dan semiotika modern.",
    icon: "Scroll",
    color: "from-amber-600 to-yellow-600"
  },
  {
    id: 3,
    title: "Living Qur'an & Filologi Naskah",
    arabic: "القرآن الحي وفيلولوجيا المخطوطات",
    desc: "Riset empiris tentang resepsi Al-Qur'an di tengah masyarakat Nusantara serta penyelamatan dan transliterasi manuskrip tafsir karya ulama Nusantara.",
    icon: "Compass",
    color: "from-emerald-700 to-green-900"
  },
  {
    id: 4,
    title: "Digital Quranic Technology",
    arabic: "تقنيات الدراسات القرآنية الرقمية",
    desc: "Pemanfaatan software leksikografi Al-Qur'an, big data tafsir, kecerdasan buatan, serta media dakwah digital untuk riset dan syiar di era 5.0.",
    icon: "Sparkles",
    color: "from-slate-800 to-emerald-950"
  }
];

export const GRADUATE_PROFILES: GraduateProfileItem[] = [
  {
    id: 1,
    title: "Mufassir & Peneliti Al-Qur'an",
    titleArabic: "مفسر وباحث في الدراسات القرآنية",
    description: "Mampu melakukan riset orisinal, menafsirkan ayat secara tematik (Maudhu'i) dan kontekstual, serta menulis karya ilmiah bereputasi nasional/internasional.",
    roles: ["Peneliti Pusat Studi Al-Qur'an (PSQ)", "Penulis / Editor Literatur Islam", "Anggota Lajnah Pentashih Al-Qur'an Kemenag"],
    icon: "BookMarked"
  },
  {
    id: 2,
    title: "Akademisi & Pendidik Al-Qur'an",
    titleArabic: "أكاديمي ومعلم علوم القرآن",
    description: "Memiliki kapasitas pedagogis untuk mengajar Ulumul Qur'an, Ilmu Tafsir, Tahfidz, dan Bahasa Arab Qurani di perguruan tinggi, ma'had aly, dan madrasah.",
    roles: ["Dosen / Asisten Ahli", "Guru/Ustadz Ma'had Aly & Pesantren", "Master Trainer Tahsin & Tahfidz"],
    icon: "GraduationCap"
  },
  {
    id: 3,
    title: "Penyuluh & Konsultan Keagamaan",
    titleArabic: "مرشد ومستشار في الشؤون الدينية",
    description: "Memberikan panduan solusi berbasis Al-Qur'an atas problem etika, hukum, dan spiritual masyarakat modern secara wasathiyah (moderat).",
    roles: ["Penyuluh Agama Islam Kemenag", "Konsultan Syariah & Parenting Qurani", "Da'i & Penceramah Profesional"],
    icon: "Users"
  },
  {
    id: 4,
    title: "Praktisi Media & Dakwah Digital Qurani",
    titleArabic: "إعلامي ومنتج محتوى قرآني",
    description: "Mengemas pesan-pesan Al-Qur'an dalam format kreatif digital, podcast, animasi, dan platform edukasi berbasis teknologi modern.",
    roles: ["Digital Quran Content Creator", "Produser Program Keagamaan Televisi & Web", "Pengembang Aplikasi Quranic Studies"],
    icon: "Video"
  }
];

export const LECTURERS_DATA: LecturerItem[] = [
  {
    id: 1,
    name: "Dr. H. Muhammad Arifin, M.Ag., Al-Hafizh",
    nidn: "2104058201",
    role: "Ketua Program Studi & Lektor Kepala",
    expertise: "Tafsir Maudhu'i & Qira'at Sab'ah",
    education: "S1 UIN Syarif Hidayatullah, S2 UIN Sunan Kalijaga, S3 UIN Sunan Ampel Surabaya",
    image: "/logokampus.jpg",
    bio: "Pakar tafsir tematik dengan sanad tahfidz muttashil. Aktif menulis buku dan memimpin halaqah tafsir turats di berbagai pesantren.",
    courses: ["Tafsir Maudhu'i", "Qawaidut Tafsir", "Ulumul Qur'an Lanjut"]
  },
  {
    id: 2,
    name: "Dr. KH. Abdul Mannan Syukri, MA",
    nidn: "2115087502",
    role: "Guru Besar Kehormatan / Dosen Senior",
    expertise: "Tafsir Ahkam & Ushul Fiqh",
    education: "S1 Al-Azhar Kairo, S2 & S3 Universitas Ummul Qura Makkah",
    image: "/logokampus.jpg",
    bio: "Ulama kharismatik pengasuh pesantren yang menguasai kitab-kitab turats klasik dan manhaj istinbath hukum dari ayat-ayat Al-Qur'an.",
    courses: ["Tafsir Ayat Ahkam", "Kajian Kitab Thabari & Ibnu Katsir", "Hermeneutika Al-Qur'an"]
  },
  {
    id: 3,
    name: "Ust. H. Ridwan Kamil, Lc., M.Ag",
    nidn: "2122038801",
    role: "Kepala Laboratorium Al-Qur'an",
    expertise: "Living Qur'an & Filologi Tafsir Nusantara",
    education: "S1 Universitas Al-Ahgaff Yaman, S2 UIN Walisongo Semarang",
    image: "/logokampus.jpg",
    bio: "Peneliti manuskrip tafsir kuno Nusantara dan penggiat kajian fenomena resepsi sosial Al-Qur'an di era digital.",
    courses: ["Living Qur'an", "Filologi & Kodikologi Naskah", "Metodologi Penelitian Tafsir"]
  },
  {
    id: 4,
    name: "Usth. Hj. Nurul Hidayah, M.Pd., Al-Hafizhah",
    nidn: "2108119003",
    role: "Koordinator Tahfidz & Sanad",
    expertise: "Rasm Utsmani, Dhabth, & Ilmu Tajwid Bersanad",
    education: "S1 Institut PTIQ Jakarta, S2 Universitas Negeri Malang",
    image: "/logokampus.jpg",
    bio: "Hafizhah 30 juz pemegang sanad Jazariyah dan Syathibiyyah. Berpengalaman membina karantina tahfidz ribuan santri.",
    courses: ["Ilmu Nagham & Tilawah", "Rasm & Dhabth Al-Qur'an", "Karantina Tahfidz Intensif"]
  },
  {
    id: 5,
    name: "Dr. Siti Fatimah, M.Ag",
    nidn: "2119068402",
    role: "Dosen Tetap & Gugus Mutu",
    expertise: "Semiotika Al-Qur'an & Studi Gender Islami",
    education: "S1 UIN Maliki Malang, S2 & S3 UIN Sunan Kalijaga",
    image: "/logokampus.jpg",
    bio: "Peneliti produktif jurnal internasional Scopus yang fokus pada pendekatan sastra, semiotika struktural, dan kajian tematik Al-Qur'an kontemporer.",
    courses: ["Studi Semiotika Al-Qur'an", "Kajian Tafsir Feminis & Sosial", "Bahasa Arab Qurani"]
  },
  {
    id: 6,
    name: "Ust. Ahmad Fauzan, M.Hum",
    nidn: "2103099201",
    role: "Sekretaris Program Studi",
    expertise: "Digital Quranic Studies & Media Dakwah",
    education: "S1 UIN Syarif Hidayatullah, S2 Universitas Indonesia",
    image: "/logokampus.jpg",
    bio: "Pakar korpus Al-Qur'an digital dan algoritma pencarian leksikon tafsir berbasis kecerdasan buatan.",
    courses: ["Digital Quranic Studies", "Komunikasi & Dakwah Digital", "Leksikografi Al-Qur'an"]
  }
];

export const CURRICULUM_DATA: CurriculumSemester[] = [
  {
    semester: 1,
    totalSks: 20,
    courses: [
      { code: "IAT101", name: "Pengantar Studi Islam", nameArabic: "مدخل إلى الدراسات الإسلامية", sks: 2, type: "Wajib Institut" },
      { code: "IAT102", name: "Bahasa Arab Dasar (Nahwu & Sharaf)", nameArabic: "اللغة العربية الأساسية", sks: 3, type: "Wajib Prodi" },
      { code: "IAT103", name: "Ulumul Qur'an I", nameArabic: "علوم القرآن (١)", sks: 3, type: "Wajib Prodi" },
      { code: "IAT104", name: "Tahsin & Tahfidz Juz 1 - 2", nameArabic: "التحسين والتحفيظ", sks: 2, type: "Wajib Prodi" },
      { code: "IAT105", name: "Pancasila & Kewarganegaraan", sks: 2, type: "Wajib Institut" },
      { code: "IAT106", name: "Bahasa Indonesia Akademik", sks: 2, type: "Wajib Institut" },
      { code: "IAT107", name: "Ilmu Mantiq & Logika", nameArabic: "علم المنطق", sks: 2, type: "Wajib Fakultas" },
      { code: "IAT108", name: "Ilmu Tajwid & Rasm Utsmani", nameArabic: "علم التجويد ورسم المصحف", sks: 4, type: "Wajib Prodi" }
    ]
  },
  {
    semester: 2,
    totalSks: 21,
    courses: [
      { code: "IAT201", name: "Ulumul Qur'an II", nameArabic: "علوم القرآن (٢)", sks: 3, type: "Wajib Prodi" },
      { code: "IAT202", name: "Bahasa Arab Qurani Lanjut", nameArabic: "اللغة العربية القرآنية", sks: 3, type: "Wajib Prodi" },
      { code: "IAT203", name: "Ilmu Qira'at Dasar", nameArabic: "علم القراءات الأساسي", sks: 2, type: "Wajib Prodi" },
      { code: "IAT204", name: "Tahfidz Juz 3 - 5", nameArabic: "التحفيظ", sks: 2, type: "Wajib Prodi" },
      { code: "IAT205", name: "Ushul Fiqh", nameArabic: "أصول الفقه", sks: 3, type: "Wajib Fakultas" },
      { code: "IAT206", name: "Ulumul Hadis Dasar", nameArabic: "علوم الحديث", sks: 3, type: "Wajib Fakultas" },
      { code: "IAT207", name: "Sejarah Peradaban Islam", nameArabic: "تاريخ الحضارة الإسلامية", sks: 2, type: "Wajib Institut" },
      { code: "IAT208", name: "Filsafat Ilmu Islam", nameArabic: "فلسفة العلوم الإسلامية", sks: 3, type: "Wajib Fakultas" }
    ]
  },
  {
    semester: 3,
    totalSks: 22,
    courses: [
      { code: "IAT301", name: "Sejarah Perkembangan Tafsir", nameArabic: "تاريخ تطور التفسير", sks: 3, type: "Wajib Prodi" },
      { code: "IAT302", name: "Qawaidut Tafsir (Kaidah-Kaidah Tafsir)", nameArabic: "قواعد التفسير", sks: 3, type: "Wajib Prodi" },
      { code: "IAT303", name: "Tafsir Tahlili I (Periode Klasik)", nameArabic: "التفسير التحليلي (١)", sks: 3, type: "Wajib Prodi" },
      { code: "IAT304", name: "Tahfidz Juz 6 - 9", nameArabic: "التحفيظ", sks: 2, type: "Wajib Prodi" },
      { code: "IAT305", name: "Ilmu Balaghah (Ma'ani, Bayan, Badi')", nameArabic: "علم البلاغة القرآنية", sks: 3, type: "Wajib Prodi" },
      { code: "IAT306", name: "I'jazul Qur'an (Kemukjizatan Al-Qur'an)", nameArabic: "إعجاز القرآن", sks: 2, type: "Wajib Prodi" },
      { code: "IAT307", name: "Bahasa Inggris Akademik & Islamic Studies", sks: 3, type: "Wajib Institut" },
      { code: "IAT308", name: "Studi Naskah Turats Tafsir", nameArabic: "دراسة نصوص التراث التفسيري", sks: 3, type: "Pilihan Keahlian" }
    ]
  },
  {
    semester: 4,
    totalSks: 21,
    courses: [
      { code: "IAT401", name: "Tafsir Tahlili II (Periode Pertengahan & Modern)", nameArabic: "التفسير التحليلي (٢)", sks: 3, type: "Wajib Prodi" },
      { code: "IAT402", name: "Tafsir Ayat Ahkam (Hukum Islam)", nameArabic: "تفسير آيات الأحكام", sks: 3, type: "Wajib Prodi" },
      { code: "IAT403", name: "Tafsir Maudhu'i (Tematik) I", nameArabic: "التفسير الموضوعي (١)", sks: 3, type: "Wajib Prodi" },
      { code: "IAT404", name: "Tahfidz Juz 10 - 14", nameArabic: "التحفيظ", sks: 2, type: "Wajib Prodi" },
      { code: "IAT405", name: "Ilmu Munasabah & Asbabun Nuzul", nameArabic: "المناسبة وأسباب النزول", sks: 2, type: "Wajib Prodi" },
      { code: "IAT406", name: "Metodologi Penelitian Al-Qur'an & Tafsir", nameArabic: "مناهج البحث في التفسير", sks: 3, type: "Wajib Prodi" },
      { code: "IAT407", name: "Digital Quranic Studies & Big Data", nameArabic: "الدراسات القرآنية الرقمية", sks: 3, type: "Praktikum / Riset" },
      { code: "IAT408", name: "Studi Orientalisme & Barat atas Al-Qur'an", nameArabic: "دراسات المستشرقين في القرآن", sks: 2, type: "Wajib Fakultas" }
    ]
  },
  {
    semester: 5,
    totalSks: 21,
    courses: [
      { code: "IAT501", name: "Tafsir Maudhu'i (Tematik) II (Isu Kontemporer)", nameArabic: "التفسير الموضوعي المعاصر", sks: 3, type: "Wajib Prodi" },
      { code: "IAT502", name: "Hermeneutika Al-Qur'an", nameArabic: "الهرمنيوطيقا والقرآن", sks: 3, type: "Wajib Prodi" },
      { code: "IAT503", name: "Living Qur'an & Kajian Budaya Lokal", nameArabic: "القرآن الحي في الثقافة المحلية", sks: 3, type: "Wajib Prodi" },
      { code: "IAT504", name: "Tafsir Muqaran (Perbandingan Madzhab)", nameArabic: "التفسير المقارن", sks: 3, type: "Wajib Prodi" },
      { code: "IAT505", name: "Tahfidz Juz 15 - 20", nameArabic: "التحفيظ", sks: 2, type: "Wajib Prodi" },
      { code: "IAT506", name: "Tafsir Nusantara & Manuskrip Lokal", nameArabic: "التفسير في أرخبيل الملايو", sks: 3, type: "Pilihan Keahlian" },
      { code: "IAT507", name: "Praktikum Khitabah & Dakwah Al-Qur'an", nameArabic: "الخطابة والدعوة القرآنية", sks: 2, type: "Praktikum / Riset" },
      { code: "IAT508", name: "Semiotika & Linguistik Al-Qur'an", nameArabic: "السيميائية القرآنية", sks: 2, type: "Pilihan Keahlian" }
    ]
  },
  {
    semester: 6,
    totalSks: 20,
    courses: [
      { code: "IAT601", name: "Tafsir Isyari & Sufistik", nameArabic: "التفسير الإشاري والصوفي", sks: 2, type: "Pilihan Keahlian" },
      { code: "IAT602", name: "Tafsir Sains & Kontekstual", nameArabic: "التفسير العلمي المعاصر", sks: 3, type: "Wajib Prodi" },
      { code: "IAT603", name: "Riset Lapangan Living Qur'an", nameArabic: "البحث الميداني في القرآن الحي", sks: 3, type: "Praktikum / Riset" },
      { code: "IAT604", name: "Tahfidz Juz 21 - 26", nameArabic: "التحفيظ", sks: 2, type: "Wajib Prodi" },
      { code: "IAT605", name: "Penulisan Artikel Jurnal Ilmiah Bereputasi", sks: 3, type: "Praktikum / Riset" },
      { code: "IAT606", name: "Kritik Sanad & Matan Hadis Tafsir", nameArabic: "نقد أسانيد ومتون أحاديث التفسير", sks: 3, type: "Wajib Prodi" },
      { code: "IAT607", name: "Kewirausahaan Berbasis Al-Qur'an (Edu-preneur)", sks: 2, type: "Wajib Institut" },
      { code: "IAT608", name: "Filologi & Transliterasi Naskah Kuno", nameArabic: "تحقيق المخطوطات التفسيرية", sks: 2, type: "Pilihan Keahlian" }
    ]
  },
  {
    semester: 7,
    totalSks: 14,
    courses: [
      { code: "IAT701", name: "Kuliah Kerja Nyata (KKN) Tematik Qurani", sks: 4, type: "Wajib Institut" },
      { code: "IAT702", name: "Praktik Pengalaman Lapangan (PPL / Magang Riset)", sks: 4, type: "Praktikum / Riset" },
      { code: "IAT703", name: "Seminar Proposal Skripsi", nameArabic: "حلقة مقترح البحث العلمي", sks: 2, type: "Wajib Prodi" },
      { code: "IAT704", name: "Tahfidz Juz 27 - 30 (Khatmil Qur'an)", nameArabic: "ختم القرآن الكريم", sks: 4, type: "Wajib Prodi" }
    ]
  },
  {
    semester: 8,
    totalSks: 8,
    courses: [
      { code: "IAT801", name: "Bimbingan & Ujian Munaqasyah Skripsi", nameArabic: "مناقشة أطروحة الإجازة العالية", sks: 6, type: "Wajib Prodi" },
      { code: "IAT802", name: "Ujian Komprehensif Al-Qur'an & Tafsir", nameArabic: "الامتحان الشامل", sks: 2, type: "Wajib Prodi" }
    ]
  }
];

export const MOCK_IAT_FACILITIES = [
  {
    id: 1,
    title: "Laboratorium Al-Qur'an & Studi Digital",
    category: "Laboratorium",
    description: "Fasilitas riset berbasis komputasi modern yang dilengkapi workstation berspesifikasi tinggi, software Maktabah Syamilah terbaru, Korpus Al-Qur'an digital, software analisa qira'at, serta akses database tafsir internasional.",
    image: "/gedung.jpg",
    jenjang: "KAMPUS",
    fakultas: "Ushuluddin",
    jurusan: "IAT",
    features: [
      "Akses Software Riset Maktabah Syamilah & Turats Full Versi",
      "Perangkat Analisis Linguistik & Konkordansi Al-Qur'an Digital",
      "Koneksi Internet Dedicated Fiber Optic 1 Gbps",
      "Ruang Diskusi Ilmiah Interaktif berkapasitas 40 Mahasiswa"
    ]
  },
  {
    id: 2,
    title: "Pojok Tahfidz & Halaqah Qira'at Bersanad",
    category: "Ruang Tahfidz",
    description: "Ruang halaqah kedap suara yang nyaman dan ber-AC untuk setoran hafalan 30 juz, talaqqi sanad dengan para masyayikh, serta pembinaan tajwid dan nagham murottal.",
    image: "/gedungdepan.jpg",
    jenjang: "KAMPUS",
    fakultas: "Ushuluddin",
    jurusan: "IAT",
    features: [
      "Audio Recording System untuk evaluasi makharijul huruf & sifat huruf",
      "Koleksi Mushaf Standar Internasional & Mushaf Qira'at Sab'ah",
      "Jadwal Bimbingan Masyayikh Bersanad Setiap Hari",
      "Suasana Hening dan Khidmat untuk Menjaga Hafalan"
    ]
  },
  {
    id: 3,
    title: "Perpustakaan Khusus Kitab Tafsir & Turats Islamiyah",
    category: "Perpustakaan",
    description: "Koleksi ribuan jilid kitab kuning asli cetakan Timur Tengah, manuskrip tafsir nusantara, ensiklopedia hadits, serta jurnal-jurnal bereputasi internasional Scopus & Sinta.",
    image: "/slide1.jpg",
    jenjang: "KAMPUS",
    fakultas: "Ushuluddin",
    jurusan: "IAT",
    features: [
      "Ribuan Judul Kitab Turats Tafsir, Hadis, Fiqh, & Ushul",
      "Ruang Baca Nyaman & Private Study Cubicles",
      "Katalog Digital Terintegrasi (OPAC)",
      "Area Restorasi dan Digitalisasi Manuskrip Kuno"
    ]
  },
  {
    id: 4,
    title: "Studio Podcast & Dakwah Qurani Modern",
    category: "Studio Multimedia",
    description: "Studio rekaman profesional untuk produksi konten dakwah Al-Qur'an, podcast kajian tafsir tematik, rekaman tilawah murattal, dan live streaming seminar internasional.",
    image: "/slide2.jpg",
    jenjang: "KAMPUS",
    fakultas: "Ushuluddin",
    jurusan: "IAT",
    features: [
      "Kamera 4K Ultra HD & Lighting Studio Multi-Point",
      "Microphone Studio Shure SM7B & Mixer Audio Broadcast",
      "Ruang Akustik Kedap Suara Berstandar Broadcast",
      "Editing Suite dengan Software Adobe Creative Cloud"
    ]
  }
];
