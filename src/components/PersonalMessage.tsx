import { useRef, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { weddingConfig } from '../config/invitation';
import { HeartHandshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const PersonalMessage: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 80%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.95,
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="personal-message"
      aria-label="رسالة الدعوة والترحيب"
      className="relative min-h-[90dvh] w-full py-28 sm:py-36 md:py-44 px-4 md:px-8 flex flex-col items-center justify-center bg-[#141914] overflow-hidden"
    >
      {/* Delicate background ornamental lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B79A66]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B79A66]/30 to-transparent" />

      {/* Main Double-Bezel Letter Container */}
      <div
        ref={cardRef}
        className="bezel-card-outer relative z-10 w-full max-w-3xl mx-auto shadow-2xl"
      >
        <div className="bezel-card-inner p-8 sm:p-12 md:p-16 text-center relative overflow-hidden">
          {/* Top Decorative Filigree */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-[1px] bg-[#B79A66]/40" />
            <HeartHandshake className="w-5 h-5 text-[#B79A66]" />
            <div className="w-12 h-[1px] bg-[#B79A66]/40" />
          </div>

          {/* Quranic Verse */}
          <div className="mb-10 px-2 sm:px-6">
            <span className="font-serif-ar text-xs sm:text-sm text-[#B79A66] block mb-3">
              ﷽
            </span>
            <blockquote className="font-serif-ar text-2xl sm:text-3xl md:text-3xl text-[#E8D8BD] leading-loose font-normal">
              "{weddingConfig.messages.quranicVerse}"
            </blockquote>
            <cite className="block font-sans-ar text-xs text-[#B79A66]/80 mt-3 not-italic">
              {weddingConfig.messages.quranicReference}
            </cite>
          </div>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#B79A66]/50 to-transparent mx-auto my-8" />

          {/* Intimate Letter Body */}
          <p className="font-serif-ar text-lg sm:text-xl md:text-2xl text-[#F8F4EC]/90 leading-relaxed max-w-xl mx-auto font-normal">
            {weddingConfig.messages.invitationBody}
          </p>

          {/* Families Signature */}
          <div className="mt-10 pt-6 border-t border-[#B79A66]/20 flex flex-col sm:flex-row items-center justify-around gap-4 text-[#E8D8BD]">
            <div>
              <span className="font-sans-ar text-xs text-[#B79A66] block mb-1">عائلة العريس</span>
              <span className="font-serif-ar text-lg sm:text-xl">{weddingConfig.couple.groom.father}</span>
            </div>
            <div className="w-8 h-[1px] sm:w-[1px] sm:h-8 bg-[#B79A66]/30" />
            <div>
              <span className="font-sans-ar text-xs text-[#B79A66] block mb-1">عائلة العروس</span>
              <span className="font-serif-ar text-lg sm:text-xl">{weddingConfig.couple.bride.father}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
