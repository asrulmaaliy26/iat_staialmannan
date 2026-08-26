import React, { memo } from 'react';
import { Sparkles, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Facility } from '../types';

interface FacilityCardProps {
  facility: Facility;
  onClick: (facility: Facility) => void;
}

const FacilityCard: React.FC<FacilityCardProps> = memo(({ facility, onClick }) => {
  return (
    <div
      onClick={() => onClick(facility)}
      className="group relative rounded-3xl overflow-hidden bg-slate-900 shadow-md border border-slate-800 h-[440px] cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Background Image with Hover Zoom */}
      <img
        src={facility.image || '/gedung.jpg'}
        alt={facility.title}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-75"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-6 sm:p-8 flex flex-col justify-end">
        {/* Category Tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-emerald-900/90 text-emerald-300 border border-emerald-700/60 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            {facility.category}
          </span>
          <span className="bg-slate-800/80 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold">
            Lab & Fasilitas IAT
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-white mb-2 leading-snug group-hover:text-amber-300 transition-colors">
          {facility.title}
        </h3>

        {/* Description */}
        <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
          {facility.description}
        </p>

        {/* Action button in bottom */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Fasilitas Standar Riset
          </span>
          <span className="text-white font-extrabold flex items-center gap-1 group-hover:text-amber-400 transition-colors">
            Detail <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
});

export default FacilityCard;
