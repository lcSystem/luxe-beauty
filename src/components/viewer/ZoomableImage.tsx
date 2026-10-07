'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ZoomableImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export const ZoomableImage: React.FC<ZoomableImageProps> = ({
  src,
  alt,
  priority = true,
}) => {
  const [scale, setScale] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Position offsets for panning when zoomed
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const startDragRef = useRef({ x: 0, y: 0 });

  // Reset zoom when image source changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [src]);

  const toggleZoom = () => {
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2.2);
    }
  };

  const zoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.min(prev + 0.6, 3.5));
  };

  const zoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => {
      const next = Math.max(prev - 0.6, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const resetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Mouse / Touch drag handling for panning when zoomed
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsPanning(true);
    startDragRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning || scale <= 1) return;
    const maxX = (scale - 1) * 200;
    const maxY = (scale - 1) * 200;

    const newX = Math.max(Math.min(e.clientX - startDragRef.current.x, maxX), -maxX);
    const newY = Math.max(Math.min(e.clientY - startDragRef.current.y, maxY), -maxY);

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Zoom Controls Overlay */}
      <div 
        className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 p-1 rounded-full bg-atelier-noir/80 backdrop-blur-md border border-white/20 text-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={zoomOut}
          disabled={scale <= 1}
          className="p-1.5 rounded-full hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
          title="Alejar"
          aria-label="Alejar fotografía"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        <span className="text-[10px] font-mono px-1 font-light min-w-[32px] text-center">
          {Math.round(scale * 100)}%
        </span>

        <button
          onClick={zoomIn}
          disabled={scale >= 3.5}
          className="p-1.5 rounded-full hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
          title="Acercar (Ver micro-detalle)"
          aria-label="Acercar fotografía para ver detalles"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        {scale > 1 && (
          <button
            onClick={resetZoom}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-atelier-gold"
            title="Restablecer"
            aria-label="Restablecer tamaño original"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Main Image with Zoom & Pan Transforms */}
      <div
        onDoubleClick={toggleZoom}
        className={`relative w-full h-full transition-transform duration-300 ease-out ${
          scale > 1 ? (isPanning ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
        }`}
        style={{
          transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 85vw"
          className="object-contain object-center pointer-events-none"
        />
      </div>

      {/* Double tap hint on mobile */}
      {scale === 1 && (
        <div className="absolute bottom-4 left-4 z-10 hidden sm:block pointer-events-none px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[9px] tracking-widest uppercase text-white/70 font-light border border-white/10">
          Doble click para ampliar detalles
        </div>
      )}
    </div>
  );
};
