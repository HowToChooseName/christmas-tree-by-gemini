
import { Vector3, Euler } from 'three';
import { TREE_CONFIG } from '../constants';

/**
 * 计算圆锥表面上的位置，使用特定的概率密度函数。
 * - Needles (针叶): 聚集在顶部，底部逐渐清零。
 * - Ornaments (装饰物): 主要分布在圣诞树中部，两端密度严格为 0。
 */
export const getTreePosition = (index: number, total: number, isOrnament = false): Vector3 => {
  let p: number = 0;

  if (isOrnament) {
    /**
     * 装饰物采样（集中在中部，两端清零）:
     * 使用拒绝采样，函数 f(p) = p^4 * (1-p)^4
     * 这是一个对称的钟形分布，峰值正好在 p = 0.5 (树的中部高度)。
     * f(0)=0 (顶端) 和 f(1)=0 (底部) 确保了两端的密度为零。
     */
    let found = false;
    while (!found) {
      const candidate = Math.random();
      // 在 p=0.5 处，p^4 * (1-p)^4 的峰值约为 0.00390625
      const prob = Math.pow(candidate, 4) * Math.pow(1 - candidate, 4);
      if (Math.random() * 0.004 < prob) {
        p = candidate;
        found = true;
      }
    }
  } else {
    /**
     * 针叶采样:
     * 顶部高密度，底部快速消失。
     */
    p = Math.pow(Math.random(), 2.2) * 0.92;
  }
  
  const height = TREE_CONFIG.HEIGHT;
  const maxRadius = TREE_CONFIG.RADIUS;
  
  // y 范围从顶部 (height/2) 到底部 (-height/2)
  const y = (height / 2) - (p * height);
  const currentRadius = p * maxRadius;
  const angle = Math.random() * Math.PI * 2;
  
  const x = Math.cos(angle) * currentRadius;
  const z = Math.sin(angle) * currentRadius;

  // 极小的随机偏移，使装饰物紧贴针叶表面
  const jitter = isOrnament ? 0.02 : 0.06;
  
  return new Vector3(
    x + (Math.random() - 0.5) * jitter,
    y + (Math.random() - 0.5) * jitter,
    z + (Math.random() - 0.5) * jitter
  );
};

export const getSpiralPosition = (index: number, total: number): Vector3 => {
  const t = index / total;
  const p = 1 - Math.pow(1 - t, 0.33); 
  const height = TREE_CONFIG.HEIGHT;
  const y = (height / 2) - (p * height); 
  const r = (p * TREE_CONFIG.RADIUS) + 0.25;
  const angle = y * 3.2; 
  return new Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r);
};

export const getScatterPosition = (): Vector3 => {
  const minR = 14.0;
  const maxR = TREE_CONFIG.SCATTER_RADIUS;
  const r = minR + (maxR - minR) * Math.pow(Math.random(), 1/3);
  const theta = Math.random() * 2 * Math.PI;
  const phi = Math.acos(2 * Math.random() - 1);
  return new Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi)
  );
};

export const getRandomRotation = (): Euler => {
  return new Euler(
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2
  );
};
