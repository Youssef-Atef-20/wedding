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
  Music,
  UtensilsCrossed,
  Cake,
} from 'lucide-react';

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
        y: 30,
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
        return <GlassWater className="w-4 h-4 text-[#B79A66]" />;
      case 'ceremony':
        return <Music className="w-4 h-4 text-[#B79A66]" />;
      case 'dinner':
        return <UtensilsCrossed className="w-4 h-4 text-[#B79A66]" />;
      case 'celebration':
        return <Cake className="w-4 h-4 text-[#B79A66]" />;
      default:
        return <Clock className="w-4 h-4 text-[#B79A66]" />;
    }
  };

  return (
    <section
      ref={containerRef}
      id="wedding-details"
      aria-label="تفاصيل الحفل والموقع"
      className="relative min-h-[90dvh] w-full py-16 sm:py-24 md:py-32 px-4 md:px-8 flex flex-col items-center justify-center bg-gradient-to-b from-[#161D16] via-[#1E251E] to-[#141914] overflow-hidden"
    >
      {/* Header Eyebrow */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B79A66]/10 border border-[#B79A66]/30 text-[#D8BD8A] text-xs font-sans-ar mb-2.5 sm:mb-3">
          <MapPin className="w-3.5 h-3.5 text-[#B79A66]" />
          <span>المكان والمواعيد</span>
        </div>
        <h2 className="font-serif-ar text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#F8F4EC] font-normal tracking-wide">
          تفاصيل حفل الزفاف
        </h2>
        <p className="font-serif-en italic text-xs sm:text-sm md:text-base text-[#B79A66] mt-1.5 tracking-widest">
          Venue, Schedule &amp; Etiquette
        </p>
      </div>

      <div
        ref={cardsRef}
        className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch"
      >
        {/* Venue Information Card */}
        <div className="detail-card bezel-card-outer flex flex-col justify-between">
          <div className="bezel-card-inner p-5 sm:p-7 md:p-8 flex flex-col justify-between h-full relative">
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#B79A66]/15 border border-[#B79A66]/30 flex items-center justify-center text-[#B79A66] mb-4 sm:mb-6">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <span className="font-serif-en text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B79A66] block mb-1">
                THE VENUE
              </span>
              <h3 className="font-serif-ar text-xl sm:text-2xl md:text-3xl text-[#F8F4EC] font-bold mb-2">
                {weddingConfig.venue.name}
              </h3>
              <p className="font-sans-ar text-xs sm:text-sm text-[#E8D8BD] mb-1 font-medium">
                {weddingConfig.venue.hall}
              </p>
              <p className="font-sans-ar text-xs sm:text-sm text-[#F8F4EC]/70 leading-relaxed mb-4 sm:mb-6">
                {weddingConfig.venue.address}، {weddingConfig.venue.city}، {weddingConfig.venue.country}
              </p>

              {/* Valet Parking note */}
              {weddingConfig.venue.valetAvailable && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#283226] border border-[#B79A66]/20 text-[#E8D8BD] text-[11px] sm:text-xs font-sans-ar mb-4 sm:mb-6">
                  <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B79A66]" />
                  <span>خدمة ركن السيارات (Valet Parking) متاحة لراحتكم</span>
                </div>
              )}
            </div>

            {/* Google Maps Button with Button-in-Button Pattern */}
            <div className="pt-4 border-t border-[#B79A66]/20">
              <a
                href={weddingConfig.venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full inline-flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#B79A66] hover:bg-[#D8BD8A] text-[#1E251E] font-medium font-sans-ar text-xs sm:text-sm transition-all duration-300 active:scale-[0.98] shadow-lg cursor-pointer"
              >
                <span>فتح الموقع في خرائط Google</span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1E251E]/15 flex items-center justify-center group-hover:translate-x-[-2px] transition-transform">
                  <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1E251E]" />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Dress Code & Program Card */}
        <div className="detail-card bezel-card-outer flex flex-col justify-between">
          <div className="bezel-card-inner p-5 sm:p-7 md:p-8 flex flex-col justify-between h-full relative">
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#B79A66]/15 border border-[#B79A66]/30 flex items-center justify-center text-[#B79A66] mb-4 sm:mb-6">
                <Shirt className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <span className="font-serif-en text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#B79A66] block mb-1">
                DRESS CODE
              </span>
              <h3 className="font-serif-ar text-xl sm:text-2xl md:text-3xl text-[#F8F4EC] font-bold mb-2">
                {weddingConfig.messages.dressCode.title}
              </h3>
              <p className="font-sans-ar text-xs sm:text-sm text-[#F8F4EC]/80 leading-relaxed mb-2">
                {weddingConfig.messages.dressCode.description}
              </p>
              <p className="font-sans-ar text-[11px] sm:text-xs text-[#D8BD8A] italic mb-4 sm:mb-6">
                * {weddingConfig.messages.dressCode.colorsNote}
              </p>
            </div>

            {/* Event Timeline */}
            <div className="pt-4 border-t border-[#B79A66]/20">
              <span className="font-serif-en text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#B79A66] block mb-2.5 sm:mb-3">
                PROGRAM SCHEDULE
              </span>
              <div className="space-y-2.5 sm:space-y-3">
                {weddingConfig.timeline.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-xl bg-[#252E23]/60 border border-[#B79A66]/10"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#B79A66]/10 flex items-center justify-center shrink-0">
                      {getTimelineIcon(item.icon)}
                    </div>
                    <div className="flex-1 text-right">
                      <p className="font-sans-ar text-xs font-semibold text-[#F8F4EC]">
                        {item.title}
                      </p>
                      <p className="font-sans-ar text-[10px] sm:text-[11px] text-[#E8D8BD]/70">
                        {item.description}
                      </p>
                    </div>
                    <span className="font-sans-ar text-[11px] sm:text-xs text-[#B79A66] font-medium shrink-0">
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
