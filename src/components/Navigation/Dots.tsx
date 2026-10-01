import React from 'react';

interface DotsProps {
  activeIndex: number;
  onNavigate: (index: number) => void;
}

const DOT_LABELS = ['처음', 'PLAY', 'SPACE', 'MAKE'];

export const Dots: React.FC<DotsProps> = ({ activeIndex, onNavigate }) => {
  return (
    <nav 
      aria-label="페이지 바로가기"
      className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-1.5 p-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-lg"
      style={{
        right: 'max(12px, env(safe-area-inset-right))'
      }}
    >
      {DOT_LABELS.map((label, index) => {
        const isCurrent = activeIndex === index;
        return (
          <button
            key={label}
            aria-label={`${label} 페이지로 이동`}
            aria-current={isCurrent ? 'true' : undefined}
            onClick={() => onNavigate(index)}
            className="w-7 h-7 flex items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tang"
          >
            <span 
              className={`rounded-full transition-all duration-300 ${
                isCurrent 
                  ? 'w-2.5 h-2.5 bg-tang scale-110 shadow-[0_0_8px_rgba(242,140,40,0.8)]' 
                  : 'w-1.5 h-1.5 bg-white/40 group-hover:bg-white/70'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
};
