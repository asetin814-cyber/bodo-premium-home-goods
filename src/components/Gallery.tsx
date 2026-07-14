import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, ZoomIn, Eye, Sparkles } from 'lucide-react';
import { AnimatedH2, AnimatedParagraph } from './AnimatedTypography';

// Real approved product photos
const GALLERY_IMAGES = [
  {
    src: '/input_file_1.png',
    alt: 'Очистка паром душевой кабины и стеклянных поверхностей в ванной',
    title: 'Идеальная чистота в ванной',
    desc: 'Давление 4 Bar и температура 105°C растворяют известковый налет и дезинфицируют швы без химии.',
  },
  {
    src: '/input_file_2.png',
    alt: 'Очистка кухонной столешницы пароочистителем BODO 6-в-1',
    title: 'Стерильность кухонных зон',
    desc: 'Легкое расщепление застывшего жира и грязи на столешницах, плитах и фартуках.',
  },
  {
    src: '/input_file_3.png',
    alt: 'Эстетичный пароочиститель BODO в гостиной рядом с играющими детьми',
    title: 'Безопасность для вашей семьи',
    desc: 'Очищает ковры и поверхности, уничтожая 99.9% бактерий. Полная безопасность для детей и питомцев.',
  },
];

interface GalleryProps {
  t: {
    nav: { reviews: string };
  };
}

export default function Gallery({ t }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle keyboard navigation for fullscreen modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      if (e.key === 'Escape') setIsFullscreen(false);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    setZoomLevel(1);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    setZoomLevel(1);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFullscreen) return; // Zoom effect only on standard view hover
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section id="gallery" className="py-36 md:py-44 bg-brand-bg/50 border-b border-brand-border relative overflow-hidden">
      {/* Decorative gradient spot */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="max-w-3xl text-left mb-16">
          <span className="text-xs uppercase font-sans tracking-widest text-brand-orange font-bold block mb-3">
            Эстетика в деталях
          </span>
          <AnimatedH2
            text="Галерея BODO в реальных интерьерах"
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-brand-text-primary leading-tight text-balance"
          />
          <AnimatedParagraph
            text="Взгляните, как премиальный дизайн и функциональность пароочистителя BODO гармонично дополняют современное жилое пространство, принося кристальную чистоту в каждый уголок дома."
            className="text-sm md:text-base text-brand-text-secondary font-sans font-light mt-4"
          />
        </div>

        {/* Apple-Style Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Showcase Stage (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Main Stage Image Frame */}
            <div 
              className="relative aspect-[4/3] md:aspect-[16/10] w-full bg-brand-surface rounded-3xl overflow-hidden border border-brand-border shadow-md group cursor-zoom-in select-none"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setZoomLevel(1.15)}
              onMouseLeave={() => setZoomLevel(1)}
              onClick={() => setIsFullscreen(true)}
              id="gallery-main-stage"
            >
              {/* Eye Button Overlay */}
              <div className="absolute top-6 left-6 z-20 bg-brand-bg/70 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-sans uppercase tracking-widest font-semibold flex items-center gap-2 border border-brand-border pointer-events-none text-brand-text-primary">
                <Eye className="w-3 h-3 text-brand-orange" />
                <span>Нажмите для просмотра</span>
              </div>

              {/* Maximize Button Overlay */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullscreen(true);
                }}
                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-brand-bg/70 backdrop-blur-md border border-brand-border flex items-center justify-center text-brand-text-primary hover:text-brand-orange hover:bg-brand-bg hover:scale-105 transition-all duration-300 shadow-md cursor-pointer"
                title="Fullscreen mode"
                id="gallery-fullscreen-btn"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Images Animation Container */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <motion.img
                    src={GALLERY_IMAGES[activeIndex].src}
                    alt={GALLERY_IMAGES[activeIndex].alt}
                    loading="lazy"
                    style={{
                      transform: `scale(${zoomLevel})`,
                      transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                    }}
                    className="w-full h-full object-cover transition-transform duration-200 ease-out"
                    referrerPolicy="no-referrer"
                    id={`gallery-stage-img-${activeIndex}`}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Left/Right Fast Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-brand-bg/60 backdrop-blur-md border border-brand-border/60 flex items-center justify-center text-brand-text-primary hover:text-brand-orange hover:bg-brand-bg transition-all duration-200 z-20 cursor-pointer shadow-md"
                id="gallery-prev-arrow"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-brand-bg/60 backdrop-blur-md border border-brand-border/60 flex items-center justify-center text-brand-text-primary hover:text-brand-orange hover:bg-brand-bg transition-all duration-200 z-20 cursor-pointer shadow-md"
                id="gallery-next-arrow"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {GALLERY_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeIndex === idx ? 'w-6 bg-brand-orange' : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                    id={`gallery-dot-${idx}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Navigation Row */}
            <div className="grid grid-cols-3 gap-4" id="gallery-thumbnail-row">
              {GALLERY_IMAGES.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative aspect-[4/3] rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? 'border-brand-orange shadow-md scale-[1.02]'
                      : 'border-brand-border opacity-60 hover:opacity-100 hover:scale-[1.01]'
                  }`}
                  id={`gallery-thumb-${idx}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {activeIndex === idx && (
                    <div className="absolute inset-0 bg-brand-orange/5 border border-brand-orange rounded-2xl pointer-events-none" />
                  )}
                </button>
              ))}
            </div>

          </div>

          {/* Description Block (5 Columns) */}
          <div className="lg:col-span-5 text-left h-full flex flex-col justify-between gap-8 lg:sticky lg:top-28">
            <div className="bg-brand-surface border border-brand-border rounded-3xl p-8 flex flex-col gap-6 shadow-xs relative overflow-hidden">
              <div className="absolute -right-16 -top-16 w-36 h-36 bg-brand-orange/5 rounded-full blur-xl" />

              <div className="flex items-center gap-2 text-brand-orange">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] font-sans uppercase tracking-widest font-bold">
                  {GALLERY_IMAGES[activeIndex].title}
                </span>
              </div>

              <h3 className="text-2xl font-display font-bold text-brand-text-primary tracking-tight">
                {GALLERY_IMAGES[activeIndex].title}
              </h3>

              <p className="text-sm text-brand-text-secondary leading-relaxed font-sans font-light">
                {GALLERY_IMAGES[activeIndex].desc}
              </p>

              <div className="mt-4 pt-6 border-t border-brand-border flex items-center gap-4">
                <div className="w-2.5 h-2.5 bg-brand-orange rounded-full animate-pulse" />
                <span className="text-xs font-sans text-brand-text-secondary uppercase tracking-wider">
                  Реальный снимок в интерьере
                </span>
              </div>
            </div>

            {/* Apple-style warranty / certified info note */}
            <div className="border border-brand-border bg-brand-surface/30 rounded-2xl p-5 flex items-center gap-4">
              <span className="text-3xl text-brand-orange font-display">6-in-1</span>
              <p className="text-xs text-brand-text-secondary leading-relaxed font-light">
                Многофункциональные насадки в комплекте BODO позволяют навести безупречный порядок на кухне, в гостиной и ванной комнате с использованием только чистого водяного пара.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-brand-bg/98 backdrop-blur-xl z-[100] flex flex-col justify-between p-6"
            onClick={() => setIsFullscreen(false)}
            id="gallery-lightbox"
          >
            {/* Top Bar inside modal */}
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto z-10">
              <span className="text-[10px] font-sans tracking-widest uppercase text-brand-text-secondary">
                BODO Premium Photo View • {activeIndex + 1} / {GALLERY_IMAGES.length}
              </span>
              <button
                onClick={() => setIsFullscreen(false)}
                className="w-12 h-12 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-brand-text-primary hover:text-brand-orange hover:scale-105 transition-all duration-300 cursor-pointer shadow-md"
                title="Close fullscreen"
                id="gallery-close-lightbox-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Central Stage */}
            <div className="relative flex-1 w-full max-w-7xl mx-auto flex items-center justify-center py-6" onClick={(e) => e.stopPropagation()}>
              {/* Left Button */}
              <button
                onClick={handlePrev}
                className="absolute left-0 md:left-6 w-14 h-14 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-brand-text-primary hover:text-brand-orange transition-all duration-200 z-20 cursor-pointer shadow-xl hover:scale-105"
                id="gallery-lightbox-prev"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Animating Fullscreen Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full max-h-[70vh] flex items-center justify-center"
                >
                  <img
                    src={GALLERY_IMAGES[activeIndex].src}
                    alt={GALLERY_IMAGES[activeIndex].alt}
                    className="max-w-full max-h-full object-contain rounded-2xl border border-brand-border/40 shadow-2xl select-none"
                    referrerPolicy="no-referrer"
                    id={`gallery-lightbox-img-${activeIndex}`}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Right Button */}
              <button
                onClick={handleNext}
                className="absolute right-0 md:right-6 w-14 h-14 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-brand-text-primary hover:text-brand-orange transition-all duration-200 z-20 cursor-pointer shadow-xl hover:scale-105"
                id="gallery-lightbox-next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Bar inside modal with Info caption */}
            <div className="w-full max-w-4xl mx-auto text-center z-10 pb-4" onClick={(e) => e.stopPropagation()}>
              <h4 className="text-lg font-display font-bold text-brand-text-primary tracking-tight">
                {GALLERY_IMAGES[activeIndex].title}
              </h4>
              <p className="text-xs text-brand-text-secondary max-w-xl mx-auto mt-2 leading-relaxed font-light">
                {GALLERY_IMAGES[activeIndex].desc}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
