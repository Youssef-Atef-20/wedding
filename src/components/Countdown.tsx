import type { FC } from 'react';
import { useWeddingCountdown } from '../hooks/useWeddingCountdown';

interface CountdownProps {
  targetDate: string;
}

export const Countdown: FC<CountdownProps> = ({ targetDate }) => {
  const { days, hours, minutes, seconds, isExpired } = useWeddingCountdown(targetDate);

  if (isExpired) {
    return (
      <div className="stationery-card-outer max-w-md mx-auto my-6 px-4">
        <div className="stationery-card-inner p-5 text-center bg-[#FCFAF6]">
          <p className="font-serif-ar text-xl sm:text-2xl text-[#48423C]">
            لقد حان موعد حفل الزفاف المبارك!
          </p>
          <p className="text-xs sm:text-sm text-[#7A7269] mt-1.5 font-sans-ar">
            شاركونا الفرحة الآن في قصر البارون إمبان.
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
    <div className="w-full max-w-lg mx-auto px-2 sm:px-4">
      <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {units.map((unit, index) => {
          const formattedValue = unit.value < 10 ? `0${unit.value}` : `${unit.value}`;
          return (
            <div
              key={index}
              className="stationery-card-outer group hover:scale-[1.03] transition-transform duration-300 ease-out p-1"
            >
              <div className="stationery-card-inner py-3 px-1 sm:py-4 sm:px-2.5 text-center flex flex-col items-center justify-center relative overflow-hidden bg-[#FCFAF6]">
                {/* Subtle warm cream background accent */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#F7F0E5]/50 via-transparent to-transparent pointer-events-none" />

                {/* Elegant Number */}
                <span className="font-serif-en text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-[#48423C] tracking-tight relative z-10 tabular-nums">
                  {formattedValue}
                </span>

                {/* Arabic Label */}
                <span className="font-sans-ar text-[10px] sm:text-xs font-semibold text-[#89927A] mt-0.5 sm:mt-1 relative z-10">
                  {unit.label}
                </span>

                {/* Subtle Latin Label */}
                <span className="font-serif-en text-[7px] sm:text-[9px] tracking-widest uppercase text-[#7A7269]/70 mt-0.5 relative z-10 hidden sm:block">
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
