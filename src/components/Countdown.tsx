import type { FC } from 'react';
import { useWeddingCountdown } from '../hooks/useWeddingCountdown';

interface CountdownProps {
  targetDate: string;
}

export const Countdown: FC<CountdownProps> = ({ targetDate }) => {
  const { days, hours, minutes, seconds, isExpired } = useWeddingCountdown(targetDate);

  if (isExpired) {
    return (
      <div className="bezel-card-outer max-w-md mx-auto my-8">
        <div className="bezel-card-inner p-6 text-center">
          <p className="font-serif-ar text-2xl text-[#E8D8BD]">
            لقد حان موعد حفل الزفاف المبارك!
          </p>
          <p className="text-sm text-[#F8F4EC]/70 mt-2 font-sans-ar">
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
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {units.map((unit, index) => {
          // Format with leading zero
          const formattedValue = unit.value < 10 ? `0${unit.value}` : `${unit.value}`;
          return (
            <div
              key={index}
              className="bezel-card-outer group hover:scale-[1.02] transition-transform duration-500 ease-out"
            >
              <div className="bezel-card-inner p-3 sm:p-4 md:p-6 text-center flex flex-col items-center justify-center relative overflow-hidden">
                {/* Subtle background ambient light */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#B79A66]/10 via-transparent to-transparent opacity-50 pointer-events-none" />

                {/* Digital / Serif Counter */}
                <span className="font-serif-en text-2xl sm:text-4xl md:text-5xl font-semibold text-[#F8F4EC] tracking-wider relative z-10 tabular-nums">
                  {formattedValue}
                </span>

                {/* Arabic Label */}
                <span className="font-sans-ar text-xs sm:text-sm font-medium text-[#B79A66] mt-1 relative z-10">
                  {unit.label}
                </span>

                {/* Subtle Latin Label */}
                <span className="font-serif-en text-[10px] tracking-widest uppercase text-[#F8F4EC]/40 mt-0.5 relative z-10 hidden sm:block">
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
