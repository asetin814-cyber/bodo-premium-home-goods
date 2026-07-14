import React, { useState } from 'react';
import { TranslationSet, Language } from '../translations';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, MessageCircle, ShieldCheck, Truck, ShieldAlert, BadgeCheck, CheckCircle2 } from 'lucide-react';
import { AnimatedH2, AnimatedParagraph } from './AnimatedTypography';

interface BuySectionProps {
  t: TranslationSet;
  lang: Language;
}

export default function BuySection({ t, lang }: BuySectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Almaty');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const cities = [
    { value: 'Almaty', label: lang === 'RU' ? 'Алматы' : 'Алматы' },
    { value: 'Astana', label: lang === 'RU' ? 'Астана' : 'Астана' },
    { value: 'Shymkent', label: lang === 'RU' ? 'Шымкент' : 'Шымкент' },
    { value: 'Karaganda', label: lang === 'RU' ? 'Караганда' : 'Қарағанды' },
    { value: 'Aktobe', label: lang === 'RU' ? 'Актобе' : 'Ақтөбе' },
    { value: 'Taraz', label: lang === 'RU' ? 'Тараз' : 'Тараз' },
    { value: 'Pavlodar', label: lang === 'RU' ? 'Павлодар' : 'Павлодар' },
    { value: 'Ust-Kamenogorsk', label: lang === 'RU' ? 'Усть-Каменогорск' : 'Өскемен' },
    { value: 'Semey', label: lang === 'RU' ? 'Семей' : 'Семей' },
    { value: 'Atyrau', label: lang === 'RU' ? 'Атырау' : 'Атырау' },
    { value: 'Aktau', label: lang === 'RU' ? 'Актау' : 'Ақтау' },
    { value: 'Uralsk', label: lang === 'RU' ? 'Уральск' : 'Орал' },
    { value: 'Kostanay', label: lang === 'RU' ? 'Костанай' : 'Қостанай' },
    { value: 'Kyzylorda', label: lang === 'RU' ? 'Кызылорда' : 'Қызылорда' },
    { value: 'Petropavl', label: lang === 'RU' ? 'Петропавловск' : 'Петропавл' },
    { value: 'Kokshetau', label: lang === 'RU' ? 'Кокшетау' : 'Көкшетау' },
    { value: 'Taldykorgan', label: lang === 'RU' ? 'Талдыкорган' : 'Талдықорған' },
    { value: 'Turkestan', label: lang === 'RU' ? 'Туркестан' : 'Түркістан' },
  ];

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Strip non-numeric
    val = val.replace(/\D/g, '');
    if (val.startsWith('7')) {
      val = val.substring(1);
    }
    if (val.length > 10) {
      val = val.substring(0, 10);
    }
    setPhone(val);
  };

  const getFormattedPhoneForDisplay = () => {
    if (!phone) return '';
    let formatted = '+7 ';
    if (phone.length > 0) formatted += `(${phone.substring(0, 3)}`;
    if (phone.length > 3) formatted += `) ${phone.substring(3, 6)}`;
    if (phone.length > 6) formatted += `-${phone.substring(6, 8)}`;
    if (phone.length > 8) formatted += `-${phone.substring(8, 10)}`;
    return formatted;
  };

  const generateWhatsAppLink = (direct: boolean, clientName?: string, clientPhone?: string, clientCity?: string, clientPayment?: string) => {
    const baseUrl = 'https://wa.me/77781709236';
    let text = '';
    
    if (direct) {
      text = lang === 'RU' 
        ? 'Здравствуйте! Я хочу заказать пароочиститель BODO 6-в-1 за 25 990 ₸. Проконсультируйте меня, пожалуйста.'
        : 'Сәлеметсіз бе! Мен 25 990 ₸ тұратын BODO 6-ы 1-де бу тазалағышына тапсырыс бергім келеді. Маған кеңес беріңізші.';
    } else {
      const selectedCityLabel = cities.find(c => c.value === clientCity)?.label || clientCity;
      const paymentLabel = clientPayment === 'cod' 
        ? (lang === 'RU' ? 'Оплата при получении' : 'Алған кезде төлеу')
        : (lang === 'RU' ? 'Kaspi QR' : 'Kaspi QR');

      text = lang === 'RU'
        ? `НОВЫЙ ЗАКАЗ BODO\n\nИмя: ${clientName}\nТелефон: +7 ${clientPhone}\nГород: ${selectedCityLabel}\nТовар: Пароочиститель BODO 6-в-1\nСумма: 25 990 ₸\nОплата: ${paymentLabel}\n\nПожалуйста, свяжитесь со мной для подтверждения!`
        : `ЖАҢА ТАПСЫРЫС BODO\n\nЕсімі: ${clientName}\nТелефон: +7 ${clientPhone}\nҚаласы: ${selectedCityLabel}\nТауар: BODO 6-ы 1-де Бу тазалағышы\nСомасы: 25 990 ₸\nТөлем әдісі: ${paymentLabel}\n\nТапсырысты растау үшін хабарласыңыз!`;
    }

    return `${baseUrl}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || phone.length < 10) {
      alert(lang === 'RU' ? 'Пожалуйста, заполните имя и полный номер телефона.' : 'Атыңыз бен толық телефон нөмірін толтырыңыз.');
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury API response / logging delay
    setTimeout(() => {
      const generatedId = `BODO-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsSubmitting(false);
      setIsSuccess(true);

      // Instantly open WhatsApp helper prefilled link
      const waLink = generateWhatsAppLink(false, name, phone, city, paymentMethod);
      window.open(waLink, '_blank');
    }, 1200);
  };

  return (
    <section id="buy" className="py-36 md:py-44 bg-brand-bg relative overflow-hidden">
      
      {/* Absolute grid lines for visual elegance */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute left-1/12 top-0 bottom-0 w-px bg-brand-border" />
        <div className="absolute left-11/12 top-0 bottom-0 w-px bg-brand-border" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section title */}
        <div className="max-w-3xl text-left mb-16 md:mb-20">
          <span className="text-xs uppercase font-sans tracking-widest text-brand-orange font-bold block mb-3">
            Оформление покупки
          </span>
          <AnimatedH2
            text={t.buy.title}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-brand-text-primary leading-tight text-balance"
          />
          <AnimatedParagraph
            text={t.buy.subtitle}
            className="text-sm md:text-base text-brand-text-secondary font-sans font-light mt-4"
          />
        </div>

        {/* 2-Column Checkout Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Premium Interactive Form Card (7 columns) */}
          <div className="lg:col-span-7 bg-brand-surface border border-brand-border rounded-3xl p-6 md:p-10 shadow-lg text-left relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form 
                  key="checkout-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <h3 className="text-xl font-display font-bold text-brand-text-primary tracking-tight">
                      {t.buy.formTitle}
                    </h3>
                    <p className="text-xs text-brand-text-secondary mt-1">
                      {t.buy.formDesc}
                    </p>
                  </div>

                  {/* Input Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-brand-text-secondary">
                      {lang === 'RU' ? 'Ваше имя' : 'Есіміңіз'} <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.buy.namePlaceholder}
                      className="w-full bg-brand-bg border border-brand-border rounded-xl px-5 py-4 text-sm text-brand-text-primary font-sans focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors"
                      id="buy-input-name"
                    />
                  </div>

                  {/* Input Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-brand-text-secondary">
                      {lang === 'RU' ? 'Номер телефона' : 'Телефон нөмірі'} <span className="text-brand-orange">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="700 123 4567"
                        className="w-full bg-brand-bg border border-brand-border rounded-xl pl-16 pr-5 py-4 text-sm text-brand-text-primary font-sans focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors"
                        id="buy-input-phone"
                      />
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm text-brand-text-secondary font-medium border-r border-brand-border pr-3">
                        +7
                      </span>
                    </div>
                    {phone && (
                      <p className="text-[11px] text-brand-orange font-sans">
                        {lang === 'RU' ? 'Формат:' : 'Пішімі:'} {getFormattedPhoneForDisplay()}
                      </p>
                    )}
                  </div>

                  {/* Dropdown City */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-brand-text-secondary">
                      {t.buy.cityLabel}
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-brand-bg border border-brand-border rounded-xl px-5 py-4 text-sm text-brand-text-primary font-sans focus:outline-none focus:border-brand-orange transition-colors cursor-pointer"
                      id="buy-select-city"
                    >
                      {cities.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Payment Methods */}
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-brand-text-secondary">
                      {t.buy.paymentMethodLabel}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* COD */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-4 rounded-xl border text-left flex flex-col justify-between min-h-[90px] transition-all cursor-pointer ${
                          paymentMethod === 'cod'
                            ? 'bg-brand-orange/10 border-brand-orange scale-[1.01]'
                            : 'bg-brand-bg border-brand-border hover:border-brand-text-secondary'
                        }`}
                        id="buy-payment-cod"
                      >
                        <span className="text-xs font-bold text-brand-text-primary">
                          {t.buy.paymentCOD}
                        </span>
                        <span className="text-[10px] font-sans text-brand-text-secondary">
                          {lang === 'RU' ? 'Без предоплаты' : 'Алдын ала төлемсіз'}
                        </span>
                      </button>

                      {/* Online Kaspi */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('kaspi')}
                        className={`p-4 rounded-xl border text-left flex flex-col justify-between min-h-[90px] transition-all cursor-pointer ${
                          paymentMethod === 'kaspi'
                            ? 'bg-brand-orange/10 border-brand-orange scale-[1.01]'
                            : 'bg-brand-bg border-brand-border hover:border-brand-text-secondary'
                        }`}
                        id="buy-payment-kaspi"
                      >
                        <span className="text-xs font-bold text-brand-text-primary">
                          {t.buy.paymentOnline}
                        </span>
                        <span className="text-[10px] font-sans text-brand-orange font-bold">
                          Kaspi QR / Kaspi Gold
                        </span>
                      </button>

                    </div>
                  </div>

                  {/* Submission buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-brand-text-primary hover:bg-brand-orange disabled:opacity-50 disabled:bg-brand-text-secondary text-brand-bg hover:text-white text-xs font-bold uppercase tracking-widest py-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xs hover:shadow-md cursor-pointer active:scale-98"
                      id="buy-submit-form-btn"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{isSubmitting ? t.buy.submitting : t.buy.submitForm}</span>
                    </button>

                    <a
                      href={generateWhatsAppLink(true)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#1EBE57] text-white text-xs font-bold uppercase tracking-widest py-5 px-6 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2"
                      id="buy-whatsapp-quick-btn"
                    >
                      <MessageCircle className="w-5 h-5 fill-current" />
                      <span className="hidden sm:inline">{t.buy.submitWhatsApp}</span>
                      <span className="sm:hidden">{lang === 'RU' ? 'Заказать в WA' : 'WA Тапсырыс'}</span>
                    </a>
                  </div>

                  {/* Safe checkout terms */}
                  <div className="flex items-center gap-2.5 text-brand-text-secondary text-[10px] mt-2 border-t border-brand-border pt-4.5">
                    <ShieldCheck className="w-4.5 h-4.5 text-brand-orange" />
                    <span>
                      {lang === 'RU' 
                        ? 'Нажимая на кнопку, вы оформляете заказ напрямую у BODO. Конфиденциальность гарантируется.'
                        : 'Түймені басу арқылы сіз BODO-дан тікелей тапсырыс бересіз. Құпиялылыққа кепілдік беріледі.'}
                    </span>
                  </div>

                </motion.form>
              ) : (
                <motion.div 
                  key="checkout-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center text-center py-12 gap-6"
                >
                  <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center text-[#25D366]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-display font-bold text-brand-text-primary tracking-tight">
                      {t.buy.successTitle}
                    </h3>
                    <p className="text-sm text-brand-text-secondary mt-2 max-w-md mx-auto">
                      {t.buy.successDesc}
                    </p>
                  </div>

                  {/* Luxury Digital Receipt */}
                  <div className="w-full max-w-sm bg-brand-bg border border-brand-border rounded-2xl p-6 text-left flex flex-col gap-4 font-sans">
                    <div className="flex justify-between items-center border-b border-brand-border pb-3">
                      <span className="text-[10px] text-brand-text-secondary font-medium">НОМЕР ЗАКАЗА:</span>
                      <span className="text-xs font-mono font-bold text-brand-text-primary">{orderId}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-brand-text-secondary">Товар:</span>
                      <span className="font-bold text-brand-text-primary">BODO Steam Cleaner</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-brand-text-secondary">Кол-во:</span>
                      <span className="font-mono font-bold text-brand-text-primary">1 шт</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-brand-text-secondary">Город доставки:</span>
                      <span className="font-bold text-brand-text-primary">
                        {cities.find(c => c.value === city)?.label || city}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-brand-text-secondary">Оплата:</span>
                      <span className="font-bold text-brand-text-primary">
                        {paymentMethod === 'cod' ? 'При получении' : 'Kaspi QR'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t border-dashed border-brand-border pt-4 text-sm font-bold">
                      <span className="text-brand-text-primary">ИТОГО К ОПЛАТЕ:</span>
                      <span className="font-mono text-brand-orange">25 990 ₸</span>
                    </div>
                  </div>

                  {/* Link back to edit details if they want */}
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-xs font-sans font-bold text-brand-orange hover:underline uppercase tracking-wider"
                    id="buy-back-btn"
                  >
                    ← Изменить данные / Артқа қайту
                  </button>

                  <a
                    href={generateWhatsAppLink(false, name, phone, city, paymentMethod)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full max-w-sm bg-[#25D366] text-white py-4.5 rounded-xl font-bold flex items-center justify-center gap-2 text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-shadow"
                    id="buy-open-whatsapp-success"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Открыть диалог в WhatsApp</span>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right Column: Product Showcase and Trust elements (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28">
            
            {/* Visual card */}
            <div className="bg-brand-surface border border-brand-border rounded-3xl p-6 text-left relative overflow-hidden shadow-xs">
              <div className="absolute top-4 right-4 bg-brand-orange text-white px-3 py-1 rounded-full text-[10px] font-sans font-bold tracking-widest uppercase shadow-md">
                АКЦИЯ -35%
              </div>

              {/* Slider / image display */}
              <div className="aspect-square w-full relative rounded-2xl overflow-hidden border border-brand-border bg-brand-bg flex items-center justify-center mb-6">
                <img
                  src="/input_file_3.png"
                  alt="BODO Product Set"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  id="buy-product-preview-img"
                />
              </div>

              <div>
                <span className="text-[10px] font-sans uppercase tracking-widest text-brand-orange font-bold">
                  BODO HOME GOODS
                </span>
                <h3 className="text-xl font-display font-bold text-brand-text-primary tracking-tight mt-1">
                  6-in-1 Steam Cleaner BODO
                </h3>
                
                {/* Price block */}
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-3xl font-display font-light text-brand-text-primary">
                    25 990 ₸
                  </span>
                  <span className="text-sm text-brand-text-secondary line-through">
                    39 990 ₸
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 gap-3 text-left">
              <div className="bg-brand-surface border border-brand-border p-4 rounded-2xl flex items-center gap-4.5">
                <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange border border-brand-orange/20 flex-shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-text-primary">{t.buy.badges.cash}</h4>
                  <p className="text-[10px] text-brand-text-secondary mt-0.5">Оплата наличными или картой курьеру после проверки товара</p>
                </div>
              </div>

              <div className="bg-brand-surface border border-brand-border p-4 rounded-2xl flex items-center gap-4.5">
                <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange border border-brand-orange/20 flex-shrink-0">
                  <BadgeCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-text-primary">{t.buy.badges.tested}</h4>
                  <p className="text-[10px] text-brand-text-secondary mt-0.5">Каждое устройство проверяется инженерами перед отправкой покупателю</p>
                </div>
              </div>

              <div className="bg-brand-surface border border-brand-border p-4 rounded-2xl flex items-center gap-4.5">
                <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange border border-brand-orange/20 flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-text-primary">{t.buy.badges.warranty}</h4>
                  <p className="text-[10px] text-brand-text-secondary mt-0.5">12 месяцев официальной прямой гарантии с быстрой заменой при дефекте</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
