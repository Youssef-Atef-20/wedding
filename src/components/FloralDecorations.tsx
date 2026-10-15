import type { FC, SVGProps } from 'react';

/**
 * High-precision Botanical & Floral SVG Ornaments
 * Inspired by the "Couronne Florale" luxury reference.
 * Ultra-crisp, scalable, and responsive on all screens.
 */

export const CouronneFlorale: FC<SVGProps<SVGSVGElement> & { className?: string }> = ({
  className = 'w-64 h-64',
  ...props
}) => (
  <svg
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
    {...props}
  >
    {/* Outer subtle champagne hairline circles */}
    <circle cx="200" cy="200" r="175" stroke="#C6AA78" strokeWidth="1" strokeOpacity="0.45" />
    <circle
      cx="200"
      cy="200"
      r="168"
      stroke="#C6AA78"
      strokeWidth="0.75"
      strokeDasharray="4 3"
      strokeOpacity="0.35"
    />
    <circle cx="200" cy="200" r="152" stroke="#89927A" strokeWidth="0.75" strokeOpacity="0.3" />

    {/* Top Botanical Arch - Eucalyptus Leaves & Delicate Foliage (Sage & Champagne) */}
    <g stroke="#89927A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="#89927A" fillOpacity="0.18">
      {/* Upper Leaves Left */}
      <path d="M120 70 C105 50, 85 65, 95 85 C105 105, 130 90, 120 70 Z" />
      <path d="M150 45 C135 30, 120 45, 130 60 C140 75, 160 60, 150 45 Z" />
      <path d="M185 35 C175 18, 160 28, 168 45 C176 62, 195 52, 185 35 Z" />
      {/* Upper Leaves Right */}
      <path d="M280 70 C295 50, 315 65, 305 85 C295 105, 270 90, 280 70 Z" />
      <path d="M250 45 C265 30, 280 45, 270 60 C260 75, 240 60, 250 45 Z" />
      <path d="M215 35 C225 18, 240 28, 232 45 C224 62, 205 52, 215 35 Z" />
    </g>

    {/* Delicate Floral White Roses Blossoms */}
    {/* Rose Top Left */}
    <g transform="translate(70, 110)">
      <circle cx="25" cy="25" r="22" fill="#FFFDF8" stroke="#C6AA78" strokeWidth="1.2" />
      <circle cx="25" cy="25" r="16" fill="#F7F0E5" stroke="#D6B4B3" strokeWidth="0.9" />
      <circle cx="25" cy="25" r="10" fill="#F2DFDE" stroke="#C6AA78" strokeWidth="0.8" />
      <path d="M21 25 C21 22, 25 20, 28 23 C31 26, 27 29, 23 27" stroke="#9C8150" strokeWidth="0.8" />
    </g>

    {/* Rose Top Right */}
    <g transform="translate(280, 110)">
      <circle cx="25" cy="25" r="22" fill="#FFFDF8" stroke="#C6AA78" strokeWidth="1.2" />
      <circle cx="25" cy="25" r="16" fill="#F7F0E5" stroke="#D6B4B3" strokeWidth="0.9" />
      <circle cx="25" cy="25" r="10" fill="#F2DFDE" stroke="#C6AA78" strokeWidth="0.8" />
      <path d="M29 25 C29 22, 25 20, 22 23 C19 26, 23 29, 27 27" stroke="#9C8150" strokeWidth="0.8" />
    </g>

    {/* Rose Bottom Left */}
    <g transform="translate(65, 240)">
      <circle cx="22" cy="22" r="20" fill="#FFFDF8" stroke="#C6AA78" strokeWidth="1.2" />
      <circle cx="22" cy="22" r="14" fill="#F7F0E5" stroke="#D6B4B3" strokeWidth="0.9" />
      <circle cx="22" cy="22" r="9" fill="#F2DFDE" stroke="#C6AA78" strokeWidth="0.8" />
    </g>

    {/* Rose Bottom Right */}
    <g transform="translate(285, 240)">
      <circle cx="22" cy="22" r="20" fill="#FFFDF8" stroke="#C6AA78" strokeWidth="1.2" />
      <circle cx="22" cy="22" r="14" fill="#F7F0E5" stroke="#D6B4B3" strokeWidth="0.9" />
      <circle cx="22" cy="22" r="9" fill="#F2DFDE" stroke="#C6AA78" strokeWidth="0.8" />
    </g>

    {/* Bottom Botanical Leaves & Sprigs */}
    <g stroke="#89927A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="#89927A" fillOpacity="0.18">
      <path d="M130 335 C115 350, 95 340, 105 320 C115 300, 140 315, 130 335 Z" />
      <path d="M165 360 C150 375, 135 365, 145 345 C155 325, 175 340, 165 360 Z" />
      <path d="M270 335 C285 350, 305 340, 295 320 C285 300, 260 315, 270 335 Z" />
      <path d="M235 360 C250 375, 265 365, 255 345 C245 325, 225 340, 235 360 Z" />
    </g>

    {/* Petite Golden Berries & Accent Florets */}
    <g fill="#C6AA78" stroke="#9C8150" strokeWidth="0.5">
      <circle cx="100" cy="180" r="3.5" />
      <circle cx="95" cy="195" r="2.8" />
      <circle cx="300" cy="180" r="3.5" />
      <circle cx="305" cy="195" r="2.8" />
      <circle cx="200" cy="28" r="3.5" />
      <circle cx="200" cy="372" r="3.5" />
    </g>
  </svg>
);

export const BotanicalDivider: FC<{ className?: string }> = ({ className = 'w-48 sm:w-64' }) => (
  <div className={`flex items-center justify-center gap-3 my-4 sm:my-6 ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C6AA78]/50 to-[#C6AA78]" />
    <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M16 3 C12 0, 7 5, 11 9 C15 13, 16 17, 16 17 C16 17, 17 13, 21 9 C25 5, 20 0, 16 3 Z" fill="#FFFDF8" stroke="#C6AA78" strokeWidth="1" />
      <circle cx="16" cy="10" r="2.5" fill="#F2DFDE" stroke="#89927A" strokeWidth="0.75" />
      <path d="M8 10 C4 8, 2 12, 6 13" stroke="#89927A" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M24 10 C28 8, 30 12, 26 13" stroke="#89927A" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C6AA78]/50 to-[#C6AA78]" />
  </div>
);

export const FloralCorner: FC<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; className?: string }> = ({
  position,
  className = 'w-10 h-10',
}) => {
  const rotation =
    position === 'top-left'
      ? 'rotate-0'
      : position === 'top-right'
      ? 'rotate-90'
      : position === 'bottom-right'
      ? 'rotate-180'
      : '-rotate-90';

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${rotation} ${className}`}
      aria-hidden="true"
    >
      <path d="M2 38 V12 C2 6.5, 6.5 2, 12 2 H38" stroke="#C6AA78" strokeWidth="1" strokeOpacity="0.5" />
      <path d="M6 38 V14 C6 9.5, 9.5 6, 14 6 H38" stroke="#89927A" strokeWidth="0.75" strokeOpacity="0.35" strokeDasharray="2 2" />
      {/* Corner Rose Floret */}
      <circle cx="12" cy="12" r="5" fill="#FFFDF8" stroke="#C6AA78" strokeWidth="0.8" />
      <circle cx="12" cy="12" r="2.5" fill="#F2DFDE" />
    </svg>
  );
};
