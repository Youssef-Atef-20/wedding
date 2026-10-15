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

      // Parallax zoom and text entrance for hero photography
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1.2,
        },
      });

      tl.from(heroCardRef.current, {
        scale: 0.92,
        opacity: 0.4,
        y: 60,
        ease: 'none',
      })
        .to(quoteRef.current, {
          y: -30,
          opacity: 1,
          ease: 'power1.out',
        }, 0)
        .from('.gallery-sub-item', {
          y: 80,
          opacity: 0.2,
          stagger: 0.2,
          ease: 'power1.out',
        }, 0.2);
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="cinematic-gallery"
      aria-label="معرض الصور السينمائي"
      className="relative min-h-[100dvh] w-full py-24 sm:py-32 md:py-40 px-4 md:px-8 flex flex-col items-center justify-center bg-[#121712] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#B79A66]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#45483B]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Eyebrow */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B79A66]/10 border border-[#B79A66]/25 text-[#D8BD8A] text-xs font-sans-ar mb-3">
          <Camera className="w-3.5 h-3.5 text-[#B79A66]" />
          <span>لقطات من الذاكرة</span>
        </div>
        <h2 className="font-serif-ar text-3xl sm:text-4xl md:text-5xl text-[#F8F4EC] font-normal tracking-wide">
          لحظات كُتبت لتبقى خالدة
        </h2>
        <p className="font-serif-en italic text-sm sm:text-base text-[#B79A66] mt-2 tracking-widest">
          A Cinematic Glimpse into Our Journey
        </p>
      </div>

      {/* Main Large Editorial Photography Card */}
      <div
        ref={heroCardRef}
        className="bezel-card-outer relative z-10 w-full max-w-5xl mx-auto overflow-hidden shadow-2xl mb-12 sm:mb-16"
      >
        <div className="bezel-card-inner relative w-full h-[360px] sm:h-[480px] md:h-[580px] overflow-hidden flex items-end p-6 sm:p-10 md:p-14">
          {!failedImages['hero-gallery'] ? (
            <img
              src={weddingConfig.photos.hero}
              alt="صورة سينمائية للعروسين"
              className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
              loading="lazy"
              onError={() => handleImageError('hero-gallery')}
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-[#1E251E] flex flex-col items-center justify-center p-6 text-center">
              <Sparkles className="w-12 h-12 text-[#B79A66] mb-3" />
              <p className="font-serif-ar text-2xl text-[#E8D8BD]">عمر &amp; ياسمين</p>
              <p className="font-serif-en text-xs text-[#B79A66] tracking-widest uppercase mt-1">
                Eternity Begins Here
              </p>
            </div>
          )}

          {/* Deep Cinematic Gradient Overlay for contrast and readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121712] via-[#121712]/40 to-transparent pointer-events-none" />

          {/* Editorial Caption on Image */}
          <div ref={quoteRef} className="relative z-10 max-w-xl text-right">
            <span className="font-serif-en text-xs tracking-[0.25em] uppercase text-[#D8BD8A] block mb-2">
              CHAPTER ONE
            </span>
            <p className="font-serif-ar text-2xl sm:text-3xl md:text-4xl text-[#F8F4EC] leading-snug font-normal drop-shadow">
              "وفي تفاصيلكِ أجد سكينتي، ومعكِ تبدأ أجمل الحكايات"
            </p>
            <div className="w-12 h-[2px] bg-[#B79A66] mt-3" />
          </div>
        </div>
      </div>

      {/* Secondary Staggered Editorial Photos Grid */}
      <div
        ref={gridContainerRef}
        className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        {weddingConfig.photos.gallery.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className="gallery-sub-item bezel-card-outer group hover:scale-[1.02] transition-transform duration-500 ease-out"
          >
            <div className="bezel-card-inner p-3 sm:p-4 flex flex-col">
              <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden mb-4 bg-[#1E251E]">
                {!failedImages[item.id] ? (
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                    onError={() => handleImageError(item.id)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#252E23] text-[#B79A66] text-center p-4">
                    <span className="font-serif-ar text-lg">{item.caption}</span>
                  </div>
                )}
                {/* Subtle dark bottom scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141914]/80 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="text-right px-2 pb-2">
                <p className="font-serif-ar text-lg text-[#F8F4EC] font-medium">
                  {item.caption}
                </p>
                <p className="font-sans-ar text-xs text-[#B79A66] mt-1">
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
