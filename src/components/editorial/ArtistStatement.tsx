'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const ArtistStatement: React.FC = () => {
  return (
    <section 
      id="atelier-statement"
      className="relative w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-12 bg-atelier-sand/30 border-t border-atelier-sand"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column: Editorial Photo of Atelier Craftsman Hands */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-atelier-sand-dark/40 shadow-luxe border border-atelier-sand-dark/60">
            <Image
              src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1000&q=85"
              alt="Atelier Éléganse — Precisión y cuidado artístico"
              fill
              sizes="(max-width: 768px) 100vw, 450px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[9px] font-mono tracking-widest uppercase text-atelier-gold-light block">
                ATELIER PHILOSOPHY
              </span>
              <p className="font-serif text-lg italic text-white/90">
                L’Éloge de la Précision
              </p>
            </div>
          </div>

          {/* Decorative subtle badge */}
          <div className="absolute -bottom-4 -right-4 hidden sm:block p-4 rounded-2xl bg-atelier-ivory border border-atelier-sand shadow-lg max-w-[180px] text-left">
            <span className="text-[9px] tracking-[0.25em] uppercase text-atelier-muted block">
              ESTÉTICA PURA
            </span>
            <span className="font-serif text-xs text-atelier-noir mt-0.5 block leading-tight">
              Sin moldes masivos. Cada trazo es irrepetible.
            </span>
          </div>
        </motion.div>

        {/* Right Column: Editorial Text Statement */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6 sm:space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-atelier-nude/60 text-atelier-graphite text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-medium">
            <Sparkles className="w-2.5 h-2.5 text-atelier-gold" />
            <span>Manifiesto Creativo</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-atelier-noir font-light leading-[1.1]">
            Belleza creada <br />
            <span className="italic font-normal">con intención.</span>
          </h2>

          <div className="space-y-4 text-atelier-muted text-sm sm:text-base font-light leading-relaxed max-w-xl">
            <p>
              Entendemos la manicura y la estética como una extensión del arte corporal y la armonía personal. No seguimos tendencias efímeras: buscamos la proporción áurea que respeta la salud biológica de la uña natural mientras eleva su belleza a un plano editorial.
            </p>
            <p>
              Cada detalle —desde la limpieza milimétrica del eponiquio con técnica de microfresas rusas hasta la suspensión del pan de oro o la mezcla cromática personalizada— es concebido como una pieza única e irrepetible.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-8 border-t border-atelier-sand text-atelier-graphite text-xs tracking-[0.2em] uppercase">
            <div>
              <span className="font-serif text-2xl text-atelier-noir block">100%</span>
              <span className="text-[9px] text-atelier-muted tracking-widest">Enfoque Artístico</span>
            </div>
            <div className="w-px h-8 bg-atelier-sand-dark" />
            <div>
              <span className="font-serif text-2xl text-atelier-noir block">Ruso</span>
              <span className="text-[9px] text-atelier-muted tracking-widest">Aparatos de Precisión</span>
            </div>
            <div className="w-px h-8 bg-atelier-sand-dark" />
            <div>
              <span className="font-serif text-2xl text-atelier-noir block">Pureza</span>
              <span className="text-[9px] text-atelier-muted tracking-widest">Cuidado No Invasivo</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
