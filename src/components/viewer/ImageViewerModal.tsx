'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Project } from '@/types';
import { ZoomableImage } from './ZoomableImage';
import { useKeyNavigation } from '@/hooks/useKeyNavigation';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Info, 
  Sparkles,
  Share2,
  Check
} from 'lucide-react';

interface ImageViewerModalProps {
  project: Project | null;
  allProjects: Project[];
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  project,
  allProjects,
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const [showMetaDetails, setShowMetaDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);

  // Current index in the active list
  const currentIndex = project
    ? allProjects.findIndex((p) => p.id === project.id)
    : -1;
  const totalCount = allProjects.length;

  const handleNext = () => {
    if (currentIndex < 0 || totalCount <= 1) return;
    const nextIndex = (currentIndex + 1) % totalCount;
    onSelectProject(allProjects[nextIndex]);
  };

  const handlePrev = () => {
    if (currentIndex < 0 || totalCount <= 1) return;
    const prevIndex = (currentIndex - 1 + totalCount) % totalCount;
    onSelectProject(allProjects[prevIndex]);
  };

  // Keyboard navigation
  useKeyNavigation({
    onNext: handleNext,
    onPrev: handlePrev,
    onClose: onClose,
    isActive: isOpen,
  });

  // Lock body scroll when viewer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Swipe Gesture handler via Framer Motion drag
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 60;
    const swipeVelocity = 400;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -swipeVelocity) {
      handleNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > swipeVelocity) {
      handlePrev();
    }
    setDragDirection(null);
  };

  const handleShare = () => {
    if (!project) return;
    if (navigator.share) {
      navigator.share({
        title: `${project.title} — AURA ATELIER`,
        text: `Explora la obra ${project.num} de AURA ATELIER: ${project.title} (${project.categoryLabel}).`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex flex-col justify-between overflow-hidden bg-[#0e0c0b]/96 backdrop-blur-2xl text-white select-none"
        role="dialog"
        aria-modal="true"
        aria-label={`Visor de obra ${project.title}`}
      >
        {/* Top Header / Navigation Bar */}
        <header className="relative z-30 w-full px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between border-b border-white/10 bg-gradient-to-b from-black/60 to-transparent">
          {/* Work numbering indicator: 01 / 24 */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm sm:text-base tracking-[0.25em] font-light text-atelier-gold">
              {project.num}
            </span>
            <span className="text-white/30 text-xs font-mono">/</span>
            <span className="font-mono text-xs text-white/50 tracking-widest">
              {totalCount < 10 ? `0${totalCount}` : totalCount}
            </span>

            <span className="hidden sm:inline-block w-4 h-px bg-white/20 ml-2" />
            <span className="hidden sm:inline-block text-[10px] tracking-[0.25em] uppercase text-white/70 font-light truncate max-w-xs">
              {project.collectionLabel}
            </span>
          </div>

          {/* Quick Actions (Share, Info Toggle, Close) */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setShowMetaDetails(!showMetaDetails)}
              className={`p-2 rounded-full border transition-all ${
                showMetaDetails
                  ? 'bg-atelier-gold text-atelier-noir border-atelier-gold'
                  : 'bg-white/10 border-white/15 text-white/80 hover:bg-white/20'
              }`}
              title="Detalles técnicos de la obra"
              aria-label="Ver detalles técnicos de la obra"
            >
              <Info className="w-4 h-4" />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/10 border border-white/15 text-white/80 hover:bg-white/20 transition-all"
              title="Compartir enlace"
              aria-label="Compartir enlace de esta obra"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white flex items-center gap-1.5 transition-all focus-visible:ring-2 focus-visible:ring-atelier-gold"
              aria-label="Cerrar visor"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline text-[10px] tracking-widest uppercase font-light">Cerrar</span>
            </button>
          </div>
        </header>

        {/* Center Canvas / Interactive Photography Staging */}
        <main className="relative flex-1 w-full h-full flex items-center justify-center p-2 sm:p-6 lg:p-8 overflow-hidden">
          {/* Desktop Previous Button */}
          <button
            onClick={handlePrev}
            className="hidden md:flex absolute left-6 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 items-center justify-center text-white/90 hover:text-white transition-all transform hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-atelier-gold"
            aria-label="Obra anterior (flecha izquierda)"
          >
            <ChevronLeft className="w-6 h-6 -ml-0.5" />
          </button>

          {/* Desktop Next Button */}
          <button
            onClick={handleNext}
            className="hidden md:flex absolute right-6 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 items-center justify-center text-white/90 hover:text-white transition-all transform hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-atelier-gold"
            aria-label="Siguiente obra (flecha derecha)"
          >
            <ChevronRight className="w-6 h-6 ml-0.5" />
          </button>

          {/* Shared Element / Drag & Swipe Frame */}
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onDragEnd={handleDragEnd}
            className="relative w-full h-[70vh] sm:h-[78vh] max-w-4xl max-h-[850px] mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
          >
            <ZoomableImage
              src={project.detailImage || project.image}
              alt={project.title}
              priority
            />
          </motion.div>

          {/* Technical Details Popover Panel */}
          <AnimatePresence>
            {showMetaDetails && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-20 sm:bottom-24 z-30 w-[92%] sm:w-auto sm:max-w-md p-5 rounded-2xl bg-atelier-noir/90 backdrop-blur-xl border border-white/20 text-white shadow-modal"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-atelier-gold font-medium">
                    Ficha Técnica
                  </span>
                  <button
                    onClick={() => setShowMetaDetails(false)}
                    className="text-white/60 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-white/50 block">Técnica</span>
                    <span className="font-light text-white/90">{project.technique}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-white/50 block">Acabado</span>
                    <span className="font-light text-white/90">{project.finish}</span>
                  </div>
                  {project.shape && (
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-white/50 block">Arquitectura / Forma</span>
                      <span className="font-light text-white/90">{project.shape}</span>
                    </div>
                  )}
                  {project.palette && project.palette.length > 0 && (
                    <div className="pt-1">
                      <span className="text-[10px] uppercase tracking-wider text-white/50 block mb-1">Paleta Cromática</span>
                      <div className="flex items-center gap-2">
                        {project.palette.map((color, idx) => (
                          <div
                            key={idx}
                            className="w-4 h-4 rounded-full border border-white/30 shadow-inner"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Bottom Minimalist Editorial Footer & Navigation */}
        <footer className="relative z-30 w-full px-4 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 bg-gradient-to-t from-black/80 to-transparent gap-3 sm:gap-4">
          {/* Left: Discrete Title & Meta */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] tracking-[0.24em] uppercase text-atelier-gold font-light">
              <span>{project.categoryLabel}</span>
              <span>·</span>
              <span className="text-white/60">{project.collectionLabel}</span>
            </div>
            <h2 className="font-serif text-lg sm:text-2xl font-light tracking-wide text-white mt-0.5">
              {project.title}
            </h2>
          </div>

          {/* Center: Mobile Swipe Cue & Quick Step */}
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={handlePrev}
              className="md:hidden px-3.5 py-1.5 rounded-full bg-white/10 active:bg-white/20 text-white text-[11px] flex items-center gap-1 border border-white/15"
              aria-label="Obra anterior"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Anterior
            </button>

            <span className="text-[10px] tracking-widest uppercase text-white/40 hidden sm:inline">
              ← Flechas / Desliza en móvil →
            </span>

            <button
              onClick={handleNext}
              className="md:hidden px-3.5 py-1.5 rounded-full bg-white/10 active:bg-white/20 text-white text-[11px] flex items-center gap-1 border border-white/15"
              aria-label="Siguiente obra"
            >
              Siguiente <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right: Technical preview shortcut */}
          <div className="hidden lg:flex items-center gap-2 text-right">
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-light">
              Presiona &apos;Z&apos; para Zoom · &apos;ESC&apos; para Salir
            </span>
          </div>
        </footer>
      </div>
    </AnimatePresence>
  );
};
