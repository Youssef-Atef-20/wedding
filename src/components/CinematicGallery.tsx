import { useRef, useState, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { weddingConfig } from '../config/invitation';
import { Sparkles, Camera } from 'lucide-react';
import { BotanicalDivider, FloralCorner } from './FloralDecorations';

gsap.registerPlugin(ScrollTrigger);

export const CinematicGallery: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

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

      tl.from(heroCardRef.current, {
        scale: 0.97,
        opacity: 0,
        y: 25,
        duration: 0.7,
        ease: 'power2.out',
      })
        .from(
          quoteRef.current,
          {
            y: 15,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        .from(
          '.gallery-sub-item',
          {
            y: 25,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.2'
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="cinematic-gallery"
      aria-label="معرض الصور والأجواء الزهرية"
      className="relative min-h-[90dvh] w-full py-14 sm:py-20 md:py-28 px-3 sm:px-6 md:px-8 flex flex-col items-center justify-center bg-[#FFFDF8] overflow-hidden"
    >
      {/* Background Ambient Illumination */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#F7F0E5]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#F2DFDE]/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header Eyebrow */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F7F0E5] border border-[#C6AA78]/40 text-[#48423C] text-xs font-sans-ar mb-2.5 shadow-sm">
          <Camera className="w-3.5 h-3.5 text-[#C6AA78]" />
          <span>أجواء الحفل والذاكرة</span>
        </div>
        <h2 className="font-serif-ar text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#48423C] font-normal tracking-wide">
          لحظات كُتبت لتبقى خالدة
        </h2>
        <BotanicalDivider className="w-32 sm:w-44 mx-auto my-2" />
        <p className="font-serif-en italic text-xs sm:text-sm md:text-base text-[#9C8150] tracking-widest">
          A Glimpse into the Floral Royal Splendor
        </p>
      </div>

      {/* Main Large Editorial Architecture & Floral Card */}
      <div
        ref={heroCardRef}
        className="stationery-card-outer relative z-10 w-full max-w-5xl mx-auto overflow-hidden shadow-xl mb-8 sm:mb-12"
      >
        <div className="stationery-card-inner relative w-full h-[280px] sm:h-[400px] md:h-[480px] overflow-hidden flex items-end p-5 sm:p-8 md:p-12 bg-[#FAF6F0]">
          {!failedImages['hero-gallery'] ? (
            <img
              src={weddingConfig.photos.hero}
              alt="العروسان عمر وياسمين معاً تحت قوس الزهور الملكي"
              className="absolute inset-0 w-full h-full object-cover object-[center_20%] scale-102 transition-transform duration-700 ease-out hover:scale-105"
              loading="lazy"
              onError={() => handleImageError('hero-gallery')}
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-[#F7F0E5] flex flex-col items-center justify-center p-6 text-center">
              <Sparkles className="w-10 h-10 text-[#C6AA78] mb-2" />
              <p className="font-serif-ar text-2xl text-[#48423C]">عمر &amp; ياسمين</p>
              <p className="font-serif-en text-xs text-[#9C8150] tracking-widest uppercase mt-1">
                Eternity Begins Here
              </p>
            </div>
          )}

          {/* Elegant Scrim for Typographic Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#48423C]/80 via-[#48423C]/30 to-transparent pointer-events-none" />

          {/* Editorial Caption on Image */}
          <div ref={quoteRef} className="relative z-10 max-w-xl text-right text-white">
            <span className="font-serif-en text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#DFC89E] block mb-1.5 font-medium">
              OMAR &amp; YASMIN • لحظات العمر
            </span>
            <p className="font-serif-ar text-xl sm:text-2xl md:text-3xl leading-snug font-normal drop-shadow">
              "وفي رحاب الأصالة والزهور البيضاء، تكتمل فرحتنا بوجودكم معنا"
            </p>
            <div className="w-12 h-[2px] bg-[#C6AA78] mt-2.5" />
          </div>
        </div>
      </div>

      {/* Secondary Staggered Editorial Details Grid */}
      <div
        ref={gridContainerRef}
        className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8"
      >
        {weddingConfig.photos.gallery.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className="gallery-sub-item stationery-card-outer group hover:scale-[1.02] transition-transform duration-300 ease-out shadow-md"
          >
            <div className="stationery-card-inner p-3.5 sm:p-4 flex flex-col bg-[#FCFAF6] relative">
              <FloralCorner position="top-right" className="absolute top-2 right-2 w-6 h-6 opacity-40" />

              <div className="relative w-full h-52 sm:h-64 rounded-xl overflow-hidden mb-3 bg-[#F7F0E5] border border-[#C6AA78]/25">
                {!failedImages[item.id] ? (
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                    onError={() => handleImageError(item.id)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#F7F0E5] text-[#48423C] text-center p-4">
                    <span className="font-serif-ar text-base sm:text-lg">{item.caption}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#48423C]/25 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="text-right px-1.5 pb-1">
                <p className="font-serif-ar text-base sm:text-lg text-[#48423C] font-semibold">
                  {item.caption}
                </p>
                <p className="font-sans-ar text-[11px] sm:text-xs text-[#89927A] mt-0.5">
                  {item.alt}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
