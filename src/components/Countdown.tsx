import type { FC } from 'react';
import { useWeddingCountdown } from '../hooks/useWeddingCountdown';

interface CountdownProps {
  targetDate: string;
}

export const Countdown: FC<CountdownProps> = ({ targetDate }) => {
  const { days, hours, minutes, seconds, isExpired } = useWeddingCountdown(targetDate);

  if (isExpired) {
    return (
      <div className="bezel-card-outer max-w-md mx-auto my-6 px-4">
        <div className="bezel-card-inner p-5 text-center">
          <p className="font-serif-ar text-xl sm:text-2xl text-[#E8D8BD]">
            لقد حان موعد حفل الزفاف المبارك!
          </p>
          <p className="text-xs sm:text-sm text-[#F8F4EC]/70 mt-1.5 font-sans-ar">
            شاركونا الفرحة الآن في قصر البارون.
          </p>
        </div>
      </div>
    );
  }

  const units = [
    { value: days, label: 'أيام', labelEn: 'Days' },
    { value: hours, label: 'ساعات', labelEn: 'Hours' },
    { value: minutes, label: 'دقائق', labelEn: 'Minutes' },
    { value: seconds, label: 'ثوانٍ', labelEn: 'Seconds' },
  ];

  return (
    <div className="w-full max-w-xl mx-auto px-2 sm:px-4">
      <div className="grid grid-cols-4 gap-1.5 sm:gap-3 md:gap-4">
        {units.map((unit, index) => {
          const formattedValue = unit.value < 10 ? `0${unit.value}` : `${unit.value}`;
          return (
            <div
              key={index}
              className="bezel-card-outer group hover:scale-[1.02] transition-transform duration-300 ease-out p-1"
            >
              <div className="bezel-card-inner py-2.5 px-1 sm:py-4 sm:px-3 text-center flex flex-col items-center justify-center relative overflow-hidden">
                {/* Subtle background ambient light */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#B79A66]/10 via-transparent to-transparent opacity-50 pointer-events-none" />

                {/* Digital / Serif Counter */}
                <span className="font-serif-en text-lg xs:text-xl sm:text-3xl md:text-4xl font-semibold text-[#F8F4EC] tracking-wider relative z-10 tabular-nums">
                  {formattedValue}
                </span>

                {/* Arabic Label */}
                <span className="font-sans-ar text-[10px] sm:text-xs md:text-sm font-medium text-[#B79A66] mt-0.5 sm:mt-1 relative z-10">
                  {unit.label}
                </span>

                {/* Subtle Latin Label */}
                <span className="font-serif-en text-[8px] sm:text-[9px] tracking-widest uppercase text-[#F8F4EC]/40 mt-0.5 relative z-10 hidden sm:block">
                  {unit.labelEn}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
