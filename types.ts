import { Vector3, Euler } from 'three';
import { ThreeElements } from '@react-three/fiber';

export enum TreeState {
  SCATTERED = 'SCATTERED',
  TREE_SHAPE = 'TREE_SHAPE'
}

export interface ParticleData {
  scatterPosition: Vector3;
  treePosition: Vector3;
  scatterRotation: Euler;
  treeRotation: Euler;
  scale: number;
  color: string;
  type: 'needle' | 'ornament' | 'star';
  subType?: 'ball' | 'bell' | 'gift' | 'snowman' | 'leaf';
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}