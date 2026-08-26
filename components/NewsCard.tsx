import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Eye, ArrowRight, BookOpen } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = memo(({ news }) => {
  return (
    <article className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col group h-full">
      {/* Image & Category Tag */}
      <div className="h-52 overflow-hidden relative">
        <img
          src={news.main_image || '/gedungdepan.jpg'}
          alt={news.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 bg-emerald-900/90 backdrop-blur-md text-emerald-200 border border-emerald-700/50 px-3.5 py-1 rounded-full text-[11px] font-bold shadow-md">
          {news.category || 'Kajian IAT'}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-500" /> {news.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-emerald-600" /> {(news.views || 0).toLocaleString()} pembaca
            </span>
          </div>

          <Link to={`/berita/${news.id}`}>
            <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2 mb-2.5">
              {news.title}
            </h3>
          </Link>

          <p className="text-slate-500 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-6">
            {news.excerpt}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-amber-500" /> Ushuluddin IAT
          </span>
          <Link
            to={`/berita/${news.id}`}
            className="text-emerald-700 font-extrabold text-xs flex items-center gap-1.5 group-hover:gap-2 transition-all hover:text-emerald-900"
          >
            Baca Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
});

export default NewsCard;
