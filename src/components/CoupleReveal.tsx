import { useRef, useState, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { weddingConfig } from '../config/invitation';
import { Heart } from 'lucide-react';
import { BotanicalDivider, FloralCorner } from './FloralDecorations';

gsap.registerPlugin(ScrollTrigger);

export const CoupleReveal: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const groomBlockRef = useRef<HTMLDivElement>(null);
  const brideBlockRef = useRef<HTMLDivElement>(null);
  const centerSymbolRef = useRef<HTMLDivElement>(null);
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
          mainCardRef.current,
          {
            scale: 0.97,
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.2'
        )
        .from(
          groomBlockRef.current,
          {
            x: 20,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        .from(
          centerSymbolRef.current,
          {
            scale: 0.6,
            opacity: 0,
            duration: 0.4,
            ease: 'back.out(1.5)',
          },
          '-=0.3'
        )
        .from(
          brideBlockRef.current,
          {
            x: -20,
            opacity: 0,
            duration: 0.5,
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
      className="relative w-full py-12 sm:py-16 md:py-24 px-3 sm:px-6 md:px-8 flex flex-col items-center justify-center overflow-hidden bg-[#FFFDF8]"
    >
      {/* Background Soft Champagne Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#F7F0E5]/70 rounded-full blur-3xl pointer-events-none" />

      {/* Section Eyebrow & Intro */}
      <div ref={headingRef} className="relative z-10 text-center max-w-xl mx-auto mb-6 sm:mb-10">
        <span className="font-serif-en text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#9C8150] block mb-1">
          THE BRIDE &amp; GROOM
        </span>
        <h2 className="font-serif-ar text-2xl sm:text-3xl md:text-4xl text-[#48423C] font-normal tracking-wide">
          معاً نبدأ فصلاً جديداً من الحكاية
        </h2>
        <BotanicalDivider className="w-36 sm:w-48 mx-auto my-2" />
        <p className="font-sans-ar text-xs sm:text-sm text-[#7A7269] leading-relaxed px-2">
          بقلوب راضية وعزيمة صادقة، نجمع بين عائلتينا بالمودة والوئام
        </p>
      </div>

      {/* Cohesive Floral Composition Container (Replacing the two heavy dark cards) */}
      <div
        ref={mainCardRef}
        className="stationery-card-outer relative z-10 w-full max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto shadow-xl"
      >
        <div className="stationery-card-inner p-5 sm:p-8 md:p-10 relative overflow-hidden bg-[#FCFAF6]">
          {/* Delicate Floral Corner Accents */}
          <FloralCorner position="top-left" className="absolute top-3 left-3 w-8 h-8 sm:w-10 sm:h-10" />
          <FloralCorner position="top-right" className="absolute top-3 right-3 w-8 h-8 sm:w-10 sm:h-10" />
          <FloralCorner position="bottom-left" className="absolute bottom-3 left-3 w-8 h-8 sm:w-10 sm:h-10" />
          <FloralCorner position="bottom-right" className="absolute bottom-3 right-3 w-8 h-8 sm:w-10 sm:h-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
            {/* Groom Wing */}
            <div
              ref={groomBlockRef}
              className="flex flex-col items-center text-center p-3 sm:p-5 rounded-2xl bg-gradient-to-b from-white/80 to-[#F7F0E5]/40 border border-[#C6AA78]/20 shadow-sm"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#F7F0E5] border border-[#C6AA78]/40 text-[#48423C] text-[11px] sm:text-xs font-sans-ar mb-3">
                <span>{weddingConfig.couple.groom.title}</span>
              </div>

              {/* White Rose Boutonniere Botanical Motif */}
              <div className="relative w-24 h-28 xs:w-28 xs:h-32 sm:w-32 sm:h-36 rounded-xl overflow-hidden mb-3 border border-[#C6AA78]/35 shadow-md bg-[#FFFDF8]">
                {!groomImgError ? (
                  <img
                    src={weddingConfig.photos.groomMotif}
                    alt={weddingConfig.couple.groom.fullName}
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-out hover:scale-105"
                    loading="lazy"
                    onError={() => setGroomImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#F7F0E5] text-[#48423C] p-2">
                    <span className="font-serif-ar text-2xl font-bold">عمر</span>
                    <span className="font-serif-en text-[9px] uppercase tracking-widest text-[#9C8150]">
                      The Groom
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#48423C]/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Groom Typography */}
              <h3 className="font-serif-ar text-2xl sm:text-3xl text-[#48423C] font-bold tracking-wide">
                {weddingConfig.couple.groom.name}
              </h3>
              <p className="font-sans-ar text-xs sm:text-sm text-[#9C8150] mt-0.5 font-medium">
                {weddingConfig.couple.groom.fullName}
              </p>
              <div className="w-12 h-[1px] bg-[#C6AA78]/40 my-2" />
              <p className="font-serif-en italic text-xs text-[#7A7269] tracking-wider">
                Son of {weddingConfig.couple.groom.father}
              </p>
            </div>

            {/* Central Floral Divider & Ampersand Heart */}
            <div
              ref={centerSymbolRef}
              className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#FFFDF8] border-2 border-[#C6AA78] shadow-lg z-20 items-center justify-center text-[#48423C]"
            >
              <Heart className="w-5 h-5 text-[#C6AA78] fill-[#F2DFDE]" />
            </div>

            {/* Mobile Separator */}
            <div className="flex md:hidden items-center justify-center gap-3 my-[-4px]">
              <div className="h-[1px] w-14 bg-gradient-to-r from-transparent to-[#C6AA78]/50" />
              <div className="w-8 h-8 rounded-full bg-[#FFFDF8] border border-[#C6AA78] flex items-center justify-center shadow-sm">
                <Heart className="w-4 h-4 text-[#C6AA78] fill-[#F2DFDE]" />
              </div>
              <div className="h-[1px] w-14 bg-gradient-to-l from-transparent to-[#C6AA78]/50" />
            </div>

            {/* Bride Wing (100% Modest & Elegant Islamic Bridal Rose Bouquet Motif) */}
            <div
              ref={brideBlockRef}
              className="flex flex-col items-center text-center p-3 sm:p-5 rounded-2xl bg-gradient-to-b from-white/80 to-[#F2DFDE]/30 border border-[#C6AA78]/20 shadow-sm"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#F2DFDE]/60 border border-[#C6AA78]/40 text-[#48423C] text-[11px] sm:text-xs font-sans-ar mb-3">
                <span>{weddingConfig.couple.bride.title}</span>
              </div>

              {/* White Rose Bridal Bouquet Motif */}
              <div className="relative w-24 h-28 xs:w-28 xs:h-32 sm:w-32 sm:h-36 rounded-xl overflow-hidden mb-3 border border-[#C6AA78]/35 shadow-md bg-[#FFFDF8]">
                {!brideImgError ? (
                  <img
                    src={weddingConfig.photos.brideMotif}
                    alt={weddingConfig.couple.bride.fullName}
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-out hover:scale-105"
                    loading="lazy"
                    onError={() => setBrideImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#F7F0E5] text-[#48423C] p-2">
                    <span className="font-serif-ar text-2xl font-bold">ياسمين</span>
                    <span className="font-serif-en text-[9px] uppercase tracking-widest text-[#9C8150]">
                      The Bride
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#48423C]/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Bride Typography */}
              <h3 className="font-serif-ar text-2xl sm:text-3xl text-[#48423C] font-bold tracking-wide">
                {weddingConfig.couple.bride.name}
              </h3>
              <p className="font-sans-ar text-xs sm:text-sm text-[#9C8150] mt-0.5 font-medium">
                {weddingConfig.couple.bride.fullName}
              </p>
              <div className="w-12 h-[1px] bg-[#C6AA78]/40 my-2" />
              <p className="font-serif-en italic text-xs text-[#7A7269] tracking-wider">
                Daughter of {weddingConfig.couple.bride.father}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
