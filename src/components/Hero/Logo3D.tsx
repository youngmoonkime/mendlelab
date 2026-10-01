import React, { useState, useRef, useMemo } from 'react';
import { triggerHaptic } from '../../utils/haptics';

interface Logo3DProps {
  depth?: number;
}

export const Logo3D: React.FC<Logo3DProps> = ({ depth = 28 }) => {
  const [rx, setRx] = useState(0);
  const [ry, setRy] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // 드래그 시작 시점의 포인터 및 각도 좌표 저장
  const dragStartRef = useRef<{
    x: number;
    y: number;
    startRx: number;
    startRy: number;
  }>({ x: 0, y: 0, startRx: 0, startRy: 0 });

  // 포인터 다운 (터치 / 마우스 클릭 시작)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startRx: rx,
      startRy: ry
    };
    triggerHaptic(8);
  };

  // 포인터 이동 (손가락 드래그로 3D 로고 자유 회전)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;

      // 손가락 이동에 따른 직관적인 3D 각도 계산 (최대 ±48도)
      const nextRy = Math.max(-48, Math.min(48, dragStartRef.current.startRy + deltaX * 0.45));
      const nextRx = Math.max(-42, Math.min(42, dragStartRef.current.startRx - deltaY * 0.45));

      setRy(+nextRy.toFixed(1));
      setRx(+nextRx.toFixed(1));
    } else if (e.pointerType === 'mouse') {
      // PC에서 드래그하지 않고 마우스만 올렸을 때의 가벼운 패럴랙스 틸트
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setRy(+(x * 24).toFixed(1));
      setRx(+(-y * 20).toFixed(1));
    }
  };

  // 포인터 해제 (손을 떼었을 때 부드럽게 복귀)
  const handlePointerEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      triggerHaptic(6);
      // 손을 떼면 부드럽게 중앙으로 복귀
      setRx(0);
      setRy(0);
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging && e.pointerType === 'mouse') {
      setRx(0);
      setRy(0);
    }
  };

  // 3D 슬라이스 레이어 계산
  const slices = useMemo(() => {
    const n = Math.max(1, Math.round(depth / 2));
    const list: Array<{ transform: string; filter: string }> = [];
    for (let i = n; i >= 0; i--) {
      const z = -(depth * i) / n;
      let f: string;
      if (i === 0) {
        f = 'invert(1) brightness(1.2)';
      } else {
        const t = i / n;
        f = `invert(${(0.55 - t * 0.3).toFixed(2)})`;
      }
      list.push({
        transform: `translateZ(${z.toFixed(1)}px)`,
        filter: f
      });
    }
    return list;
  }, [depth]);

  return (
    <div className="flex flex-col items-center select-none">
      <div 
        className={`stage-3d touch-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onPointerLeave={handlePointerLeave}
        role="img"
        aria-label="MENDLELAB 3D 로고 - 손으로 드래그하여 회전할 수 있습니다"
      >
        <div className="stage-floor" aria-hidden="true" />
        
        {/* 부유 애니메이션 (드래그 중에는 일시 정지하여 손가락을 완벽하게 따라옴) */}
        <div className={`preserve-3d w-full h-full ${isDragging ? '' : 'animate-sway'}`}>
          <div 
            className="preserve-3d w-full h-full"
            style={{
              transform: `rotateX(${rx}deg) rotateY(${ry}deg)`,
              transition: isDragging 
                ? 'none' 
                : 'transform 0.65s cubic-bezier(0.18, 0.89, 0.32, 1.28)'
            }}
          >
            {/* Ring Layer */}
            <div className="preserve-3d absolute inset-0 part-ring">
              {slices.map((s, idx) => (
                <img
                  key={`ring-${idx}`}
                  className="slice-img pointer-events-none"
                  src="/assets/logo_ring.png"
                  alt=""
                  style={{
                    transform: s.transform,
                    filter: s.filter
                  }}
                />
              ))}
            </div>

            {/* Frame Layer */}
            <div className="preserve-3d absolute inset-0 part-frame">
              {slices.map((s, idx) => (
                <img
                  key={`frame-${idx}`}
                  className="slice-img pointer-events-none"
                  src="/assets/logo_frame.png"
                  alt=""
                  style={{
                    transform: s.transform,
                    filter: s.filter
                  }}
                />
              ))}
            </div>

            {/* Arrow Layer */}
            <div className="preserve-3d absolute inset-0 part-arrow">
              {slices.map((s, idx) => (
                <img
                  key={`arrow-${idx}`}
                  className="slice-img pointer-events-none"
                  src="/assets/logo_arrow.png"
                  alt=""
                  style={{
                    transform: s.transform,
                    filter: s.filter
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
