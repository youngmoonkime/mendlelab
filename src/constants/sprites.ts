import { SpriteDef, PixelArtDef, RoomItemDef, WallDef, ShapeDef, ColorDef, SectionDef } from '../types';

export const SPRITES: Record<string, SpriteDef> = {
  tang: {
    w: 8,
    h: 7,
    sh: "4em 1em 0 #6E9B4F, 3em 2em 0 #6E9B4F, 4em 2em 0 #6E9B4F, 2em 3em 0 #F28C28, 3em 3em 0 #F28C28, 4em 3em 0 #F28C28, 5em 3em 0 #F28C28, 6em 3em 0 #F28C28, 1em 4em 0 #F28C28, 2em 4em 0 #F28C28, 3em 4em 0 #F28C28, 4em 4em 0 #F28C28, 5em 4em 0 #F28C28, 6em 4em 0 #F28C28, 7em 4em 0 #F28C28, 1em 5em 0 #F28C28, 2em 5em 0 #F28C28, 3em 5em 0 #F28C28, 4em 5em 0 #F28C28, 5em 5em 0 #F28C28, 6em 5em 0 #F28C28, 7em 5em 0 #F28C28, 8em 5em 0 #D06A10, 1em 6em 0 #F28C28, 2em 6em 0 #F28C28, 3em 6em 0 #F28C28, 4em 6em 0 #F28C28, 5em 6em 0 #F28C28, 6em 6em 0 #F28C28, 7em 6em 0 #D06A10, 3em 7em 0 #D06A10, 4em 7em 0 #D06A10, 5em 7em 0 #D06A10, 6em 7em 0 #D06A10"
  },
  stone: {
    w: 7,
    h: 6,
    sh: "2em 1em 0 #77736F, 3em 1em 0 #77736F, 4em 1em 0 #77736F, 5em 1em 0 #77736F, 6em 1em 0 #77736F, 1em 2em 0 #77736F, 2em 2em 0 #77736F, 3em 2em 0 #3A3836, 4em 2em 0 #77736F, 5em 2em 0 #77736F, 6em 2em 0 #77736F, 7em 2em 0 #77736F, 1em 3em 0 #77736F, 2em 3em 0 #77736F, 3em 3em 0 #77736F, 4em 3em 0 #77736F, 5em 3em 0 #77736F, 6em 3em 0 #3A3836, 7em 3em 0 #77736F, 1em 4em 0 #77736F, 2em 4em 0 #3A3836, 3em 4em 0 #77736F, 4em 4em 0 #77736F, 5em 4em 0 #77736F, 6em 4em 0 #77736F, 7em 4em 0 #77736F, 1em 5em 0 #77736F, 2em 5em 0 #77736F, 3em 5em 0 #77736F, 4em 5em 0 #77736F, 5em 5em 0 #3A3836, 6em 5em 0 #77736F, 2em 6em 0 #77736F, 3em 6em 0 #77736F, 4em 6em 0 #77736F, 5em 6em 0 #77736F"
  },
  basket: {
    w: 14,
    h: 5,
    sh: "1em 1em 0 #C08A52, 14em 1em 0 #C08A52, 1em 2em 0 #C08A52, 2em 2em 0 #C08A52, 13em 2em 0 #C08A52, 14em 2em 0 #C08A52, 1em 3em 0 #C08A52, 2em 3em 0 #C08A52, 3em 3em 0 #C08A52, 4em 3em 0 #C08A52, 5em 3em 0 #C08A52, 6em 3em 0 #C08A52, 7em 3em 0 #C08A52, 8em 3em 0 #C08A52, 9em 3em 0 #C08A52, 10em 3em 0 #C08A52, 11em 3em 0 #C08A52, 12em 3em 0 #C08A52, 13em 3em 0 #C08A52, 14em 3em 0 #C08A52, 2em 4em 0 #8A5A2E, 3em 4em 0 #8A5A2E, 4em 4em 0 #8A5A2E, 5em 4em 0 #8A5A2E, 6em 4em 0 #8A5A2E, 7em 4em 0 #8A5A2E, 8em 4em 0 #8A5A2E, 9em 4em 0 #8A5A2E, 10em 4em 0 #8A5A2E, 11em 4em 0 #8A5A2E, 12em 4em 0 #8A5A2E, 13em 4em 0 #8A5A2E, 3em 5em 0 #8A5A2E, 4em 5em 0 #8A5A2E, 5em 5em 0 #8A5A2E, 6em 5em 0 #8A5A2E, 7em 5em 0 #8A5A2E, 8em 5em 0 #8A5A2E, 9em 5em 0 #8A5A2E, 10em 5em 0 #8A5A2E, 11em 5em 0 #8A5A2E, 12em 5em 0 #8A5A2E"
  },
  frame: {
    w: 12,
    h: 9,
    sh: "1em 1em 0 #5A3E2B, 2em 1em 0 #5A3E2B, 3em 1em 0 #5A3E2B, 4em 1em 0 #5A3E2B, 5em 1em 0 #5A3E2B, 6em 1em 0 #5A3E2B, 7em 1em 0 #5A3E2B, 8em 1em 0 #5A3E2B, 9em 1em 0 #5A3E2B, 10em 1em 0 #5A3E2B, 11em 1em 0 #5A3E2B, 12em 1em 0 #5A3E2B, 1em 2em 0 #5A3E2B, 2em 2em 0 #CFE3EA, 3em 2em 0 #CFE3EA, 4em 2em 0 #CFE3EA, 5em 2em 0 #CFE3EA, 6em 2em 0 #CFE3EA, 7em 2em 0 #CFE3EA, 8em 2em 0 #CFE3EA, 9em 2em 0 #CFE3EA, 10em 2em 0 #CFE3EA, 11em 2em 0 #CFE3EA, 12em 2em 0 #5A3E2B, 1em 3em 0 #5A3E2B, 2em 3em 0 #CFE3EA, 3em 3em 0 #CFE3EA, 4em 3em 0 #FFFFFF, 5em 3em 0 #FFFFFF, 6em 3em 0 #CFE3EA, 7em 3em 0 #CFE3EA, 8em 3em 0 #CFE3EA, 9em 3em 0 #CFE3EA, 10em 3em 0 #CFE3EA, 11em 3em 0 #CFE3EA, 12em 3em 0 #5A3E2B, 1em 4em 0 #5A3E2B, 2em 4em 0 #CFE3EA, 3em 4em 0 #CFE3EA, 4em 4em 0 #CFE3EA, 5em 4em 0 #CFE3EA, 6em 4em 0 #CFE3EA, 7em 4em 0 #CFE3EA, 8em 4em 0 #CFE3EA, 9em 4em 0 #CFE3EA, 10em 4em 0 #CFE3EA, 11em 4em 0 #CFE3EA, 12em 4em 0 #5A3E2B, 1em 5em 0 #5A3E2B, 2em 5em 0 #CFE3EA, 3em 5em 0 #CFE3EA, 4em 5em 0 #CFE3EA, 5em 5em 0 #CFE3EA, 6em 5em 0 #5E8C4A, 7em 5em 0 #5E8C4A, 8em 5em 0 #CFE3EA, 9em 5em 0 #CFE3EA, 10em 5em 0 #CFE3EA, 11em 5em 0 #CFE3EA, 12em 5em 0 #5A3E2B, 1em 6em 0 #5A3E2B, 2em 6em 0 #CFE3EA, 3em 6em 0 #CFE3EA, 4em 6em 0 #5E8C4A, 5em 6em 0 #5E8C4A, 6em 6em 0 #5E8C4A, 7em 6em 0 #5E8C4A, 8em 6em 0 #5E8C4A, 9em 6em 0 #5E8C4A, 10em 6em 0 #CFE3EA, 11em 6em 0 #CFE3EA, 12em 6em 0 #5A3E2B, 1em 7em 0 #5A3E2B, 2em 7em 0 #CFE3EA, 3em 7em 0 #5E8C4A, 4em 7em 0 #5E8C4A, 5em 7em 0 #5E8C4A, 6em 7em 0 #5E8C4A, 7em 7em 0 #5E8C4A, 8em 7em 0 #5E8C4A, 9em 7em 0 #5E8C4A, 10em 7em 0 #5E8C4A, 11em 7em 0 #CFE3EA, 12em 7em 0 #5A3E2B, 1em 8em 0 #5A3E2B, 2em 8em 0 #5E8C4A, 3em 8em 0 #5E8C4A, 4em 8em 0 #5E8C4A, 5em 8em 0 #5E8C4A, 6em 8em 0 #5E8C4A, 7em 8em 0 #5E8C4A, 8em 8em 0 #5E8C4A, 9em 8em 0 #5E8C4A, 10em 8em 0 #5E8C4A, 11em 8em 0 #5E8C4A, 12em 8em 0 #5A3E2B, 1em 9em 0 #5A3E2B, 2em 9em 0 #5A3E2B, 3em 9em 0 #5A3E2B, 4em 9em 0 #5A3E2B, 5em 9em 0 #5A3E2B, 6em 9em 0 #5A3E2B, 7em 9em 0 #5A3E2B, 8em 9em 0 #5A3E2B, 9em 9em 0 #5A3E2B, 10em 9em 0 #5A3E2B, 11em 9em 0 #5A3E2B, 12em 9em 0 #5A3E2B"
  },
  lamp: {
    w: 9,
    h: 10,
    sh: "5em 1em 0 #1A1A1A, 5em 2em 0 #1A1A1A, 5em 3em 0 #1A1A1A, 5em 4em 0 #1A1A1A, 5em 5em 0 #1A1A1A, 5em 6em 0 #1A1A1A, 4em 7em 0 #E8D9B8, 5em 7em 0 #E8D9B8, 6em 7em 0 #E8D9B8, 3em 8em 0 #E8D9B8, 4em 8em 0 #E8D9B8, 5em 8em 0 #E8D9B8, 6em 8em 0 #E8D9B8, 7em 8em 0 #E8D9B8, 2em 9em 0 #E8D9B8, 3em 9em 0 #E8D9B8, 4em 9em 0 #E8D9B8, 5em 9em 0 #E8D9B8, 6em 9em 0 #E8D9B8, 7em 9em 0 #E8D9B8, 8em 9em 0 #E8D9B8, 5em 10em 0 #FFD27A"
  },
  shelf: {
    w: 14,
    h: 5,
    sh: "2em 1em 0 #D9534F, 4em 1em 0 #D9534F, 7em 1em 0 #F2C14E, 12em 1em 0 #6E9B4F, 2em 2em 0 #D9534F, 3em 2em 0 #D9534F, 4em 2em 0 #D9534F, 7em 2em 0 #F2C14E, 8em 2em 0 #F2C14E, 9em 2em 0 #F2C14E, 11em 2em 0 #F28C28, 12em 2em 0 #F28C28, 13em 2em 0 #F28C28, 3em 3em 0 #D9534F, 7em 3em 0 #F2C14E, 11em 3em 0 #F28C28, 12em 3em 0 #F28C28, 13em 3em 0 #F28C28, 1em 4em 0 #6B4A33, 2em 4em 0 #6B4A33, 3em 4em 0 #6B4A33, 4em 4em 0 #6B4A33, 5em 4em 0 #6B4A33, 6em 4em 0 #6B4A33, 7em 4em 0 #6B4A33, 8em 4em 0 #6B4A33, 9em 4em 0 #6B4A33, 10em 4em 0 #6B4A33, 11em 4em 0 #6B4A33, 12em 4em 0 #6B4A33, 13em 4em 0 #6B4A33, 14em 4em 0 #6B4A33, 2em 5em 0 #3B2A1E, 13em 5em 0 #3B2A1E"
  },
  plant: {
    w: 7,
    h: 10,
    sh: "4em 1em 0 #6E9B4F, 2em 2em 0 #6E9B4F, 4em 2em 0 #6E9B4F, 6em 2em 0 #6E9B4F, 1em 3em 0 #6E9B4F, 2em 3em 0 #6E9B4F, 4em 3em 0 #6E9B4F, 6em 3em 0 #6E9B4F, 7em 3em 0 #6E9B4F, 2em 4em 0 #6E9B4F, 3em 4em 0 #6E9B4F, 4em 4em 0 #6E9B4F, 5em 4em 0 #6E9B4F, 6em 4em 0 #6E9B4F, 3em 5em 0 #3F6B35, 4em 5em 0 #6E9B4F, 5em 5em 0 #3F6B35, 4em 6em 0 #3F6B35, 2em 7em 0 #B5653A, 3em 7em 0 #B5653A, 4em 7em 0 #B5653A, 5em 7em 0 #B5653A, 6em 7em 0 #B5653A, 2em 8em 0 #B5653A, 3em 8em 0 #B5653A, 4em 8em 0 #B5653A, 5em 8em 0 #B5653A, 6em 8em 0 #B5653A, 3em 9em 0 #B5653A, 4em 9em 0 #B5653A, 5em 9em 0 #B5653A, 3em 10em 0 #B5653A, 4em 10em 0 #B5653A, 5em 10em 0 #B5653A"
  },
  sofa: {
    w: 18,
    h: 8,
    sh: "3em 1em 0 #3E6E6A, 4em 1em 0 #3E6E6A, 5em 1em 0 #3E6E6A, 6em 1em 0 #3E6E6A, 7em 1em 0 #3E6E6A, 8em 1em 0 #3E6E6A, 9em 1em 0 #3E6E6A, 10em 1em 0 #3E6E6A, 11em 1em 0 #3E6E6A, 12em 1em 0 #3E6E6A, 13em 1em 0 #3E6E6A, 14em 1em 0 #3E6E6A, 15em 1em 0 #3E6E6A, 16em 1em 0 #3E6E6A, 2em 2em 0 #3E6E6A, 3em 2em 0 #3E6E6A, 4em 2em 0 #3E6E6A, 5em 2em 0 #3E6E6A, 6em 2em 0 #3E6E6A, 7em 2em 0 #3E6E6A, 8em 2em 0 #3E6E6A, 9em 2em 0 #3E6E6A, 10em 2em 0 #3E6E6A, 11em 2em 0 #3E6E6A, 12em 2em 0 #3E6E6A, 13em 2em 0 #3E6E6A, 14em 2em 0 #3E6E6A, 15em 2em 0 #3E6E6A, 16em 2em 0 #3E6E6A, 17em 2em 0 #3E6E6A, 1em 3em 0 #3E6E6A, 2em 3em 0 #3E6E6A, 3em 3em 0 #3E6E6A, 4em 3em 0 #3E6E6A, 5em 3em 0 #3E6E6A, 6em 3em 0 #3E6E6A, 7em 3em 0 #3E6E6A, 8em 3em 0 #3E6E6A, 9em 3em 0 #3E6E6A, 10em 3em 0 #3E6E6A, 11em 3em 0 #3E6E6A, 12em 3em 0 #3E6E6A, 13em 3em 0 #3E6E6A, 14em 3em 0 #3E6E6A, 15em 3em 0 #3E6E6A, 16em 3em 0 #3E6E6A, 17em 3em 0 #3E6E6A, 18em 3em 0 #3E6E6A, 1em 4em 0 #3E6E6A, 2em 4em 0 #3E6E6A, 3em 4em 0 #2C504D, 4em 4em 0 #2C504D, 5em 4em 0 #2C504D, 6em 4em 0 #2C504D, 7em 4em 0 #2C504D, 8em 4em 0 #2C504D, 9em 4em 0 #2C504D, 10em 4em 0 #2C504D, 11em 4em 0 #2C504D, 12em 4em 0 #2C504D, 13em 4em 0 #2C504D, 14em 4em 0 #2C504D, 15em 4em 0 #2C504D, 16em 4em 0 #2C504D, 17em 4em 0 #3E6E6A, 18em 4em 0 #3E6E6A, 1em 5em 0 #3E6E6A, 2em 5em 0 #3E6E6A, 3em 5em 0 #3E6E6A, 4em 5em 0 #3E6E6A, 5em 5em 0 #3E6E6A, 6em 5em 0 #3E6E6A, 7em 5em 0 #3E6E6A, 8em 5em 0 #3E6E6A, 9em 5em 0 #3E6E6A, 10em 5em 0 #3E6E6A, 11em 5em 0 #3E6E6A, 12em 5em 0 #3E6E6A, 13em 5em 0 #3E6E6A, 14em 5em 0 #3E6E6A, 15em 5em 0 #3E6E6A, 16em 5em 0 #3E6E6A, 17em 5em 0 #3E6E6A, 18em 5em 0 #3E6E6A, 1em 6em 0 #3E6E6A, 2em 6em 0 #3E6E6A, 3em 6em 0 #3E6E6A, 4em 6em 0 #3E6E6A, 5em 6em 0 #3E6E6A, 6em 6em 0 #3E6E6A, 7em 6em 0 #3E6E6A, 8em 6em 0 #3E6E6A, 9em 6em 0 #3E6E6A, 10em 6em 0 #3E6E6A, 11em 6em 0 #3E6E6A, 12em 6em 0 #3E6E6A, 13em 6em 0 #3E6E6A, 14em 6em 0 #3E6E6A, 15em 6em 0 #3E6E6A, 16em 6em 0 #3E6E6A, 17em 6em 0 #3E6E6A, 18em 6em 0 #3E6E6A, 1em 7em 0 #2C504D, 2em 7em 0 #2C504D, 3em 7em 0 #2C504D, 4em 7em 0 #2C504D, 5em 7em 0 #2C504D, 6em 7em 0 #2C504D, 7em 7em 0 #2C504D, 8em 7em 0 #2C504D, 9em 7em 0 #2C504D, 10em 7em 0 #2C504D, 11em 7em 0 #2C504D, 12em 7em 0 #2C504D, 13em 7em 0 #2C504D, 14em 7em 0 #2C504D, 15em 7em 0 #2C504D, 16em 7em 0 #2C504D, 17em 7em 0 #2C504D, 18em 7em 0 #2C504D, 2em 8em 0 #222222, 17em 8em 0 #222222"
  },
  rug: {
    w: 22,
    h: 3,
    sh: "1em 1em 0 #C9B48A, 2em 1em 0 #C9B48A, 3em 1em 0 #C9B48A, 4em 1em 0 #C9B48A, 5em 1em 0 #C9B48A, 6em 1em 0 #C9B48A, 7em 1em 0 #C9B48A, 8em 1em 0 #C9B48A, 9em 1em 0 #C9B48A, 10em 1em 0 #C9B48A, 11em 1em 0 #C9B48A, 12em 1em 0 #C9B48A, 13em 1em 0 #C9B48A, 14em 1em 0 #C9B48A, 15em 1em 0 #C9B48A, 16em 1em 0 #C9B48A, 17em 1em 0 #C9B48A, 18em 1em 0 #C9B48A, 19em 1em 0 #C9B48A, 20em 1em 0 #C9B48A, 21em 1em 0 #C9B48A, 22em 1em 0 #C9B48A, 1em 2em 0 #C9B48A, 2em 2em 0 #9E8A62, 3em 2em 0 #C9B48A, 4em 2em 0 #9E8A62, 5em 2em 0 #C9B48A, 6em 2em 0 #9E8A62, 7em 2em 0 #C9B48A, 8em 2em 0 #9E8A62, 9em 2em 0 #C9B48A, 10em 2em 0 #9E8A62, 11em 2em 0 #C9B48A, 12em 2em 0 #9E8A62, 13em 2em 0 #C9B48A, 14em 2em 0 #9E8A62, 15em 2em 0 #C9B48A, 16em 2em 0 #9E8A62, 17em 2em 0 #C9B48A, 18em 2em 0 #9E8A62, 19em 2em 0 #C9B48A, 20em 2em 0 #9E8A62, 21em 2em 0 #C9B48A, 22em 2em 0 #9E8A62, 1em 3em 0 #C9B48A, 2em 3em 0 #C9B48A, 3em 3em 0 #C9B48A, 4em 3em 0 #C9B48A, 5em 3em 0 #C9B48A, 6em 3em 0 #C9B48A, 7em 3em 0 #C9B48A, 8em 3em 0 #C9B48A, 9em 3em 0 #C9B48A, 10em 3em 0 #C9B48A, 11em 3em 0 #C9B48A, 12em 3em 0 #C9B48A, 13em 3em 0 #C9B48A, 14em 3em 0 #C9B48A, 15em 3em 0 #C9B48A, 16em 3em 0 #C9B48A, 17em 3em 0 #C9B48A, 18em 3em 0 #C9B48A, 19em 3em 0 #C9B48A, 20em 3em 0 #C9B48A, 21em 3em 0 #C9B48A, 22em 3em 0 #C9B48A"
  },
  cat: {
    w: 8,
    h: 7,
    sh: "2em 1em 0 #222222, 6em 1em 0 #E08A3C, 1em 2em 0 #222222, 2em 2em 0 #222222, 3em 2em 0 #F4F1EA, 4em 2em 0 #F4F1EA, 5em 2em 0 #F4F1EA, 6em 2em 0 #E08A3C, 7em 2em 0 #E08A3C, 1em 3em 0 #F4F1EA, 2em 3em 0 #222222, 3em 3em 0 #F4F1EA, 4em 3em 0 #F4F1EA, 5em 3em 0 #F4F1EA, 6em 3em 0 #222222, 7em 3em 0 #F4F1EA, 1em 4em 0 #F4F1EA, 2em 4em 0 #F4F1EA, 3em 4em 0 #F4F1EA, 4em 4em 0 #E79AA0, 5em 4em 0 #F4F1EA, 6em 4em 0 #F4F1EA, 7em 4em 0 #F4F1EA, 2em 5em 0 #F4F1EA, 3em 5em 0 #F4F1EA, 4em 5em 0 #F4F1EA, 5em 5em 0 #F4F1EA, 6em 5em 0 #F4F1EA, 2em 6em 0 #F4F1EA, 3em 6em 0 #F4F1EA, 4em 6em 0 #E08A3C, 5em 6em 0 #F4F1EA, 6em 6em 0 #F4F1EA, 7em 6em 0 #E08A3C, 2em 7em 0 #F4F1EA, 3em 7em 0 #F4F1EA, 5em 7em 0 #F4F1EA, 6em 7em 0 #F4F1EA, 8em 7em 0 #E08A3C"
  },
  nozzle: {
    w: 5,
    h: 4,
    sh: "1em 1em 0 #9A958F, 2em 1em 0 #9A958F, 3em 1em 0 #9A958F, 4em 1em 0 #9A958F, 5em 1em 0 #9A958F, 1em 2em 0 #9A958F, 2em 2em 0 #9A958F, 3em 2em 0 #9A958F, 4em 2em 0 #9A958F, 5em 2em 0 #9A958F, 2em 3em 0 #9A958F, 3em 3em 0 #9A958F, 4em 3em 0 #9A958F, 3em 4em 0 #9A958F"
  },
  ringtop: {
    w: 5,
    h: 4,
    sh: "2em 1em 0 #C9C5BF, 3em 1em 0 #C9C5BF, 4em 1em 0 #C9C5BF, 1em 2em 0 #C9C5BF, 5em 2em 0 #C9C5BF, 1em 3em 0 #C9C5BF, 5em 3em 0 #C9C5BF, 2em 4em 0 #C9C5BF, 4em 4em 0 #C9C5BF"
  },
  turtle: {
    w: 10,
    h: 5,
    sh: "4em 1em 0 #F2C230, 5em 1em 0 #F2C230, 6em 1em 0 #F2C230, 3em 2em 0 #F2C230, 4em 2em 0 #B8860B, 5em 2em 0 #F2C230, 6em 2em 0 #B8860B, 7em 2em 0 #F2C230, 9em 2em 0 #F7DC7A, 10em 2em 0 #F7DC7A, 2em 3em 0 #F2C230, 3em 3em 0 #F2C230, 4em 3em 0 #F2C230, 5em 3em 0 #F2C230, 6em 3em 0 #F2C230, 7em 3em 0 #F2C230, 8em 3em 0 #F2C230, 9em 3em 0 #F7DC7A, 10em 3em 0 #3A2A00, 1em 4em 0 #A87A0A, 2em 4em 0 #A87A0A, 3em 4em 0 #A87A0A, 4em 4em 0 #A87A0A, 5em 4em 0 #A87A0A, 6em 4em 0 #A87A0A, 7em 4em 0 #A87A0A, 8em 4em 0 #A87A0A, 2em 5em 0 #F7DC7A, 4em 5em 0 #F7DC7A, 7em 5em 0 #F7DC7A, 9em 5em 0 #F7DC7A"
  }
};

export const SHAPES_DATA: Record<string, string[]> = {
  heart: [
    ".xxx....xxx.",
    "xxxxx..xxxxx",
    "xxxxxxxxxxxx",
    "xxxxxxxxxxxx",
    "xxxxxxxxxxxy",
    ".xxxxxxxxxy.",
    "..xxxxxxxy..",
    "...xxxxxy...",
    "....xxxy....",
    ".....xy....."
  ],
  star: [
    ".....x.....",
    ".....x.....",
    "....xxx....",
    "....xxx....",
    "xxxxxxxxxxx",
    ".xxxxxxxxx.",
    "..xxxxxxx..",
    "..xxxxxxx..",
    ".xxxx.xxxy.",
    ".xxy...xxy.",
    "xy.......xy"
  ],
  tang: [
    ".....g.....",
    "....gg.....",
    "..xxxxxxx..",
    ".xxxxxxxxx.",
    "xxxxxxxxxxx",
    "xxxxxxxxxxx",
    "xxxxxxxxxxy",
    "xxxxxxxxxxy",
    ".xxxxxxxxy.",
    "..xxxxxyy.."
  ],
  donut: [
    "...xxxxx...",
    ".xxxxxxxxx.",
    ".xxxxxxxxx.",
    "xxxx...xxxx",
    "xxx.....xxx",
    "xxx.....xxx",
    "xxx.....xxy",
    "xxxx...xxxy",
    ".xxxxxxxxy.",
    ".xxxxxxxyy.",
    "...xxxyy..."
  ]
};

export const PIXEL_ARTS: Record<string, PixelArtDef> = {
  gamepad: {
    cols: 20,
    rows: 11,
    cells: "3,0;4,0;5,0;6,0;7,0;12,0;13,0;14,0;15,0;16,0;2,1;3,1;4,1;5,1;6,1;7,1;8,1;9,1;10,1;11,1;12,1;13,1;14,1;15,1;16,1;17,1;1,2;2,2;3,2;4,2;5,2;6,2;7,2;8,2;9,2;10,2;11,2;12,2;13,2;14,2;15,2;16,2;17,2;18,2;0,3;1,3;2,3;3,3;5,3;6,3;7,3;8,3;9,3;10,3;11,3;12,3;13,3;15,3;16,3;17,3;18,3;19,3;0,4;1,4;2,4;6,4;7,4;8,4;9,4;10,4;11,4;12,4;14,4;16,4;17,4;18,4;19,4;0,5;1,5;2,5;3,5;5,5;6,5;7,5;8,5;9,5;10,5;11,5;12,5;13,5;15,5;16,5;17,5;18,5;19,5;0,6;1,6;2,6;3,6;4,6;5,6;6,6;7,6;8,6;9,6;10,6;11,6;12,6;13,6;14,6;15,6;16,6;17,6;18,6;19,6;0,7;1,7;2,7;3,7;4,7;5,7;6,7;13,7;14,7;15,7;16,7;17,7;18,7;19,7;0,8;1,8;2,8;3,8;4,8;5,8;14,8;15,8;16,8;17,8;18,8;19,8;1,9;2,9;3,9;4,9;15,9;16,9;17,9;18,9;2,10;3,10;16,10;17,10"
  },
  room: {
    cols: 20,
    rows: 15,
    cells: "14,0;2,1;3,1;4,1;5,1;6,1;7,1;8,1;14,1;2,2;5,2;8,2;14,2;2,3;5,3;8,3;13,3;14,3;15,3;2,4;3,4;4,4;5,4;6,4;7,4;8,4;12,4;13,4;14,4;15,4;16,4;2,5;5,5;8,5;2,6;5,6;8,6;2,7;3,7;4,7;5,7;6,7;7,7;8,7;16,7;15,8;16,8;17,8;2,9;3,9;4,9;5,9;6,9;7,9;8,9;9,9;10,9;14,9;16,9;18,9;1,10;2,10;3,10;4,10;5,10;6,10;7,10;8,10;9,10;10,10;11,10;15,10;16,10;17,10;1,11;11,11;14,11;15,11;16,11;17,11;18,11;1,12;2,12;3,12;4,12;5,12;6,12;7,12;8,12;9,12;10,12;11,12;15,12;16,12;17,12;2,13;10,13;15,13;16,13;17,13;0,14;1,14;2,14;3,14;4,14;5,14;6,14;7,14;8,14;9,14;10,14;11,14;12,14;13,14;14,14;15,14;16,14;17,14;18,14;19,14"
  },
  printer: {
    cols: 20,
    rows: 16,
    cells: "0,0;1,0;2,0;3,0;4,0;5,0;6,0;7,0;8,0;9,0;10,0;11,0;12,0;13,0;14,0;15,0;16,0;17,0;18,0;19,0;0,1;19,1;0,2;8,2;9,2;10,2;11,2;19,2;0,3;1,3;2,3;3,3;4,3;5,3;6,3;7,3;8,3;9,3;10,3;11,3;12,3;13,3;14,3;15,3;16,3;17,3;18,3;19,3;0,4;8,4;9,4;10,4;11,4;19,4;0,5;9,5;10,5;19,5;0,6;19,6;0,7;7,7;8,7;10,7;11,7;19,7;0,8;6,8;7,8;8,8;9,8;10,8;11,8;12,8;19,8;0,9;6,9;7,9;8,9;9,9;10,9;11,9;12,9;19,9;0,10;7,10;8,10;9,10;10,10;11,10;19,10;0,11;8,11;9,11;10,11;19,11;0,12;9,12;19,12;0,13;2,13;3,13;4,13;5,13;6,13;7,13;8,13;9,13;10,13;11,13;12,13;13,13;14,13;15,13;16,13;17,13;19,13;0,14;2,14;17,14;19,14;0,15;1,15;2,15;3,15;4,15;5,15;6,15;7,15;8,15;9,15;10,15;11,15;12,15;13,15;14,15;15,15;16,15;17,15;18,15;19,15"
  }
};

export const SECTION_DEFS: SectionDef[] = [
  { word: 'PLAY', key: 'gamepad', alt: '게임패드 픽셀 아이콘', modal: 'play', cta: '눌러서 게임하기' },
  { word: 'SPACE', key: 'room', alt: '창문, 조명, 소파, 화분이 있는 실내 공간 픽셀 아이콘', modal: 'space', cta: '눌러서 공간 꾸미기' },
  { word: 'MAKE', key: 'printer', alt: '하트 굿즈를 출력하는 3D 프린터 픽셀 아이콘', modal: 'make', cta: '눌러서 굿즈 만들기' }
];

export const ROOM_DEFS: RoomItemDef[] = [
  { key: 'sofa', label: '소파', sprite: 'sofa', x: 17, y: 26 },
  { key: 'lamp', label: '조명', sprite: 'lamp', x: 28, y: 0 },
  { key: 'frame', label: '한라산 액자', sprite: 'frame', x: 6, y: 7 },
  { key: 'plant', label: '화분', sprite: 'plant', x: 3, y: 24 },
  { key: 'rug', label: '러그', sprite: 'rug', x: 15, y: 35 },
  { key: 'shelf', label: '굿즈 선반', sprite: 'shelf', x: 45, y: 13 },
  { key: 'cat', label: '고양이', sprite: 'cat', x: 47, y: 27 }
];

export const WALL_DEFS: WallDef[] = [
  { key: 'white', label: '화이트', color: '#EDEAE3' },
  { key: 'stone', label: '현무암', color: '#4A4846' },
  { key: 'olive', label: '올리브', color: '#7C8461' },
  { key: 'sea', label: '바다', color: '#4F7C8A' }
];

export const SHAPE_DEFS: ShapeDef[] = [
  { key: 'heart', label: '하트' },
  { key: 'star', label: '별' },
  { key: 'tang', label: '귤' },
  { key: 'donut', label: '도넛' }
];

export const COLOR_DEFS: ColorDef[] = [
  { key: 'tang', label: '귤빛', main: '#F28C28', shade: '#C96A12' },
  { key: 'sea', label: '바다', main: '#3D8FB0', shade: '#2A6A85' },
  { key: 'stone', label: '현무암', main: '#8A8682', shade: '#5E5B58' },
  { key: 'white', label: '화이트', main: '#F2F0EA', shade: '#C7C3BB' }
];
