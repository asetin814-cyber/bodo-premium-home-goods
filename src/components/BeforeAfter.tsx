import React, { useState, useRef } from 'react';
import { TranslationSet } from '../translations';
import { motion } from 'motion/react';
import { Sparkles, ArrowLeftRight, Compass } from 'lucide-react';
import { AnimatedH2, AnimatedParagraph } from './AnimatedTypography';

interface BeforeAfterProps {
  t: TranslationSet;
}

type TabType = 'tiles' | 'stove' | 'sofa';

export default function BeforeAfter({ t }: BeforeAfterProps) {
  const [activeTab, setActiveTab] = useState<TabType>('tiles');
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage (0 to 100)
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 || isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  // Custom premium SVG assets representing different surfaces (Dirty vs Clean)
  const renderTiles = (isClean: boolean) => {
    const strokeColor = isClean ? '#E1E1DE' : '#8B5A2B'; // Bright clean vs dark dirty grout
    const tileBg = isClean ? '#FAFAF9' : '#EDEAE3';
    
    return (
      <div 
        className="absolute inset-0 w-full h-full transition-colors duration-500"
        style={{ backgroundColor: tileBg }}
      >
        {/* SVG Tile Pattern */}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke={strokeColor} strokeWidth={isClean ? "3" : "4.5"} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Dirty grease spots when NOT clean */}
          {!isClean && (
            <>
              <circle cx="120" cy="80" r="30" fill="#B38B6D" opacity="0.45" filter="blur(10px)" />
              <circle cx="280" cy="180" r="45" fill="#9C6E4E" opacity="0.5" filter="blur(12px)" />
              <circle cx="80" cy="240" r="25" fill="#8C5C38" opacity="0.35" filter="blur(8px)" />
              <circle cx="220" cy="90" r="35" fill="#A87C5F" opacity="0.4" filter="blur(15px)" />
              <rect x="0" y="118" width="100%" height="4" fill="#6B4423" opacity="0.6" filter="blur(2px)" />
              <rect x="178" y="0" width="4" height="100%" fill="#6B4423" opacity="0.6" filter="blur(2px)" />
            </>
          )}

          {/* Clean sparkles when CLEAN */}
          {isClean && (
            <g fill="#FF6B00" opacity="0.8">
              <path d="M 100 60 L 103 67 L 110 70 L 103 73 L 100 80 L 97 73 L 90 70 L 97 67 Z" className="animate-pulse" />
              <path d="M 240 140 L 242 145 L 247 147 L 242 149 L 240 154 L 238 149 L 233 147 L 238 145 Z" className="animate-pulse" />
            </g>
          )}
        </svg>
      </div>
    );
  };

  const renderStove = (isClean: boolean) => {
    const stoveBg = isClean ? '#E1E5EB' : '#C2C8D1';
    
    return (
      <div 
        className="absolute inset-0 w-full h-full flex items-center justify-center transition-colors duration-500"
        style={{ backgroundColor: stoveBg }}
      >
        <div className="relative w-72 h-72 rounded-full border-12 border-gray-400/30 flex items-center justify-center">
          {/* Burner elements */}
          <div className="w-48 h-48 rounded-full bg-gray-700/80 border-4 border-gray-500 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-black border-2 border-gray-600" />
          </div>

          {/* Dirty grease stains */}
          {!isClean && (
            <>
              {/* Oily grease spots */}
              <circle cx="80" cy="90" r="40" fill="#3D290F" opacity="0.75" filter="blur(15px)" />
              <circle cx="200" cy="190" r="50" fill="#5E3E1A" opacity="0.7" filter="blur(20px)" />
              <circle cx="220" cy="80" r="30" fill="#2E1C0A" opacity="0.8" filter="blur(10px)" />
              <path d="M 60,180 Q 120,240 240,160" fill="none" stroke="#261706" strokeWidth="24" opacity="0.6" filter="blur(12px)" />
            </>
          )}

          {/* Clean glares */}
          {isClean && (
            <g fill="#FFFFFF" opacity="0.9" className="absolute">
              <path d="M 220 50 L 225 60 L 235 65 L 225 70 L 220 80 L 215 70 L 205 65 L 215 60 Z" className="animate-pulse" />
              <circle cx="100" cy="180" r="4" className="animate-ping" fill="#FF6B00" />
            </g>
          )}
        </div>
      </div>
    );
  };

  const renderSofa = (isClean: boolean) => {
    const fabricBg = isClean ? '#E6DCCF' : '#B8A894';
    
    return (
      <div 
        className="absolute inset-0 w-full h-full transition-colors duration-500"
        style={{ backgroundColor: fabricBg }}
      >
        {/* Herringbone pattern for fabric */}
        <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="fabric" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M0 0 L10 10 L20 0 M0 20 L10 10 L20 20" fill="none" stroke="#6E5D4B" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#fabric)" />
        </svg>

        {/* Dirt, tea/coffee stain on sofa */}
        {!isClean && (
          <>
            {/* Spilled coffee stain */}
            <path d="M 100,100 Q 140,70 200,110 T 260,180 T 150,220 Z" fill="#4B3525" opacity="0.6" filter="blur(15px)" />
            <circle cx="150" cy="160" r="35" fill="#3D2B1E" opacity="0.5" filter="blur(10px)" />
            {/* General dust layer */}
            <div className="absolute inset-0 bg-[#3D2B1E]/15 pointer-events-none filter blur-[1px]" />
          </>
        )}

        {/* Clean freshness sparkle */}
        {isClean && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Sparkles className="w-12 h-12 text-[#FF6B00] opacity-80 animate-bounce" />
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="before-after" className="py-36 md:py-44 bg-brand-bg border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 md:mb-16">
          <div className="lg:col-span-7 text-left">
            <span className="text-xs uppercase font-sans tracking-widest text-brand-orange font-bold block mb-3">
              Интерактивный тест
            </span>
            <AnimatedH2
              text={t.beforeAfter.title}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-brand-text-primary leading-tight text-balance"
            />
          </div>
          <div className="lg:col-span-5 text-left">
            <AnimatedParagraph
              text={t.beforeAfter.subtitle}
              className="text-xs md:text-sm text-brand-text-secondary font-sans leading-relaxed"
            />
          </div>
        </div>

        {/* Minimalist Switcher Tabs */}
        <div className="flex flex-wrap gap-3 justify-start mb-8 border-b border-brand-border pb-6">
          {(['tiles', 'stove', 'sofa'] as TabType[]).map((tab) => {
            let label = '';
            if (tab === 'tiles') label = t.beforeAfter.tiles;
            if (tab === 'stove') label = t.beforeAfter.stove;
            if (tab === 'sofa') label = t.beforeAfter.sofa;
            
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSliderPosition(50);
                }}
                className={`px-6 py-3 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === tab
                    ? 'bg-brand-text-primary text-brand-bg shadow-md'
                    : 'bg-brand-surface text-brand-text-secondary hover:bg-brand-surface-light hover:text-brand-text-primary'
                }`}
                id={`before-after-tab-${tab}`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Interactive Slider Frame */}
        <div className="max-w-4xl mx-auto">
          
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseDown={() => { isDragging.current = true; }}
            onMouseUp={() => { isDragging.current = false; }}
            onMouseLeave={() => { isDragging.current = false; }}
            className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-brand-border cursor-ew-resize select-none"
            id="before-after-slider-container"
          >
            {/* 1. Behind Layer: CLEAN (AFTER) */}
            {activeTab === 'tiles' && renderTiles(true)}
            {activeTab === 'stove' && renderStove(true)}
            {activeTab === 'sofa' && renderSofa(true)}

            {/* After watermark (Bottom right) */}
            <div className="absolute bottom-4 right-4 bg-brand-surface/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-bold text-brand-orange tracking-widest z-20">
              {t.beforeAfter.labelAfter}
            </div>

            {/* 2. Front Layer: DIRTY (BEFORE) - Clipped by width percentage */}
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10 border-r border-white/10"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="absolute inset-0 w-[896px] h-full" style={{ width: containerRef.current?.getBoundingClientRect().width }}>
                {activeTab === 'tiles' && renderTiles(false)}
                {activeTab === 'stove' && renderStove(false)}
                {activeTab === 'sofa' && renderSofa(false)}
              </div>

              {/* Before watermark (Bottom left) */}
              <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-bold text-white tracking-widest">
                {t.beforeAfter.labelBefore}
              </div>
            </div>

            {/* 3. Slider Handler Line */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white z-20 cursor-ew-resize pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.5)]"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Central sliding badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-surface border-2 border-brand-text-primary flex items-center justify-center shadow-xl text-brand-text-primary">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>

          </div>

          {/* Swipe Instruction */}
          <div className="flex justify-center items-center gap-2 text-brand-text-secondary text-xs font-sans tracking-widest uppercase mt-4">
            <Compass className="w-4 h-4 text-brand-orange" />
            <span>{t.beforeAfter.slideInstruction}</span>
          </div>

        </div>

      </div>
    </section>
  );
}
