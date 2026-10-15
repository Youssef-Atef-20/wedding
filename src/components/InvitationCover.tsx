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
      // Check prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        // Simple state without heavy 3D rotation
        return;
      }

      // Create a master scrubbed ScrollTrigger timeline pinned for the envelope opening
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (self.progress > 0.45 && !isOpen) {
              setIsOpen(true);
            } else if (self.progress <= 0.45 && isOpen) {
              setIsOpen(false);
            }
          },
        },
      });

      // 1. Initial prompt fades out
      tl.to(promptRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power1.out',
      });

      // 2. Wax seal cracks / lifts slightly
      tl.to(
        waxSealRef.current,
        {
          scale: 1.15,
          boxShadow: '0 25px 35px -5px rgba(0, 0, 0, 0.7)',
          duration: 0.4,
          ease: 'power2.out',
        },
        '-=0.1'
      );

      // 3. Flap folds back 180 degrees with 3D perspective
      tl.to(
        flapRef.current,
        {
          rotateX: 180,
          zIndex: 1,
          duration: 1,
          ease: 'power2.inOut',
        },
        '+=0.1'
      );

      // 4. Letter card slides smoothly upwards from the envelope and expands
      tl.to(
        letterRef.current,
        {
          y: -140,
          scale: 1.05,
          zIndex: 10,
          duration: 1.2,
          ease: 'power2.out',
        },
        '-=0.4'
      );

      // 5. Letter subtle shine / focus
      tl.to(
        envelopeRef.current,
        {
          scale: 0.96,
          opacity: 0.85,
          duration: 0.6,
        },
        '-=0.8'
      );
    },
    { scope: containerRef }
  );

  const handleManualOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    const tl = gsap.timeline({
      onComplete: () => {
        onOpenComplete?.();
      },
    });

    tl.to(promptRef.current, { opacity: 0, duration: 0.3 })
      .to(waxSealRef.current, { scale: 1.15, duration: 0.4 })
      .to(flapRef.current, { rotateX: 180, zIndex: 1, duration: 0.8, ease: 'power2.inOut' })
      .to(letterRef.current, { y: -140, scale: 1.05, zIndex: 10, duration: 0.9, ease: 'power2.out' }, '-=0.3');
  };

  return (
    <section
      ref={containerRef}
      id="invitation-cover"
      aria-label="غلاف دعوة الزفاف"
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 py-12 md:py-20 overflow-hidden bg-radial from-[#283226] via-[#1E251E] to-[#141914]"
    >
      {/* Decorative background framing */}
      <div className="absolute inset-4 sm:inset-8 md:inset-12 border border-[#B79A66]/20 rounded-3xl pointer-events-none" />
      <div className="absolute inset-6 sm:inset-10 md:inset-14 border border-[#B79A66]/10 rounded-2xl pointer-events-none" />

      {/* Header Eyebrow */}
      <div className="relative z-10 text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B79A66]/10 border border-[#B79A66]/30 text-[#E8D8BD] text-xs md:text-sm font-sans-ar tracking-widest uppercase mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B79A66] animate-pulse" />
          {weddingConfig.messages.invitationGreeting}
        </div>
        <h1 className="font-serif-ar text-2xl sm:text-3xl md:text-4xl text-[#E8D8BD] font-normal tracking-wide">
          دعوة لحضور حفل الزفاف
        </h1>
        <p className="font-serif-en italic text-sm sm:text-base text-[#B79A66] tracking-widest mt-1">
          The Wedding Celebration
        </p>
      </div>

      {/* The 3D Envelope Presentation */}
      <div
        ref={envelopeRef}
        className="envelope-container relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[500px] h-[340px] sm:h-[380px] md:h-[420px] flex items-center justify-center my-4"
      >
        {/* The Emerging Invitation Letter (Inside the envelope pocket) */}
        <div
          ref={letterRef}
          className="absolute w-[90%] h-[90%] top-[5%] bg-[#FCFAF6] text-[#292722] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-between shadow-2xl border border-[#B79A66]/40 transition-shadow duration-500 z-5"
          style={{ willChange: 'transform' }}
        >
          {/* Inner Letter Border */}
          <div className="absolute inset-3 border border-[#B79A66]/30 rounded-xl pointer-events-none" />

          {/* Letter Monogram Header */}
          <div className="text-center pt-2">
            <span className="font-serif-en text-xs tracking-[0.3em] uppercase text-[#B79A66] block">
              TOGETHER WITH OUR FAMILIES
            </span>
            <div className="w-12 h-[1px] bg-[#B79A66]/40 mx-auto my-2" />
          </div>

          {/* Couple's Names in Letter */}
          <div className="text-center my-auto py-2">
            <h2 className="font-serif-ar text-3xl sm:text-4xl md:text-5xl text-[#292722] font-bold leading-tight">
              {weddingConfig.couple.groom.name}
              <span className="text-[#B79A66] font-light mx-2 sm:mx-3 text-2xl sm:text-3xl font-serif-en">
                &amp;
              </span>
              {weddingConfig.couple.bride.name}
            </h2>
            <p className="font-serif-en italic text-xs sm:text-sm text-[#45483B] mt-2 tracking-wider">
              {weddingConfig.event.dateArabicFormatted}
            </p>
          </div>

          {/* Letter Bottom Accent */}
          <div className="text-center pb-2 w-full">
            <div className="w-16 h-[1px] bg-[#B79A66]/40 mx-auto mb-2" />
            <p className="font-sans-ar text-[11px] sm:text-xs text-[#45483B] font-medium">
              {weddingConfig.venue.name}
            </p>
          </div>
        </div>

        {/* Envelope Body (Back and Lower Flap) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2E372C] to-[#20271E] rounded-3xl border border-[#B79A66]/30 shadow-2xl overflow-hidden z-2">
          {/* Envelope Pocket Geometry / Diagonal Creases */}
          <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-[#252E23] to-[#2B3529] border-t border-[#B79A66]/20 clip-envelope-pocket shadow-inner" />
          
          {/* Decorative Corner Filigree in Envelope */}
          <div className="absolute top-4 left-4 text-[#B79A66]/20 font-serif-en text-xs">❦</div>
          <div className="absolute top-4 right-4 text-[#B79A66]/20 font-serif-en text-xs">❦</div>
        </div>

        {/* Envelope Top Triangular Flap (Folds on top) */}
        <div
          ref={flapRef}
          className="envelope-flap absolute top-0 left-0 right-0 h-[52%] z-20 origin-top flex items-center justify-center"
          style={{ willChange: 'transform' }}
        >
          {/* Triangular flap with SVG or CSS clip-path */}
          <div className="w-full h-full bg-gradient-to-b from-[#343F32] via-[#2A3428] to-[#222B20] border-b-2 border-[#B79A66]/40 shadow-xl flex items-end justify-center pb-4 clip-envelope-flap">
            {/* Wax Seal Centered on Flap Edge */}
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
              className="wax-seal w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center cursor-pointer transform translate-y-6 sm:translate-y-8 select-none transition-transform hover:scale-105 active:scale-95"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-[#D8BD8A]/40 flex flex-col items-center justify-center text-center">
                <span className="font-serif-ar text-base sm:text-xl font-bold text-[#F8F4EC] drop-shadow">
                  {weddingConfig.couple.monogramArabic}
                </span>
                <span className="font-serif-en text-[9px] uppercase tracking-widest text-[#E8D8BD]/80 mt-[-2px]">
                  {weddingConfig.couple.monogramLatin}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accessible CTA Button & Scroll Prompt */}
      <div ref={promptRef} className="relative z-10 text-center mt-8 sm:mt-10 flex flex-col items-center gap-4">
        <button
          type="button"
          onClick={handleManualOpen}
          className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#B79A66] hover:bg-[#D8BD8A] text-[#1E251E] font-medium font-sans-ar text-sm sm:text-base shadow-lg hover:shadow-[#B79A66]/20 transition-all duration-300 active:scale-95 cursor-pointer"
        >
          <span>{isOpen ? 'تم فتح المظروف' : 'افتح الدعوة'}</span>
          <div className="w-7 h-7 rounded-full bg-[#1E251E]/10 flex items-center justify-center group-hover:rotate-12 transition-transform">
            <MailOpen className="w-4 h-4 text-[#1E251E]" />
          </div>
        </button>

        <div className="flex flex-col items-center gap-1 text-[#E8D8BD]/70 text-xs sm:text-sm font-sans-ar animate-bounce mt-2">
          <span>أو مرّر لأسفل لفتح الدعوة</span>
          <ChevronDown className="w-4 h-4 text-[#B79A66]" />
        </div>
      </div>
    </section>
  );
};
