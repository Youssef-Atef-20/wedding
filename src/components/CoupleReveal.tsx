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
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.from(headingRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
        .from(
          groomCardRef.current,
          {
            x: 25,
            y: 15,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.2'
        )
        .from(
          ampersandRef.current,
          {
            scale: 0.5,
            opacity: 0,
            duration: 0.4,
            ease: 'back.out(1.5)',
          },
          '-=0.3'
        )
        .from(
          brideCardRef.current,
          {
            x: -25,
            y: 15,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4'
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="couple-reveal"
      aria-label="العروسان"
      className="relative w-full py-10 sm:py-14 md:py-20 px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#141914] via-[#1E251E] to-[#121712]"
    >
      {/* Subtle gold radial ambient illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-[#B79A66]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Eyebrow & Intro */}
      <div ref={headingRef} className="relative z-10 text-center max-w-xl mx-auto mb-6 sm:mb-10 md:mb-12">
        <span className="font-serif-en text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B79A66] block mb-1">
          THE HAPPY COUPLE
        </span>
        <h2 className="font-serif-ar text-2xl sm:text-3xl md:text-4xl text-[#F8F4EC] font-normal tracking-wide">
          معاً نبدأ فصلاً جديداً من الحكاية
        </h2>
        <div className="w-12 sm:w-14 h-[1px] bg-gradient-to-r from-transparent via-[#B79A66] to-transparent mx-auto mt-2 sm:mt-3 mb-2" />
        <p className="font-sans-ar text-xs sm:text-sm text-[#E8D8BD]/80 leading-relaxed px-2">
          بقلوب راضية وعزيمة صادقة، نجمع بين عائلتينا بالمحبة والوئام
        </p>
      </div>

      {/* Couple Showcase: Proportioned, Responsive Cards */}
      <div className="relative z-10 w-full max-w-sm md:max-w-3xl lg:max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-stretch">
        {/* Groom Card */}
        <div
          ref={groomCardRef}
          className="bezel-card-outer group hover:border-[#B79A66]/40 transition-colors duration-300 h-full flex flex-col"
        >
          <div className="bezel-card-inner p-4 sm:p-6 md:p-7 flex flex-col items-center justify-between text-center relative overflow-hidden h-full">
            <div className="flex flex-col items-center w-full">
              {/* Top Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#B79A66]/15 border border-[#B79A66]/30 text-[#D8BD8A] text-xs font-sans-ar mb-3 sm:mb-4">
                <span>{weddingConfig.couple.groom.title}</span>
              </div>

              {/* Photo / Motif with balanced responsive proportions */}
              <div className="relative w-28 h-36 xs:w-32 xs:h-40 sm:w-36 sm:h-48 md:w-40 md:h-52 rounded-xl overflow-hidden mb-3 sm:mb-4 border-2 border-[#B79A66]/30 shadow-md bg-[#141914] shrink-0">
                {!groomImgError ? (
                  <img
                    src={weddingConfig.photos.groomMotif}
                    alt={weddingConfig.couple.groom.fullName}
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                    onError={() => setGroomImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#252E23] text-[#B79A66] p-3 text-center">
                    <span className="font-serif-ar text-2xl font-bold mb-1">عمر</span>
                    <span className="font-serif-en text-[10px] uppercase tracking-widest text-[#E8D8BD]/60">
                      The Groom
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141914]/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Groom Typography */}
              <h3 className="font-serif-ar text-2xl sm:text-3xl md:text-3xl text-[#F8F4EC] font-bold tracking-wide">
                {weddingConfig.couple.groom.name}
              </h3>
              <p className="font-sans-ar text-xs sm:text-sm text-[#B79A66] mt-0.5 sm:mt-1 font-medium">
                {weddingConfig.couple.groom.fullName}
              </p>
            </div>

            <p className="font-serif-en italic text-xs text-[#E8D8BD]/60 mt-2 tracking-wider">
              Son of {weddingConfig.couple.groom.father}
            </p>
          </div>
        </div>

        {/* Center Decorative Interlocking Symbol on Desktop */}
        <div
          ref={ampersandRef}
          className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#1E251E] border-2 border-[#B79A66] shadow-xl z-20 items-center justify-center text-[#E8D8BD]"
        >
          <Heart className="w-4 h-4 text-[#B79A66] fill-[#B79A66]/30" />
        </div>

        {/* Mobile Connector Divider */}
        <div className="flex md:hidden items-center justify-center gap-3 my-1">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#B79A66]/30" />
          <div className="w-7 h-7 rounded-full bg-[#1E251E] border border-[#B79A66]/60 flex items-center justify-center">
            <Heart className="w-3.5 h-3.5 text-[#B79A66] fill-[#B79A66]/30" />
          </div>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#B79A66]/30" />
        </div>

        {/* Bride Card (Strictly adhering to Islamic modesty & elegance) */}
        <div
          ref={brideCardRef}
          className="bezel-card-outer group hover:border-[#B79A66]/40 transition-colors duration-300 h-full flex flex-col"
        >
          <div className="bezel-card-inner p-4 sm:p-6 md:p-7 flex flex-col items-center justify-between text-center relative overflow-hidden h-full">
            <div className="flex flex-col items-center w-full">
              {/* Top Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#B79A66]/15 border border-[#B79A66]/30 text-[#D8BD8A] text-xs font-sans-ar mb-3 sm:mb-4">
                <span>{weddingConfig.couple.bride.title}</span>
              </div>

              {/* Photo / Motif with balanced responsive proportions */}
              <div className="relative w-28 h-36 xs:w-32 xs:h-40 sm:w-36 sm:h-48 md:w-40 md:h-52 rounded-xl overflow-hidden mb-3 sm:mb-4 border-2 border-[#B79A66]/30 shadow-md bg-[#141914] shrink-0">
                {!brideImgError ? (
                  <img
                    src={weddingConfig.photos.brideMotif}
                    alt={weddingConfig.couple.bride.fullName}
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                    onError={() => setBrideImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#252E23] text-[#B79A66] p-3 text-center">
                    <span className="font-serif-ar text-2xl font-bold mb-1">ياسمين</span>
                    <span className="font-serif-en text-[10px] uppercase tracking-widest text-[#E8D8BD]/60">
                      The Bride
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141914]/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Bride Typography */}
              <h3 className="font-serif-ar text-2xl sm:text-3xl md:text-3xl text-[#F8F4EC] font-bold tracking-wide">
                {weddingConfig.couple.bride.name}
              </h3>
              <p className="font-sans-ar text-xs sm:text-sm text-[#B79A66] mt-0.5 sm:mt-1 font-medium">
                {weddingConfig.couple.bride.fullName}
              </p>
            </div>

            <p className="font-serif-en italic text-xs text-[#E8D8BD]/60 mt-2 tracking-wider">
              Daughter of {weddingConfig.couple.bride.father}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
