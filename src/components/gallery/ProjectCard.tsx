'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Project } from '@/types';
import { Eye, Sparkles } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  priority?: boolean;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  priority = false,
  className = '',
}) => {
  // Format aspect-ratio map
  const getAspectRatioClass = () => {
    switch (project.format) {
      case 'tall':
        return 'aspect-[3/4]';
      case 'portrait':
        return 'aspect-[4/5]';
      case 'square':
        return 'aspect-square';
      case 'wide':
        return 'aspect-[16/9]';
      case 'panoramic':
        return 'aspect-[21/9] sm:aspect-[16/7]';
      default:
        return 'aspect-[4/5]';
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col justify-end cursor-pointer ${className}`}
      onClick={() => onSelect(project)}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalle de obra ${project.num}: ${project.title}, categoría ${project.categoryLabel}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
    >
      {/* Outer Card Media Container with shared element layoutId */}
      <motion.div
        layoutId={`project-container-${project.id}`}
        className={`relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-atelier-sand border border-atelier-sand-dark/50 shadow-sm transition-all duration-700 ease-editorial group-hover:shadow-luxe-hover ${getAspectRatioClass()}`}
      >
        {/* Next.js Image with subtle zoom on hover */}
        <motion.div
          layoutId={`project-image-${project.id}`}
          className="relative w-full h-full"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-[1.04]"
          />
        </motion.div>

        {/* Ambient Gradient on Hover / Touch */}
        <div className="absolute inset-0 bg-gradient-to-t from-atelier-noir/80 via-atelier-noir/20 to-transparent opacity-40 sm:opacity-0 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />

        {/* Index Badge (Always visible, discrete luxury look) */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 px-2.5 py-1 rounded-full bg-atelier-noir/60 backdrop-blur-md border border-white/10 text-white text-[9px] sm:text-[10px] font-mono tracking-widest font-light">
          {project.num}
        </div>

        {/* Hover / Touch Action Indicator */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-xs">
            <Eye className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Bottom Overlay Information for mobile & hover desktop */}
        <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-5 z-10 transform translate-y-1 sm:translate-y-2 group-hover:translate-y-0 transition-transform duration-500 text-white flex flex-col justify-end">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[9px] tracking-[0.24em] uppercase text-atelier-gold-light font-light">
              {project.categoryLabel}
            </span>
            <span className="text-[8px] text-white/50">·</span>
            <span className="text-[9px] tracking-[0.2em] uppercase text-white/70 font-light truncate">
              {project.collectionLabel}
            </span>
          </div>

          <h3 className="font-serif text-base sm:text-xl font-normal tracking-wide text-white group-hover:text-atelier-champagne-light transition-colors line-clamp-1">
            {project.title}
          </h3>

          <div className="mt-1 flex items-center justify-between text-[10px] text-white/70 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-400">
            <span className="font-light tracking-wider truncate max-w-[80%]">
              {project.technique.split('·')[0]}
            </span>
            <span className="text-atelier-gold text-xs">↗</span>
          </div>
        </div>
      </motion.div>

      {/* Discrete below-card label for clean editorial look on desktop */}
      <div className="mt-2.5 px-1 hidden sm:flex items-center justify-between text-[11px] text-atelier-muted">
        <span className="font-mono text-[10px] tracking-widest text-atelier-graphite">
          {project.num} / 24
        </span>
        <span className="tracking-[0.18em] uppercase text-[10px] font-medium text-atelier-noir group-hover:text-atelier-gold transition-colors truncate max-w-[180px]">
          {project.title}
        </span>
      </div>
    </motion.article>
  );
};
