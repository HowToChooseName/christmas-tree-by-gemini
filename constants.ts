import { ThreeElements } from '@react-three/fiber';

export const COLORS = {
  EMERALD: '#2ecc71', // Bright eye-catching green
  GOLD: '#D4AF37',
  BRIGHT_GOLD: '#FFD700',
  DEEP_RED: '#ff0000', // Bright red for contrast
  DARK_GREEN: '#01160e',
  WHITE: '#ffffff',
};

export const COUNTS = {
  NEEDLES: 35000, // Optimized for stability on mobile/Netlify
  ORNAMENTS: 400,
  STARS: 200, 
  SNOW: 1500,
};

export const TREE_CONFIG = {
  HEIGHT: 12,
  RADIUS: 6.5,
  SCATTER_RADIUS: 22,
  TRANSITION_SPEED: 0.06,
};

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}