import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { triggerHaptic } from '../../utils/haptics';

interface ModalSheetProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const ModalSheet: React.FC<ModalSheetProps> = ({
  isOpen,
  title,
  onClose,
  children
}) => {
  const [sheetY, setSheetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef(0);
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달 열릴 때 포커스 및 Esc 닫기
  useEffect(() => {
    if (!isOpen) return;

    modalRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 모바일 터치 드래그로 시트 닫기
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    startYRef.current = e.clientY;
    setIsDragging(true);
    setSheetY(0);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const diff = Math.max(0, e.clientY - startYRef.current);
    setSheetY(diff);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (sheetY > 100) {
      triggerHaptic(8);
      onClose();
    }
    setSheetY(0);
  };

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md transition-opacity duration-300 animate-fade-in outline-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: sheetY > 0 ? `translateY(${sheetY}px)` : undefined,
          transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)'
        }}
        className="w-full sm:max-w-lg md:max-w-xl max-h-[92dvh] sm:max-h-[88vh] flex flex-col items-center gap-4 bg-[#1C1C1E] text-white rounded-t-3xl sm:rounded-2xl border-t sm:border border-white/10 shadow-2xl p-4 sm:p-6 pb-6 overflow-hidden box-border"
      >
        {/* 모바일 상단 드래그 핸들 (Grabber) */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="w-full flex flex-col items-center pt-1 pb-2 sm:hidden cursor-grab active:cursor-grabbing touch-none"
        >
          <div className="w-10 h-1.5 rounded-full bg-white/20" />
        </div>

        {/* 헤더 및 닫기 버튼 */}
        <div className="w-full flex items-center justify-between min-h-[44px] relative px-1">
          <h3 className="text-lg md:text-xl font-semibold tracking-tight text-white/95">
            {title}
          </h3>
          <button
            onClick={() => {
              triggerHaptic(8);
              onClose();
            }}
            aria-label="닫기"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tang"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 모달 본문 콘텐츠 */}
        <div 
          className="w-full flex flex-col items-center gap-4 overflow-y-auto overflow-x-hidden pr-0.5"
          style={{
            paddingBottom: 'max(12px, env(safe-area-inset-bottom))'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
