import { useRef, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { weddingConfig } from '../config/invitation';

gsap.registerPlugin(ScrollTrigger);

export const QuranicVerse: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Subtle and respectful entrance - no distracting character-split or distortion
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: 'power2.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="quranic-verse"
      aria-label="الآية القرآنية الكريمة"
      className="relative w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center bg-gradient-to-b from-[#121712] via-[#1A221A] to-[#141914] overflow-hidden"
    >
      {/* Subtle radial illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#B79A66]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative hairline dividers */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B79A66]/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B79A66]/20 to-transparent pointer-events-none" />

      <div
        ref={cardRef}
        className="bezel-card-outer relative z-10 w-full max-w-3xl mx-auto shadow-2xl"
      >
        <div className="bezel-card-inner p-6 sm:p-10 md:p-12 text-center relative overflow-hidden">
          {/* Islamic Decorative Header Motif */}
          <div className="flex items-center justify-center gap-3 mb-5 sm:mb-6">
            <div className="w-8 sm:w-12 h-[1px] bg-[#B79A66]/40" />
            <div className="w-2 h-2 rotate-45 border border-[#B79A66] bg-[#B79A66]/20" />
            <div className="w-8 sm:w-12 h-[1px] bg-[#B79A66]/40" />
          </div>

          {/* Basmala */}
          <p className="font-serif-ar text-base sm:text-lg md:text-xl text-[#B79A66] mb-4 sm:mb-6 select-none tracking-wide">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>

          {/* The Exact Quranic Verse */}
          <blockquote className="my-2 sm:my-4 px-2 sm:px-6">
            <p className="font-serif-ar text-lg sm:text-2xl md:text-3xl text-[#F8F4EC] leading-[2.1] sm:leading-[2.3] md:leading-[2.5] font-normal text-center drop-shadow-sm">
              <span className="text-[#B79A66] font-serif-ar text-xl sm:text-2xl md:text-3xl mx-1 select-none">
                ﴿
              </span>
              {weddingConfig.messages.quranicVerse}
              <span className="text-[#B79A66] font-serif-ar text-xl sm:text-2xl md:text-3xl mx-1 select-none">
                ﴾
              </span>
            </p>
          </blockquote>

          {/* Ornamental Divider */}
          <div className="w-20 sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-[#B79A66]/50 to-transparent mx-auto my-4 sm:my-6" />

          {/* Verse Reference */}
          <cite className="inline-block font-sans-ar text-xs sm:text-sm font-medium text-[#E8D8BD]/90 not-italic tracking-wider px-3 py-1 rounded-full bg-[#B79A66]/10 border border-[#B79A66]/20">
            {weddingConfig.messages.quranicReference}
          </cite>
        </div>
      </div>
    </section>
  );
};
