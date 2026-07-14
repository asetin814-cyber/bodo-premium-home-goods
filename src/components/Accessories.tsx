import React, { useState } from 'react';
import { TranslationSet } from '../translations';
import { Check, Shield, Package, ArrowRight, Grid } from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedH2, AnimatedParagraph } from './AnimatedTypography';

interface AccessoriesProps {
  t: TranslationSet;
}

export default function Accessories({ t }: AccessoriesProps) {
  const [activeItem, setActiveItem] = useState<string>('floorBrush');

  const accessoriesList = [
    {
      id: 'floorBrush',
      name: t.accessories.items.floorBrush.name,
      desc: t.accessories.items.floorBrush.desc,
      use: 'Ламинат, кафель, керамогранит, линолеум, ковровые покрытия'
    },
    {
      id: 'windowSqueegee',
      name: t.accessories.items.windowSqueegee.name,
      desc: t.accessories.items.windowSqueegee.desc,
      use: 'Окна, душевые перегородки, зеркала, стеклянные столешницы'
    },
    {
      id: 'brassBrush',
      name: t.accessories.items.brassBrush.name,
      desc: t.accessories.items.brassBrush.desc,
      use: 'Решетки духовок, шампуры, барбекю, чугунные решетки плит'
    },
    {
      id: 'nylonBrush',
      name: t.accessories.items.nylonBrush.name,
      desc: t.accessories.items.nylonBrush.desc,
      use: 'Межплиточные швы, смесители, резиновые уплотнители, углы'
    },
    {
      id: 'curvedNozzle',
      name: t.accessories.items.curvedNozzle.name,
      desc: t.accessories.items.curvedNozzle.desc,
      use: 'Труднодоступные пазы, радиаторы отопления, стыки унитаза'
    },
    {
      id: 'extensionHose',
      name: t.accessories.items.extensionHose.name,
      desc: t.accessories.items.extensionHose.desc,
      use: 'Тяжелодоступные верхние углы, шкафы, подвесные шторы'
    }
  ];

  return (
    <section id="accessories" className="py-36 md:py-44 bg-brand-bg border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7 text-left">
            <span className="text-xs uppercase font-sans tracking-widest text-brand-orange font-bold block mb-3">
              Богатая комплектация
            </span>
            <AnimatedH2
              text={t.accessories.title}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-brand-text-primary leading-tight text-balance"
            />
          </div>
          <div className="lg:col-span-5 text-left">
            <AnimatedParagraph
              text={t.accessories.subtitle}
              className="text-xs md:text-sm text-brand-text-secondary font-sans leading-relaxed"
            />
          </div>
        </div>

        {/* Dynamic Display Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: List of nozzles (6 columns) */}
          <div className="lg:col-span-6 flex flex-col gap-3 text-left">
            <div className="bg-brand-surface border border-brand-border p-4.5 rounded-2xl mb-2 flex items-center gap-3">
              <Package className="w-5 h-5 text-brand-orange" />
              <p className="text-xs font-sans font-bold text-brand-text-primary uppercase tracking-wider">
                Все 16 насадок входят в базовый комплект
              </p>
            </div>

            {accessoriesList.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 cursor-pointer ${
                  activeItem === item.id
                    ? 'bg-brand-surface-light border-brand-orange shadow-md scale-[1.01]'
                    : 'bg-brand-surface border-brand-border hover:border-brand-text-secondary hover:bg-brand-surface-light'
                }`}
                id={`accessory-tab-${item.id}`}
              >
                <div className={`w-2.5 h-2.5 rounded-full mt-2 transition-colors duration-300 ${
                  activeItem === item.id ? 'bg-brand-orange' : 'bg-brand-text-secondary/30'
                }`} />
                <div className="flex-1">
                  <h4 className="text-sm font-display font-bold text-brand-text-primary tracking-tight">
                    {item.name}
                  </h4>
                  {activeItem === item.id && (
                    <div className="mt-3">
                      <p className="text-xs text-brand-text-secondary leading-relaxed font-light">
                        {item.desc}
                      </p>
                      <div className="mt-2.5 pt-2.5 border-t border-brand-border flex items-center gap-2">
                        <span className="text-[9px] uppercase tracking-wider font-sans font-bold text-brand-orange">
                          Идеально для:
                        </span>
                        <span className="text-xs text-brand-text-primary font-medium">
                          {item.use}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Right Block: Image cropped to show nozzles beautifully (6 columns) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="relative bg-brand-surface border border-brand-border rounded-3xl p-6 overflow-hidden flex flex-col justify-between min-h-[420px] shadow-sm">
              <div className="text-left mb-6">
                <span className="text-[10px] uppercase font-sans tracking-widest text-brand-orange font-bold block mb-1">
                  Полный комплект поставки
                </span>
                <p className="text-lg font-display font-bold text-brand-text-primary tracking-tight">
                  Полноценная студия чистоты BODO
                </p>
              </div>

              {/* Premium BODO steam cleaner photo showing physical product details */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-brand-border bg-brand-surface-light group shadow-inner">
                <img
                  src="/input_file_3.png"
                  alt="Accessories and BODO Cleaner Set"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05] pointer-events-none"
                  referrerPolicy="no-referrer"
                  id="accessories-product-image"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 text-left border-t border-brand-border pt-6">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-brand-orange mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-brand-text-primary">Латунь и Нейлон</p>
                    <p className="text-[10px] text-brand-text-secondary">Щетки для разных поверхностей</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-brand-orange mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-brand-text-primary">Текстиль и Скребки</p>
                    <p className="text-[10px] text-brand-text-secondary">Для деликатной чистки швов и стекол</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
