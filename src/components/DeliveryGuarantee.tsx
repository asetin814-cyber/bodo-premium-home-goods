import React from 'react';
import { TranslationSet } from '../translations';
import { Truck, BadgePercent, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedH2, AnimatedParagraph } from './AnimatedTypography';

interface DeliveryGuaranteeProps {
  t: TranslationSet;
}

export default function DeliveryGuarantee({ t }: DeliveryGuaranteeProps) {
  const list = [
    {
      title: t.delivery.shippingTitle,
      desc: t.delivery.shippingDesc,
      icon: <Truck className="w-6 h-6 text-brand-orange" />
    },
    {
      title: t.delivery.paymentTitle,
      desc: t.delivery.paymentDesc,
      icon: <BadgePercent className="w-6 h-6 text-brand-orange" />
    },
    {
      title: t.delivery.guaranteeTitle,
      desc: t.delivery.guaranteeDesc,
      icon: <ShieldCheck className="w-6 h-6 text-brand-orange" />
    }
  ];

  return (
    <section id="service" className="py-36 md:py-44 bg-brand-bg border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7 text-left">
            <span className="text-xs uppercase font-sans tracking-widest text-brand-orange font-bold block mb-3">
              Сервисные стандарты BODO
            </span>
            <AnimatedH2
              text={t.delivery.title}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-brand-text-primary leading-tight"
            />
          </div>
          <div className="lg:col-span-5 text-left">
            <AnimatedParagraph
              text={t.delivery.subtitle}
              className="text-sm text-brand-text-secondary font-sans leading-relaxed"
            />
          </div>
        </div>

        {/* 3 Columns Service cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {list.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-brand-surface border border-brand-border p-8 md:p-10 rounded-3xl text-left flex flex-col justify-between min-h-[260px] hover:border-brand-orange transition-colors duration-300 shadow-2xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-surface-light border border-brand-border flex items-center justify-center shadow-2xs mb-8 text-brand-orange">
                {item.icon}
              </div>

              <div>
                <h3 className="text-lg font-display font-bold text-brand-text-primary tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-brand-text-secondary leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge Bar */}
        <div className="mt-16 border-t border-brand-border pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="text-3xl font-display font-bold text-brand-text-primary">100%</span>
            <p className="text-[10px] font-sans font-bold text-brand-text-secondary uppercase mt-1">Одобрено нами</p>
          </div>
          <div>
            <span className="text-3xl font-display font-bold text-brand-text-primary">1 Год</span>
            <p className="text-[10px] font-sans font-bold text-brand-text-secondary uppercase mt-1">Полной гарантии</p>
          </div>
          <div>
            <span className="text-3xl font-display font-bold text-brand-text-primary">0 ₸</span>
            <p className="text-[10px] font-sans font-bold text-brand-text-secondary uppercase mt-1">Предоплаты</p>
          </div>
          <div>
            <span className="text-3xl font-display font-bold text-brand-text-primary">10 Мин</span>
            <p className="text-[10px] font-sans font-bold text-brand-text-secondary uppercase mt-1">Быстрый отклик менеджера</p>
          </div>
        </div>

      </div>
    </section>
  );
}
