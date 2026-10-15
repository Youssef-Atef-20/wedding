import { useRef, useState, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { weddingConfig } from '../config/invitation';
import { ChevronDown, MailOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface InvitationCoverProps {
  onOpenComplete?: () => void;
}

export const InvitationCover: FC<InvitationCoverProps> = ({ onOpenComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const waxSealRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();

      // Desktop: Direct 1:1 scrub tracking without lag and gentle short pin
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=40%',
            pin: true,
            scrub: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (self.progress > 0.35 && !isOpen) {
                setIsOpen(true);
              } else if (self.progress <= 0.35 && isOpen) {
                setIsOpen(false);
              }
            },
          },
        });

        tl.to(promptRef.current, {
          opacity: 0,
          y: -15,
          duration: 0.2,
          ease: 'none',
        })
          .to(
            waxSealRef.current,
            {
              scale: 1.12,
              duration: 0.3,
              ease: 'none',
            },
            0
          )
          .to(
            flapRef.current,
            {
              rotateX: 180,
              zIndex: 1,
              duration: 0.6,
              ease: 'none',
            },
            0.1
          )
          .to(
            letterRef.current,
            {
              y: -100,
              scale: 1.03,
              zIndex: 10,
              duration: 0.7,
              ease: 'none',
            },
            0.2
          );
      });

      // Mobile: 100% natural touch scrolling (no pinning)
      mm.add('(max-width: 767px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'center top',
            scrub: true,
            onUpdate: (self) => {
              if (self.progress > 0.25 && !isOpen) {
                setIsOpen(true);
              } else if (self.progress <= 0.25 && isOpen) {
                setIsOpen(false);
              }
            },
          },
        });

        tl.to(promptRef.current, { opacity: 0, y: -10, duration: 0.2 })
          .to(waxSealRef.current, { scale: 1.1, duration: 0.2 }, 0)
          .to(flapRef.current, { rotateX: 180, zIndex: 1, duration: 0.5 }, 0.05)
          .to(letterRef.current, { y: -60, scale: 1.02, zIndex: 10, duration: 0.6 }, 0.1);
      });
    },
    { scope: containerRef }
  );

  const handleManualOpen = () => {
    if (isOpen) {
      const nextEl = document.getElementById('couple-reveal');
      if (nextEl) nextEl.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setIsOpen(true);

    const tl = gsap.timeline({
      onComplete: () => {
        onOpenComplete?.();
        const nextEl = document.getElementById('couple-reveal');
        if (nextEl) nextEl.scrollIntoView({ behavior: 'smooth' });
      },
    });

    tl.to(promptRef.current, { opacity: 0, duration: 0.2 })
      .to(waxSealRef.current, { scale: 1.12, duration: 0.25 })
      .to(flapRef.current, { rotateX: 180, zIndex: 1, duration: 0.45, ease: 'power2.inOut' })
      .to(letterRef.current, { y: -100, scale: 1.03, zIndex: 10, duration: 0.5, ease: 'power2.out' }, '-=0.2');
  };

  return (
    <section
      ref={containerRef}
      id="invitation-cover"
      aria-label="غلاف دعوة الزفاف"
      className="relative min-h-[92dvh] w-full flex flex-col items-center justify-center px-3 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 overflow-hidden bg-radial from-[#283226] via-[#1E251E] to-[#141914]"
    >
      {/* Decorative background framing */}
      <div className="absolute inset-2.5 sm:inset-5 md:inset-10 border border-[#B79A66]/20 rounded-2xl sm:rounded-3xl pointer-events-none" />
      <div className="absolute inset-4 sm:inset-7 md:inset-12 border border-[#B79A66]/10 rounded-xl sm:rounded-2xl pointer-events-none hidden sm:block" />

      {/* Header Eyebrow */}
      <div className="relative z-10 text-center mb-3 sm:mb-5 md:mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#B79A66]/10 border border-[#B79A66]/30 text-[#E8D8BD] text-[10px] sm:text-xs md:text-sm font-sans-ar tracking-widest uppercase mb-1.5 sm:mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B79A66] animate-pulse" />
          {weddingConfig.messages.invitationGreeting}
        </div>
        <h1 className="font-serif-ar text-2xl sm:text-3xl md:text-4xl text-[#E8D8BD] font-normal tracking-wide">
          دعوة لحضور حفل الزفاف
        </h1>
        <p className="font-serif-en italic text-xs sm:text-sm md:text-base text-[#B79A66] tracking-widest mt-0.5">
          The Wedding Celebration
        </p>
      </div>

      {/* The 3D Envelope Presentation with fluid sizing */}
      <div
        ref={envelopeRef}
        className="envelope-container relative w-full max-w-[275px] xs:max-w-[310px] sm:max-w-[360px] md:max-w-[420px] h-[270px] xs:h-[290px] sm:h-[330px] md:h-[370px] flex items-center justify-center my-2 sm:my-3"
      >
        {/* The Emerging Invitation Letter */}
        <div
          ref={letterRef}
          className="absolute w-[92%] h-[92%] top-[4%] bg-[#FCFAF6] text-[#292722] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 flex flex-col items-center justify-between shadow-2xl border border-[#B79A66]/40 transition-shadow duration-300 z-5"
          style={{ willChange: 'transform' }}
        >
          {/* Inner Letter Border */}
          <div className="absolute inset-2 sm:inset-2.5 border border-[#B79A66]/30 rounded-lg sm:rounded-xl pointer-events-none" />

          {/* Letter Monogram Header */}
          <div className="text-center pt-1">
            <span className="font-serif-en text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#B79A66] block">
              TOGETHER WITH OUR FAMILIES
            </span>
            <div className="w-8 sm:w-10 h-[1px] bg-[#B79A66]/40 mx-auto my-1" />
          </div>

          {/* Couple's Names in Letter */}
          <div className="text-center my-auto py-1">
            <h2 className="font-serif-ar text-xl xs:text-2xl sm:text-3xl md:text-4xl text-[#292722] font-bold leading-tight">
              {weddingConfig.couple.groom.name}
              <span className="text-[#B79A66] font-light mx-1.5 sm:mx-2.5 text-lg sm:text-2xl font-serif-en">
                &amp;
              </span>
              {weddingConfig.couple.bride.name}
            </h2>
            <p className="font-serif-en italic text-[11px] sm:text-xs md:text-sm text-[#45483B] mt-1 tracking-wider">
              {weddingConfig.event.dateArabicFormatted}
            </p>
          </div>

          {/* Letter Bottom Accent */}
          <div className="text-center pb-1 w-full">
            <div className="w-10 sm:w-12 h-[1px] bg-[#B79A66]/40 mx-auto mb-1" />
            <p className="font-sans-ar text-[9px] sm:text-[11px] text-[#45483B] font-medium truncate px-2">
              {weddingConfig.venue.name}
            </p>
          </div>
        </div>

        {/* Envelope Body */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2E372C] to-[#20271E] rounded-2xl sm:rounded-3xl border border-[#B79A66]/30 shadow-2xl overflow-hidden z-2">
          <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-[#252E23] to-[#2B3529] border-t border-[#B79A66]/20 clip-envelope-pocket shadow-inner" />
          <div className="absolute top-2.5 left-2.5 text-[#B79A66]/20 font-serif-en text-xs">❦</div>
          <div className="absolute top-2.5 right-2.5 text-[#B79A66]/20 font-serif-en text-xs">❦</div>
        </div>

        {/* Envelope Top Triangular Flap */}
        <div
          ref={flapRef}
          className="envelope-flap absolute top-0 left-0 right-0 h-[52%] z-20 origin-top flex items-center justify-center"
          style={{ willChange: 'transform' }}
        >
          <div className="w-full h-full bg-gradient-to-b from-[#343F32] via-[#2A3428] to-[#222B20] border-b-2 border-[#B79A66]/40 shadow-xl flex items-end justify-center pb-2 sm:pb-3 clip-envelope-flap">
            {/* Wax Seal */}
            <div
              ref={waxSealRef}
              onClick={handleManualOpen}
              role="button"
              tabIndex={0}
              aria-label="ختم الشمع، انقر لفتح المظروف"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleManualOpen();
                }
              }}
              className="wax-seal w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full flex items-center justify-center cursor-pointer transform translate-y-4 sm:translate-y-6 select-none transition-transform hover:scale-105 active:scale-95"
            >
              <div className="w-9 h-9 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border border-[#D8BD8A]/40 flex flex-col items-center justify-center text-center">
                <span className="font-serif-ar text-xs xs:text-sm sm:text-base md:text-lg font-bold text-[#F8F4EC] drop-shadow">
                  {weddingConfig.couple.monogramArabic}
                </span>
                <span className="font-serif-en text-[7px] sm:text-[8px] uppercase tracking-widest text-[#E8D8BD]/80 mt-[-2px]">
                  {weddingConfig.couple.monogramLatin}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accessible CTA Button & Scroll Prompt */}
      <div ref={promptRef} className="relative z-10 text-center mt-4 sm:mt-6 md:mt-8 flex flex-col items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={handleManualOpen}
          className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#B79A66] hover:bg-[#D8BD8A] text-[#1E251E] font-medium font-sans-ar text-xs sm:text-sm md:text-base shadow-lg hover:shadow-[#B79A66]/20 transition-all duration-300 active:scale-95 cursor-pointer"
        >
          <span>{isOpen ? 'الانتقال لتفاصيل الحفل' : 'افتح الدعوة'}</span>
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#1E251E]/10 flex items-center justify-center group-hover:rotate-12 transition-transform">
            <MailOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1E251E]" />
          </div>
        </button>

        <div className="flex flex-col items-center gap-0.5 text-[#E8D8BD]/70 text-[10px] sm:text-xs font-sans-ar animate-bounce mt-1">
          <span>مرّر لأسفل لمتابعة تفاصيل الحفل</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#B79A66]" />
        </div>
      </div>
    </section>
  );
};
