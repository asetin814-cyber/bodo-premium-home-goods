import React, { useEffect, useState } from 'react';
import { TranslationSet } from '../translations';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowDown, Sparkles, Flame } from 'lucide-react';
import { AnimatedH1, AnimatedParagraph, AnimatedButton, AnimatedLink } from './AnimatedTypography';

interface HeroProps {
  t: TranslationSet;
  onScrollToBuy: () => void;
}

export default function Hero({ t, onScrollToBuy }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse positions (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Steam particle animation state
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; scale: number; speed: number }>>([]);

  useEffect(() => {
    // Generate steam particles
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: 30 + Math.random() * 40, // Cluster in the center
      delay: Math.random() * 5,
      scale: 0.5 + Math.random() * 1.5,
      speed: 3 + Math.random() * 4
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative min-h-screen bg-brand-bg pt-28 pb-16 flex flex-col justify-between overflow-hidden px-6">
      {/* Background radial lighting */}
      <div 
        className="absolute inset-0 pointer-events-none transition-transform duration-500 ease-out"
        style={{
          background: 'radial-gradient(circle 800px at 50% 50%, rgba(255, 107, 0, 0.08), transparent 100%)',
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
        }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto relative z-10">
        
        {/* Typographical Content (6 columns) */}
        <div className="lg:col-span-6 flex flex-col gap-6 lg:gap-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 bg-brand-surface border border-brand-border py-2 px-4 rounded-full w-max shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            <span className="text-[10px] uppercase tracking-widest font-sans text-brand-text-secondary font-semibold">
              {t.hero.tagline}
            </span>
          </motion.div>

          <div className="flex flex-col gap-3">
            <AnimatedH1 
              text={t.hero.title}
              delay={0.15}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.05] text-brand-text-primary text-balance"
            />
            <AnimatedParagraph
              text={t.hero.subtitle}
              delay={0.95}
              className="text-base md:text-lg text-brand-text-secondary font-sans font-light leading-relaxed max-w-xl text-balance"
            />
          </div>

          {/* Premium Pricing Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-baseline gap-4"
          >
            <span className="text-5xl font-display font-light text-brand-text-primary tracking-tight">
              {t.hero.price}
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest font-sans text-brand-orange font-bold">
                {t.hero.steamHint}
              </span>
              <span className="text-xs text-brand-text-secondary line-through">
                39 990 ₸
              </span>
            </div>
          </motion.div>

          {/* Luxury CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-max">
            <AnimatedButton
              onClick={onScrollToBuy}
              delay={1.35}
              className="bg-brand-text-primary hover:bg-brand-orange text-brand-bg hover:text-brand-text-primary text-xs font-bold uppercase tracking-widest px-8 py-5 rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg active:scale-98 cursor-pointer h-[54px] min-w-[200px]"
              id="hero-buy-now-btn"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.hero.buyNow}</span>
            </AnimatedButton>
            <AnimatedLink
              href="https://wa.me/77781709236"
              target="_blank"
              rel="noopener noreferrer"
              delay={1.45}
              className="bg-brand-surface hover:bg-brand-surface-light border border-brand-border text-brand-text-primary hover:border-brand-text-primary text-xs font-bold uppercase tracking-widest px-8 py-5 rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-xs hover:shadow-md cursor-pointer h-[54px] min-w-[200px]"
              id="hero-whatsapp-btn"
            >
              <span className="w-2.5 h-2.5 bg-[#25D366] rounded-full animate-ping block flex-shrink-0" />
              <span>{t.hero.orderWhatsApp}</span>
            </AnimatedLink>
          </div>
        </div>

        {/* Apple-Level Composition Image Side (6 columns) */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[400px] md:min-h-[500px]">
          
          {/* Decorative circular gradient mesh behind the product */}
          <div className="absolute w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full bg-radial from-orange-950 to-transparent opacity-20 blur-3xl -z-10" />

          {/* Mouse Parallax Image Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: 1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              x: mousePosition.x * -15,
              y: mousePosition.y * -15,
            }}
            className="relative w-full max-w-lg aspect-[3/4] rounded-3xl overflow-hidden border border-brand-border shadow-2xl group bg-brand-surface"
          >
            {/* Main Premium Product Photo */}
            <img
              src="/input_file_1.png"
              alt="BODO 6-in-1 Steam Cleaner"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              referrerPolicy="no-referrer"
              id="hero-product-image"
            />

            {/* Simulated Hotspot glow on the steam gun nozzle in Hero */}
            <div className="absolute top-[32%] right-[19%] w-3.5 h-3.5 bg-[#FF6B00] rounded-full animate-pulse z-20 shadow-[0_0_15px_rgba(255,107,0,0.8)] cursor-pointer">
              <span className="absolute -inset-2.5 rounded-full border border-orange-400 animate-ping opacity-75" />
            </div>

            {/* Rising Steam Particle Animation (Rising up from the nozzle) */}
            <div className="absolute top-[18%] right-[14%] w-32 h-64 pointer-events-none overflow-hidden z-20">
              <AnimatePresence>
                {particles.map((particle) => (
                  <motion.div
                    key={particle.id}
                    initial={{ opacity: 0, y: 150, x: 0, scale: 0.2 }}
                    animate={{ 
                      opacity: [0, 0.4, 0.2, 0], 
                      y: 0, 
                      x: Math.sin(particle.id) * 30,
                      scale: particle.scale * 1.5 
                    }}
                    transition={{
                      duration: particle.speed,
                      repeat: Infinity,
                      delay: particle.delay,
                      ease: "easeOut"
                    }}
                    className="absolute bottom-0 w-8 h-8 rounded-full bg-white/40 blur-md"
                    style={{ left: `${particle.left}%` }}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Tech badge card floating */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-4 right-2 md:right-8 bg-brand-surface/90 backdrop-blur-md border border-brand-border p-4 rounded-2xl shadow-lg flex items-center gap-3 z-20"
          >
            <div className="w-10 h-10 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-text-secondary">
                2500 W / 4 BAR
              </p>
              <p className="text-xs font-bold text-brand-text-primary">
                {t.hero.steamHint}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="w-full flex justify-center items-center pt-8">
        <motion.div 
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-brand-text-secondary cursor-pointer"
          onClick={() => {
            document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[9px] uppercase tracking-widest font-sans font-medium">
            {t.hero.scrollDown}
          </span>
          <ArrowDown className="w-4 h-4 text-brand-orange" />
        </motion.div>
      </div>
    </section>
  );
}
