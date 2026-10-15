import { useRef, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { weddingConfig } from '../config/invitation';
import { ChevronUp, MapPin, Sparkles, Heart, Calendar } from 'lucide-react';
import { BotanicalDivider } from './FloralDecorations';

gsap.registerPlugin(ScrollTrigger);

export const ClosingScene: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.96,
        opacity: 0,
        y: 25,
        duration: 0.7,
        ease: 'power2.out',
      });
    },
    { scope: containerRef }
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={containerRef}
      id="closing-scene"
      aria-label="خاتمة الدعوة"
      className="relative min-h-[80dvh] w-full py-16 sm:py-24 md:py-32 px-3 sm:px-6 md:px-8 flex flex-col items-center justify-center bg-[#FFFDF8] overflow-hidden text-center"
    >
      {/* Background Soft Atmosphere */}
      <div className="absolute inset-0 bg-radial from-[#F7F0E5]/60 via-[#FFFDF8] to-[#F2DFDE]/30 pointer-events-none" />

      {/* Decorative Outer Hairline Framing */}
      <div className="absolute inset-4 sm:inset-8 md:inset-12 border border-[#C6AA78]/25 rounded-3xl pointer-events-none" />

      <div ref={contentRef} className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Monogram Seal */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-2 border-[#C6AA78] flex flex-col items-center justify-center bg-[#FAF6F0] shadow-xl mb-6 sm:mb-8 relative">
          <div className="absolute inset-1.5 rounded-full border border-[#89927A]/30 border-dashed" />
          <span className="font-serif-ar text-2xl sm:text-3xl md:text-4xl font-bold text-[#48423C]">
            {weddingConfig.couple.monogramArabic}
          </span>
          <span className="font-serif-en text-[8px] sm:text-[10px] tracking-widest text-[#9C8150] uppercase mt-[-2px]">
            {weddingConfig.couple.monogramLatin}
          </span>
        </div>

        {/* Names */}
        <h2 className="font-serif-ar text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#48423C] font-normal tracking-wide mb-2 sm:mb-3">
          {weddingConfig.couple.groom.name}
          <span className="text-[#C6AA78] mx-2.5 sm:mx-3 text-2xl sm:text-3xl font-serif-en">&amp;</span>
          {weddingConfig.couple.bride.name}
        </h2>

        <BotanicalDivider className="w-36 sm:w-48 mx-auto my-2 sm:my-3" />

        {/* Closing Greetings */}
        <div className="flex items-center justify-center gap-2 text-[#9C8150] mb-2">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C6AA78]" />
          <p className="font-serif-ar text-lg sm:text-xl md:text-2xl text-[#48423C]">
            {weddingConfig.messages.closingGreeting}
          </p>
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C6AA78]" />
        </div>

        <p className="font-sans-ar text-xs sm:text-sm text-[#7A7269] max-w-md leading-relaxed mb-8 sm:mb-10 px-2 font-medium">
          {weddingConfig.messages.closingSubtext}
        </p>

        {/* Quick Navigation Shortcuts */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => scrollToSection('wedding-date')}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#F7F0E5] hover:bg-[#F2DFDE]/60 border border-[#C6AA78]/40 text-[#48423C] text-xs sm:text-sm font-sans-ar font-medium transition-colors cursor-pointer shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5 text-[#C6AA78]" />
            <span>حفظ الموعد في التقويم</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('wedding-details')}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#F7F0E5] hover:bg-[#F2DFDE]/60 border border-[#C6AA78]/40 text-[#48423C] text-xs sm:text-sm font-sans-ar font-medium transition-colors cursor-pointer shadow-sm"
          >
            <MapPin className="w-3.5 h-3.5 text-[#C6AA78]" />
            <span>تفاصيل الحفل والموقع</span>
          </button>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#F7F0E5] hover:bg-[#F2DFDE]/60 border border-[#C6AA78]/40 text-[#48423C] text-xs sm:text-sm font-sans-ar font-medium transition-colors cursor-pointer shadow-sm"
          >
            <ChevronUp className="w-3.5 h-3.5 text-[#C6AA78]" />
            <span>أعلى الصفحة</span>
          </button>
        </div>

        {/* Monogram Footer Stamp */}
        <div className="mt-12 sm:mt-16 text-center text-[#89927A] text-[10px] sm:text-[11px] font-sans-ar flex items-center justify-center gap-1.5 font-medium">
          <span>صُنعت بكل محبة</span>
          <Heart className="w-3 h-3 text-[#C6AA78] fill-[#F2DFDE]" />
          <span>لحفل زفاف {weddingConfig.couple.monogramArabic} • {new Date(weddingConfig.event.date).getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};
