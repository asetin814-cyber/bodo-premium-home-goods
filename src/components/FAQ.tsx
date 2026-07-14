import React, { useState } from 'react';
import { TranslationSet } from '../translations';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedH2, AnimatedParagraph } from './AnimatedTypography';

interface FAQProps {
  t: TranslationSet;
}

export default function FAQ({ t }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-36 md:py-44 bg-brand-bg border-b border-brand-border relative">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16">
          <span className="text-xs uppercase font-sans tracking-widest text-brand-orange font-bold block mb-3">
            Отвечаем на вопросы
          </span>
          <AnimatedH2
            text={t.faq.title}
            className="text-3xl md:text-4xl font-display font-bold tracking-tight text-brand-text-primary"
          />
          <AnimatedParagraph
            text={t.faq.subtitle}
            className="text-sm text-brand-text-secondary font-sans font-light mt-3"
          />
        </div>

        {/* Minimal Accordion List */}
        <div className="flex flex-col gap-4">
          {t.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`bg-brand-surface border rounded-2xl transition-all duration-300 overflow-hidden text-left ${
                  isOpen ? 'border-brand-orange shadow-xs' : 'border-brand-border hover:border-brand-text-secondary'
                }`}
                id={`faq-item-${idx}`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full py-5 px-6 md:px-8 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  id={`faq-toggle-btn-${idx}`}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${
                      isOpen ? 'text-brand-orange' : 'text-brand-text-secondary'
                    }`} />
                    <span className="text-sm md:text-base font-display font-semibold text-brand-text-primary tracking-tight">
                      {item.q}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-brand-orange' : 'text-brand-text-secondary'
                  }`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="pb-6 px-6 md:px-8 pl-14 text-xs md:text-sm text-brand-text-secondary font-light leading-relaxed border-t border-brand-border pt-4">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Banner */}
        <div className="mt-12 bg-brand-surface border border-brand-border p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-10 h-10 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-brand-text-primary">Остались вопросы по эксплуатации?</p>
              <p className="text-[10px] text-brand-text-secondary">Наши эксперты проконсультируют вас в WhatsApp</p>
            </div>
          </div>
          <a
            href="https://wa.me/77781709236"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-brand-text-primary hover:bg-brand-orange text-brand-bg hover:text-white text-[10px] font-bold uppercase tracking-wider px-5 py-3 rounded-full text-center transition-colors duration-300"
            id="faq-whatsapp-consult"
          >
            Спросить в WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
