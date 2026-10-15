import { useRef, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { weddingConfig } from '../config/invitation';
import {
  MapPin,
  Clock,
  Shirt,
  Navigation,
  Car,
  GlassWater,
  Heart,
  UtensilsCrossed,
  Cake,
} from 'lucide-react';
import { FloralCorner } from './FloralDecorations';

gsap.registerPlugin(ScrollTrigger);

export const WeddingDetails: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.from('.detail-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 25,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power2.out',
      });
    },
    { scope: containerRef }
  );

  const getTimelineIcon = (iconName: string) => {
    switch (iconName) {
      case 'welcome':
        return <GlassWater className="w-4 h-4 text-[#89927A]" />;
      case 'ceremony':
        return <Heart className="w-4 h-4 text-[#C6AA78]" />;
      case 'dinner':
        return <UtensilsCrossed className="w-4 h-4 text-[#89927A]" />;
      case 'celebration':
        return <Cake className="w-4 h-4 text-[#C6AA78]" />;
      default:
        return <Clock className="w-4 h-4 text-[#89927A]" />;
    }
  };

  return (
    <section
      ref={containerRef}
      id="wedding-details"
      aria-label="تفاصيل الحفل والموقع وبرنامج اليوم"
      className="relative min-h-[90dvh] w-full py-14 sm:py-20 md:py-28 px-3 sm:px-6 md:px-8 flex flex-col items-center justify-center bg-[#FFFDF8] overflow-hidden"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-[#F7F0E5]/50 rounded-full blur-3xl pointer-events-none" />

      {/* Header Eyebrow */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F7F0E5] border border-[#C6AA78]/40 text-[#48423C] text-xs font-sans-ar mb-2.5 shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-[#C6AA78]" />
          <span>المكان والمواعيد</span>
        </div>
        <h2 className="font-serif-ar text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#48423C] font-normal tracking-wide">
          تفاصيل حفل الزفاف
        </h2>
        <p className="font-serif-en italic text-xs sm:text-sm md:text-base text-[#9C8150] mt-1 tracking-widest">
          Venue, Schedule &amp; Etiquette
        </p>
      </div>

      <div
        ref={cardsRef}
        className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch"
      >
        {/* Venue Information Card */}
        <div className="detail-card stationery-card-outer flex flex-col justify-between shadow-xl">
          <div className="stationery-card-inner p-5 sm:p-7 md:p-8 flex flex-col justify-between h-full relative bg-[#FCFAF6]">
            <FloralCorner position="top-left" className="absolute top-2 left-2 w-7 h-7" />
            <FloralCorner position="bottom-right" className="absolute bottom-2 right-2 w-7 h-7" />

            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#F7F0E5] border border-[#C6AA78]/40 flex items-center justify-center text-[#9C8150] mb-4 shadow-sm">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#C6AA78]" />
              </div>

              <span className="font-serif-en text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#9C8150] block mb-1">
                THE VENUE
              </span>
              <h3 className="font-serif-ar text-xl sm:text-2xl md:text-3xl text-[#48423C] font-bold mb-2">
                {weddingConfig.venue.name}
              </h3>
              <p className="font-sans-ar text-xs sm:text-sm text-[#89927A] mb-1 font-semibold">
                {weddingConfig.venue.hall}
              </p>
              <p className="font-sans-ar text-xs sm:text-sm text-[#7A7269] leading-relaxed mb-4 sm:mb-6">
                {weddingConfig.venue.address}، {weddingConfig.venue.city}، {weddingConfig.venue.country}
              </p>

              {/* Valet Parking note */}
              {weddingConfig.venue.valetAvailable && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F7F0E5] border border-[#C6AA78]/30 text-[#48423C] text-[11px] sm:text-xs font-sans-ar mb-4 shadow-sm">
                  <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C6AA78]" />
                  <span>خدمة ركن السيارات (Valet Parking) متاحة لراحتكم</span>
                </div>
              )}
            </div>

            {/* Google Maps Button with Button-in-Button Pattern */}
            <div className="pt-4 border-t border-[#C6AA78]/25">
              <a
                href={weddingConfig.venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full inline-flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#C6AA78] hover:bg-[#DFC89E] text-[#48423C] font-semibold font-sans-ar text-xs sm:text-sm transition-all duration-300 active:scale-[0.98] shadow-md cursor-pointer"
              >
                <span>فتح الموقع في خرائط Google</span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/40 flex items-center justify-center group-hover:translate-x-[-2px] transition-transform">
                  <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#48423C]" />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Dress Code & Program Timeline Card */}
        <div className="detail-card stationery-card-outer flex flex-col justify-between shadow-xl">
          <div className="stationery-card-inner p-5 sm:p-7 md:p-8 flex flex-col justify-between h-full relative bg-[#FCFAF6]">
            <FloralCorner position="top-right" className="absolute top-2 right-2 w-7 h-7" />
            <FloralCorner position="bottom-left" className="absolute bottom-2 left-2 w-7 h-7" />

            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#F7F0E5] border border-[#C6AA78]/40 flex items-center justify-center text-[#9C8150] mb-4 shadow-sm">
                <Shirt className="w-5 h-5 sm:w-6 sm:h-6 text-[#C6AA78]" />
              </div>

              <span className="font-serif-en text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#9C8150] block mb-1">
                DRESS CODE
              </span>
              <h3 className="font-serif-ar text-xl sm:text-2xl md:text-3xl text-[#48423C] font-bold mb-2">
                {weddingConfig.messages.dressCode.title}
              </h3>
              <p className="font-sans-ar text-xs sm:text-sm text-[#7A7269] leading-relaxed mb-2">
                {weddingConfig.messages.dressCode.description}
              </p>
              <p className="font-sans-ar text-[11px] sm:text-xs text-[#9C8150] italic mb-4">
                * {weddingConfig.messages.dressCode.colorsNote}
              </p>
            </div>

            {/* Event Timeline */}
            <div className="pt-4 border-t border-[#C6AA78]/25">
              <span className="font-serif-en text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#89927A] block mb-2.5 font-semibold">
                PROGRAM SCHEDULE • برنامج الحفل
              </span>
              <div className="space-y-2.5 sm:space-y-3">
                {weddingConfig.timeline.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-xl bg-[#FFFDF8] border border-[#C6AA78]/20 shadow-sm"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F7F0E5] border border-[#C6AA78]/30 flex items-center justify-center shrink-0">
                      {getTimelineIcon(item.icon)}
                    </div>
                    <div className="flex-1 text-right">
                      <p className="font-sans-ar text-xs font-semibold text-[#48423C]">
                        {item.title}
                      </p>
                      <p className="font-sans-ar text-[10px] sm:text-[11px] text-[#7A7269]">
                        {item.description}
                      </p>
                    </div>
                    <span className="font-sans-ar text-[11px] sm:text-xs text-[#9C8150] font-semibold shrink-0">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
