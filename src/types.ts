// types.ts - MENDLELAB WebApp 공통 타입 정의

export type SectionKey = 'hero' | 'play' | 'space' | 'make';

export type ModalType = 'play' | 'space' | 'make' | null;

export interface FallItem {
  id: number;
  x: number;
  y: number;
  vy: number;
  type: 'turtle' | 'stone';
}

export interface GameState {
  status: 'ready' | 'playing' | 'over';
  x: number;
  items: FallItem[];
  score: number;
  lives: number;
  best: number;
}

export type RoomItemKey = 'sofa' | 'lamp' | 'frame' | 'plant' | 'rug' | 'shelf' | 'cat';

export type WallKey = 'white' | 'stone' | 'olive' | 'sea';

export interface RoomItemDef {
  key: RoomItemKey;
  label: string;
  sprite: string;
  x: number;
  y: number;
}

export interface WallDef {
  key: WallKey;
  label: string;
  color: string;
}

export interface RoomState {
  on: Record<RoomItemKey, boolean>;
  wall: WallKey;
  light: boolean;
  pos: Record<RoomItemKey, { x: number; y: number }>;
  order: RoomItemKey[];
  drag: {
    key: RoomItemKey;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    unitPx: number;
  } | null;
}

export type ShapeKey = 'heart' | 'star' | 'tang' | 'donut';

export type ColorKey = 'tang' | 'sea' | 'stone' | 'white';

export interface ShapeDef {
  key: ShapeKey;
  label: string;
}

export interface ColorDef {
  key: ColorKey;
  label: string;
  main: string;
  shade: string;
}

export interface MakerState {
  shape: ShapeKey;
  color: ColorKey;
  p: number;
  status: 'idle' | 'printing' | 'done';
}

export interface SpriteDef {
  w: number;
  h: number;
  sh: string;
}

export interface PixelArtDef {
  cols: number;
  rows: number;
  cells: string;
}

export interface SectionDef {
  word: string;
  key: 'gamepad' | 'room' | 'printer';
  alt: string;
  modal: ModalType;
  cta: string;
}
