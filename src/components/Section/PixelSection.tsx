import React, { useState, useEffect, useMemo } from 'react';
import { SectionDef } from '../../types';
import { PIXEL_ARTS } from '../../constants/sprites';
import { triggerHaptic } from '../../utils/haptics';

interface PixelSectionProps {
  section: SectionDef;
  isActive: boolean;
  onOpenModal: () => void;
}

export const PixelSection: React.FC<PixelSectionProps> = ({
  section,
  isActive,
  onOpenModal
}) => {
  const [typedCount, setTypedCount] = useState(0);
  const word = section.word;

  // 섹션 활성화 시 글자 타이핑 애니메이션
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive) {
      setTypedCount(0);
      const step = () => {
        setTypedCount((prev) => {
          const next = prev + 1;
          if (next < word.length) {
            timer = setTimeout(step, 110);
          }
          return next;
        });
      };
      timer = setTimeout(step, 200);
    } else {
      setTypedCount(0);
    }

    return () => clearTimeout(timer);
  }, [isActive, word]);

  // 픽셀 그리드 셀 정보 계산
  const pixelCells = useMemo(() => {
    const art = PIXEL_ARTS[section.key];
    if (!art) return [];

    return art.cells.split(';').map((coord, i) => {
      const [colStr, rowStr] = coord.split(',');
      const c = parseInt(colStr, 10);
      const r = parseInt(rowStr, 10);
      const delay = (((c * 37 + r * 61 + i * 13) % 97) / 97) * 0.7;

      return {
        key: `${c}-${r}`,
        style: {
          left: `calc(var(--cell) * ${c})`,
          top: `calc(var(--cell) * ${r})`,
          transitionDelay: `${delay.toFixed(2)}s`
        }
      };
    });
  }, [section.key]);

  const artDef = PIXEL_ARTS[section.key];

  const handleClick = () => {
    triggerHaptic(12);
    onOpenModal();
  };

  return (
    <section className="relative z-10 w-full h-[100dvh] snap-start flex flex-col items-center justify-center gap-10 md:gap-14 px-6 py-20 text-center select-none box-border">
      {/* 타이틀 타이핑 */}
      <h2 
        className="m-0 font-pixel font-normal text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider text-white"
        aria-label={word}
      >
        <span className="relative inline-block">
          <span className="invisible">{word}</span>
          <span className="absolute left-0 top-0 whitespace-nowrap">
            {isActive ? word.slice(0, typedCount) : ''}
            <span className="caret-blink" />
          </span>
        </span>
      </h2>

      {/* 픽셀 아트 & CTA 버튼 */}
      <button
        onClick={handleClick}
        aria-label={section.cta}
        className="group flex flex-col items-center gap-6 p-4 rounded-3xl transition-transform duration-200 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tang cursor-pointer"
      >
        <div 
          className={`pixel-matrix ${isActive ? 'pixels-lit' : ''}`}
          style={{
            width: `calc(var(--cell) * ${artDef.cols})`,
            height: `calc(var(--cell) * ${artDef.rows})`
          }}
          aria-hidden="true"
        >
          {pixelCells.map((cell) => (
            <span key={cell.key} className="pix-unit" style={cell.style} />
          ))}
        </div>

        <span className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm md:text-base font-medium tracking-tight text-white/70 group-hover:text-white bg-white/5 group-hover:bg-white/10 border border-white/20 group-hover:border-tang transition-all duration-200 active:scale-95 shadow-md">
          {section.cta}
        </span>
      </button>
    </section>
  );
};
