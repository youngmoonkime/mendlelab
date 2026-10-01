import React, { useState, useRef, useMemo, useEffect } from 'react';
import { triggerHaptic } from '../../utils/haptics';

const LAYERS = [
  { part: 'ring', src: '/assets/logo_ring.webp' },
  { part: 'frame', src: '/assets/logo_frame.webp' },
  { part: 'arrow', src: '/assets/logo_arrow.webp' }
] as const;

// 로고 PNG의 실루엣 색상(#211F20)
const BASE_RGB = [33, 31, 32];

// 예전 CSS filter: invert(k) 를 단색 실루엣에 적용한 결과와 같은 색
const invertedColor = (k: number) =>
  `rgb(${BASE_RGB.map((c) => Math.round(c + k * (255 - 2 * c))).join(',')})`;

const imageCache = new Map<string, Promise<HTMLImageElement>>();
const loadImage = (src: string) => {
  let p = imageCache.get(src);
  if (!p) {
    p = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
    imageCache.set(src, p);
  }
  return p;
};

// 슬라이스마다 CSS filter를 걸면 레이어 45개가 각각 별도 렌더 패스를 갖게 되어,
// 로고가 화면 밖으로 나갔다 돌아올 때 한꺼번에 다시 그리느라 스크롤이 끊김.
// 대신 실루엣을 캔버스에 한 번만 해당 색으로 칠해 둠.
const SliceCanvas: React.FC<{ src: string; color: string; style: React.CSSProperties }> = ({
  src,
  color,
  style
}) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadImage(src)
      .then((img) => {
        const canvas = ref.current;
        const ctx = canvas?.getContext('2d');
        if (cancelled || !canvas || !ctx) return;
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
        ctx.globalCompositeOperation = 'source-in';
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      })
      .catch(() => {
        // 이미지 로드 실패 시 빈 슬라이스로 둠
      });
    return () => {
      cancelled = true;
    };
  }, [src, color]);

  return <canvas ref={ref} className="slice-img pointer-events-none" style={style} aria-hidden="true" />;
};

interface Logo3DProps {
  depth?: number;
  paused?: boolean;
}

export const Logo3D: React.FC<Logo3DProps> = ({ depth = 28, paused = false }) => {
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
    const list: Array<{ transform: string; color: string }> = [];
    for (let i = n; i >= 0; i--) {
      const z = -(depth * i) / n;
      // 맨 앞 슬라이스는 흰색(예전 invert(1) brightness(1.2)), 뒤로 갈수록 어두운 회색
      const color = i === 0 ? '#ffffff' : invertedColor(+(0.55 - (i / n) * 0.3).toFixed(2));
      list.push({
        transform: `translateZ(${z.toFixed(1)}px)`,
        color
      });
    }
    return list;
  }, [depth]);

  // 슬라이스 이미지(3 x n장)는 회전 각도와 무관하므로 한 번만 생성해
  // 포인터 이동 시 회전 래퍼만 다시 렌더링되도록 함
  const layers = useMemo(
    () =>
      LAYERS.map(({ part, src }) => (
        <div key={part} className={`preserve-3d absolute inset-0 part-${part}`}>
          {slices.map((s, idx) => (
            <SliceCanvas key={idx} src={src} color={s.color} style={{ transform: s.transform }} />
          ))}
        </div>
      )),
    [slices]
  );

  return (
    <div className="flex flex-col items-center select-none">
      <div 
        className={`stage-3d touch-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        } ${paused ? 'stage-paused' : ''}`}
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
            {layers}
          </div>
        </div>
      </div>
    </div>
  );
};
