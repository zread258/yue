
export interface Firework {
  x: number;
  y: number;
  color: string;
  particles: Particle[];
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

export enum AppState {
  INTRO = 'INTRO',
  COUNTDOWN = 'COUNTDOWN',
  CELEBRATION = 'CELEBRATION'
}
