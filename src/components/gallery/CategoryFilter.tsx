'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '@/data/categories';
import { CategoryId } from '@/types';

interface CategoryFilterProps {
  activeCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  counts: Record<string, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  counts,
}) => {
  return (
    <div className="w-full">
      {/* Category Pills Slider */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-2 px-1 sm:px-0">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = counts[cat.id] ?? 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`relative whitespace-nowrap px-4 sm:px-5 py-2.5 rounded-full text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-medium transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-atelier-gold flex items-center gap-2 ${
                isActive
                  ? 'text-atelier-ivory'
                  : 'text-atelier-graphite hover:text-atelier-noir hover:bg-atelier-sand/60'
              }`}
              aria-pressed={isActive}
            >
              {/* Active Animated Background Pill */}
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-atelier-noir rounded-full shadow-sm"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              <span className="relative z-10">{cat.shortLabel || cat.label}</span>
              <span
                className={`relative z-10 text-[9px] font-mono transition-opacity ${
                  isActive ? 'text-atelier-champagne' : 'text-atelier-muted'
                }`}
              >
                {count < 10 ? `0${count}` : count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic subtitle explaining current category */}
      <div className="mt-2.5 px-2 text-[11px] text-atelier-muted font-light tracking-wide italic">
        {CATEGORIES.find((c) => c.id === activeCategory)?.tagline}
      </div>
    </div>
  );
};
