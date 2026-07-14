import React from 'react';
import { TranslationSet, Language } from '../translations';
import { Mail, Phone, MessageCircle, ArrowUp, Globe } from 'lucide-react';
import { AnimatedH2, AnimatedParagraph, AnimatedHeading } from './AnimatedTypography';

interface FooterProps {
  t: TranslationSet;
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Footer({ t, lang, setLang }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLang = () => {
    setLang(lang === 'RU' ? 'KK' : 'RU');
  };

  return (
    <footer className="bg-brand-bg border-t border-brand-border pt-20 pb-12 text-left relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-brand-border">
          
          {/* Brand Col (4 columns) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <a href="#" className="w-max block">
              <div className="bg-white py-1.5 px-4 rounded-lg flex items-center justify-center border border-white/10 shadow-xs h-10 w-max">
                <img 
                  src="/input_file_0.png" 
                  alt="BODO Logo" 
                  className="h-6 w-auto object-contain"
                  referrerPolicy="no-referrer"
                  id="footer-logo"
                />
              </div>
            </a>
            <div className="flex flex-col gap-2">
              <AnimatedParagraph
                text={t.whyBodo.sloganLabel}
                className="text-xs text-brand-text-secondary uppercase font-sans font-bold tracking-widest text-balance"
              />
              <AnimatedHeading
                text={t.whyBodo.testedTitle === 'Проверено нами' ? 'Проверено нами.' : 'Өзіміз тексергенбіз.'}
                className="text-xl font-display font-bold text-brand-orange"
                as="p"
                type="word"
              />
            </div>
            <AnimatedParagraph
              text={`${t.footer.mission} ${lang === 'RU' ? 'Каждый пароочиститель проходит индивидуальную инженерную проверку.' : 'Әрбір бу тазалағыш инженерлік тексеруден өтеді.'}`}
              className="text-xs text-brand-text-secondary leading-relaxed max-w-sm font-light"
            />
          </div>

          {/* Navigation Link Lists (3 columns) */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-sans font-bold uppercase tracking-widest text-brand-text-primary mb-6">
              {t.footer.linksTitle}
            </h4>
            <div className="flex flex-col gap-3.5 text-xs font-medium text-brand-text-secondary">
              <a href="#philosophy" className="hover:text-brand-orange transition-colors">{t.nav.philosophy}</a>
              <a href="#problems" className="hover:text-brand-orange transition-colors">{t.nav.problems}</a>
              <a href="#anatomy" className="hover:text-brand-orange transition-colors">{t.nav.reveal}</a>
              <a href="#before-after" className="hover:text-brand-orange transition-colors">{t.nav.beforeAfter}</a>
              <a href="#accessories" className="hover:text-brand-orange transition-colors">{t.nav.accessories}</a>
              <a href="#specifications" className="hover:text-brand-orange transition-colors">{t.nav.specs}</a>
              <a href="#reviews" className="hover:text-brand-orange transition-colors">{t.nav.reviews}</a>
              <a href="#faq" className="hover:text-brand-orange transition-colors">{t.nav.faq}</a>
            </div>
          </div>

          {/* Contacts Col (3 columns) */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-sans font-bold uppercase tracking-widest text-brand-text-primary mb-6">
              {t.footer.contactsTitle}
            </h4>
            <div className="flex flex-col gap-4 text-xs">
              <a 
                href="mailto:info@bodo.kz" 
                className="flex items-center gap-3 text-brand-text-secondary hover:text-brand-text-primary transition-colors font-sans"
                id="footer-contact-email"
              >
                <Mail className="w-4 h-4 text-brand-orange" />
                <span>info@bodo.kz</span>
              </a>
              <a 
                href="tel:+77781709236" 
                className="flex items-center gap-3 text-brand-text-secondary hover:text-brand-text-primary transition-colors font-sans"
                id="footer-contact-phone"
              >
                <Phone className="w-4 h-4 text-brand-orange" />
                <span>+7 778 170 9236</span>
              </a>
              <a 
                href="https://wa.me/77781709236" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-brand-text-secondary hover:text-brand-text-primary transition-colors"
                id="footer-contact-whatsapp"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]/10" />
                <span className="font-sans">WhatsApp Чат</span>
              </a>
            </div>
          </div>

          {/* Socials Col (2 columns) */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-sans font-bold uppercase tracking-widest text-brand-text-primary mb-6">
              {t.footer.socialsTitle}
            </h4>
            <div className="flex flex-col gap-3.5 text-xs text-brand-text-secondary font-sans">
              <a 
                href="https://instagram.com/bodohome.kz" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-brand-orange transition-colors font-bold"
                id="footer-social-instagram"
              >
                @bodohome.kz IG
              </a>
              <a 
                href="https://tiktok.com/@bodohome.kz" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-brand-orange transition-colors font-bold"
                id="footer-social-tiktok"
              >
                @bodohome.kz TT
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright & language bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-[11px] text-brand-text-secondary font-light">
            {t.footer.copyright}
          </span>

          <div className="flex items-center gap-6">
            {/* Dynamic Lang Selector */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-sans text-brand-text-secondary uppercase">
                {t.footer.langSelect}:
              </span>
              <button 
                onClick={toggleLang} 
                className="flex items-center gap-1.5 text-xs font-sans font-bold text-brand-text-primary hover:text-brand-orange border border-brand-border px-3 py-1.5 rounded-full bg-brand-surface"
                id="footer-lang-switcher"
              >
                <Globe className="w-3.5 h-3.5 text-brand-orange" />
                <span>{lang === 'RU' ? 'Русский' : 'Қазақ'}</span>
              </button>
            </div>

            {/* Back to top */}
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs font-sans font-bold text-brand-text-primary hover:text-brand-orange transition-colors group cursor-pointer"
              id="footer-scroll-top-btn"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
