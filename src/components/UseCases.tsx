import React from 'react';
import { TranslationSet } from '../translations';
import { Sparkles, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedH2, AnimatedParagraph } from './AnimatedTypography';

interface UseCasesProps {
  t: TranslationSet;
}

export default function UseCases({ t }: UseCasesProps) {
  const useCasesList = [
    {
      title: t.useCases.tileGrout.title,
      desc: t.useCases.tileGrout.desc,
      id: 'grout'
    },
    {
      title: t.useCases.kitchenGrease.title,
      desc: t.useCases.kitchenGrease.desc,
      id: 'kitchen'
    },
    {
      title: t.useCases.furniture.title,
      desc: t.useCases.furniture.desc,
      id: 'furniture'
    },
    {
      title: t.useCases.windows.title,
      desc: t.useCases.windows.desc,
      id: 'windows'
    },
    {
      title: t.useCases.bathroom.title,
      desc: t.useCases.bathroom.desc,
      id: 'bathroom'
    },
    {
      title: t.useCases.garments.title,
      desc: t.useCases.garments.desc,
      id: 'garments'
    }
  ];

  return (
    <section id="use-cases" className="py-36 md:py-44 bg-brand-bg border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Title Block */}
        <div className="max-w-3xl text-left mb-16">
          <span className="text-xs uppercase font-sans tracking-widest text-brand-orange font-bold block mb-3">
            Сферы применения
          </span>
          <AnimatedH2
            text={t.useCases.title}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-brand-text-primary leading-tight text-balance"
          />
          <AnimatedParagraph
            text={t.useCases.subtitle}
            className="text-sm md:text-base text-brand-text-secondary font-sans font-light mt-4"
          />
        </div>

        {/* Dynamic 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {useCasesList.map((uc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-brand-surface border border-brand-border rounded-3xl p-8 flex flex-col justify-between min-h-[220px] shadow-2xs hover:shadow-md transition-all duration-300 relative group"
            >
              {/* Highlight bar */}
              <div className="absolute top-0 left-8 right-8 h-1 bg-brand-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-b-full" />

              <div className="flex justify-between items-start mb-6">
                <span className="text-xs font-sans font-bold text-brand-orange">
                  0{idx + 1}
                </span>
                <div className="w-6 h-6 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>

              <div className="text-left">
                <AnimatedH2
                  text={uc.title}
                  className="text-lg font-display font-bold text-brand-text-primary tracking-tight mb-2 block"
                />
                <AnimatedParagraph
                  text={uc.desc}
                  className="text-xs md:text-sm text-brand-text-secondary leading-relaxed font-light"
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
