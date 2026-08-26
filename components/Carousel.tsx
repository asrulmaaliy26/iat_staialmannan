import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, BookOpen, GraduationCap } from 'lucide-react';
import { DOMAIN_LINKS } from '../constants';

export interface SlideItem {
  image: string;
  title: string;
  subtitle: string;
}

interface CarouselProps {
  slides: SlideItem[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  if (!slides || slides.length === 0) {
    return (
      <div className="relative h-[480px] sm:h-[580px] lg:h-[660px] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="relative h-[520px] sm:h-[600px] lg:h-[680px] w-full overflow-hidden bg-slate-950 select-none">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-all duration-1000 ease-in-out"
          style={{
            opacity: index === current ? 1 : 0,
            transform: index === current ? 'scale(1)' : 'scale(1.05)',
            zIndex: index === current ? 10 : 0
          }}
        >
          {/* Background Image with Deep Quranic Gradient Overlay */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-emerald-950/40"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_50%)]"></div>

          {/* Slide Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-24">
            <div className="max-w-4xl space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-700/60 text-emerald-300 text-xs sm:text-sm font-bold backdrop-blur-md shadow-lg">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Program Studi Ilmu Al-Qur'an dan Tafsir (S1)</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-md tracking-tight">
                {slide.title}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-xl text-slate-200 font-medium max-w-2xl leading-relaxed drop-shadow">
                {slide.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href={DOMAIN_LINKS.PMB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold rounded-2xl shadow-xl hover:shadow-amber-500/20 transition-all text-sm uppercase tracking-wider flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  <GraduationCap className="w-5 h-5" /> Daftar Mahasiswa Baru
                </a>
                <Link
                  to="/kurikulum"
                  className="px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl backdrop-blur-md border border-white/20 transition-all text-sm flex items-center gap-2"
                >
                  <BookOpen className="w-5 h-5 text-emerald-400" /> Lihat Kurikulum & SKS
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/60 hover:bg-emerald-800 text-white border border-white/10 backdrop-blur-md transition-all z-20 hover:scale-110 shadow-lg"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/60 hover:bg-emerald-800 text-white border border-white/10 backdrop-blur-md transition-all z-20 hover:scale-110 shadow-lg"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Navigation Indicators / Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-2.5 z-20 bg-slate-950/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current ? 'bg-amber-400 w-8' : 'bg-white/30 hover:bg-white/60 w-2.5'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
