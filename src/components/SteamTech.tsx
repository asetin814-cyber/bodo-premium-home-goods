import React from 'react';
import { TranslationSet } from '../translations';
import { Flame, Wind, Droplet, Leaf, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedH2, AnimatedParagraph } from './AnimatedTypography';

interface SteamTechProps {
  t: TranslationSet;
}

export default function SteamTech({ t }: SteamTechProps) {
  const techCards = [
    {
      metric: '2500 Вт',
      title: t.tech.wattsTitle,
      desc: t.tech.wattsDesc,
      icon: <Flame className="w-6 h-6 text-brand-orange" />,
      style: "lg:col-span-6 bg-brand-surface text-brand-text-primary border-brand-border"
    },
    {
      metric: '105°C',
      title: t.tech.tempTitle,
      desc: t.tech.tempDesc,
      icon: <Droplet className="w-6 h-6 text-white" />,
      style: "lg:col-span-6 bg-brand-orange text-white border-none shadow-xl"
    },
    {
      metric: '4.0 Bar',
      title: t.tech.barTitle,
      desc: t.tech.barDesc,
      icon: <Wind className="w-6 h-6 text-brand-orange" />,
      style: "lg:col-span-6 bg-brand-surface text-brand-text-primary border-brand-border"
    },
    {
      metric: '100% Eco',
      title: t.tech.ecoTitle,
      desc: t.tech.ecoDesc,
      icon: <Leaf className="w-6 h-6 text-brand-orange" />,
      style: "lg:col-span-6 bg-brand-surface text-brand-text-primary border-brand-border"
    }
  ];

  return (
    <section id="tech" className="py-36 md:py-44 bg-brand-bg relative overflow-hidden border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Title Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 lg:mb-20">
          <div className="lg:col-span-7 text-left">
            <span className="text-xs uppercase font-sans tracking-widest text-brand-orange font-bold block mb-3">
              {t.nav.tech}
            </span>
            <AnimatedH2
              text={t.tech.title}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-brand-text-primary leading-tight text-balance"
            />
          </div>
          <div className="lg:col-span-5 text-left">
            <AnimatedParagraph
              text={t.tech.subtitle}
              className="text-xs md:text-sm text-brand-text-secondary font-sans leading-relaxed"
            />
          </div>
        </div>

        {/* Apple-Style Technical Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {techCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`border p-8 md:p-10 rounded-3xl flex flex-col justify-between min-h-[280px] text-left transition-all duration-300 shadow-2xs hover:shadow-md ${card.style} group`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.style.includes('text-white') ? 'bg-white/10 text-white' : 'bg-brand-bg text-brand-orange border border-brand-border'}`}>
                  {card.icon}
                </div>
                <span className={`font-sans text-xs uppercase tracking-widest ${card.style.includes('text-white') ? 'text-white/40' : 'text-brand-text-secondary/40'}`}>
                  0{idx + 1}
                </span>
              </div>

              <div>
                <AnimatedH2
                  text={card.metric}
                  className={`text-4xl md:text-5xl font-display font-light tracking-tight block mb-3 ${card.style.includes('text-white') ? 'text-white' : 'text-brand-text-primary'}`}
                />
                <AnimatedH2
                  text={card.title}
                  className={`text-lg font-display font-bold tracking-tight mb-2 block ${card.style.includes('text-white') ? 'text-white' : 'text-brand-text-primary'}`}
                />
                <AnimatedParagraph
                  text={card.desc}
                  className={`text-xs md:text-sm leading-relaxed font-light ${card.style.includes('text-white') ? 'text-white/60' : 'text-brand-text-secondary'}`}
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
