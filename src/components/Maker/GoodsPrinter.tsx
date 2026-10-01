import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ShapeKey, ColorKey, MakerState } from '../../types';
import { SHAPE_DEFS, COLOR_DEFS, SHAPES_DATA, SPRITES } from '../../constants/sprites';
import { triggerHaptic } from '../../utils/haptics';
import { Printer, Sparkles, RefreshCw } from 'lucide-react';

export const GoodsPrinter: React.FC = () => {
  const [maker, setMaker] = useState<MakerState>({
    shape: 'heart',
    color: 'tang',
    p: 0,
    status: 'idle'
  });

  const printTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPrint = () => {
    if (printTimerRef.current) {
      clearInterval(printTimerRef.current);
      printTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopPrint();
  }, []);

  const handleStartPrint = () => {
    if (maker.status === 'printing') return;
    stopPrint();
    triggerHaptic(12);

    setMaker((prev) => ({
      ...prev,
      status: 'printing',
      p: 0
    }));

    printTimerRef.current = setInterval(() => {
      setMaker((prev) => {
        const nextP = Math.min(100, prev.p + 1.8);
        if (nextP >= 100) {
          stopPrint();
          triggerHaptic([15, 30, 25]);
          return {
            ...prev,
            p: 100,
            status: 'done'
          };
        }
        return {
          ...prev,
          p: nextP
        };
      });
    }, 40);
  };

  const handleSelectShape = (shape: ShapeKey) => {
    if (maker.status === 'printing') return;
    triggerHaptic(8);
    setMaker({
      shape,
      color: maker.color,
      p: 0,
      status: 'idle'
    });
  };

  const handleSelectColor = (color: ColorKey) => {
    if (maker.status === 'printing') return;
    triggerHaptic(8);
    setMaker((prev) => ({
      ...prev,
      color,
      p: prev.status === 'done' ? 100 : 0
    }));
  };

  // 출력 오브젝트 그림자 및 크기 계산
  const shapeShadow = useMemo(() => {
    const rows = SHAPES_DATA[maker.shape] || SHAPES_DATA.heart;
    const colDef = COLOR_DEFS.find((c) => c.key === maker.color) || COLOR_DEFS[0];
    const out: string[] = [];

    rows.forEach((row, r) => {
      for (let c = 0; c < row.length; c++) {
        const ch = row.charAt(c);
        if (ch === '.') continue;
        const color = ch === 'x' ? colDef.main : ch === 'y' ? colDef.shade : '#6E9B4F';
        out.push(`${c + 1}em ${r + 1}em 0 ${color}`);
      }
    });

    const maxW = Math.max(...rows.map((row) => row.length));
    return {
      w: maxW,
      h: rows.length,
      sh: out.join(', ')
    };
  }, [maker.shape, maker.color]);

  const isPrinting = maker.status === 'printing';
  const isDone = maker.status === 'done';
  const progressPercent = Math.round(maker.p);
  const currentShapeDef = SHAPE_DEFS.find((d) => d.key === maker.shape);

  return (
    <div className="w-full flex flex-col items-center gap-5">
      {/* 3D 프린터 시뮬레이션 베드 박스 */}
      <div 
        className="relative w-[210px] sm:w-[240px] h-[220px] sm:h-[250px] rounded-2xl border-2 border-stone bg-white/[0.04] backdrop-blur-sm flex items-end justify-center pb-6 shadow-xl overflow-hidden"
        role="img"
        aria-label={`3D 프린터에서 ${currentShapeDef?.label} 굿즈를 출력하는 화면`}
      >
        {/* 상단 노즐 헤드 */}
        <span
          className="spr-pixel"
          style={{
            fontSize: '8px',
            left: 'calc(50% - 16px)',
            top: '22px',
            boxShadow: SPRITES.nozzle.sh
          }}
        />

        {/* 출력되는 입체 오브젝트 */}
        <div
          className="relative text-xs sm:text-sm font-normal"
          style={{
            width: `${shapeShadow.w}em`,
            height: `${shapeShadow.h}em`
          }}
        >
          {/* 레이어 적층 클리핑 */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: maker.status === 'idle' ? 0.25 : 1,
              clipPath: maker.status === 'idle' ? 'none' : `inset(${100 - maker.p}% 0 0 0)`
            }}
          >
            <span
              className="spr-pixel"
              style={{
                left: 0,
                top: 0,
                boxShadow: shapeShadow.sh
              }}
            />
          </div>

          {/* 슬라이서 레이저 히팅 라인 */}
          {isPrinting && (
            <div
              className="absolute -left-3 -right-3 h-[2px] bg-tang shadow-[0_0_10px_#F28C28] pointer-events-none transition-all duration-75"
              style={{
                top: `calc(${100 - maker.p}% - 1px)`
              }}
            />
          )}

          {/* 완성 후 키링 링 연결 고리 */}
          {isDone && (
            <span
              className="spr-pixel animate-fade-up"
              style={{
                left: `${(shapeShadow.w / 2 - 2.5).toFixed(1)}em`,
                top: '-4em',
                boxShadow: SPRITES.ringtop.sh
              }}
            />
          )}
        </div>

        {/* 프린터 바닥 베드 */}
        <div className="absolute left-3.5 right-3.5 bottom-2.5 h-2 rounded bg-stone-light/40 shadow-inner" />
      </div>

      {/* 상태 안내 문구 */}
      <p className="text-xs md:text-sm font-medium text-white/80 text-center min-h-[20px]" aria-live="polite">
        {isPrinting ? (
          <span className="text-tang flex items-center justify-center gap-1.5 font-pixel">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            출력 중... {progressPercent}%
          </span>
        ) : isDone ? (
          <span className="text-emerald-400 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            완성! 나만의 {currentShapeDef?.label} 키링이 완성되었습니다.
          </span>
        ) : (
          '모양과 필라멘트 색을 고른 뒤 출력 버튼을 눌러보세요.'
        )}
      </p>

      {/* 컨트롤 패널: 모양 & 색상 */}
      <div className="w-full flex flex-col gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
        {/* 모양 선택 */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-white/60 font-medium">형상 모양</span>
          <div className="flex p-0.5 rounded-lg bg-white/10">
            {SHAPE_DEFS.map((s) => (
              <button
                key={s.key}
                disabled={isPrinting}
                onClick={() => handleSelectShape(s.key)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  maker.shape === s.key
                    ? 'bg-tang text-black shadow-sm font-semibold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* 필라멘트 색상 선택 */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
          <span className="text-xs text-white/60 font-medium">필라멘트</span>
          <div className="flex items-center gap-2">
            {COLOR_DEFS.map((c) => (
              <button
                key={c.key}
                disabled={isPrinting}
                aria-label={`${c.label} 필라멘트`}
                onClick={() => handleSelectColor(c.key)}
                style={{ backgroundColor: c.main }}
                className={`w-6 h-6 rounded-full border border-black/30 transition-transform ${
                  maker.color === c.key ? 'ring-2 ring-tang scale-110' : 'hover:scale-105'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 출력 실행 버튼 */}
      <button
        onClick={handleStartPrint}
        disabled={isPrinting}
        className="w-full py-3.5 px-6 rounded-2xl font-semibold text-sm md:text-base bg-tang hover:bg-tang-shade disabled:opacity-50 text-black flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg cursor-pointer"
      >
        <Printer className="w-5 h-5" />
        <span>
          {isPrinting ? `출력 진행 중 (${progressPercent}%)` : isDone ? '다시 출력하기' : '3D 프린팅 시작'}
        </span>
      </button>
    </div>
  );
};
