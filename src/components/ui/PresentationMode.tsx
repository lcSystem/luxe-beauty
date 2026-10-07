'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types';
import { X, Pause, Play, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface PresentationModeProps {
  projects: Project[];
  isOpen: boolean;
  onClose: () => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  projects,
  isOpen,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-advance slideshow
  useEffect(() => {
    if (!isOpen || !isPlaying || projects.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, projects.length]);

  // Keyboard navigation for presentation mode
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrentIndex((p) => (p + 1) % projects.length);
      if (e.key === 'ArrowLeft') setCurrentIndex((p) => (p - 1 + projects.length) % projects.length);
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, projects.length, onClose]);

  if (!isOpen || projects.length === 0) return null;

  const current = projects[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#070605] text-white flex flex-col justify-between overflow-hidden select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Modo Exposición Inmersiva"
    >
      {/* Top bar */}
      <div className="relative z-30 px-6 sm:px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-atelier-gold animate-ping" />
          <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-light text-white/80">
            AURA ATELIER · Exposición Contínua
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all"
            aria-label={isPlaying ? 'Pausar' : 'Reanudar'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-atelier-gold" />}
          </button>

          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white flex items-center gap-1.5 text-xs tracking-widest uppercase transition-all"
            aria-label="Salir de modo exposición"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </div>

      {/* Center Image Display */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center p-4 sm:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-[72vh] max-w-5xl"
          >
            <Image
              src={current.detailImage || current.image}
              alt={current.title}
              fill
              priority
              sizes="100vw"
              className="object-contain object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next controls */}
        <button
          onClick={() => setCurrentIndex((p) => (p - 1 + projects.length) % projects.length)}
          className="absolute left-6 z-30 p-3 rounded-full bg-black/40 hover:bg-black/70 border border-white/15 text-white/80 hover:text-white transition-all"
          aria-label="Obra anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => setCurrentIndex((p) => (p + 1) % projects.length)}
          className="absolute right-6 z-30 p-3 rounded-full bg-black/40 hover:bg-black/70 border border-white/15 text-white/80 hover:text-white transition-all"
          aria-label="Siguiente obra"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Timeline and Metadata */}
      <div className="relative z-30 px-6 sm:px-12 py-6 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 bg-black/40 gap-3">
        <div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-atelier-gold font-light block">
            {current.categoryLabel} · {current.collectionLabel}
          </span>
          <h3 className="font-serif text-2xl font-light text-white">
            {current.num} — {current.title}
          </h3>
        </div>

        {/* Progress track */}
        <div className="flex items-center gap-3 w-full sm:w-64">
          <span className="font-mono text-xs text-white/60">{current.num}</span>
          <div className="flex-1 h-0.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              key={current.id + (isPlaying ? 'playing' : 'paused')}
              initial={{ width: '0%' }}
              animate={{ width: isPlaying ? '100%' : '50%' }}
              transition={{ duration: 6, ease: 'linear' }}
              className="h-full bg-atelier-gold"
            />
          </div>
          <span className="font-mono text-xs text-white/60">
            {projects.length < 10 ? `0${projects.length}` : projects.length}
          </span>
        </div>
      </div>
    </div>
  );
};
