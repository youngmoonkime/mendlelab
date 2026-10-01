import React, { useState, useRef } from 'react';
import { RoomItemKey, WallKey, RoomState } from '../../types';
import { ROOM_DEFS, WALL_DEFS, SPRITES } from '../../constants/sprites';
import { triggerHaptic } from '../../utils/haptics';
import { RotateCcw, Lightbulb, LightbulbOff } from 'lucide-react';

const DEFAULT_POS: Record<RoomItemKey, { x: number; y: number }> = {
  sofa: { x: 17, y: 26 },
  lamp: { x: 28, y: 0 },
  frame: { x: 6, y: 7 },
  plant: { x: 3, y: 24 },
  rug: { x: 15, y: 35 },
  shelf: { x: 45, y: 13 },
  cat: { x: 47, y: 27 }
};

const DEFAULT_ORDER: RoomItemKey[] = ['rug', 'frame', 'shelf', 'lamp', 'plant', 'sofa', 'cat'];

export const RoomStudio: React.FC = () => {
  const [room, setRoom] = useState<RoomState>({
    on: {
      sofa: true,
      lamp: true,
      frame: true,
      plant: false,
      rug: false,
      shelf: false,
      cat: false
    },
    wall: 'white',
    light: true,
    pos: { ...DEFAULT_POS },
    order: [...DEFAULT_ORDER],
    drag: null
  });

  const roomRef = useRef<HTMLDivElement>(null);

  const handleToggleItem = (key: RoomItemKey) => {
    triggerHaptic(8);
    setRoom((prev) => ({
      ...prev,
      on: {
        ...prev.on,
        [key]: !prev.on[key]
      }
    }));
  };

  const handleSelectWall = (key: WallKey) => {
    triggerHaptic(8);
    setRoom((prev) => ({ ...prev, wall: key }));
  };

  const handleToggleLight = () => {
    triggerHaptic(12);
    setRoom((prev) => ({ ...prev, light: !prev.light }));
  };

  const handleReset = () => {
    triggerHaptic(15);
    setRoom((prev) => ({
      ...prev,
      pos: { ...DEFAULT_POS },
      order: [...DEFAULT_ORDER]
    }));
  };

  // 아이템을 맨 앞으로 가져오기
  const bringToFront = (key: RoomItemKey) => {
    setRoom((prev) => ({
      ...prev,
      order: [...prev.order.filter((k) => k !== key), key]
    }));
  };

  // 포인터 드래그 핸들러
  const handlePointerDownItem = (key: RoomItemKey, e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    bringToFront(key);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const fieldRect = roomRef.current?.getBoundingClientRect();
    const unitPx = fieldRect ? fieldRect.width / 64 : 10;
    const curPos = room.pos[key];

    setRoom((prev) => ({
      ...prev,
      drag: {
        key,
        startX: e.clientX,
        startY: e.clientY,
        originX: curPos.x,
        originY: curPos.y,
        unitPx
      }
    }));
  };

  const handlePointerMoveItem = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!room.drag) return;
    const { key, startX, startY, originX, originY, unitPx } = room.drag;
    const spr = SPRITES[ROOM_DEFS.find((d) => d.key === key)!.sprite];

    const dx = (e.clientX - startX) / unitPx;
    const dy = (e.clientY - startY) / unitPx;

    const newX = Math.max(0, Math.min(64 - spr.w, originX + dx));
    const newY = Math.max(0, Math.min(44 - spr.h, originY + dy));

    setRoom((prev) => ({
      ...prev,
      pos: {
        ...prev.pos,
        [key]: { x: newX, y: newY }
      }
    }));
  };

  const handlePointerUpItem = () => {
    if (room.drag) {
      setRoom((prev) => ({ ...prev, drag: null }));
    }
  };

  const handleKeyDownItem = (key: RoomItemKey, e: React.KeyboardEvent<HTMLButtonElement>) => {
    const step = e.shiftKey ? 4 : 1;
    const cur = room.pos[key];
    const spr = SPRITES[ROOM_DEFS.find((d) => d.key === key)!.sprite];

    let dx = 0;
    let dy = 0;
    if (e.key === 'ArrowLeft') dx = -step;
    else if (e.key === 'ArrowRight') dx = step;
    else if (e.key === 'ArrowUp') dy = -step;
    else if (e.key === 'ArrowDown') dy = step;
    else return;

    e.preventDefault();
    e.stopPropagation();

    const newX = Math.max(0, Math.min(64 - spr.w, cur.x + dx));
    const newY = Math.max(0, Math.min(44 - spr.h, cur.y + dy));

    setRoom((prev) => ({
      ...prev,
      pos: {
        ...prev.pos,
        [key]: { x: newX, y: newY }
      }
    }));
  };

  const wallDef = WALL_DEFS.find((w) => w.key === room.wall) || WALL_DEFS[0];
  const lampPos = room.pos.lamp;
  const isGlowOn = room.on.lamp && room.light;

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* 방 캔버스 영역 */}
      <div
        ref={roomRef}
        style={{ backgroundColor: wallDef.color }}
        className="cq-container relative w-[min(580px,94vw)] aspect-[64/44] rounded-2xl border border-white/10 overflow-hidden shadow-xl transition-colors duration-500"
      >
        <div className="room-field">
          {/* 바닥 몰딩 및 마루 */}
          <div className="absolute left-0 right-0 top-[34em] bottom-0 bg-[#8A5E3B] shadow-[inset_0_0.35em_0_#6E4A2E]" />

          {/* 조명 빛 번짐 (Glow) */}
          {isGlowOn && (
            <div
              className="absolute w-[36em] h-[36em] rounded-full pointer-events-none transition-all duration-300"
              style={{
                left: `${(lampPos.x + 4.5 - 18).toFixed(1)}em`,
                top: `${(lampPos.y + 9 - 18).toFixed(1)}em`,
                background: 'radial-gradient(circle, rgba(255,214,140,0.55) 0%, rgba(255,214,140,0) 62%)'
              }}
            />
          )}

          {/* 배치된 가구/아이템들 */}
          {room.order
            .filter((key) => room.on[key])
            .map((key) => {
              const def = ROOM_DEFS.find((d) => d.key === key)!;
              const spr = SPRITES[def.sprite];
              const pos = room.pos[key];
              const isDragging = room.drag?.key === key;

              return (
                <button
                  key={key}
                  aria-label={`${def.label} 옮기기`}
                  onPointerDown={(e) => handlePointerDownItem(key, e)}
                  onPointerMove={handlePointerMoveItem}
                  onPointerUp={handlePointerUpItem}
                  onPointerCancel={handlePointerUpItem}
                  onKeyDown={(e) => handleKeyDownItem(key, e)}
                  style={{
                    left: `${pos.x.toFixed(2)}em`,
                    top: `${pos.y.toFixed(2)}em`,
                    width: `${spr.w}em`,
                    height: `${spr.h}em`
                  }}
                  className={`absolute p-0 m-0 border-0 bg-transparent cursor-grab active:cursor-grabbing touch-none select-none rounded outline-offset-4 focus-visible:outline-2 focus-visible:outline-tang transition-shadow ${
                    isDragging ? 'outline-dashed outline-2 outline-tang scale-105 z-30' : 'hover:outline-dashed hover:outline-1 hover:outline-white/50'
                  }`}
                >
                  <span
                    className="spr-pixel"
                    style={{
                      left: 0,
                      top: 0,
                      boxShadow: spr.sh
                    }}
                  />
                </button>
              );
            })}

          {/* 조명 소등 시 어두운 오버레이 */}
          <div
            className={`absolute inset-0 bg-[#080a14]/65 pointer-events-none transition-opacity duration-300 ${
              room.light ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </div>
      </div>

      {/* 가구 토글 칩 (가로 스크롤 가능) */}
      <div className="w-full flex flex-col gap-1.5 px-1">
        <span className="text-xs text-white/50 font-medium">배치할 소품</span>
        <div className="flex gap-2 overflow-x-auto py-1 scrollbar-none">
          {ROOM_DEFS.map((def) => {
            const active = room.on[def.key];
            return (
              <button
                key={def.key}
                onClick={() => handleToggleItem(def.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all active:scale-95 border ${
                  active
                    ? 'bg-tang text-black border-tang shadow-sm font-semibold'
                    : 'bg-white/10 text-white/80 border-white/10 hover:bg-white/15'
                }`}
              >
                {def.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 벽지 색상 & 조명 스위치 & 위치 초기화 */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
        {/* 벽지 선택 */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/60">벽 색상</span>
          <div className="flex items-center gap-1.5">
            {WALL_DEFS.map((w) => (
              <button
                key={w.key}
                aria-label={`${w.label} 벽지`}
                onClick={() => handleSelectWall(w.key)}
                style={{ backgroundColor: w.color }}
                className={`w-6 h-6 rounded-full border border-black/30 transition-transform ${
                  room.wall === w.key ? 'ring-2 ring-tang scale-110' : 'hover:scale-105'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 조명 토글 버튼 */}
        <button
          onClick={handleToggleLight}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 hover:bg-white/15 border border-white/10 transition-colors active:scale-95"
        >
          {room.light ? (
            <>
              <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />
              <span>불 끄기</span>
            </>
          ) : (
            <>
              <LightbulbOff className="w-3.5 h-3.5 text-white/40" />
              <span>불 켜기</span>
            </>
          )}
        </button>

        {/* 초기화 버튼 */}
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-tang hover:text-white bg-tang/10 hover:bg-tang/20 border border-tang/30 transition-colors active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>위치 초기화</span>
        </button>
      </div>

      <p className="text-xs text-white/50 text-center leading-normal">
        물건을 마우스나 손가락으로 끌어서 원하는 자리에 배치해 보세요.
      </p>
    </div>
  );
};
