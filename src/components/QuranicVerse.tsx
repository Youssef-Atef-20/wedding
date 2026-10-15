import { useRef, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { weddingConfig } from '../config/invitation';
import { BotanicalDivider, FloralCorner } from './FloralDecorations';

gsap.registerPlugin(ScrollTrigger);

export const QuranicVerse: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Subtle, respectful entrance - no character splitting or text distortion
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 20,
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
      className="relative w-full py-14 sm:py-20 md:py-28 px-3 sm:px-6 md:px-8 flex flex-col items-center justify-center bg-[#FFFDF8] overflow-hidden"
    >
      {/* Background Soft Glow & Ambient Framing */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-[#F7F0E5]/60 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Hairline Dividers */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C6AA78]/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C6AA78]/30 to-transparent pointer-events-none" />

      <div
        ref={cardRef}
        className="stationery-card-outer relative z-10 w-full max-w-3xl mx-auto shadow-xl"
      >
        <div className="stationery-card-inner p-6 sm:p-10 md:p-14 text-center relative overflow-hidden bg-[#FCFAF6]">
          {/* Floral Corner Accents */}
          <FloralCorner position="top-left" className="absolute top-3 left-3 w-8 h-8 sm:w-10 sm:h-10" />
          <FloralCorner position="top-right" className="absolute top-3 right-3 w-8 h-8 sm:w-10 sm:h-10" />
          <FloralCorner position="bottom-left" className="absolute bottom-3 left-3 w-8 h-8 sm:w-10 sm:h-10" />
          <FloralCorner position="bottom-right" className="absolute bottom-3 right-3 w-8 h-8 sm:w-10 sm:h-10" />

          {/* Basmala in Champagne Gold */}
          <p className="font-serif-ar text-base sm:text-lg md:text-xl text-[#9C8150] mb-4 sm:mb-6 select-none tracking-wide">
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>

          <BotanicalDivider className="w-32 sm:w-48 mx-auto mb-4 sm:mb-6" />

          {/* The Exact Quranic Verse */}
          <blockquote className="my-2 sm:my-5 px-2 sm:px-6">
            <p className="font-serif-ar text-lg sm:text-2xl md:text-3xl text-[#48423C] leading-[2.2] sm:leading-[2.4] md:leading-[2.6] font-normal text-center">
              <span className="text-[#C6AA78] font-serif-ar text-xl sm:text-2xl md:text-3xl mx-1 select-none">
                ﴿
              </span>
              {weddingConfig.messages.quranicVerse}
              <span className="text-[#C6AA78] font-serif-ar text-xl sm:text-2xl md:text-3xl mx-1 select-none">
                ﴾
              </span>
            </p>
          </blockquote>

          {/* Ornamental Separator */}
          <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C6AA78]/50 to-transparent mx-auto my-4 sm:my-6" />

          {/* Verse Reference */}
          <cite className="inline-block font-sans-ar text-xs sm:text-sm font-semibold text-[#89927A] not-italic tracking-wider px-4 py-1.5 rounded-full bg-[#F7F0E5] border border-[#C6AA78]/30 shadow-sm">
            {weddingConfig.messages.quranicReference}
          </cite>
        </div>
      </div>
    </section>
  );
};
