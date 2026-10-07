'use client';

import { useEffect } from 'react';

interface KeyNavigationProps {
  onNext?: () => void;
  onPrev?: () => void;
  onClose?: () => void;
  onToggleZoom?: () => void;
  isActive?: boolean;
}

export function useKeyNavigation({
  onNext,
  onPrev,
  onClose,
  onToggleZoom,
  isActive = true,
}: KeyNavigationProps) {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input or editable field
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          onNext?.();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onPrev?.();
          break;
        case 'Escape':
          e.preventDefault();
          onClose?.();
          break;
        case 'z':
        case 'Z':
          e.preventDefault();
          onToggleZoom?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, onNext, onPrev, onClose, onToggleZoom]);
}
