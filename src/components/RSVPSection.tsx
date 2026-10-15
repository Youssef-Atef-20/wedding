import { useState, useRef, type FC, type FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { weddingConfig } from '../config/invitation';
import { CheckCircle2, XCircle, Users, Send, MessageSquareQuote, ShieldAlert } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const RSVPSection: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  const [guestName, setGuestName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [personalNote, setPersonalNote] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.from(formCardRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 85%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  // Generate WhatsApp message string
  const generateMessageText = (): string => {
    const trimmedName = guestName.trim() || 'ضيف كريم';
    if (attending === 'yes') {
      return (
        `السلام عليكم ورحمة الله وبركاته،\n` +
        `أنا: ${trimmedName}\n` +
        `يشرفني تأكيد حضور حفل زفاف ${weddingConfig.couple.groom.name} & ${weddingConfig.couple.bride.name}.\n` +
        `عدد الحضور: ${guestCount} فرد.\n` +
        (personalNote.trim() ? `رسالتي للعروسين: "${personalNote.trim()}"\n` : '') +
        `بارك الله لكما وبارك عليكما وجمع بينكما في خير!`
      );
    } else {
      return (
        `السلام عليكم ورحمة الله وبركاته،\n` +
        `أنا: ${trimmedName}\n` +
        `أعتذر بكل أسف لعدم تمكني من حضور حفل زفاف ${weddingConfig.couple.groom.name} & ${weddingConfig.couple.bride.name}.\n` +
        (personalNote.trim() ? `تهنئتي ومباركتي: "${personalNote.trim()}"\n` : '') +
        `مع أطيب تمنياتي لكم بحياة زوجية سعيدة ومباركة!`
      );
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!guestName.trim()) {
      setErrorMsg('فضلاً أدخل اسمك الكريم قبل المتابعة');
      return;
    }

    setErrorMsg('');

    const text = generateMessageText();
    const encoded = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${weddingConfig.rsvp.whatsappNumber}?text=${encoded}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      ref={containerRef}
      id="rsvp-section"
      aria-label="تأكيد الحضور"
      className="relative min-h-[100dvh] w-full py-24 sm:py-32 md:py-40 px-4 md:px-8 flex flex-col items-center justify-center bg-[#141914] overflow-hidden"
    >
      {/* Decorative ambient illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#B79A66]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Eyebrow */}
      <div className="relative z-10 text-center max-w-xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B79A66]/10 border border-[#B79A66]/30 text-[#D8BD8A] text-xs font-sans-ar mb-3">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#B79A66]" />
          <span>تأكيد الحضور (RSVP)</span>
        </div>
        <h2 className="font-serif-ar text-3xl sm:text-4xl md:text-5xl text-[#F8F4EC] font-normal tracking-wide">
          يسعدنا تأكيد تواجدكم معنا
        </h2>
        <p className="font-sans-ar text-xs sm:text-sm text-[#E8D8BD]/80 mt-2">
          {weddingConfig.rsvp.deadlineText}
        </p>
      </div>

      {/* Main RSVP Form Card */}
      <div
        ref={formCardRef}
        className="bezel-card-outer relative z-10 w-full max-w-2xl mx-auto shadow-2xl"
      >
        <div className="bezel-card-inner p-6 sm:p-10 md:p-12 relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Guest Name Field */}
            <div>
              <label
                htmlFor="guest-name"
                className="block font-sans-ar text-xs sm:text-sm font-medium text-[#E8D8BD] mb-2 text-right"
              >
                الاسم الكريم <span className="text-[#B79A66]">*</span>
              </label>
              <input
                id="guest-name"
                type="text"
                required
                value={guestName}
                onChange={(e) => {
                  setGuestName(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="اكتب اسمك الكريم هنا..."
                className="w-full px-4 py-3 rounded-xl bg-[#141914] border border-[#B79A66]/30 text-[#F8F4EC] placeholder-[#F8F4EC]/30 font-sans-ar text-sm focus:outline-none focus:border-[#B79A66] transition-colors text-right"
              />
              {errorMsg && (
                <p className="text-red-400 text-xs mt-1.5 font-sans-ar text-right">{errorMsg}</p>
              )}
            </div>

            {/* Attendance Toggle */}
            <div>
              <span className="block font-sans-ar text-xs sm:text-sm font-medium text-[#E8D8BD] mb-3 text-right">
                حالة الحضور <span className="text-[#B79A66]">*</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttending('yes')}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                    attending === 'yes'
                      ? 'bg-[#B79A66]/20 border-[#B79A66] text-[#F8F4EC] shadow-md'
                      : 'bg-[#141914] border-[#B79A66]/20 text-[#F8F4EC]/60 hover:border-[#B79A66]/40'
                  }`}
                >
                  <span className="font-sans-ar text-xs sm:text-sm font-medium">
                    يشرفني الحضور بكل سرور
                  </span>
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      attending === 'yes' ? 'text-[#B79A66]' : 'text-transparent'
                    }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => setAttending('no')}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                    attending === 'no'
                      ? 'bg-[#8C2727]/20 border-[#8C2727] text-[#F8F4EC] shadow-md'
                      : 'bg-[#141914] border-[#B79A66]/20 text-[#F8F4EC]/60 hover:border-[#B79A66]/40'
                  }`}
                >
                  <span className="font-sans-ar text-xs sm:text-sm font-medium">
                    أعتذر لعدم التمكن
                  </span>
                  <XCircle
                    className={`w-4 h-4 ${
                      attending === 'no' ? 'text-red-400' : 'text-transparent'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Guest Count (only if attending) */}
            {attending === 'yes' && (
              <div>
                <label
                  htmlFor="guest-count"
                  className="block font-sans-ar text-xs sm:text-sm font-medium text-[#E8D8BD] mb-2 text-right"
                >
                  عدد الأفراد المؤكد حضورهم
                </label>
                <div className="relative">
                  <select
                    id="guest-count"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-[#141914] border border-[#B79A66]/30 text-[#F8F4EC] font-sans-ar text-sm focus:outline-none focus:border-[#B79A66] transition-colors appearance-none text-right cursor-pointer"
                  >
                    <option value={1}>شخص واحد (أنا فقط)</option>
                    <option value={2}>شخصان (أنا ومرافق)</option>
                    <option value={3}>٣ أشخاص</option>
                    <option value={4}>٤ أشخاص</option>
                    <option value={5}>٥ أشخاص</option>
                  </select>
                  <Users className="w-4 h-4 text-[#B79A66] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            )}

            {/* Optional Personal Note */}
            <div>
              <label
                htmlFor="personal-note"
                className="block font-sans-ar text-xs sm:text-sm font-medium text-[#E8D8BD] mb-2 text-right"
              >
                رسالة أو دعاء طيب للعروسين (اختياري)
              </label>
              <textarea
                id="personal-note"
                rows={3}
                value={personalNote}
                onChange={(e) => setPersonalNote(e.target.value)}
                placeholder="اكتب كلمتك الجميلة للعروسين..."
                className="w-full px-4 py-3 rounded-xl bg-[#141914] border border-[#B79A66]/30 text-[#F8F4EC] placeholder-[#F8F4EC]/30 font-sans-ar text-sm focus:outline-none focus:border-[#B79A66] transition-colors text-right resize-none"
              />
            </div>

            {/* WhatsApp Message Preview */}
            <div className="p-3.5 rounded-xl bg-[#141914]/80 border border-[#B79A66]/15">
              <div className="flex items-center gap-1.5 text-[#B79A66] text-xs font-sans-ar mb-1.5">
                <MessageSquareQuote className="w-3.5 h-3.5" />
                <span>معاينة الرسالة المُرسلة عبر واتساب:</span>
              </div>
              <p className="font-sans-ar text-xs text-[#E8D8BD]/70 leading-relaxed whitespace-pre-line text-right">
                {generateMessageText()}
              </p>
            </div>

            {/* Clear Transparency Disclosure */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#20271E] border border-[#B79A66]/20 text-[#E8D8BD]/80 text-xs font-sans-ar">
              <ShieldAlert className="w-4 h-4 text-[#B79A66] shrink-0 mt-0.5" />
              <p className="leading-relaxed text-right">
                تنبيه: بالضغط على الزر أدناه سيتم فتح تطبيق واتساب لإرسال رسالة التأكيد مباشرة إلى
                منظمي الحفل لتسجيل أسمائكم في قائمة المدعوين. لا يتم تخزين أي بيانات في هذا الموقع.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="group w-full inline-flex items-center justify-between px-6 py-3.5 rounded-full bg-[#B79A66] hover:bg-[#D8BD8A] text-[#1E251E] font-medium font-sans-ar text-sm sm:text-base transition-all duration-300 active:scale-[0.98] shadow-xl cursor-pointer"
            >
              <span>إرسال التأكيد عبر واتساب</span>
              <div className="w-8 h-8 rounded-full bg-[#1E251E]/15 flex items-center justify-center group-hover:translate-x-[-2px] transition-transform">
                <Send className="w-4 h-4 text-[#1E251E]" />
              </div>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
