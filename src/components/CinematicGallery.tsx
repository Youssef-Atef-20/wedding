import { useRef, useState, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { weddingConfig } from '../config/invitation';
import { Sparkles, Camera } from 'lucide-react';

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

      // Natural entrance animation without delaying native scrolling
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.from(heroCardRef.current, {
        scale: 0.96,
        opacity: 0.5,
        y: 35,
        duration: 0.7,
        ease: 'power2.out',
      })
        .from(
          quoteRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3'
        )
        .from(
          '.gallery-sub-item',
          {
            y: 30,
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
      aria-label="معرض الصور والتفاصيل المعمارية"
      className="relative min-h-[90dvh] w-full py-16 sm:py-24 md:py-32 px-4 md:px-8 flex flex-col items-center justify-center bg-[#121712] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#B79A66]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#45483B]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Eyebrow */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B79A66]/10 border border-[#B79A66]/25 text-[#D8BD8A] text-xs font-sans-ar mb-2.5 sm:mb-3">
          <Camera className="w-3.5 h-3.5 text-[#B79A66]" />
          <span>أجواء الحفل والذاكرة</span>
        </div>
        <h2 className="font-serif-ar text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#F8F4EC] font-normal tracking-wide">
          لحظات كُتبت لتبقى خالدة
        </h2>
        <p className="font-serif-en italic text-xs sm:text-sm md:text-base text-[#B79A66] mt-1.5 tracking-widest">
          A Glimpse into the Royal Atmosphere
        </p>
      </div>

      {/* Main Large Editorial Architecture Card */}
      <div
        ref={heroCardRef}
        className="bezel-card-outer relative z-10 w-full max-w-5xl mx-auto overflow-hidden shadow-2xl mb-8 sm:mb-12"
      >
        <div className="bezel-card-inner relative w-full h-[280px] sm:h-[400px] md:h-[500px] overflow-hidden flex items-end p-5 sm:p-8 md:p-12">
          {!failedImages['hero-gallery'] ? (
            <img
              src={weddingConfig.photos.hero}
              alt="العمارة التاريخية لقصر البارون"
              className="absolute inset-0 w-full h-full object-cover object-center scale-102 transition-transform duration-700 ease-out"
              loading="lazy"
              onError={() => handleImageError('hero-gallery')}
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-[#1E251E] flex flex-col items-center justify-center p-6 text-center">
              <Sparkles className="w-10 h-10 text-[#B79A66] mb-2" />
              <p className="font-serif-ar text-2xl text-[#E8D8BD]">عمر &amp; ياسمين</p>
              <p className="font-serif-en text-xs text-[#B79A66] tracking-widest uppercase mt-1">
                Eternity Begins Here
              </p>
            </div>
          )}

          {/* Cinematic Gradient Scrim for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121712] via-[#121712]/45 to-transparent pointer-events-none" />

          {/* Editorial Caption on Image */}
          <div ref={quoteRef} className="relative z-10 max-w-xl text-right">
            <span className="font-serif-en text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#D8BD8A] block mb-1.5 sm:mb-2">
              HISTORIC SPLENDOR
            </span>
            <p className="font-serif-ar text-xl sm:text-2xl md:text-3xl text-[#F8F4EC] leading-snug font-normal drop-shadow">
              "وفي رحاب الأصالة والمودة، تكتمل فرحتنا بوجودكم معنا"
            </p>
            <div className="w-10 sm:w-12 h-[2px] bg-[#B79A66] mt-2.5 sm:mt-3" />
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
            className="gallery-sub-item bezel-card-outer group hover:scale-[1.01] transition-transform duration-300 ease-out"
          >
            <div className="bezel-card-inner p-3 sm:p-4 flex flex-col">
              <div className="relative w-full h-52 sm:h-64 rounded-xl overflow-hidden mb-3 sm:mb-4 bg-[#1E251E]">
                {!failedImages[item.id] ? (
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                    onError={() => handleImageError(item.id)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#252E23] text-[#B79A66] text-center p-4">
                    <span className="font-serif-ar text-base sm:text-lg">{item.caption}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141914]/80 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="text-right px-1.5 sm:px-2 pb-1.5 sm:pb-2">
                <p className="font-serif-ar text-base sm:text-lg text-[#F8F4EC] font-medium">
                  {item.caption}
                </p>
                <p className="font-sans-ar text-[11px] sm:text-xs text-[#B79A66] mt-0.5 sm:mt-1">
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
