'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { COLLECTIONS } from '@/data/collections';
import { Collection, CollectionId } from '@/types';

interface CollectionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCollection: (collectionId: CollectionId) => void;
  activeCollectionId: CollectionId | null;
}

export const CollectionsDrawer: React.FC<CollectionsDrawerProps> = ({
  isOpen,
  onClose,
  onSelectCollection,
  activeCollectionId,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-label="Selector de Colecciones Editoriales"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-atelier-ivory rounded-3xl p-6 sm:p-10 shadow-modal border border-atelier-sand-dark/60 text-atelier-noir no-scrollbar"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-6 border-b border-atelier-sand">
            <div>
              <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-atelier-gold font-medium mb-1">
                <Sparkles className="w-3 h-3 text-atelier-gold" />
                <span>Narrativa Visual</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl text-atelier-noir font-normal">
                Colecciones de Autor
              </h2>
              <p className="text-xs sm:text-sm text-atelier-muted font-light mt-1 max-w-lg">
                Selecciona una serie temática para descubrir el relato estético y las técnicas que la componen.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-atelier-sand hover:bg-atelier-sand-dark text-atelier-noir transition-colors"
              aria-label="Cerrar modal de colecciones"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-6 sm:pt-8">
            {COLLECTIONS.map((col) => {
              const isCurrent = activeCollectionId === col.id;

              return (
                <div
                  key={col.id}
                  onClick={() => {
                    onSelectCollection(col.id);
                    onClose();
                  }}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-500 p-5 sm:p-6 flex flex-col justify-between ${
                    isCurrent
                      ? 'border-atelier-gold bg-atelier-sand/40 shadow-md ring-1 ring-atelier-gold'
                      : 'border-atelier-sand-dark/60 bg-white hover:border-atelier-champagne hover:shadow-luxe'
                  }`}
                >
                  {/* Top Image Preview */}
                  <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden mb-4 bg-atelier-sand">
                    <Image
                      src={col.coverImage}
                      alt={col.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-[10px] tracking-widest">
                      VOL. {col.num}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[9px] uppercase tracking-[0.25em] text-atelier-gold-light block">
                        Serie
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-light">
                        {col.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Statement */}
                  <div className="space-y-2 mb-4">
                    <p className="text-xs text-atelier-graphite font-light leading-relaxed">
                      {col.statement}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {col.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-full bg-atelier-sand text-[9px] tracking-wider uppercase text-atelier-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action link */}
                  <div className="flex items-center justify-between pt-3 border-t border-atelier-sand text-[11px] font-medium tracking-[0.2em] uppercase text-atelier-noir group-hover:text-atelier-gold transition-colors">
                    <span>{isCurrent ? 'Colección Activa' : 'Explorar Serie'}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
