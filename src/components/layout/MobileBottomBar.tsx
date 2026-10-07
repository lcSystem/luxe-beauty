'use client';

import React from 'react';
import { Home, Grid, Layers, Play } from 'lucide-react';

interface MobileBottomBarProps {
  onScrollToGallery: () => void;
  onOpenCollections: () => void;
  onStartSlideshow: () => void;
  onScrollToTop: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onScrollToGallery,
  onOpenCollections,
  onStartSlideshow,
  onScrollToTop,
}) => {
  return (
    <div className="md:hidden fixed bottom-4 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none">
      <nav 
        className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full bg-atelier-noir/90 backdrop-blur-xl border border-atelier-sand-dark/40 shadow-modal text-white text-[10px] tracking-wider uppercase"
        aria-label="Navegación móvil inferior"
      >
        <button
          onClick={onScrollToTop}
          className="flex flex-col items-center justify-center px-4 py-1.5 rounded-full hover:bg-white/10 active:scale-95 transition-all text-white/80 hover:text-white"
          aria-label="Ir al inicio"
        >
          <Home className="w-4 h-4 mb-0.5 text-atelier-champagne" />
          <span className="text-[8px] font-light">Inicio</span>
        </button>

        <button
          onClick={onScrollToGallery}
          className="flex flex-col items-center justify-center px-4 py-1.5 rounded-full hover:bg-white/10 active:scale-95 transition-all text-white/80 hover:text-white"
          aria-label="Ir a la galería"
        >
          <Grid className="w-4 h-4 mb-0.5 text-atelier-gold" />
          <span className="text-[8px] font-light">Galería</span>
        </button>

        <button
          onClick={onOpenCollections}
          className="flex flex-col items-center justify-center px-4 py-1.5 rounded-full hover:bg-white/10 active:scale-95 transition-all text-white/80 hover:text-white"
          aria-label="Ver colecciones"
        >
          <Layers className="w-4 h-4 mb-0.5 text-atelier-champagne" />
          <span className="text-[8px] font-light">Series</span>
        </button>

        <button
          onClick={onStartSlideshow}
          className="flex flex-col items-center justify-center px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 transition-all text-white"
          aria-label="Modo inmersivo"
        >
          <Play className="w-3.5 h-3.5 mb-0.5 text-atelier-gold fill-atelier-gold" />
          <span className="text-[8px] font-light">Inmersivo</span>
        </button>
      </nav>
    </div>
  );
};
