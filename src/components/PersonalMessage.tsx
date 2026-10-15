import { useRef, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { weddingConfig } from '../config/invitation';
import { HeartHandshake } from 'lucide-react';
import { BotanicalDivider, FloralCorner } from './FloralDecorations';

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
        y: 20,
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
      className="relative w-full py-12 sm:py-16 md:py-24 px-3 sm:px-6 md:px-8 flex flex-col items-center justify-center bg-[#FFFDF8] overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#F7F0E5]/60 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Hairline Dividers */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C6AA78]/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C6AA78]/30 to-transparent pointer-events-none" />

      {/* Main Stationery Letter Container */}
      <div
        ref={cardRef}
        className="stationery-card-outer relative z-10 w-full max-w-2xl mx-auto shadow-xl"
      >
        <div className="stationery-card-inner p-6 sm:p-9 md:p-12 text-center relative overflow-hidden bg-[#FCFAF6]">
          {/* Floral Corners */}
          <FloralCorner position="top-left" className="absolute top-3 left-3 w-8 h-8" />
          <FloralCorner position="top-right" className="absolute top-3 right-3 w-8 h-8" />
          <FloralCorner position="bottom-left" className="absolute bottom-3 left-3 w-8 h-8" />
          <FloralCorner position="bottom-right" className="absolute bottom-3 right-3 w-8 h-8" />

          {/* Top Decorative Filigree */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 sm:w-12 h-[1px] bg-[#C6AA78]/40" />
            <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5 text-[#C6AA78]" />
            <div className="w-8 sm:w-12 h-[1px] bg-[#C6AA78]/40" />
          </div>

          {/* Section Heading & Greeting */}
          <span className="font-serif-ar text-xs sm:text-sm text-[#89927A] block mb-1 font-semibold">
            {weddingConfig.messages.invitationGreeting}
          </span>
          <h3 className="font-serif-ar text-xl sm:text-2xl md:text-3xl text-[#48423C] font-normal mb-2">
            دعوة الأهل والأحباب
          </h3>

          <BotanicalDivider className="w-32 sm:w-44 mx-auto my-3" />

          {/* Intimate Letter Body */}
          <p className="font-serif-ar text-base sm:text-lg md:text-xl text-[#48423C] leading-relaxed max-w-xl mx-auto font-normal px-2">
            {weddingConfig.messages.invitationBody}
          </p>

          {/* Families Signature */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-[#C6AA78]/25 flex flex-col sm:flex-row items-center justify-around gap-3 sm:gap-4 text-[#48423C]">
            <div>
              <span className="font-sans-ar text-[10px] sm:text-xs text-[#89927A] block mb-0.5 font-semibold">عائلة العريس</span>
              <span className="font-serif-ar text-base sm:text-lg md:text-xl text-[#9C8150]">{weddingConfig.couple.groom.father}</span>
            </div>
            <div className="w-8 h-[1px] sm:w-[1px] sm:h-8 bg-[#C6AA78]/30" />
            <div>
              <span className="font-sans-ar text-[10px] sm:text-xs text-[#89927A] block mb-0.5 font-semibold">عائلة العروس</span>
              <span className="font-serif-ar text-base sm:text-lg md:text-xl text-[#9C8150]">{weddingConfig.couple.bride.father}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
