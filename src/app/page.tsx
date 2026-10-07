'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '@/data/projects';
import { COLLECTIONS } from '@/data/collections';
import { CATEGORIES } from '@/data/categories';
import { CategoryId, CollectionId, Project } from '@/types';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomBar } from '@/components/layout/MobileBottomBar';
import { CoverHero } from '@/components/hero/CoverHero';
import { CategoryFilter } from '@/components/gallery/CategoryFilter';
import { EditorialGrid } from '@/components/gallery/EditorialGrid';
import { CollectionsDrawer } from '@/components/gallery/CollectionsDrawer';
import { ImageViewerModal } from '@/components/viewer/ImageViewerModal';
import { PresentationMode } from '@/components/ui/PresentationMode';
import { ArtistStatement } from '@/components/editorial/ArtistStatement';
import { Sparkles, Layers, SlidersHorizontal, X } from 'lucide-react';

export default function Home() {
  // Navigation & Filter states
  const [activeCategory, setActiveCategory] = useState<CategoryId>('todos');
  const [activeCollection, setActiveCollection] = useState<CollectionId | null>(null);
  
  // Interactive Modal & Presentation states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isCollectionsDrawerOpen, setIsCollectionsDrawerOpen] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);

  // Filtered dataset
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((item) => {
      const matchCategory =
        activeCategory === 'todos' || item.category === activeCategory;
      const matchCollection =
        activeCollection === null || item.collection === activeCollection;
      return matchCategory && matchCollection;
    });
  }, [activeCategory, activeCollection]);

  // Count map for category pills
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      todos: PROJECTS.length,
    };
    PROJECTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Handlers
  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setIsViewerOpen(true);
  };

  const handleCloseProject = () => {
    setIsViewerOpen(false);
  };

  const handleScrollToGallery = () => {
    const el = document.getElementById('gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCollection = (colId: CollectionId) => {
    setActiveCollection(colId);
    handleScrollToGallery();
  };

  const handleClearCollection = () => {
    setActiveCollection(null);
  };

  const currentCollectionObj = activeCollection
    ? COLLECTIONS.find((c) => c.id === activeCollection)
    : null;

  return (
    <div className="relative min-h-screen bg-atelier-ivory text-atelier-noir selection:bg-atelier-nude selection:text-atelier-noir">
      {/* Top Floating Luxury Navbar */}
      <Navbar
        totalCount={PROJECTS.length}
        onOpenCollections={() => setIsCollectionsDrawerOpen(true)}
        onStartSlideshow={() => setIsPresentationOpen(true)}
      />

      {/* Editorial Magazine Cover (Hero) */}
      <CoverHero
        heroProject={PROJECTS[0]}
        onExploreClick={handleScrollToGallery}
        onOpenHeroModal={handleOpenProject}
      />

      {/* Main Visual Gallery Section */}
      <section
        id="gallery"
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-24 pb-20 sm:pb-32"
      >
        {/* Gallery Section Header & Identity */}
        <div className="mb-10 sm:mb-14 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-atelier-sand pb-6">
            <div>
              <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-atelier-gold font-medium mb-1">
                <Sparkles className="w-3 h-3 text-atelier-gold" />
                <span>Archivo de Obras</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-atelier-noir font-normal">
                Galería de Creaciones
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {/* Active Collection Filter Badge if applicable */}
              {currentCollectionObj && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-atelier-noir text-white text-[10px] tracking-widest uppercase">
                  <span>Serie: {currentCollectionObj.title}</span>
                  <button
                    onClick={handleClearCollection}
                    className="text-white/60 hover:text-white ml-1"
                    title="Remover filtro de serie"
                    aria-label="Remover filtro de serie"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              <span className="font-mono text-xs sm:text-sm text-atelier-muted tracking-widest">
                {filteredProjects.length < 10
                  ? `0${filteredProjects.length}`
                  : filteredProjects.length}{' '}
                / {PROJECTS.length}
              </span>
            </div>
          </div>

          {/* Interactive Category Filter Bar */}
          <div className="pt-2">
            <CategoryFilter
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              counts={categoryCounts}
            />
          </div>
        </div>

        {/* The Dynamic Asymmetric Editorial Grid */}
        <EditorialGrid
          projects={filteredProjects}
          onSelectProject={handleOpenProject}
        />
      </section>

      {/* Editorial Artist Statement & Philosophy */}
      <ArtistStatement />

      {/* Minimalist Footer */}
      <Footer />

      {/* Mobile Ergonomic Bottom Bar */}
      <MobileBottomBar
        onScrollToGallery={handleScrollToGallery}
        onOpenCollections={() => setIsCollectionsDrawerOpen(true)}
        onStartSlideshow={() => setIsPresentationOpen(true)}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* Shared-Element Cinematic Photo Viewer */}
      <ImageViewerModal
        project={selectedProject}
        allProjects={filteredProjects}
        isOpen={isViewerOpen}
        onClose={handleCloseProject}
        onSelectProject={setSelectedProject}
      />

      {/* Visual Collections Drawer Modal */}
      <CollectionsDrawer
        isOpen={isCollectionsDrawerOpen}
        onClose={() => setIsCollectionsDrawerOpen(false)}
        onSelectCollection={handleSelectCollection}
        activeCollectionId={activeCollection}
      />

      {/* Fullscreen Continuous Presentation Mode */}
      <PresentationMode
        projects={filteredProjects.length > 0 ? filteredProjects : PROJECTS}
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
      />
    </div>
  );
}
