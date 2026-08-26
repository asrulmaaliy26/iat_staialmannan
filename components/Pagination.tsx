import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-12 select-none">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${
          currentPage === 1
            ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
            : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50 hover:text-emerald-800'
        }`}
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${
            currentPage === page
              ? 'bg-emerald-800 text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50 hover:text-emerald-800'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${
          currentPage === totalPages
            ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
            : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50 hover:text-emerald-800'
        }`}
        aria-label="Next Page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
