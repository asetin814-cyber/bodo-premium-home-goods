import React from 'react';
import { TranslationSet } from '../translations';
import { Check, X, ShieldCheck, Heart, Sparkles, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedH2, AnimatedParagraph } from './AnimatedTypography';

interface WhyBodoProps {
  t: TranslationSet;
}

export default function WhyBodo({ t }: WhyBodoProps) {
  const comparisonList = [
    {
      feature: t.whyBodo.philosophyTitle,
      bodo: t.whyBodo.philosophyText,
      other: 'Сотни случайных товаров низкого качества от разных поставщиков.',
      bodoOk: true
    },
    {
      feature: t.whyBodo.testedTitle,
      bodo: t.whyBodo.testedText,
      other: 'Никаких тестов. Товар идет напрямую с завода, частый заводской брак.',
      bodoOk: true
    },
    {
      feature: 'Официальная гарантия',
      bodo: 'Реальные 12 месяцев с мгновенным обменом на новый прибор без лишних вопросов.',
      other: 'Сложный возврат, долгие экспертизы и попытки обвинить клиента.',
      bodoOk: true
    }
  ];

  return (
    <section id="philosophy" className="py-24 md:py-32 bg-brand-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Heading Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 lg:mb-24">
          <div className="lg:col-span-7 text-left">
            <span className="text-xs uppercase font-sans tracking-widest text-brand-orange font-bold block mb-3">
              {t.whyBodo.title}
            </span>
            <AnimatedH2
              text={t.whyBodo.subtitle}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-brand-text-primary leading-tight text-balance"
            />
          </div>
          <div className="lg:col-span-5 text-left border-l-2 border-brand-orange pl-6 py-2">
            <p className="text-[10px] font-sans uppercase tracking-widest text-brand-text-secondary mb-1">
              {t.whyBodo.sloganLabel}
            </p>
            <p className="text-2xl font-display font-bold text-brand-orange tracking-tight">
              {t.whyBodo.testedTitle === 'Проверено нами' ? 'Проверено нами.' : 'Өзіміз тексергенбіз.'}
            </p>
          </div>
        </div>

        {/* Brand Core Strengths Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          
          {/* Card 1: Philosophy */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-brand-surface p-8 md:p-10 rounded-3xl border border-brand-border flex flex-col justify-between min-h-[320px] transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
            <div className="w-12 h-12 rounded-2xl bg-brand-surface-light border border-brand-border flex items-center justify-center text-brand-orange shadow-2xs mb-8">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <AnimatedH2
                text={t.whyBodo.philosophyTitle}
                className="text-xl font-display font-bold text-brand-text-primary tracking-tight mb-3 block"
              />
              <AnimatedParagraph
                text={t.whyBodo.philosophyText}
                className="text-sm text-brand-text-secondary leading-relaxed font-light"
              />
            </div>
          </motion.div>

          {/* Card 2: 100% Tested */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-brand-surface p-8 md:p-10 rounded-3xl border border-brand-border flex flex-col justify-between min-h-[320px] transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
            <div className="w-12 h-12 rounded-2xl bg-brand-orange flex items-center justify-center text-white shadow-md mb-8">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <AnimatedH2
                text={t.whyBodo.testedTitle}
                className="text-xl font-display font-bold text-brand-text-primary tracking-tight mb-3 block"
              />
              <AnimatedParagraph
                text={t.whyBodo.testedText}
                className="text-sm text-brand-text-secondary leading-relaxed font-light"
              />
            </div>
          </motion.div>

          {/* Card 3: Quality Standard */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-brand-surface p-8 md:p-10 rounded-3xl border border-brand-border flex flex-col justify-between min-h-[320px] transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
            <div className="w-12 h-12 rounded-2xl bg-brand-surface-light border border-brand-border flex items-center justify-center text-brand-orange shadow-2xs mb-8">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <AnimatedH2
                text={t.whyBodo.qualityTitle}
                className="text-xl font-display font-bold text-brand-text-primary tracking-tight mb-3 block"
              />
              <AnimatedParagraph
                text={t.whyBodo.qualityText}
                className="text-sm text-brand-text-secondary leading-relaxed font-light"
              />
            </div>
          </motion.div>

        </div>

        {/* Handcrafted Comparative Experience Section */}
        <div className="bg-brand-surface rounded-3xl border border-brand-border p-6 md:p-10 lg:p-12">
          <div className="text-center md:text-left mb-8">
            <AnimatedH2
              text={t.whyBodo.testedTitle === 'Проверено нами' ? 'Сравнение подходов к покупкам' : 'Сатып алу тәсілдерін салыстыру'}
              className="text-xl font-display font-bold text-brand-text-primary tracking-tight block"
            />
            <p className="text-xs text-brand-text-secondary font-sans uppercase tracking-wider mt-1">
              Честный выбор в пользу качества
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {comparisonList.map((item, index) => (
              <div 
                key={index} 
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pb-8 border-b border-brand-border last:border-b-0 last:pb-0"
              >
                {/* Feature label (3 columns) */}
                <div className="lg:col-span-3 text-left">
                  <span className="text-xs font-sans font-bold text-brand-text-primary uppercase tracking-wider block">
                    0{index + 1}. {item.feature}
                  </span>
                </div>

                {/* BODO Way (5 columns) */}
                <div className="lg:col-span-5 bg-brand-surface-light border border-brand-orange/30 rounded-2xl p-5 text-left relative overflow-hidden shadow-xs">
                  <div className="absolute top-4 right-4 text-brand-orange flex items-center justify-center bg-brand-orange/25 rounded-full w-6 h-6">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-[10px] uppercase font-sans tracking-widest text-brand-orange font-bold block mb-2">
                    {t.whyBodo.bodoWay}
                  </span>
                  <p className="text-xs text-brand-text-primary leading-relaxed font-medium">
                    {item.bodo}
                  </p>
                </div>

                {/* Normal Way (4 columns) */}
                <div className="lg:col-span-4 bg-brand-bg/50 border border-brand-border rounded-2xl p-5 text-left relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-brand-text-secondary flex items-center justify-center bg-brand-surface rounded-full w-6 h-6">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] uppercase font-sans tracking-widest text-brand-text-secondary font-bold block mb-2">
                    {t.whyBodo.otherWay}
                  </span>
                  <p className="text-xs text-brand-text-secondary leading-relaxed font-light">
                    {item.other}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
