import React, { useEffect, useState } from 'react';
import { TranslationSet, Language } from '../translations';
import { ShoppingBag, MessageCircle } from 'lucide-react';

interface StickyCTAProps {
  t: TranslationSet;
  lang: Language;
  onScrollToBuy: () => void;
}

export default function StickyCTA({ t, lang, onScrollToBuy }: StickyCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when user has scrolled past hero section
      if (window.scrollY > window.innerHeight * 0.7) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* 1. Main Bottom Sticky Bar (Universal Desktop & Mobile) */}
      <div 
        className="fixed bottom-0 left-0 w-full bg-brand-surface/95 backdrop-blur-md border-t border-brand-border z-40 py-3.5 px-6 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] animate-fade-in-up"
        id="sticky-cta-bar"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left Column: Product Thumbnail & Title (hidden on tiny screens, always on desktop) */}
          <div className="flex items-center gap-3">
            <img 
              src="/input_file_2.png" 
              alt="BODO" 
              className="w-12 h-12 object-cover bg-brand-bg rounded-xl border border-brand-border flex-shrink-0"
              referrerPolicy="no-referrer"
              id="sticky-cta-product-img"
            />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[9px] font-sans font-bold text-brand-orange uppercase tracking-wider">BODO PREMIUM</span>
              <h4 className="text-xs font-display font-bold text-brand-text-primary">6-in-1 Steam Cleaner</h4>
            </div>
          </div>

          {/* Center Column: Pricing */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3 text-left">
            <span className="text-lg md:text-xl font-display font-bold text-brand-text-primary tracking-tight">
              25 990 ₸
            </span>
            <span className="text-[10px] text-brand-text-secondary line-through sm:text-xs">
              39 990 ₸
            </span>
          </div>

          {/* Right Column: Active buttons */}
          <div className="flex items-center gap-3 flex-1 sm:flex-initial justify-end">
            {/* Buy button */}
            <button 
              onClick={onScrollToBuy}
              className="flex-1 sm:flex-initial bg-brand-text-primary hover:bg-brand-orange text-brand-bg hover:text-white text-[10px] md:text-xs font-bold uppercase tracking-widest px-5 md:px-8 py-3.5 rounded-full transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              id="sticky-cta-buy-btn"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t.nav.buy}</span>
            </button>

            {/* Quick WhatsApp button */}
            <a 
              href="https://wa.me/77781709236"
              target="_blank" 
              rel="noopener noreferrer"
              className="w-11 h-11 bg-[#25D366] hover:bg-[#1EBE57] rounded-full flex items-center justify-center text-white shadow-md flex-shrink-0 transition-transform duration-300 hover:scale-105 active:scale-95"
              title="WhatsApp Quick Chat"
              id="sticky-cta-whatsapp-btn"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
            </a>
          </div>

        </div>
      </div>
    </>
  );
}
