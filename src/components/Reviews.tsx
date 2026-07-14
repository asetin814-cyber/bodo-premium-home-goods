import React from 'react';
import { TranslationSet } from '../translations';
import { Star, ShieldCheck, ThumbsUp, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedH2, AnimatedParagraph } from './AnimatedTypography';

interface ReviewsProps {
  t: TranslationSet;
}

export default function Reviews({ t }: ReviewsProps) {
  return (
    <section id="reviews" className="py-36 md:py-44 bg-brand-bg border-b border-brand-border relative overflow-hidden">
      
      {/* Background visual detail */}
      <div className="absolute right-[-100px] top-[-100px] w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7 text-left">
            <span className="text-xs uppercase font-sans tracking-widest text-brand-orange font-bold block mb-3">
              Голос клиентов
            </span>
            <AnimatedH2
              text={t.reviews.title}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-brand-text-primary leading-tight"
            />
          </div>
          <div className="lg:col-span-5 text-left">
            <AnimatedParagraph
              text={t.reviews.subtitle}
              className="text-sm text-brand-text-secondary font-sans leading-relaxed"
            />
          </div>
        </div>

        {/* Testimonials Bento Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {t.reviews.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-brand-surface border border-brand-border p-8 rounded-3xl flex flex-col justify-between min-h-[340px] text-left hover:border-brand-text-primary hover:bg-brand-surface-light hover:shadow-md transition-all duration-300 relative group"
            >
              {/* Quote Mark Decoration */}
              <Quote className="absolute right-8 top-8 w-10 h-10 text-brand-orange/10 group-hover:text-brand-orange/15 transition-colors duration-300 pointer-events-none" />

              {/* Card Top: Stars and Date */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1">
                    {Array.from({ length: item.rating }).map((_, s) => (
                      <Star key={s} className="w-4.5 h-4.5 text-brand-orange fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-sans text-brand-text-secondary">
                    {item.date}
                  </span>
                </div>

                {/* Feedback Text */}
                <p className="text-sm text-brand-text-primary leading-relaxed font-light mb-6">
                  "{item.text}"
                </p>
              </div>

              {/* Card Bottom: User Details */}
              <div className="border-t border-brand-border pt-5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-display font-bold text-brand-text-primary">
                    {item.name}
                  </h4>
                  <p className="text-[10px] font-sans font-medium text-brand-text-secondary uppercase tracking-wider mt-0.5">
                    г. {item.city}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-brand-orange/10 border border-brand-orange/20 px-2.5 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
                  <span className="text-[9px] uppercase tracking-wider font-sans font-bold text-brand-orange">
                    {item.verified === 'Проверенный покупатель' ? 'Проверено' : 'Тексерілген'}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Aggregate Stats Card */}
        <div className="mt-12 bg-brand-surface border border-brand-border p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 max-w-xl mx-auto">
          <div className="flex items-center gap-4 text-left">
            <span className="text-4xl font-display font-bold text-brand-text-primary">4.9</span>
            <div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 text-brand-orange fill-current" />
                ))}
              </div>
              <p className="text-[10px] font-sans text-brand-text-secondary uppercase mt-1">Средняя оценка по Казахстану</p>
            </div>
          </div>
          <div className="flex gap-2 bg-brand-surface-light px-4 py-2 rounded-xl border border-brand-border text-[10px] font-sans font-bold text-brand-text-primary uppercase tracking-wider items-center">
            <ThumbsUp className="w-3.5 h-3.5 text-brand-orange" />
            <span>99.2% Довольных покупателей</span>
          </div>
        </div>

      </div>
    </section>
  );
}
