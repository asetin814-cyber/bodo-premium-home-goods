import React from 'react';
import { TranslationSet } from '../translations';
import { AlertCircle, Trash2, ShieldAlert, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedH2, AnimatedParagraph, AnimatedButton } from './AnimatedTypography';

interface ProblemsProps {
  t: TranslationSet;
  onScrollToBuy: () => void;
}

export default function Problems({ t, onScrollToBuy }: ProblemsProps) {
  const problemsList = [
    {
      title: t.problems.dirtyGroutTitle,
      desc: t.problems.dirtyGroutDesc,
      icon: <Trash2 className="w-5 h-5 text-red-500" />,
      color: "border-red-100 bg-red-50/10"
    },
    {
      title: t.problems.kitchenGreaseTitle,
      desc: t.problems.kitchenGreaseDesc,
      icon: <AlertCircle className="w-5 h-5 text-amber-500" />,
      color: "border-amber-100 bg-amber-50/10"
    },
    {
      title: t.problems.chemicalAllergyTitle,
      desc: t.problems.chemicalAllergyDesc,
      icon: <ShieldAlert className="w-5 h-5 text-orange-500" />,
      color: "border-orange-100 bg-orange-50/10"
    },
    {
      title: t.problems.timeConsumingTitle,
      desc: t.problems.timeConsumingDesc,
      icon: <Clock className="w-5 h-5 text-rose-500" />,
      color: "border-rose-100 bg-rose-50/10"
    }
  ];

  return (
    <section id="problems" className="py-36 md:py-44 bg-brand-bg relative overflow-hidden border-t border-b border-brand-border">
      
      {/* Structural background lines */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-brand-border" />
        <div className="absolute left-2/4 top-0 bottom-0 w-px bg-brand-border" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-brand-border" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Editorial Title Block */}
        <div className="max-w-3xl text-left mb-16 md:mb-20">
          <span className="text-xs uppercase font-sans tracking-widest text-brand-orange font-bold block mb-3">
            Трудности уборки
          </span>
          <AnimatedH2
            text={t.problems.title}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-brand-text-primary leading-tight text-balance"
          />
          <AnimatedParagraph
            text={t.problems.subtitle}
            className="text-sm md:text-base text-brand-text-secondary font-sans font-light leading-relaxed mt-4 text-balance"
          />
        </div>

        {/* 2x2 Clean Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {problemsList.map((prob, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`bg-brand-surface border border-brand-border p-8 rounded-3xl flex flex-col justify-between min-h-[220px] shadow-2xs hover:shadow-md transition-all duration-300 group`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 bg-brand-bg rounded-xl flex items-center justify-center border border-brand-border">
                  {prob.icon}
                </div>
                <span className="font-sans text-xs text-brand-text-secondary/50 group-hover:text-brand-orange transition-colors duration-300">
                  0{idx + 1}
                </span>
              </div>
              <div className="text-left">
                <AnimatedH2
                  text={prob.title}
                  className="text-lg font-display font-bold text-brand-text-primary tracking-tight mb-2 block"
                />
                <AnimatedParagraph
                  text={prob.desc}
                  className="text-xs md:text-sm text-brand-text-secondary leading-relaxed font-light"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Transition Banner to the Solution */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 md:mt-20 bg-brand-surface border border-brand-border text-brand-text-primary p-8 md:p-12 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left"
        >
          <div className="lg:col-span-8">
            <span className="text-[10px] uppercase font-sans tracking-widest text-brand-orange font-bold block mb-2">
              Решение найдено
            </span>
            <AnimatedH2
              text="Эра токсичной бытовой химии подошла к концу. Встречайте революцию пара."
              className="text-2xl md:text-3xl font-display font-semibold tracking-tight text-balance leading-snug block"
            />
            <AnimatedParagraph
              text="Забудьте об изнурительном мытье, резиновых перчатках и слезящихся глазах. Мощность бойлера BODO расщепляет грязь силой высокой температуры за секунды."
              className="text-xs text-brand-text-secondary font-sans mt-3 max-w-xl"
            />
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <AnimatedButton
              onClick={onScrollToBuy}
              className="w-full lg:w-auto bg-brand-orange hover:bg-brand-text-primary text-white hover:text-brand-bg text-xs font-bold uppercase tracking-widest px-8 py-4.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer h-[52px]"
              id="problems-learn-more-btn"
            >
              <span>Попробовать BODO</span>
              <ChevronRight className="w-4 h-4" />
            </AnimatedButton>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
