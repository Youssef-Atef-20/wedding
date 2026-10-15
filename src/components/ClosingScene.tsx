import { useRef, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { weddingConfig } from '../config/invitation';
import { ChevronUp, MapPin, Sparkles, Heart, Calendar } from 'lucide-react';

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
        y: 30,
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
      className="relative min-h-[80dvh] w-full py-16 sm:py-24 md:py-32 px-4 md:px-8 flex flex-col items-center justify-center bg-radial from-[#252E23] via-[#1A221A] to-[#121712] overflow-hidden text-center"
    >
      {/* Decorative background framing */}
      <div className="absolute inset-4 sm:inset-8 md:inset-12 border border-[#B79A66]/15 rounded-3xl pointer-events-none" />

      <div ref={contentRef} className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Monogram Seal */}
        <div className="w-18 h-18 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-full border-2 border-[#B79A66]/40 flex flex-col items-center justify-center bg-[#1E251E] shadow-2xl mb-6 sm:mb-8 relative">
          <div className="absolute inset-1 rounded-full border border-[#B79A66]/20" />
          <span className="font-serif-ar text-xl sm:text-2xl md:text-3xl font-bold text-[#E8D8BD]">
            {weddingConfig.couple.monogramArabic}
          </span>
          <span className="font-serif-en text-[9px] sm:text-[10px] tracking-widest text-[#B79A66]">
            {weddingConfig.couple.monogramLatin}
          </span>
        </div>

        {/* Names */}
        <h2 className="font-serif-ar text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F8F4EC] font-normal tracking-wide mb-3 sm:mb-4">
          {weddingConfig.couple.groom.name}
          <span className="text-[#B79A66] mx-2.5 sm:mx-3 text-2xl sm:text-3xl font-serif-en">&amp;</span>
          {weddingConfig.couple.bride.name}
        </h2>

        {/* Closing Greetings */}
        <div className="flex items-center justify-center gap-2 text-[#B79A66] mb-2 sm:mb-3">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <p className="font-serif-ar text-lg sm:text-xl md:text-2xl text-[#E8D8BD]">
            {weddingConfig.messages.closingGreeting}
          </p>
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>

        <p className="font-sans-ar text-xs sm:text-sm text-[#F8F4EC]/70 max-w-md leading-relaxed mb-8 sm:mb-10 px-2">
          {weddingConfig.messages.closingSubtext}
        </p>

        {/* Quick Navigation Shortcuts */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => scrollToSection('wedding-date')}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#1E251E] hover:bg-[#283226] border border-[#B79A66]/30 text-[#E8D8BD] text-xs sm:text-sm font-sans-ar transition-colors cursor-pointer shadow-md"
          >
            <Calendar className="w-3.5 h-3.5 text-[#B79A66]" />
            <span>حفظ الموعد في التقويم</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('wedding-details')}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#1E251E] hover:bg-[#283226] border border-[#B79A66]/30 text-[#E8D8BD] text-xs sm:text-sm font-sans-ar transition-colors cursor-pointer shadow-md"
          >
            <MapPin className="w-3.5 h-3.5 text-[#B79A66]" />
            <span>تفاصيل الحفل والموقع</span>
          </button>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#1E251E] hover:bg-[#283226] border border-[#B79A66]/30 text-[#E8D8BD] text-xs sm:text-sm font-sans-ar transition-colors cursor-pointer shadow-md"
          >
            <ChevronUp className="w-3.5 h-3.5 text-[#B79A66]" />
            <span>أعلى الصفحة</span>
          </button>
        </div>

        {/* Copyright / Stamp */}
        <div className="mt-12 sm:mt-16 text-center text-[#B79A66]/60 text-[10px] sm:text-[11px] font-sans-ar flex items-center justify-center gap-1.5">
          <span>صُنعت بكل محبة</span>
          <Heart className="w-3 h-3 text-[#B79A66] fill-[#B79A66]" />
          <span>لحفل زفاف {weddingConfig.couple.monogramArabic} • {new Date(weddingConfig.event.date).getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};
