import { useRef, useState, type FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { weddingConfig } from '../config/invitation';
import { Countdown } from './Countdown';
import { Calendar, Clock, BellRing, Sparkles, Check, Download } from 'lucide-react';
import { FloralCorner } from './FloralDecorations';

gsap.registerPlugin(ScrollTrigger);

export const WeddingDate: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [downloaded, setDownloaded] = useState(false);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    },
    { scope: containerRef }
  );

  // Helper to format ISO date to UTC string format required by calendar standards (YYYYMMDDTHHmmssZ)
  const formatUtcDateString = (dateStr: string): string => {
    const d = new Date(dateStr);
    return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  };

  // Generate Google Calendar URL with exact event details, timezone, and location
  const getGoogleCalendarUrl = (): string => {
    const startUtc = formatUtcDateString(weddingConfig.event.date);
    const endUtc = formatUtcDateString(weddingConfig.event.endDate);

    const title = encodeURIComponent(
      `حفل زفاف ${weddingConfig.couple.groom.name} & ${weddingConfig.couple.bride.name}`
    );
    const location = encodeURIComponent(
      `${weddingConfig.venue.name}، ${weddingConfig.venue.address}، ${weddingConfig.venue.city}`
    );
    const details = encodeURIComponent(
      `يسرنا دعوتكم لحضور حفل زفاف ${weddingConfig.couple.groom.fullName} و ${weddingConfig.couple.bride.fullName}.\n\n` +
      `المكان: ${weddingConfig.venue.name} - ${weddingConfig.venue.hall}\n` +
      `العنوان: ${weddingConfig.venue.address}، ${weddingConfig.venue.city}، ${weddingConfig.venue.country}\n` +
      `الموعد: ${weddingConfig.event.dayOfWeekArabic}، ${weddingConfig.event.dateArabicFormatted} في تمام الساعة ${weddingConfig.event.timeArabicFormatted}.\n\n` +
      `حضوركم يسعدنا ويشرفنا!`
    );

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startUtc}/${endUtc}&details=${details}&location=${location}&ctz=${encodeURIComponent(weddingConfig.event.timezone)}`;
  };

  // Generate and download .ics file for Apple Calendar, Outlook, and native devices
  const downloadIcsFile = () => {
    const startUtc = formatUtcDateString(weddingConfig.event.date);
    const endUtc = formatUtcDateString(weddingConfig.event.endDate);
    const nowUtc = formatUtcDateString(new Date().toISOString());

    const summary = `حفل زفاف ${weddingConfig.couple.groom.name} & ${weddingConfig.couple.bride.name}`;
    const description = `يسرنا دعوتكم لحضور حفل زفاف ${weddingConfig.couple.groom.fullName} و ${weddingConfig.couple.bride.fullName}. المكان: ${weddingConfig.venue.name} - ${weddingConfig.venue.hall}. العنوان: ${weddingConfig.venue.address}.`;
    const location = `${weddingConfig.venue.name}, ${weddingConfig.venue.address}, ${weddingConfig.venue.city}`;

    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Luxury Floral Wedding Invitation//AR',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:wedding-${Date.parse(weddingConfig.event.date)}@palace.invitation`,
      `DTSTAMP:${nowUtc}`,
      `DTSTART:${startUtc}`,
      `DTEND:${endUtc}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ];

    const icsContent = icsLines.join('\r\n');
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `wedding-${weddingConfig.couple.monogramLatin}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3500);
  };

  return (
    <section
      ref={containerRef}
      id="wedding-date"
      aria-label="موعد الزفاف والعد التنازلي وإضافة للتقويم"
      className="relative min-h-[90dvh] w-full py-14 sm:py-20 md:py-28 px-3 sm:px-6 md:px-8 flex flex-col items-center justify-center bg-[#FFFDF8] overflow-hidden"
    >
      {/* Background Floral Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] bg-[#F7F0E5]/50 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative concentric rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] border border-[#C6AA78]/15 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] border border-[#89927A]/15 rounded-full pointer-events-none" />

      <div ref={contentRef} className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F7F0E5] border border-[#C6AA78]/40 text-[#48423C] text-xs font-sans-ar mb-4 shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-[#C6AA78]" />
          <span>الموعد المنتظر</span>
        </div>

        {/* Date Announcement */}
        <h2 className="font-serif-ar text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#48423C] font-normal tracking-wide mb-2">
          {weddingConfig.event.dayOfWeekArabic}
        </h2>

        <div className="flex items-center justify-center gap-3 sm:gap-6 my-2 sm:my-3">
          <div className="h-[1px] w-8 sm:w-16 md:w-20 bg-gradient-to-r from-transparent to-[#C6AA78]" />
          <p className="font-serif-ar text-2xl sm:text-4xl md:text-5xl text-[#9C8150] font-bold">
            {weddingConfig.event.dateArabicFormatted}
          </p>
          <div className="h-[1px] w-8 sm:w-16 md:w-20 bg-gradient-to-l from-transparent to-[#C6AA78]" />
        </div>

        {weddingConfig.event.hijriDateFormatted && (
          <p className="font-serif-ar text-xs sm:text-sm md:text-base text-[#89927A] mb-4 font-medium">
            الموافق {weddingConfig.event.hijriDateFormatted}
          </p>
        )}

        {/* Time Pill */}
        <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#F7F0E5] border border-[#C6AA78]/35 text-[#48423C] text-xs sm:text-sm md:text-base font-sans-ar mb-8 sm:mb-12 shadow-sm">
          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C6AA78]" />
          <span>في تمام الساعة {weddingConfig.event.timeArabicFormatted}</span>
        </div>

        {/* Live Countdown Component */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#C6AA78]" />
            <span className="font-sans-ar text-xs sm:text-sm text-[#7A7269] tracking-wider font-medium">
              الوقت المتبقي حتى بداية الحفل
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#C6AA78]" />
          </div>
          <Countdown targetDate={weddingConfig.event.date} />
        </div>

        {/* Calendar Save The Date Actions Card */}
        <div className="stationery-card-outer max-w-xl mx-auto p-1 text-center shadow-xl">
          <div className="stationery-card-inner p-5 sm:p-7 md:p-8 flex flex-col items-center bg-[#FCFAF6] relative overflow-hidden">
            <FloralCorner position="top-left" className="absolute top-2 left-2 w-7 h-7" />
            <FloralCorner position="top-right" className="absolute top-2 right-2 w-7 h-7" />

            <div className="inline-flex items-center gap-1.5 text-[#89927A] text-xs font-sans-ar mb-1 font-semibold">
              <BellRing className="w-3.5 h-3.5 text-[#C6AA78]" />
              <span>احفظ موعد الحفل في تقويمك</span>
            </div>
            <p className="font-serif-ar text-lg sm:text-xl text-[#48423C] mb-5">
              يسعدنا تواجدكم معنا، لا تفوّتوا لحظة الفرح
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
              {/* Option A: Google Calendar Link */}
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-[#C6AA78] hover:bg-[#DFC89E] text-[#48423C] font-semibold font-sans-ar text-xs sm:text-sm transition-all duration-300 active:scale-[0.98] shadow-md cursor-pointer"
              >
                <span>أضف إلى تقويم Google</span>
                <div className="w-6 h-6 rounded-full bg-white/40 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Calendar className="w-3.5 h-3.5 text-[#48423C]" />
                </div>
              </a>

              {/* Option B: Download .ics Calendar File */}
              <button
                type="button"
                onClick={downloadIcsFile}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-[#F7F0E5] hover:bg-[#F2DFDE]/70 text-[#48423C] border border-[#C6AA78]/40 font-semibold font-sans-ar text-xs sm:text-sm transition-all duration-300 active:scale-[0.98] shadow-sm cursor-pointer"
              >
                <span>{downloaded ? 'تم تنزيل التقويم' : 'حفظ في تقويم الهاتف (iCal)'}</span>
                <div className="w-6 h-6 rounded-full bg-[#C6AA78]/20 flex items-center justify-center text-[#9C8150]">
                  {downloaded ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Download className="w-3.5 h-3.5" />
                  )}
                </div>
              </button>
            </div>

            {downloaded && (
              <p className="font-sans-ar text-xs text-emerald-700 mt-3">
                ✓ تم تنزيل ملف التقويم بنجاح، يمكنك فتحه الآن لتثبيت الموعد.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
