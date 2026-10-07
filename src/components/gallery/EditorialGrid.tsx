'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types';
import { ProjectCard } from './ProjectCard';
import { Sparkles, Compass } from 'lucide-react';

interface EditorialGridProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  activeCategoryLabel?: string;
}

export const EditorialGrid: React.FC<EditorialGridProps> = ({
  projects,
  onSelectProject,
  activeCategoryLabel = 'Obras Seleccionadas',
}) => {
  if (projects.length === 0) {
    return (
      <div className="py-24 text-center">
        <Compass className="w-8 h-8 mx-auto text-atelier-champagne mb-4 animate-pulse" />
        <p className="font-serif text-2xl text-atelier-noir mb-2">
          Sin obras en esta categoría
        </p>
        <p className="text-xs text-atelier-muted tracking-widest uppercase">
          Selecciona otra categoría para continuar la exploración
        </p>
      </div>
    );
  }

  // To build an editorial magazine rhythm, we map indices into dynamic CSS grid col spans
  const getGridSpanClass = (index: number, project: Project, total: number) => {
    // If filtered list is small, maintain clean responsive layout
    if (total <= 4) {
      if (index === 0 && project.format !== 'square') {
        return 'col-span-12 md:col-span-8 md:row-span-2';
      }
      return 'col-span-12 sm:col-span-6 md:col-span-4';
    }

    // Dynamic Editorial Rhythms (pattern repeats every 8 items)
    const position = index % 8;

    switch (position) {
      case 0:
        // Large Featured Editorial Hero
        return 'col-span-12 lg:col-span-7 row-span-1';
      case 1:
        // Companion Vertical
        return 'col-span-12 sm:col-span-6 lg:col-span-5';
      case 2:
        // Companion Detail
        return 'col-span-12 sm:col-span-6 lg:col-span-5';
      case 3:
        // Panoramic Breakout
        return 'col-span-12 lg:col-span-7';
      case 4:
        // Full Width Panoramic Showcase
        return 'col-span-12';
      case 5:
        // Asymmetric Trio 1
        return 'col-span-12 sm:col-span-6 lg:col-span-4';
      case 6:
        // Asymmetric Trio 2
        return 'col-span-12 sm:col-span-6 lg:col-span-4';
      case 7:
        // Asymmetric Trio 3
        return 'col-span-12 sm:col-span-12 lg:col-span-4';
      default:
        return 'col-span-12 sm:col-span-6 lg:col-span-4';
    }
  };

  return (
    <div className="w-full">
      {/* Dynamic Animated Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-7 lg:gap-8 items-start"
      >
        <AnimatePresence mode="popLayout">
          {projects.map((project, idx) => {
            const spanClass = getGridSpanClass(idx, project, projects.length);
            const isFirst = idx === 0;

            return (
              <React.Fragment key={project.id}>
                {/* Optional editorial quote insertion for magazine flow */}
                {project.editorialQuote && idx > 0 && idx % 4 === 0 && (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="col-span-12 py-8 sm:py-14 my-2 sm:my-4 border-y border-atelier-sand text-center px-4"
                  >
                    <span className="text-[9px] tracking-[0.3em] uppercase text-atelier-gold font-medium block mb-3">
                      L&apos;Art du Détail · Reflexión
                    </span>
                    <blockquote className="font-serif text-xl sm:text-3xl md:text-4xl font-light italic text-atelier-noir max-w-2xl mx-auto leading-relaxed">
                      &ldquo;{project.editorialQuote}&rdquo;
                    </blockquote>
                    <span className="text-[10px] tracking-[0.22em] uppercase text-atelier-muted block mt-3">
                      AURA ATELIER · Estudio Visual
                    </span>
                  </motion.div>
                )}

                <ProjectCard
                  project={project}
                  onSelect={onSelectProject}
                  priority={isFirst}
                  className={spanClass}
                />
              </React.Fragment>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
