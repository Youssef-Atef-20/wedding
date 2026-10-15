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
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.97,
        opacity: 0,
        y: 25,
        duration: 0.6,
        ease: 'power2.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="personal-message"
      aria-label="رسالة الدعوة والترحيب"
      className="relative w-full py-10 sm:py-14 md:py-20 px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center bg-[#141914] overflow-hidden"
    >
      {/* Delicate background ornamental lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B79A66]/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B79A66]/20 to-transparent pointer-events-none" />

      {/* Main Double-Bezel Letter Container */}
      <div
        ref={cardRef}
        className="bezel-card-outer relative z-10 w-full max-w-2xl mx-auto shadow-2xl"
      >
        <div className="bezel-card-inner p-5 sm:p-8 md:p-10 text-center relative overflow-hidden">
          {/* Top Decorative Filigree */}
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
            <div className="w-8 sm:w-12 h-[1px] bg-[#B79A66]/40" />
            <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5 text-[#B79A66]" />
            <div className="w-8 sm:w-12 h-[1px] bg-[#B79A66]/40" />
          </div>

          {/* Section Heading & Greeting */}
          <span className="font-serif-ar text-xs sm:text-sm text-[#B79A66] block mb-1">
            {weddingConfig.messages.invitationGreeting}
          </span>
          <h3 className="font-serif-ar text-xl sm:text-2xl md:text-3xl text-[#E8D8BD] font-normal mb-3 sm:mb-4">
            دعوة الأهل والأحباب
          </h3>

          <div className="w-16 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-[#B79A66]/50 to-transparent mx-auto my-3 sm:my-4" />

          {/* Intimate Letter Body */}
          <p className="font-serif-ar text-base sm:text-lg md:text-xl text-[#F8F4EC]/90 leading-relaxed max-w-xl mx-auto font-normal px-2">
            {weddingConfig.messages.invitationBody}
          </p>

          {/* Families Signature */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-[#B79A66]/20 flex flex-col sm:flex-row items-center justify-around gap-3 sm:gap-4 text-[#E8D8BD]">
            <div>
              <span className="font-sans-ar text-[10px] sm:text-xs text-[#B79A66] block mb-0.5">عائلة العريس</span>
              <span className="font-serif-ar text-base sm:text-lg md:text-xl">{weddingConfig.couple.groom.father}</span>
            </div>
            <div className="w-8 h-[1px] sm:w-[1px] sm:h-8 bg-[#B79A66]/30" />
            <div>
              <span className="font-sans-ar text-[10px] sm:text-xs text-[#B79A66] block mb-0.5">عائلة العروس</span>
              <span className="font-serif-ar text-base sm:text-lg md:text-xl">{weddingConfig.couple.bride.father}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
