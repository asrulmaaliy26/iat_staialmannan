export type EducationLevel = 'KAMPUS' | 'MA' | 'SMPT' | 'MI' | 'MADIN' | 'TPQ' | 'UMUM';

export interface LevelConfig {
  name: string;
  type: string;
  color: string;
  bg: string;
  text: string;
}

export type LevelConfigData = Record<string, LevelConfig>;

export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  level?: string;
  jenjang: string;
  fakultas?: string;
  jurusan?: string;
  main_image: string;
  gallery?: string[];
  views?: number;
  created_at?: string;
  updated_at?: string;
}

export interface DocumentItem {
  url: string;
  type: string;
  title: string;
  format: string;
}

export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  description: string;
  author: string;
  date: string;
  jenjang: string;
  fakultas?: string;
  jurusan?: string;
  imageUrl: string;
  documents?: DocumentItem[];
  created_at?: string;
  updated_at?: string;
}

export interface JournalItem {
  id: number;
  title: string;
  category: string;
  abstract: string;
  author: string;
  mentor: string;
  score: number;
  date: string;
  is_best: boolean;
  jenjang: string;
  fakultas?: string;
  jurusan?: string;
  documentUrl?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Facility {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  jenjang?: string;
  fakultas?: string;
  jurusan?: string;
  features?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface CategoryData {
  project_categories: string[];
  journal_categories: string[];
  news_categories: string[];
}

export interface CourseItem {
  code: string;
  name: string;
  nameArabic?: string;
  sks: number;
  type: 'Wajib Prodi' | 'Wajib Fakultas' | 'Wajib Institut' | 'Pilihan Keahlian' | 'Praktikum / Riset';
  description?: string;
}

export interface CurriculumSemester {
  semester: number;
  totalSks: number;
  courses: CourseItem[];
}

export interface LecturerItem {
  id: number;
  name: string;
  nidn?: string;
  expertise: string;
  education: string;
  role: string;
  image: string;
  bio: string;
  courses: string[];
}

export interface GraduateProfileItem {
  id: number;
  title: string;
  titleArabic?: string;
  description: string;
  roles: string[];
  icon: string;
}

export interface AboutData {
  visi: string;
  misi: string[];
  history: string;
  struktur: {
    pimpinan: string;
    nama: string;
    staff: Array<{ role: string; name: string }>;
  };
}

export interface SlideItemData {
  image: string;
  title: string;
  subtitle: string;
}

export interface StatItemData {
  label: string;
  value: string;
}

export interface HomeData {
  news: NewsItem[];
  projects: ProjectItem[];
  journals: JournalItem[];
  facilities: Facility[];
  stats?: StatItemData[];
  slides?: SlideItemData[];
}
