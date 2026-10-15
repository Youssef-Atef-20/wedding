import { useRef, useState, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { weddingConfig } from '../config/invitation';
import { Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CoupleReveal: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const groomCardRef = useRef<HTMLDivElement>(null);
  const brideCardRef = useRef<HTMLDivElement>(null);
  const ampersandRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const [groomImgError, setGroomImgError] = useState(false);
  const [brideImgError, setBrideImgError] = useState(false);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 80%',
          scrub: 1,
        },
      });

      // Staggered reveal
      tl.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      })
        .from(
          groomCardRef.current,
          {
            x: 60,
            y: 30,
            opacity: 0,
            duration: 1.2,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        .from(
          ampersandRef.current,
          {
            scale: 0.4,
            opacity: 0,
            rotation: -25,
            duration: 0.8,
            ease: 'back.out(1.7)',
          },
          '-=0.6'
        )
        .from(
          brideCardRef.current,
          {
            x: -60,
            y: 30,
            opacity: 0,
            duration: 1.2,
            ease: 'power2.out',
          },
          '-=0.8'
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="couple-reveal"
      aria-label="العروسان"
      className="relative min-h-[100dvh] w-full py-24 sm:py-32 md:py-40 px-4 md:px-8 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#141914] via-[#1E251E] to-[#121712]"
    >
      {/* Subtle gold radial ambient illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B79A66]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Eyebrow & Intro */}
      <div ref={headingRef} className="relative z-10 text-center max-w-xl mx-auto mb-14 md:mb-20">
        <span className="font-serif-en text-xs uppercase tracking-[0.3em] text-[#B79A66] block mb-2">
          THE HAPPY COUPLE
        </span>
        <h2 className="font-serif-ar text-3xl sm:text-4xl md:text-5xl text-[#F8F4EC] font-normal tracking-wide">
          معاً نبدأ فصلاً جديداً من الحكاية
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#B79A66] to-transparent mx-auto mt-4 mb-3" />
        <p className="font-sans-ar text-sm sm:text-base text-[#E8D8BD]/80 leading-relaxed">
          بقلوب راضية وعزيمة صادقة، نجمع بين عائلتينا بالمحبة والوئام
        </p>
      </div>

      {/* Couple Showcase: Groom & Bride Cards */}
      <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Groom Card */}
        <div
          ref={groomCardRef}
          className="bezel-card-outer group hover:border-[#B79A66]/50 transition-colors duration-500"
        >
          <div className="bezel-card-inner p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B79A66]/15 border border-[#B79A66]/30 text-[#D8BD8A] text-xs font-sans-ar mb-6">
              <span>{weddingConfig.couple.groom.title}</span>
            </div>

            {/* Photo with double border & slow hover scale */}
            <div className="relative w-44 h-56 sm:w-52 sm:h-64 rounded-2xl overflow-hidden mb-6 border-2 border-[#B79A66]/30 shadow-2xl bg-[#141914]">
              {!groomImgError ? (
                <img
                  src={weddingConfig.photos.coupleRevealGroom}
                  alt={weddingConfig.couple.groom.fullName}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  onError={() => setGroomImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#252E23] text-[#B79A66] p-4 text-center">
                  <span className="font-serif-ar text-3xl font-bold mb-1">عمر</span>
                  <span className="font-serif-en text-xs uppercase tracking-widest text-[#E8D8BD]/60">
                    The Groom
                  </span>
                </div>
              )}
              {/* Subtle vignette gradient over photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141914]/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Groom Typography */}
            <h3 className="font-serif-ar text-3xl sm:text-4xl text-[#F8F4EC] font-bold tracking-wide">
              {weddingConfig.couple.groom.name}
            </h3>
            <p className="font-sans-ar text-sm text-[#B79A66] mt-1 font-medium">
              {weddingConfig.couple.groom.fullName}
            </p>
            <p className="font-serif-en italic text-xs text-[#E8D8BD]/60 mt-2 tracking-wider">
              Son of {weddingConfig.couple.groom.father}
            </p>
          </div>
        </div>

        {/* Center Decorative Interlocking Symbol (Floating on desktop between cards) */}
        <div
          ref={ampersandRef}
          className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#1E251E] border-2 border-[#B79A66] shadow-xl z-20 items-center justify-center text-[#E8D8BD]"
        >
          <Heart className="w-6 h-6 text-[#B79A66] fill-[#B79A66]/30 animate-pulse" />
        </div>

        {/* Bride Card */}
        <div
          ref={brideCardRef}
          className="bezel-card-outer group hover:border-[#B79A66]/50 transition-colors duration-500"
        >
          <div className="bezel-card-inner p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B79A66]/15 border border-[#B79A66]/30 text-[#D8BD8A] text-xs font-sans-ar mb-6">
              <span>{weddingConfig.couple.bride.title}</span>
            </div>

            {/* Photo with double border & slow hover scale */}
            <div className="relative w-44 h-56 sm:w-52 sm:h-64 rounded-2xl overflow-hidden mb-6 border-2 border-[#B79A66]/30 shadow-2xl bg-[#141914]">
              {!brideImgError ? (
                <img
                  src={weddingConfig.photos.coupleRevealBride}
                  alt={weddingConfig.couple.bride.fullName}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  onError={() => setBrideImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#252E23] text-[#B79A66] p-4 text-center">
                  <span className="font-serif-ar text-3xl font-bold mb-1">ياسمين</span>
                  <span className="font-serif-en text-xs uppercase tracking-widest text-[#E8D8BD]/60">
                    The Bride
                  </span>
                </div>
              )}
              {/* Subtle vignette gradient over photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141914]/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Bride Typography */}
            <h3 className="font-serif-ar text-3xl sm:text-4xl text-[#F8F4EC] font-bold tracking-wide">
              {weddingConfig.couple.bride.name}
            </h3>
            <p className="font-sans-ar text-sm text-[#B79A66] mt-1 font-medium">
              {weddingConfig.couple.bride.fullName}
            </p>
            <p className="font-serif-en italic text-xs text-[#E8D8BD]/60 mt-2 tracking-wider">
              Daughter of {weddingConfig.couple.bride.father}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
