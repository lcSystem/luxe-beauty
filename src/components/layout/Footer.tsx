'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-atelier-ivory border-t border-atelier-sand py-12 sm:py-16 px-4 sm:px-6 lg:px-12 pb-24 md:pb-16 text-atelier-noir">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand identity */}
        <div className="text-center md:text-left">
          <span className="font-serif text-2xl tracking-[0.25em] font-medium text-atelier-noir block">
            AURA ATELIER
          </span>
          <p className="text-[10px] tracking-[0.3em] uppercase text-atelier-muted mt-1 font-light">
            Portafolio Visual &amp; Haute Beauté · Édition 2026
          </p>
        </div>

        {/* Minimal Social Links */}
        <div className="flex items-center space-x-8 text-[11px] tracking-[0.22em] uppercase font-light text-atelier-graphite">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-atelier-gold transition-colors focus-visible:ring-1 focus-visible:ring-atelier-gold"
          >
            Instagram
          </a>
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-atelier-gold transition-colors focus-visible:ring-1 focus-visible:ring-atelier-gold"
          >
            Pinterest
          </a>
          <a
            href="https://behance.net"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-atelier-gold transition-colors focus-visible:ring-1 focus-visible:ring-atelier-gold"
          >
            Editorial
          </a>
        </div>

        {/* Back to top button & copyright */}
        <div className="flex items-center gap-6">
          <span className="text-[10px] text-atelier-muted tracking-widest font-mono">
            © {new Date().getFullYear()} AURA
          </span>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full border border-atelier-sand hover:border-atelier-gold hover:bg-atelier-sand/40 transition-all text-atelier-graphite hover:text-atelier-noir focus-visible:ring-1 focus-visible:ring-atelier-gold"
            aria-label="Volver al inicio"
            title="Volver al inicio"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
