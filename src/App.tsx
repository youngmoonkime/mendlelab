import React, { useState, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { Dots } from './components/Navigation/Dots';
import { HeroSection } from './components/Hero/HeroSection';
import { PixelSection } from './components/Section/PixelSection';
import { ModalSheet } from './components/Modal/ModalSheet';
import { CatchGame } from './components/Games/CatchGame';
import { RoomStudio } from './components/Space/RoomStudio';
import { GoodsPrinter } from './components/Maker/GoodsPrinter';
import { ModalType } from './types';
import { SECTION_DEFS } from './constants/sprites';

export const App: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState<ModalType>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const height = el.clientHeight || 1;
    const nextIdx = Math.max(0, Math.min(3, Math.round(el.scrollTop / height)));
    const isScrolled = el.scrollTop > 20;

    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
    }
    if (nextIdx !== activeIndex) {
      setActiveIndex(nextIdx);
    }
  }, [activeIndex, scrolled]);

  const handleNavigate = useCallback((index: number) => {
    const el = scrollerRef.current;
    if (el) {
      el.scrollTo({
        top: index * el.clientHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  const getModalTitle = (type: ModalType) => {
    switch (type) {
      case 'play':
        return '황금거북이 받기';
      case 'space':
        return '나의 작은 공간 꾸미기';
      case 'make':
        return '나만의 굿즈 3D 출력';
      default:
        return '';
    }
  };

  return (
    <div className="relative w-full h-[100dvh] bg-grid-night overflow-hidden font-sans text-white select-none">
      {/* 몽환적인 배경 아우라 효과 */}
      <div className="aura-glow" aria-hidden="true" />

      {/* 반응형 상단 헤더 */}
      <Header />

      {/* 우측 도트 페이지네이션 */}
      <Dots activeIndex={activeIndex} onNavigate={handleNavigate} />

      {/* 메인 풀스크린 스냅 스크롤러 */}
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className={`w-full h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory overscroll-contain ${
          modal ? 'overflow-hidden' : ''
        }`}
      >
        {/* 1. 히어로 섹션 (3D 로고 & is coming) */}
        <HeroSection scrolled={scrolled} />

        {/* 2, 3, 4. PLAY, SPACE, MAKE 인터랙티브 픽셀 섹션 */}
        {SECTION_DEFS.map((section, idx) => (
          <PixelSection
            key={section.word}
            section={section}
            isActive={activeIndex === idx + 1}
            onOpenModal={() => setModal(section.modal)}
          />
        ))}
      </div>

      {/* 적응형 모달 & 바텀시트 */}
      <ModalSheet
        isOpen={modal !== null}
        title={getModalTitle(modal)}
        onClose={() => setModal(null)}
      >
        {modal === 'play' && <CatchGame />}
        {modal === 'space' && <RoomStudio />}
        {modal === 'make' && <GoodsPrinter />}
      </ModalSheet>
    </div>
  );
};

export default App;
