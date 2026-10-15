import { useRef, useState, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { weddingConfig } from '../config/invitation';
import { ChevronDown, Sparkles } from 'lucide-react';
import { CouronneFlorale, BotanicalDivider, FloralCorner } from './FloralDecorations';

gsap.registerPlugin(ScrollTrigger);

interface InvitationCoverProps {
  onOpenComplete?: () => void;
}

export const InvitationCover: FC<InvitationCoverProps> = ({ onOpenComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLButtonElement>(null);
  const gateLeftRef = useRef<HTMLDivElement>(null);
  const gateRightRef = useRef<HTMLDivElement>(null);
  const innerCardRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();

      // Desktop: Direct 1:1 scrub tracking without input latency
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=45%',
            pin: true,
            scrub: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (self.progress > 0.3 && !isOpen) {
                setIsOpen(true);
              } else if (self.progress <= 0.3 && isOpen) {
                setIsOpen(false);
              }
            },
          },
        });

        tl.to(promptRef.current, { opacity: 0, y: -15, duration: 0.2, ease: 'none' })
          .to(sealRef.current, { scale: 0.9, opacity: 0, duration: 0.3, ease: 'none' }, 0)
          .to(gateLeftRef.current, { xPercent: -105, opacity: 0.3, duration: 0.7, ease: 'none' }, 0.05)
          .to(gateRightRef.current, { xPercent: 105, opacity: 0.3, duration: 0.7, ease: 'none' }, 0.05)
          .to(innerCardRef.current, { scale: 1.02, opacity: 1, duration: 0.7, ease: 'none' }, 0.1);
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
              if (self.progress > 0.2 && !isOpen) {
                setIsOpen(true);
              } else if (self.progress <= 0.2 && isOpen) {
                setIsOpen(false);
              }
            },
          },
        });

        tl.to(promptRef.current, { opacity: 0, y: -10, duration: 0.2 })
          .to(sealRef.current, { scale: 0.85, opacity: 0, duration: 0.25 }, 0)
          .to(gateLeftRef.current, { xPercent: -100, opacity: 0.2, duration: 0.5 }, 0.05)
          .to(gateRightRef.current, { xPercent: 100, opacity: 0.2, duration: 0.5 }, 0.05)
          .to(innerCardRef.current, { scale: 1.01, opacity: 1, duration: 0.5 }, 0.1);
      });
    },
    { scope: containerRef }
  );

  const handleManualOpen = () => {
    if (isOpen) {
      return;
    }

    setIsOpen(true);

    const tl = gsap.timeline({
      onComplete: () => {
        onOpenComplete?.();
      },
    });

    tl.to(sealRef.current, { scale: 1.15, duration: 0.2, ease: 'power2.out' })
      .to(sealRef.current, { scale: 0.8, opacity: 0, duration: 0.25, ease: 'power2.in' })
      .to(gateLeftRef.current, { xPercent: -105, opacity: 0.1, duration: 0.6, ease: 'power3.inOut' }, '-=0.15')
      .to(gateRightRef.current, { xPercent: 105, opacity: 0.1, duration: 0.6, ease: 'power3.inOut' }, '<')
      .to(innerCardRef.current, { scale: 1.02, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3');
  };

  return (
    <section
      ref={containerRef}
      id="invitation-cover"
      aria-label="غلاف دعوة الزفاف الملكية"
      className="relative min-h-[96dvh] w-full flex flex-col items-center justify-center px-3 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 overflow-hidden bg-[#FFFDF8]"
    >
      {/* Background Soft Warm Atmosphere */}
      <div className="absolute inset-0 bg-radial from-[#F7F0E5]/60 via-[#FFFDF8] to-[#F2DFDE]/25 pointer-events-none" />

      {/* Decorative Outer Hairline Framing */}
      <div className="absolute inset-3 sm:inset-6 md:inset-10 border border-[#C6AA78]/30 rounded-2xl sm:rounded-3xl pointer-events-none" />
      <div className="absolute inset-5 sm:inset-8 md:inset-12 border border-[#89927A]/20 rounded-xl sm:rounded-2xl pointer-events-none hidden sm:block" />

      {/* Header Eyebrow */}
      <div className="relative z-10 text-center mb-3 sm:mb-5">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F7F0E5] border border-[#C6AA78]/40 text-[#48423C] text-[10px] sm:text-xs md:text-sm font-sans-ar tracking-widest uppercase mb-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6AA78] animate-pulse" />
          {weddingConfig.messages.invitationGreeting}
        </div>
        <h1 className="font-serif-ar text-2xl sm:text-3xl md:text-4xl text-[#48423C] font-normal tracking-wide">
          دعوة لحضور حفل الزفاف
        </h1>
        <p className="font-serif-en italic text-xs sm:text-sm md:text-base text-[#9C8150] tracking-widest mt-0.5">
          The Royal Wedding Celebration
        </p>
      </div>

      {/* Central Interactive Gatefold Envelope & Floral Arch Presentation */}
      <div className="relative w-full max-w-[320px] xs:max-w-[350px] sm:max-w-[440px] md:max-w-[500px] h-[360px] xs:h-[390px] sm:h-[430px] md:h-[470px] flex items-center justify-center my-2 select-none">
        {/* Background Signature Botanical Wreath ("Couronne Florale") */}
        <div className="absolute inset-[-12%] flex items-center justify-center pointer-events-none z-0">
          <CouronneFlorale className="w-full h-full max-w-[560px] max-h-[560px] opacity-85" />
        </div>

        {/* The Revealed Inner Wedding Invitation Card */}
        <div
          ref={innerCardRef}
          className="stationery-card-outer relative z-5 w-[92%] h-[92%] flex flex-col items-center justify-between p-4 sm:p-7 md:p-8 text-center bg-[#FCFAF6] shadow-xl"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="stationery-card-inner w-full h-full p-4 sm:p-6 flex flex-col items-center justify-between relative overflow-hidden">
            {/* Floral Corners */}
            <FloralCorner position="top-left" className="absolute top-2 left-2 w-7 h-7 sm:w-9 sm:h-9" />
            <FloralCorner position="top-right" className="absolute top-2 right-2 w-7 h-7 sm:w-9 sm:h-9" />
            <FloralCorner position="bottom-left" className="absolute bottom-2 left-2 w-7 h-7 sm:w-9 sm:h-9" />
            <FloralCorner position="bottom-right" className="absolute bottom-2 right-2 w-7 h-7 sm:w-9 sm:h-9" />

            {/* Inner Header Monogram */}
            <div className="pt-1">
              <span className="font-serif-en text-[9px] sm:text-[11px] tracking-[0.25em] uppercase text-[#9C8150] block">
                TOGETHER WITH OUR FAMILIES
              </span>
              <div className="w-8 sm:w-12 h-[1px] bg-[#C6AA78]/50 mx-auto my-1" />
            </div>

            {/* Couple's Names in Majestic Calligraphy */}
            <div className="my-auto py-2">
              <p className="font-sans-ar text-[11px] sm:text-xs text-[#7A7269] mb-1">
                يسرنا دعوتكم لمشاركتنا فرحة العمر
              </p>
              <h2 className="font-serif-ar text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#48423C] font-bold leading-tight drop-shadow-sm">
                {weddingConfig.couple.groom.name}
                <span className="text-[#C6AA78] font-light mx-2 sm:mx-3 text-xl sm:text-3xl font-serif-en">
                  &amp;
                </span>
                {weddingConfig.couple.bride.name}
              </h2>
              <div className="mt-2">
                <BotanicalDivider className="w-32 sm:w-44 mx-auto my-1.5" />
                <p className="font-serif-en italic text-xs sm:text-sm text-[#48423C] tracking-wider">
                  {weddingConfig.event.dateArabicFormatted}
                </p>
              </div>
            </div>

            {/* Venue & Hall */}
            <div className="pb-1 w-full">
              <p className="font-sans-ar text-[10px] sm:text-xs text-[#89927A] font-medium truncate px-2">
                {weddingConfig.venue.name} • {weddingConfig.venue.hall}
              </p>
            </div>
          </div>
        </div>

        {/* Gatefold Left Panel Door */}
        <div
          ref={gateLeftRef}
          className="absolute inset-y-0 left-0 w-1/2 z-10 origin-left bg-[#F7F0E5] border-r border-[#C6AA78]/40 shadow-xl overflow-hidden rounded-s-2xl sm:rounded-s-3xl"
          style={{ willChange: 'transform' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF8]/90 via-[#F7F0E5]/80 to-[#F2DFDE]/40" />
          <div className="absolute inset-2 border border-[#C6AA78]/25 rounded-s-xl pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#C6AA78]/15 to-transparent pointer-events-none" />
          {/* Subtle floral watermark */}
          <div className="absolute bottom-4 left-4 text-[#C6AA78]/25 font-serif-en text-xl">❦</div>
        </div>

        {/* Gatefold Right Panel Door */}
        <div
          ref={gateRightRef}
          className="absolute inset-y-0 right-0 w-1/2 z-10 origin-right bg-[#F7F0E5] border-l border-[#C6AA78]/40 shadow-xl overflow-hidden rounded-e-2xl sm:rounded-e-3xl"
          style={{ willChange: 'transform' }}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-[#FFFDF8]/90 via-[#F7F0E5]/80 to-[#F2DFDE]/40" />
          <div className="absolute inset-2 border border-[#C6AA78]/25 rounded-e-xl pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#C6AA78]/15 to-transparent pointer-events-none" />
          {/* Subtle floral watermark */}
          <div className="absolute bottom-4 right-4 text-[#C6AA78]/25 font-serif-en text-xl">❦</div>
        </div>

        {/* Centerpiece: Floral Wax Seal Button */}
        <button
          ref={sealRef}
          type="button"
          onClick={handleManualOpen}
          disabled={isOpen}
          aria-label={isOpen ? 'تم فتح الدعوة' : 'ختم الشمع الزهري الملكي، انقر لفتح الدعوة'}
          className={`wax-seal-gold absolute z-20 w-16 h-16 xs:w-18 xs:h-18 sm:w-22 sm:h-22 rounded-full flex flex-col items-center justify-center select-none transition-transform shadow-2xl group ${
            isOpen ? 'cursor-default pointer-events-none' : 'cursor-pointer hover:scale-105 active:scale-95'
          }`}
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Inner concentric ring */}
          <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-18 sm:h-18 rounded-full border border-white/60 flex flex-col items-center justify-center text-center bg-gradient-to-b from-white/30 to-transparent">
            <span className="font-serif-ar text-base xs:text-lg sm:text-2xl font-bold text-[#48423C] drop-shadow-sm group-hover:scale-105 transition-transform">
              {weddingConfig.couple.monogramArabic}
            </span>
            <span className="font-serif-en text-[7px] sm:text-[9px] uppercase tracking-widest text-[#48423C]/80 mt-[-2px]">
              {weddingConfig.couple.monogramLatin}
            </span>
          </div>
        </button>
      </div>

      {/* Accessible CTA Button & Scroll Prompt */}
      <div ref={promptRef} className="relative z-10 text-center mt-3 sm:mt-5 flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={handleManualOpen}
          disabled={isOpen}
          className={`group relative inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold font-sans-ar text-xs sm:text-sm shadow-md transition-all duration-300 ${
            isOpen
              ? 'bg-[#F7F0E5] text-[#89927A] border border-[#C6AA78]/30 cursor-default'
              : 'bg-[#C6AA78] hover:bg-[#DFC89E] text-[#48423C] hover:shadow-lg active:scale-95 cursor-pointer'
          }`}
        >
          <span>{isOpen ? 'تم فتح الدعوة' : 'اضغطوا لفتح الدعوة'}</span>
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FFFDF8]/40 flex items-center justify-center">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#48423C]" />
          </div>
        </button>

        <div className="flex flex-col items-center gap-0.5 text-[#7A7269] text-[10px] sm:text-xs font-sans-ar animate-bounce mt-1">
          <span>مرّروا لأسفل لمتابعة تفاصيل الحفل</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#C6AA78]" />
        </div>
      </div>
    </section>
  );
};
