import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameState, FallItem } from '../../types';
import { SPRITES } from '../../constants/sprites';
import { triggerHaptic } from '../../utils/haptics';
import { ChevronLeft, ChevronRight, RotateCcw, Play } from 'lucide-react';

export const CatchGame: React.FC = () => {
  const [game, setGame] = useState<GameState>({
    status: 'ready',
    x: 30,
    items: [],
    score: 0,
    lives: 3,
    best: 0
  });

  const dirRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const spawnTimerRef = useRef<number>(10);
  const nextIdRef = useRef<number>(1);
  const gameStateRef = useRef(game);

  gameStateRef.current = game;

  const stopGame = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    dirRef.current = 0;
  }, []);

  const tick = useCallback(() => {
    const cur = gameStateRef.current;
    if (cur.status !== 'playing') return;

    const newX = Math.max(7, Math.min(53, cur.x + dirRef.current * 1.8));
    let newScore = cur.score;
    let newLives = cur.lives;
    const remainingItems: FallItem[] = [];

    for (const item of cur.items) {
      const nextY = item.y + item.vy;
      const spr = SPRITES[item.type];
      const cx = item.x + spr.w / 2;

      // 바구니 충돌 판정
      if (nextY + spr.h >= 73 && nextY <= 77 && Math.abs(cx - newX) < 7 + spr.w / 2) {
        if (item.type === 'turtle') {
          newScore += 1;
          triggerHaptic(15);
        } else {
          newLives -= 1;
          triggerHaptic([25, 40, 25]);
        }
        continue;
      }

      if (nextY < 82) {
        remainingItems.push({
          ...item,
          y: nextY
        });
      }
    }

    // 아이템 스폰 계산
    spawnTimerRef.current -= 1;
    if (spawnTimerRef.current <= 0) {
      const stoneChance = Math.min(0.45, 0.25 + newScore * 0.008);
      const isStone = Math.random() < stoneChance;
      remainingItems.push({
        id: nextIdRef.current++,
        x: 2 + Math.random() * 46,
        y: -8,
        vy: 0.55 + Math.min(newScore * 0.03, 1.2) + Math.random() * 0.25,
        type: isStone ? 'stone' : 'turtle'
      });
      spawnTimerRef.current = Math.max(7, 20 - newScore * 0.35) + Math.random() * 6;
    }

    if (newLives <= 0) {
      stopGame();
      setGame((prev) => ({
        ...prev,
        status: 'over',
        x: newX,
        items: [],
        score: newScore,
        lives: 0,
        best: Math.max(prev.best, newScore)
      }));
      return;
    }

    setGame((prev) => ({
      ...prev,
      x: newX,
      items: remainingItems,
      score: newScore,
      lives: newLives
    }));
  }, [stopGame]);

  const startGame = useCallback(() => {
    stopGame();
    spawnTimerRef.current = 10;
    nextIdRef.current = 1;
    setGame((prev) => ({
      status: 'playing',
      x: 30,
      items: [],
      score: 0,
      lives: 3,
      best: prev.best
    }));
    timerRef.current = setInterval(tick, 40);
  }, [stopGame, tick]);

  useEffect(() => {
    return () => stopGame();
  }, [stopGame]);

  // 키보드 이벤트 리스너
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStateRef.current.status !== 'playing') return;
      if (e.key === 'ArrowLeft') {
        dirRef.current = -1;
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        dirRef.current = 1;
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        dirRef.current = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handlePointerMoveGame = (e: React.PointerEvent<HTMLDivElement>) => {
    if (game.status !== 'playing') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const targetX = Math.max(7, Math.min(53, ((e.clientX - rect.left) / rect.width) * 60));
    setGame((prev) => ({ ...prev, x: targetX }));
  };

  const getSpriteStyle = (key: string, x: number, y: number) => {
    const spr = SPRITES[key];
    return {
      left: `${x.toFixed(2)}em`,
      top: `${y.toFixed(2)}em`,
      boxShadow: spr.sh
    };
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* HUD 상단 스코어보드 */}
      <div className="flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wide">
        <span className="px-3 py-1 rounded-full bg-white/10 border border-white/5">
          점수 <strong className="text-tang">{game.score}</strong>
        </span>
        <span className="px-3 py-1 rounded-full bg-white/10 border border-white/5">
          기회 <strong className="text-red-400">{'❤️'.repeat(Math.max(0, game.lives))}</strong>
        </span>
        <span className="px-3 py-1 rounded-full bg-white/10 border border-white/5">
          최고 <strong className="text-yellow-400">{game.best}</strong>
        </span>
      </div>

      {/* 게임 경기장 컨테이너 */}
      <div
        onPointerMove={handlePointerMoveGame}
        onPointerDown={handlePointerMoveGame}
        className="cq-container relative w-[min(340px,82vw)] aspect-[60/80] rounded-2xl bg-gradient-to-b from-[#1b2a33] via-[#26404a] to-[#2f4a3a] border border-white/15 overflow-hidden shadow-inner cursor-none touch-none"
      >
        <div className="game-field">
          {/* 떨어지는 아이템들 */}
          {game.items.map((item) => (
            <span
              key={item.id}
              className="spr-pixel"
              style={{
                ...getSpriteStyle(item.type, item.x, item.y),
                filter: item.type === 'turtle' ? 'drop-shadow(0 0 0.8em rgba(255, 200, 60, 0.75))' : undefined
              }}
            />
          ))}

          {/* 바구니 플레이어 */}
          <span
            className="spr-pixel"
            style={getSpriteStyle('basket', game.x - 7, 74)}
          />
        </div>

        {/* 시작 & 게임오버 오버레이 */}
        {game.status !== 'playing' && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 p-6 text-center bg-black/65 backdrop-blur-sm cursor-default">
            <h4 className="m-0 font-pixel text-2xl text-tang">
              {game.status === 'over' ? 'GAME OVER' : 'CATCH!'}
            </h4>
            <p className="text-xs md:text-sm text-white/80 leading-relaxed max-w-[240px]">
              {game.status === 'over'
                ? `황금거북이 ${game.score}마리를 모았습니다!`
                : '하늘에서 내려오는 황금거북이를 바구니로 받으세요. 현무암은 피하세요!'}
            </p>
            <button
              onClick={startGame}
              className="mt-2 px-6 py-2.5 rounded-full font-semibold text-sm bg-tang hover:bg-tang-shade text-black flex items-center gap-2 transition-all active:scale-95 shadow-lg"
            >
              {game.status === 'over' ? (
                <>
                  <RotateCcw className="w-4 h-4" />
                  <span>다시 하기</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-black" />
                  <span>게임 시작</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* 모바일 터치 패드 */}
      <div className="flex sm:hidden items-center gap-8 mt-1">
        <button
          aria-label="왼쪽으로 이동"
          onPointerDown={() => { dirRef.current = -1; }}
          onPointerUp={() => { dirRef.current = 0; }}
          onPointerLeave={() => { dirRef.current = 0; }}
          onPointerCancel={() => { dirRef.current = 0; }}
          className="w-16 h-16 rounded-full bg-white/10 active:bg-white/25 border border-white/15 flex items-center justify-center text-white/90 active:scale-90 transition-transform touch-none shadow-md"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          aria-label="오른쪽으로 이동"
          onPointerDown={() => { dirRef.current = 1; }}
          onPointerUp={() => { dirRef.current = 0; }}
          onPointerLeave={() => { dirRef.current = 0; }}
          onPointerCancel={() => { dirRef.current = 0; }}
          className="w-16 h-16 rounded-full bg-white/10 active:bg-white/25 border border-white/15 flex items-center justify-center text-white/90 active:scale-90 transition-transform touch-none shadow-md"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      <p className="text-xs text-white/50 text-center leading-normal max-w-xs">
        마우스 드래그 또는 방향키(←, →) 및 하단 버튼으로 바구니를 이동하세요.
      </p>
    </div>
  );
};
