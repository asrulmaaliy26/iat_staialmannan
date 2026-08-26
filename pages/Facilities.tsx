import React, { useState, useEffect } from 'react';
import { Sparkles, Building2, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { fetchFacilities } from '../services/api';
import { Facility } from '../types';
import FacilityCard from '../components/FacilityCard';
import FacilityModal from '../components/FacilityModal';

const Facilities: React.FC = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFac = async () => {
      setLoading(true);
      try {
        const data = await fetchFacilities('Ushuluddin', 'IAT');
        setFacilities(data);
      } catch (err) {
        console.error('Error loading facilities:', err);
      } finally {
        setLoading(false);
      }
    };
    loadFac();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-emerald-800/40">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-300 border border-emerald-600/40 text-xs font-bold">
              <Building2 className="w-3.5 h-3.5 text-amber-400" /> Sarana & Prasarana
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Fasilitas & Laboratorium Riset Prodi IAT
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Didukung fasilitas riset digital, studio podcast dakwah, ruang talaqqi tahfidz bersanad, dan perpustakaan ribuan jilid kitab turats tafsir.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {loading ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-700 mx-auto mb-3" />
            <p className="text-slate-500 font-bold text-sm">Memuat Fasilitas Prodi...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((fac) => (
              <FacilityCard
                key={fac.id}
                facility={fac}
                onClick={(item) => setSelectedFacility(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Facility Detail Modal */}
      <FacilityModal
        facility={selectedFacility}
        onClose={() => setSelectedFacility(null)}
      />
    </div>
  );
};

export default Facilities;
