/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { translations, Language } from './translations';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyBodo from './components/WhyBodo';
import Problems from './components/Problems';
import ProductReveal from './components/ProductReveal';
import Gallery from './components/Gallery';
import SteamTech from './components/SteamTech';
import BeforeAfter from './components/BeforeAfter';
import UseCases from './components/UseCases';
import Accessories from './components/Accessories';
import Specifications from './components/Specifications';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import DeliveryGuarantee from './components/DeliveryGuarantee';
import BuySection from './components/BuySection';
import StickyCTA from './components/StickyCTA';
import Footer from './components/Footer';

export default function App() {
  const [lang, setLang] = useState<Language>('RU');
  const t = translations[lang];

  const handleScrollToBuy = () => {
    document.getElementById('buy')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-brand-bg text-brand-text-primary font-sans antialiased selection:bg-brand-orange/20 selection:text-brand-orange" id="bodo-app-root">
      {/* 1. Fixed Premium Header */}
      <Header 
        t={t} 
        lang={lang} 
        setLang={setLang} 
        onScrollToBuy={handleScrollToBuy} 
      />

      {/* Main Experience Layout matching the exact structural journey */}
      <main className="w-full">
        {/* 2. Apple-Level Hero with Parallax & Particle effects */}
        <Hero 
          t={t} 
          onScrollToBuy={handleScrollToBuy} 
        />

        {/* 3. Brand Mission & Philosophy comparative table */}
        <WhyBodo t={t} />

        {/* 4. Real Frustrations of traditional cleaning */}
        <Problems 
          t={t} 
          onScrollToBuy={handleScrollToBuy} 
        />

        {/* 5. Product Reveal Anatomy with Pulsating Hotspots */}
        <ProductReveal t={t} />

        {/* Beautiful Real Product Showcase Gallery */}
        <Gallery t={t} />

        {/* 6. Raw tech specifications metrics */}
        <SteamTech t={t} />

        {/* 7. Interactive Before-and-After Reveal Slider */}
        <BeforeAfter t={t} />

        {/* 8. Use cases around the home */}
        <UseCases t={t} />

        {/* 9. Full Accessories set visual showcase */}
        <Accessories t={t} />

        {/* 10. Direct Technical specifications table */}
        <Specifications t={t} />

        {/* 11. Testimonials from Kazakh homes */}
        <Reviews t={t} />

        {/* 12. Accordion FAQ guide */}
        <FAQ t={t} />

        {/* 13. Delivery & Guarantee standards */}
        <DeliveryGuarantee t={t} />

        {/* 14. Handcrafted Premium purchase checkout lead funnel */}
        <BuySection 
          t={t} 
          lang={lang} 
        />
      </main>

      {/* 15. Fixed Responsive Sticky Purchase CTA Bar */}
      <StickyCTA 
        t={t} 
        lang={lang} 
        onScrollToBuy={handleScrollToBuy} 
      />

      {/* 16. Apple-level minimalist footer */}
      <Footer 
        t={t} 
        lang={lang} 
        setLang={setLang} 
      />
    </div>
  );
}

