import React from 'react';
import { X, CheckCircle2, Sparkles, Building2 } from 'lucide-react';
import { Facility } from '../types';

interface FacilityModalProps {
  facility: Facility | null;
  onClose: () => void;
}

const FacilityModal: React.FC<FacilityModalProps> = ({ facility, onClose }) => {
  if (!facility) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Modal Header with Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden flex-shrink-0">
          <img
            src={facility.image || '/gedung.jpg'}
            alt={facility.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block bg-emerald-900/90 text-emerald-200 border border-emerald-700/50 px-3 py-1 rounded-full text-xs font-bold shadow-sm mb-2">
              {facility.category} • Ushuluddin IAT
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {facility.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Deskripsi Fasilitas
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed">
              {facility.description}
            </p>
          </div>

          {facility.features && facility.features.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Spesifikasi & Keunggulan
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {facility.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-800 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-all shadow-sm"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacilityModal;
