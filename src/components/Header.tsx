import React from 'react';
import { TranslationSet, Language } from '../translations';
import { ShoppingBag, MessageCircle, Globe, Menu, X, Instagram } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  t: TranslationSet;
  lang: Language;
  setLang: (lang: Language) => void;
  onScrollToBuy: () => void;
}

export default function Header({ t, lang, setLang, onScrollToBuy }: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleLang = () => {
    setLang(lang === 'RU' ? 'KK' : 'RU');
  };

  const navItems = [
    { label: t.nav.philosophy, href: '#philosophy' },
    { label: t.nav.problems, href: '#problems' },
    { label: t.nav.reveal, href: '#anatomy' },
    { label: t.nav.beforeAfter, href: '#before-after' },
    { label: t.nav.accessories, href: '#accessories' },
    { label: t.nav.reviews, href: '#reviews' },
    { label: t.nav.faq, href: '#faq' },
  ];

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-brand-bg/85 backdrop-blur-md border-b border-brand-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <motion.a 
          href="#" 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 group"
        >
          <div className="bg-white py-1 px-3.5 rounded-lg flex items-center justify-center border border-white/10 shadow-xs h-10">
            <img 
              src="/input_file_0.png" 
              alt="BODO" 
              className="h-6 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              referrerPolicy="no-referrer"
              id="header-logo"
            />
          </div>
        </motion.a>

        {/* Desktop Navigation */}
        <motion.nav 
          variants={listContainerVariants}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex items-center gap-8"
        >
          {navItems.map((item, idx) => (
            <motion.a 
              key={idx} 
              href={item.href} 
              variants={itemVariants}
              className="text-xs font-medium text-brand-text-secondary hover:text-brand-text-primary transition-colors duration-200 uppercase tracking-widest font-sans relative group py-2"
              id={`nav-link-${idx}`}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-orange transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </motion.nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Social Icons */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-4 border-r border-brand-border pr-6"
          >
            <a 
              href="https://instagram.com/bodohome.kz" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-brand-text-secondary hover:text-brand-orange transition-colors duration-200 hover:scale-105 transform active:scale-95"
              title="Instagram @bodohome.kz"
              id="header-social-instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://tiktok.com/@bodohome.kz" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-brand-text-secondary hover:text-brand-orange transition-colors duration-200 flex items-center gap-1 font-sans text-[10px] font-bold tracking-tighter hover:scale-105 transform active:scale-95"
              title="TikTok @bodohome.kz"
              id="header-social-tiktok"
            >
              <span className="bg-brand-surface-light text-brand-text-primary px-1.5 py-0.5 rounded text-[8px] tracking-widest">TT</span>
            </a>
          </motion.div>

          {/* Language Toggle */}
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            onClick={toggleLang} 
            className="flex items-center gap-2 text-xs font-semibold text-brand-text-primary hover:text-brand-orange hover:border-brand-orange transition-colors uppercase tracking-wider font-sans bg-brand-surface border border-brand-border px-3 py-1.5 rounded-full shadow-xs cursor-pointer active:scale-95"
            title="Switch Language / Тілді ауыстыру"
            id="lang-switcher-desktop"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'RU' ? 'RU' : 'KK'}</span>
          </motion.button>

          {/* Premium Call to Action */}
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={onScrollToBuy}
            className="bg-brand-text-primary hover:bg-brand-orange text-brand-bg hover:text-brand-text-primary text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 shadow-xs hover:shadow-md cursor-pointer active:scale-95"
            id="header-cta-btn"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t.nav.buy}</span>
          </motion.button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Quick Lang Switch */}
          <button 
            onClick={toggleLang} 
            className="flex items-center gap-1.5 text-[10px] font-bold text-brand-text-primary uppercase tracking-wider font-sans bg-brand-surface border border-brand-border px-2.5 py-1.5 rounded-full"
            id="lang-switcher-mobile"
          >
            <Globe className="w-3 h-3" />
            <span>{lang === 'RU' ? 'RU' : 'KK'}</span>
          </button>

          {/* Buy Button */}
          <button 
            onClick={onScrollToBuy}
            className="bg-brand-text-primary text-brand-bg text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-full cursor-pointer"
            id="header-cta-btn-mobile"
          >
            <span>{t.nav.buy}</span>
          </button>

          {/* Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 text-brand-text-primary hover:text-brand-orange transition-colors"
            aria-label="Toggle Menu"
            id="mobile-menu-toggle"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-brand-surface z-40 flex flex-col justify-between border-t border-brand-border animate-fade-in-down" id="mobile-menu-drawer">
          <div className="px-6 py-8 flex flex-col gap-6">
            {navItems.map((item, idx) => (
              <a 
                key={idx} 
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-brand-text-primary hover:text-brand-orange transition-colors py-2 border-b border-brand-bg"
                id={`mobile-nav-link-${idx}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="p-6 bg-brand-bg border-t border-brand-border flex flex-col gap-4">
            <div className="flex justify-between items-center text-xs text-brand-text-secondary">
              <span>@bodohome.kz</span>
              <div className="flex gap-4">
                <a 
                  href="https://instagram.com/bodohome.kz" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-brand-orange font-medium"
                >
                  Instagram
                </a>
                <a 
                  href="https://tiktok.com/@bodohome.kz" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-brand-orange font-medium"
                >
                  TikTok
                </a>
              </div>
            </div>
            
            <a 
              href="https://wa.me/77781709236"
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
              id="mobile-drawer-whatsapp-btn"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>WhatsApp Тапсырыс</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
