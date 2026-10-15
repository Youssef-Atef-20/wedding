import { useRef, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { weddingConfig } from '../config/invitation';
import { Countdown } from './Countdown';
import { Calendar, Clock, BellRing, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const WeddingDate: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 80%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = () => {
    const startTime = new Date(weddingConfig.event.date).toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endTime = new Date(new Date(weddingConfig.event.date).getTime() + 5 * 3600 * 1000)
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, '');
    const title = encodeURIComponent(
      `حفل زفاف ${weddingConfig.couple.groom.name} & ${weddingConfig.couple.bride.name}`
    );
    const details = encodeURIComponent(
      `يسعدنا حضوركم لحفل زفافنا في ${weddingConfig.venue.name}.\nالعنوان: ${weddingConfig.venue.address}`
    );
    const location = encodeURIComponent(`${weddingConfig.venue.name}, ${weddingConfig.venue.address}`);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
  };

  // Generate and download .ics file for Apple Calendar / Outlook
  const downloadIcsFile = () => {
    const start = new Date(weddingConfig.event.date).toISOString().replace(/-|:|\.\d\d\d/g, '');
    const end = new Date(new Date(weddingConfig.event.date).getTime() + 5 * 3600 * 1000)
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, '');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wedding Invitation//AR',
      'BEGIN:VEVENT',
      `SUMMARY:حفل زفاف ${weddingConfig.couple.groom.name} & ${weddingConfig.couple.bride.name}`,
      `DESCRIPTION:حفل زفاف في ${weddingConfig.venue.name}`,
      `LOCATION:${weddingConfig.venue.name}, ${weddingConfig.venue.address}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'wedding-invitation.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <section
      ref={containerRef}
      id="wedding-date"
      aria-label="موعد الزفاف والعد التنازلي"
      className="relative min-h-[100dvh] w-full py-24 sm:py-32 md:py-40 px-4 md:px-8 flex flex-col items-center justify-center bg-gradient-to-b from-[#121712] via-[#1E251E] to-[#161D16] overflow-hidden"
    >
      {/* Decorative concentric rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-[#B79A66]/10 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[#B79A66]/15 rounded-full pointer-events-none" />

      <div ref={contentRef} className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B79A66]/10 border border-[#B79A66]/30 text-[#D8BD8A] text-xs font-sans-ar mb-6">
          <Calendar className="w-3.5 h-3.5 text-[#B79A66]" />
          <span>الموعد المنتظر</span>
        </div>

        {/* Date Announcement */}
        <h2 className="font-serif-ar text-4xl sm:text-5xl md:text-6xl text-[#F8F4EC] font-normal tracking-wide mb-3">
          {weddingConfig.event.dayOfWeekArabic}
        </h2>

        <div className="flex items-center justify-center gap-3 sm:gap-6 my-4">
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#B79A66]" />
          <p className="font-serif-ar text-3xl sm:text-4xl md:text-5xl text-[#E8D8BD] font-bold">
            {weddingConfig.event.dateArabicFormatted}
          </p>
          <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#B79A66]" />
        </div>

        {weddingConfig.event.hijriDateFormatted && (
          <p className="font-serif-ar text-sm sm:text-base text-[#B79A66] mb-6">
            الموافق {weddingConfig.event.hijriDateFormatted}
          </p>
        )}

        {/* Time Pill */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#252E23] border border-[#B79A66]/30 text-[#F8F4EC] text-sm sm:text-base font-sans-ar mb-12 shadow-inner">
          <Clock className="w-4 h-4 text-[#B79A66]" />
          <span>في تمام الساعة {weddingConfig.event.timeArabicFormatted}</span>
        </div>

        {/* Live Countdown Component */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-[#B79A66]" />
            <span className="font-sans-ar text-xs sm:text-sm text-[#E8D8BD]/80 tracking-wider">
              الوقت المتبقي حتى بداية الحفل
            </span>
            <Sparkles className="w-4 h-4 text-[#B79A66]" />
          </div>
          <Countdown targetDate={weddingConfig.event.date} />
        </div>

        {/* Add to Calendar Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#20261F] hover:bg-[#2C362A] text-[#F8F4EC] border border-[#B79A66]/40 text-xs sm:text-sm font-sans-ar transition-all duration-300 active:scale-95 shadow-md hover:border-[#B79A66]"
          >
            <span>أضف لتقويم Google</span>
            <div className="w-6 h-6 rounded-full bg-[#B79A66]/15 flex items-center justify-center text-[#B79A66]">
              <BellRing className="w-3.5 h-3.5" />
            </div>
          </a>

          <button
            type="button"
            onClick={downloadIcsFile}
            className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#20261F] hover:bg-[#2C362A] text-[#F8F4EC] border border-[#B79A66]/40 text-xs sm:text-sm font-sans-ar transition-all duration-300 active:scale-95 shadow-md hover:border-[#B79A66] cursor-pointer"
          >
            <span>حفظ في تقويم الهاتف (iCal)</span>
            <div className="w-6 h-6 rounded-full bg-[#B79A66]/15 flex items-center justify-center text-[#B79A66]">
              <Calendar className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
