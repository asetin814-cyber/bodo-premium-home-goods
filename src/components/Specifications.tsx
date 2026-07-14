import React from 'react';
import { TranslationSet } from '../translations';
import { Settings, Info, Check, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedH2, AnimatedParagraph } from './AnimatedTypography';

interface SpecificationsProps {
  t: TranslationSet;
}

export default function Specifications({ t }: SpecificationsProps) {
  const specsList = [
    { label: t.specs.table.power.label, value: t.specs.table.power.value },
    { label: t.specs.table.pressure.label, value: t.specs.table.pressure.value },
    { label: t.specs.table.temperature.label, value: t.specs.table.temperature.value },
    { label: t.specs.table.tank.label, value: t.specs.table.tank.value },
    { label: t.specs.table.cord.label, value: t.specs.table.cord.value },
    { label: t.specs.table.heatup.label, value: t.specs.table.heatup.value },
    { label: t.specs.table.weight.label, value: t.specs.table.weight.value },
    { label: t.specs.table.voltage.label, value: t.specs.table.voltage.value },
  ];

  return (
    <section id="specifications" className="py-36 md:py-44 bg-brand-bg border-b border-brand-border">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-left mb-16">
          <span className="text-xs uppercase font-sans tracking-widest text-brand-orange font-bold block mb-3">
            Техническое превосходство
          </span>
          <AnimatedH2
            text={t.specs.title}
            className="text-3xl md:text-4xl font-display font-bold tracking-tight text-brand-text-primary leading-tight"
          />
          <AnimatedParagraph
            text={t.specs.subtitle}
            className="text-sm text-brand-text-secondary font-sans font-light mt-3"
          />
        </div>

        {/* Apple-Style Grid Specifications */}
        <div className="bg-brand-surface border border-brand-border rounded-3xl p-6 md:p-10 shadow-sm">
          <div className="flex flex-col">
            {specsList.map((spec, idx) => (
              <div 
                key={idx} 
                className="grid grid-cols-1 md:grid-cols-12 py-5 border-b border-brand-border last:border-b-0 items-center gap-4 text-left"
              >
                <div className="md:col-span-7 flex items-center gap-3">
                  <span className="text-[10px] font-sans text-brand-text-secondary/40 font-bold">
                    0{idx + 1}
                  </span>
                  <span className="text-sm font-sans font-medium text-brand-text-primary">
                    {spec.label}
                  </span>
                </div>
                <div className="md:col-span-5 flex justify-start md:justify-end">
                  <span className="text-sm font-mono font-bold text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-3.5 py-1.5 rounded-xl">
                    {spec.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications and compliance banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-left bg-brand-surface/60 border border-brand-border p-6 rounded-2xl items-center">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest font-sans text-brand-text-secondary font-bold">Защита</span>
            <span className="text-xs font-bold text-brand-text-primary mt-1">IPX4 Влагозащита</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest font-sans text-brand-text-secondary font-bold">Сертификация</span>
            <span className="text-xs font-bold text-brand-text-primary mt-1">CE, RoHS, FCC</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest font-sans text-brand-text-secondary font-bold">Материалы</span>
            <span className="text-xs font-bold text-brand-text-primary mt-1">Термопластик ABS</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest font-sans text-brand-text-secondary font-bold">Контроль</span>
            <span className="text-xs font-bold text-brand-text-primary mt-1">100% Тестирование</span>
          </div>
        </div>

      </div>
    </section>
  );
}
