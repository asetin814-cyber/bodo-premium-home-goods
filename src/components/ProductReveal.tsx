import React, { useState } from 'react';
import { TranslationSet } from '../translations';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Info, Sparkles, Sliders, Settings } from 'lucide-react';
import { AnimatedH2, AnimatedParagraph } from './AnimatedTypography';

interface ProductRevealProps {
  t: TranslationSet;
}

export default function ProductReveal({ t }: ProductRevealProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>('heatingElement');

  // Hotspots definitions with normalized percentages relative to input_file_0.png
  const hotspots = [
    {
      id: 'steamTrigger',
      x: '62%',
      y: '24%',
      label: t.reveal.hotspots.steamTrigger.title,
      desc: t.reveal.hotspots.steamTrigger.desc,
      side: 'left'
    },
    {
      id: 'nozzleConnector',
      x: '74%',
      y: '25%',
      label: t.reveal.hotspots.nozzleConnector.title,
      desc: t.reveal.hotspots.nozzleConnector.desc,
      side: 'left'
    },
    {
      id: 'waterTank',
      x: '68%',
      y: '65%',
      label: t.reveal.hotspots.waterTank.title,
      desc: t.reveal.hotspots.waterTank.desc,
      side: 'right'
    },
    {
      id: 'heatingElement',
      x: '80%',
      y: '53%',
      label: t.reveal.hotspots.heatingElement.title,
      desc: t.reveal.hotspots.heatingElement.desc,
      side: 'right'
    },
    {
      id: 'pressureValve',
      x: '76%',
      y: '40%',
      label: t.reveal.hotspots.pressureValve.title,
      desc: t.reveal.hotspots.pressureValve.desc,
      side: 'left'
    },
    {
      id: 'safetyLock',
      x: '84%',
      y: '45%',
      label: t.reveal.hotspots.safetyLock.title,
      desc: t.reveal.hotspots.safetyLock.desc,
      side: 'right'
    }
  ];

  return (
    <section id="anatomy" className="py-36 md:py-44 bg-brand-bg relative overflow-hidden border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Heading Block */}
        <div className="max-w-3xl text-left mb-16">
          <span className="text-xs uppercase font-sans tracking-widest text-brand-orange font-bold block mb-3">
            {t.reveal.title}
          </span>
          <AnimatedH2
            text={t.reveal.subtitle}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-brand-text-primary leading-tight text-balance"
          />
          <AnimatedParagraph
            text={t.reveal.exploreDetails}
            className="text-sm md:text-base text-brand-text-secondary font-sans font-light mt-4"
          />
        </div>

        {/* Hotspots Showcase Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: List of component items / Interactive selector (5 columns) */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-4 text-left">
            <div className="bg-brand-surface border border-brand-border p-4 rounded-2xl mb-2 flex items-center gap-3">
              <Settings className="w-5 h-5 text-brand-orange animate-spin-slow" />
              <div>
                <p className="text-xs font-sans font-bold text-brand-text-primary uppercase tracking-wider">
                  Инженерная точность BODO
                </p>
                <p className="text-[10px] text-brand-text-secondary">
                  Каждый узел спроектирован для достижения максимального КПД
                </p>
              </div>
            </div>

            {hotspots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setActiveHotspot(spot.id)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 cursor-pointer ${
                  activeHotspot === spot.id
                    ? 'bg-brand-surface-light border-brand-orange shadow-md scale-[1.02]'
                    : 'bg-brand-surface border-brand-border hover:border-brand-text-secondary hover:bg-brand-surface-light'
                }`}
                id={`hotspot-btn-${spot.id}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-sans text-xs font-bold transition-colors duration-300 ${
                  activeHotspot === spot.id ? 'bg-brand-orange text-white' : 'bg-brand-surface-light border border-brand-border text-brand-text-secondary'
                }`}>
                  <Info className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-display font-bold text-brand-text-primary tracking-tight">
                    {spot.label}
                  </h4>
                  <AnimatePresence mode="wait">
                    {activeHotspot === spot.id && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-xs text-brand-text-secondary mt-1.5 leading-relaxed font-light"
                      >
                        {spot.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Visual Stage with hotspots (7 columns) */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative flex items-center justify-center bg-brand-surface border border-brand-border rounded-3xl p-6 md:p-12 aspect-square max-w-2xl mx-auto w-full">
            
            {/* Visual stage ring background */}
            <div className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-brand-border pointer-events-none animate-spin-slow" />

            {/* Main Product Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src="/input_file_2.png"
                alt="Product Anatomy"
                className="w-full h-full object-cover rounded-2xl drop-shadow-2xl z-10"
                referrerPolicy="no-referrer"
                id="reveal-anatomy-image"
              />

              {/* Pulsing Hotspot Markers */}
              {hotspots.map((spot) => {
                const isActive = activeHotspot === spot.id;
                return (
                  <button
                    key={spot.id}
                    onClick={() => setActiveHotspot(spot.id)}
                    className="absolute w-6 h-6 md:w-8 md:h-8 flex items-center justify-center z-20 cursor-pointer focus:outline-none"
                    style={{
                      left: spot.x,
                      top: spot.y,
                      transform: 'translate(-50%, -50%)',
                    }}
                    id={`hotspot-marker-${spot.id}`}
                  >
                    {/* Ring Pulse */}
                    <span className={`absolute inset-0 rounded-full animate-ping opacity-60 ${
                      isActive ? 'bg-brand-orange' : 'bg-brand-text-primary'
                    }`} />
                    
                    {/* Inner core */}
                    <span className={`absolute w-3 h-3 md:w-4.5 md:h-4.5 rounded-full flex items-center justify-center text-[8px] md:text-[10px] font-bold shadow-md transition-all duration-300 ${
                      isActive ? 'bg-brand-orange text-white scale-125' : 'bg-brand-text-primary text-brand-bg hover:scale-110'
                    }`}>
                      <Plus className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  </button>
                );
              })}

              {/* Floating Hotspot Tooltip overlay for Mobile/Quick view */}
              <AnimatePresence>
                {activeHotspot && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-4 left-4 right-4 bg-brand-surface-light/95 text-brand-text-primary p-4 rounded-2xl shadow-xl border border-brand-border text-left z-30 block lg:hidden backdrop-blur-md"
                  >
                    <div className="flex items-center gap-2 mb-1 text-brand-orange">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="text-[10px] uppercase font-sans tracking-wider font-semibold">
                        Деталь прибора BODO
                      </span>
                    </div>
                    <h4 className="text-sm font-display font-bold">
                      {hotspots.find(h => h.id === activeHotspot)?.label}
                    </h4>
                    <p className="text-xs text-brand-text-secondary font-light leading-relaxed mt-1">
                      {hotspots.find(h => h.id === activeHotspot)?.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
