import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, FileText, ArrowRight, FolderKanban } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectCardProps {
  project: ProjectItem;
}

const ProjectCard: React.FC<ProjectCardProps> = memo(({ project }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col group h-full">
      {/* Image & Category Tag */}
      <div className="h-52 overflow-hidden relative">
        <img
          src={project.imageUrl || '/gedung.jpg'}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-amber-300 border border-amber-500/30 px-3.5 py-1 rounded-full text-[11px] font-bold shadow-md">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-500" /> {project.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-600" /> {project.author}
            </span>
          </div>

          <Link to={`/projek/${project.id}`}>
            <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2 mb-2.5">
              {project.title}
            </h3>
          </Link>

          <p className="text-slate-500 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            {project.documents?.length || 0} Dokumen / Laporan
          </span>
          <Link
            to={`/projek/${project.id}`}
            className="text-emerald-700 font-extrabold text-xs flex items-center gap-1.5 group-hover:gap-2 transition-all hover:text-emerald-900"
          >
            Lihat Detail <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
});

export default ProjectCard;
