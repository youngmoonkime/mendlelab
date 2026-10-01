import React, { useState, useEffect } from 'react';
import { Logo3D } from './Logo3D';
import { ChevronDown } from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    aria-hidden="true" 
    className={className}
    style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }}
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="0.6" style={{ fill: 'currentColor' }} />
  </svg>
);

interface HeroSectionProps {
  scrolled: boolean;
}

const FULL_TEXT = 'is coming';

export const HeroSection: React.FC<HeroSectionProps> = ({ scrolled }) => {
  const [typedCount, setTypedCount] = useState(0);

  useEffect(() => {
    if (typedCount >= FULL_TEXT.length) return;
    const delay =
      typedCount === 0 ? 1600 : FULL_TEXT.charAt(typedCount - 1) === ' ' ? 150 : 85;
    const timer = setTimeout(() => setTypedCount((c) => c + 1), delay);
    return () => clearTimeout(timer);
  }, [typedCount]);

  return (
    <section className="relative z-10 w-full h-[100dvh] snap-start flex flex-col items-center justify-center gap-8 md:gap-14 px-6 py-20 text-center select-none box-border">
      <Logo3D />

      <div className="flex flex-col items-center gap-4 md:gap-6 z-10">
        <h1 
          className="m-0 font-pixel font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wider text-white"
          aria-label={FULL_TEXT}
        >
          <span className="relative inline-block">
            <span className="invisible">{FULL_TEXT}</span>
            <span className="absolute left-0 top-0 whitespace-nowrap">
              {FULL_TEXT.slice(0, typedCount)}
              <span className="caret-blink" />
            </span>
          </span>
        </h1>

        <div className="animate-fade-up">
          <a
            href="https://www.instagram.com/mendlelab/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="인스타그램 @mendlelab 바로가기"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all duration-200 active:scale-95 group text-sm md:text-base font-sans"
          >
            <InstagramIcon className="w-4 h-4 md:w-5 md:h-5 text-tang group-hover:scale-110 transition-transform" />
            <span className="font-medium tracking-tight">@mendlelab</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-6 md:bottom-8 left-0 right-0 flex flex-col items-center gap-1.5 transition-opacity duration-500 pointer-events-none ${
          scrolled ? 'opacity-0' : 'opacity-80'
        }`}
        aria-hidden="true"
      >
        <span className="font-pixel text-xs tracking-widest text-white/60 uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-white/60 animate-hint-bob" />
      </div>
    </section>
  );
};
