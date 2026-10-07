'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Project } from '@/types';

interface CoverHeroProps {
  heroProject: Project;
  onExploreClick: () => void;
  onOpenHeroModal: (project: Project) => void;
}

export const CoverHero: React.FC<CoverHeroProps> = ({
  heroProject,
  onExploreClick,
  onOpenHeroModal,
}) => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-12 overflow-hidden bg-atelier-ivory">
      {/* Subtle background ambient texture */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 rounded-full bg-atelier-rose-dust/30 blur-3xl"
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute bottom-10 -left-40 w-96 h-96 rounded-full bg-atelier-champagne-light/30 blur-3xl"
      />

      {/* Editorial top badges */}
      <motion.div
        initial={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between border-b border-atelier-sand/80 pb-4 text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-atelier-muted font-light"
      >
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-atelier-gold" />
          Édition Vol. 2026 · Mostrario de Autor
        </span>
        <span className="hidden sm:inline">Archivos de Manicura &amp; Alta Estética</span>
        <span className="text-atelier-noir font-medium">Curaduría Visual</span>
      </motion.div>

      {/* Centerpiece: Editorial Magazine Cover Layout */}
      <div className="max-w-7xl mx-auto w-full my-auto py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Editorial Headline & Manifesto */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 sm:space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-atelier-nude/40 border border-atelier-sand text-atelier-graphite text-[9px] sm:text-[10px] tracking-[0.24em] uppercase font-medium">
              <Sparkles className="w-2.5 h-2.5 text-atelier-gold" />
              <span>Colección Permanente</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-atelier-noir font-normal leading-[1.05]">
              Una colección <br />
              <span className="italic font-light text-atelier-graphite">para descubrir.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md text-sm sm:text-base text-atelier-muted font-light leading-relaxed tracking-normal"
          >
            Donde la arquitectura de la uña natural dialoga con el arte contemporáneo.
            Sin estridencias, sin fórmulas predecibles: una galería viva de creaciones concebidas con paciencia, técnica rusa y devoción por el detalle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
          >
            <button
              onClick={onExploreClick}
              className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-atelier-noir text-atelier-ivory text-xs tracking-[0.24em] uppercase font-medium shadow-luxe hover:bg-atelier-charcoal transition-all duration-300 active:scale-95 focus-visible:ring-2 focus-visible:ring-atelier-gold"
            >
              <span>Explorar Obras</span>
              <ArrowDown className="w-3.5 h-3.5 text-atelier-gold transition-transform group-hover:translate-y-1" />
            </button>

            <button
              onClick={() => onOpenHeroModal(heroProject)}
              className="text-xs tracking-[0.2em] uppercase text-atelier-graphite hover:text-atelier-noir py-2 border-b border-transparent hover:border-atelier-gold transition-all duration-300 flex items-center gap-2"
            >
              <span>Ver Portada en Detalle ({heroProject.num})</span>
              <span className="text-[10px] text-atelier-muted">↗</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: Hero Cover Photo (Magazine Staging) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex justify-center lg:justify-end"
        >
          <div
            onClick={() => onOpenHeroModal(heroProject)}
            className="group relative cursor-pointer w-full max-w-sm sm:max-w-md aspect-portrait rounded-2xl sm:rounded-3xl overflow-hidden bg-atelier-sand shadow-2xl border border-atelier-sand-dark/60 transition-transform duration-700 ease-editorial hover:scale-[1.015]"
            role="button"
            tabIndex={0}
            aria-label={`Abrir fotografía protagonista: ${heroProject.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onOpenHeroModal(heroProject);
              }
            }}
          >
            {/* Image */}
            <Image
              src={heroProject.image}
              alt={heroProject.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover object-center transition-transform duration-1000 ease-editorial group-hover:scale-105"
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-atelier-noir/80 via-transparent to-black/10 opacity-70 group-hover:opacity-60 transition-opacity duration-500" />

            {/* Editorial Label Overlay */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-3 py-1 rounded-full bg-atelier-noir/40 backdrop-blur-md border border-white/20 text-white text-[9px] tracking-[0.25em] uppercase font-light">
              Obra Destacada · {heroProject.num}
            </div>

            {/* Bottom Meta */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 rounded-xl bg-atelier-noir/30 backdrop-blur-md border border-white/10 text-white flex items-end justify-between transition-transform duration-500">
              <div>
                <span className="text-[9px] tracking-[0.28em] uppercase text-atelier-gold font-light block mb-1">
                  {heroProject.categoryLabel}
                </span>
                <h2 className="font-serif text-lg sm:text-2xl font-light tracking-wide text-white">
                  {heroProject.title}
                </h2>
              </div>
              <div className="text-right">
                <span className="text-[10px] tracking-[0.2em] uppercase font-light text-white/80 block">
                  Toca para abrir
                </span>
                <span className="text-xs font-serif text-atelier-gold">Explorar ↗</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Editorial Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.6 }}
        className="max-w-7xl mx-auto w-full pt-4 flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-atelier-muted"
      >
        <div className="flex items-center gap-3">
          <span className="w-6 h-px bg-atelier-sand-dark" />
          <span>Fotografía de Alta Resolución</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>Tacto &amp; Acabados</span>
          <span>·</span>
          <span>Arquitectura Rusa</span>
          <span>·</span>
          <span>Pigmentos Orgánicos</span>
        </div>
      </motion.div>
    </section>
  );
};
