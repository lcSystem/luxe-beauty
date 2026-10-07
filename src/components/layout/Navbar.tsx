'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Play, Layers } from 'lucide-react';

interface NavbarProps {
  totalCount: number;
  onOpenCollections: () => void;
  onStartSlideshow: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalCount,
  onOpenCollections,
  onStartSlideshow,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-atelier-ivory/90 backdrop-blur-md py-3 shadow-sm border-b border-atelier-sand/70'
          : 'bg-transparent py-5 sm:py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        {/* Brand identity */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer group flex flex-col items-start"
          role="button"
          tabIndex={0}
          aria-label="Ir a la portada de AURA ATELIER"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <span className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.25em] font-medium text-atelier-noir group-hover:text-atelier-gold transition-colors">
            AURA ATELIER
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-atelier-muted font-light transition-opacity">
            Haute Beauté &amp; Nail Artistry
          </span>
        </div>

        {/* Center / Desktop navigation links */}
        <nav
          className="hidden md:flex items-center space-x-8 text-[11px] tracking-[0.22em] uppercase font-medium text-atelier-graphite"
          aria-label="Navegación principal"
        >
          <button
            onClick={() => scrollToSection('gallery')}
            className="hover:text-atelier-noir hover:underline underline-offset-8 transition-colors focus-visible:ring-1 focus-visible:ring-atelier-gold"
          >
            Galería ({totalCount})
          </button>
          <button
            onClick={onOpenCollections}
            className="flex items-center gap-1.5 hover:text-atelier-noir hover:underline underline-offset-8 transition-colors focus-visible:ring-1 focus-visible:ring-atelier-gold"
          >
            <Layers className="w-3.5 h-3.5 text-atelier-gold" />
            Colecciones
          </button>
          <button
            onClick={() => scrollToSection('atelier-statement')}
            className="hover:text-atelier-noir hover:underline underline-offset-8 transition-colors focus-visible:ring-1 focus-visible:ring-atelier-gold"
          >
            El Atelier
          </button>
        </nav>

        {/* Right action controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onOpenCollections}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase border border-atelier-sand bg-atelier-ivory/80 text-atelier-noir active:scale-95 transition-transform"
            aria-label="Ver colecciones"
          >
            <Layers className="w-3 h-3 text-atelier-gold" />
            <span>Colección</span>
          </button>

          <button
            onClick={onStartSlideshow}
            className="group flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-atelier-sand-dark bg-atelier-noir text-atelier-ivory text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-light hover:bg-atelier-charcoal hover:border-atelier-gold transition-all duration-300 shadow-sm active:scale-95 focus-visible:ring-2 focus-visible:ring-atelier-gold"
            aria-label="Iniciar modo presentación inmersiva"
            title="Ver obras en modo presentación continua"
          >
            <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-atelier-gold fill-atelier-gold group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Modo Inmersivo</span>
            <span className="sm:hidden">Ver Todo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
