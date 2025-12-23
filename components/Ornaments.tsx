
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { InstancedMesh, Object3D, Shape, ExtrudeGeometry, Vector3, Euler } from 'three';
import { TreeState } from '../types';
import { getTreePosition, getScatterPosition, getRandomRotation } from '../utils/math';
import { COUNTS, COLORS, TREE_CONFIG } from '../constants';

interface OrnamentsProps {
  state: TreeState;
}

interface OrnamentItem {
  treePos: Vector3;
  scatterPos: Vector3;
  currentPos: Vector3;
  treeRot: Euler;
  scatterRot: Euler;
  scale: number;
  localSpin: number;
}

const Ornaments: React.FC<OrnamentsProps> = ({ state }) => {
  const ballGoldMeshRef = useRef<InstancedMesh>(null);
  const ballRedMeshRef = useRef<InstancedMesh>(null);
  const bellMeshRef = useRef<InstancedMesh>(null);
  const starMeshRef = useRef<InstancedMesh>(null);
  
  const tempObject = useMemo(() => new Object3D(), []);
  const tempPos = useMemo(() => new Vector3(), []);

  // Updated counts: Gold reduced to 75% of original 1/3 share
  const GOLD_COUNT = Math.floor((COUNTS.ORNAMENTS / 3) * 0.75);
  const RED_COUNT = Math.floor((COUNTS.ORNAMENTS / 3) * 0.75);
  const BELL_COUNT = Math.floor(COUNTS.ORNAMENTS / 3);

  const globalPositions = useMemo<Vector3[]>(() => [], []);

  const generateItems = (count: number, isBell = false, isStar = false): OrnamentItem[] => {
    const items: OrnamentItem[] = [];
    const minDistance = isStar ? 0.5 : 0.8; 

    for (let i = 0; i < count; i++) {
      let candidatePos = getTreePosition(i, count, true);
      let attempts = 0;
      
      while (attempts < 600) {
        const isOverlap = globalPositions.some(p => p.distanceTo(candidatePos) < minDistance);
        const nearTip = candidatePos.y > 5.9; 
        if (!isOverlap && !nearTip) break;
        candidatePos = getTreePosition(i, count, true);
        attempts++;
      }

      globalPositions.push(candidatePos);

      items.push({
        treePos: candidatePos,
        scatterPos: getScatterPosition(),
        currentPos: getScatterPosition(),
        treeRot: getRandomRotation(),
        scatterRot: getRandomRotation(),
        scale: isStar ? (0.1 + Math.random() * 0.1) : (isBell ? (0.24 + Math.random() * 0.06) : (0.2 + Math.random() * 0.06)),
        localSpin: (Math.random() - 0.5) * 1.6,
      });
    }
    return items;
  };

  const { goldData, redData, bellData, starData } = useMemo(() => {
    globalPositions.length = 0;
    return {
      goldData: generateItems(GOLD_COUNT),
      redData: generateItems(RED_COUNT),
      bellData: generateItems(BELL_COUNT, true),
      starData: generateItems(COUNTS.STARS, false, true),
    };
  }, [GOLD_COUNT, RED_COUNT, BELL_COUNT]);

  const starGeometry = useMemo(() => {
    const shape = new Shape();
    const pts = 5;
    for (let i = 0; i < pts * 2; i++) {
      const radius = i % 2 === 0 ? 0.6 : 0.25;
      const angle = (i / (pts * 2)) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    return new ExtrudeGeometry(shape, {
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 3
    });
  }, []);

  useFrame((_state, delta) => {
    const t = TREE_CONFIG.TRANSITION_SPEED * (delta * 60);
    const isTree = state === TreeState.TREE_SHAPE;
    const globalRotY = _state.clock.elapsedTime * 0.12;

    const updateMesh = (meshRef: React.RefObject<InstancedMesh>, data: OrnamentItem[]) => {
      if (!meshRef.current) return;
      data.forEach((p, i) => {
        const targetPos = isTree ? p.treePos : p.scatterPos;
        p.currentPos.lerp(targetPos, t * 0.7);

        tempPos.copy(p.currentPos);
        if (isTree) {
          const x = tempPos.x;
          const z = tempPos.z;
          tempPos.x = x * Math.cos(globalRotY) - z * Math.sin(globalRotY);
          tempPos.z = x * Math.sin(globalRotY) + z * Math.cos(globalRotY);
        }

        tempObject.position.copy(tempPos);
        const rot = isTree ? p.treeRot : p.scatterRot;
        tempObject.rotation.set(
          rot.x,
          rot.y + (isTree ? globalRotY + _state.clock.elapsedTime * p.localSpin : 0),
          rot.z
        );
        tempObject.scale.setScalar(p.scale);
        tempObject.updateMatrix();
        meshRef.current?.setMatrixAt(i, tempObject.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    };

    updateMesh(ballGoldMeshRef, goldData);
    updateMesh(ballRedMeshRef, redData);
    updateMesh(bellMeshRef, bellData);
    updateMesh(starMeshRef, starData);
  });

  return (
    <group>
      <instancedMesh ref={ballGoldMeshRef} args={[undefined, undefined, GOLD_COUNT]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={COLORS.GOLD} metalness={1} roughness={0.1} />
      </instancedMesh>
      <instancedMesh ref={ballRedMeshRef} args={[undefined, undefined, RED_COUNT]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={COLORS.DEEP_RED} metalness={0.6} roughness={0.2} />
      </instancedMesh>
      <instancedMesh ref={bellMeshRef} args={[undefined, undefined, BELL_COUNT]}>
        <coneGeometry args={[0.6, 1, 16]} />
        <meshStandardMaterial color={COLORS.BRIGHT_GOLD} metalness={0.9} roughness={0.1} />
      </instancedMesh>
      <instancedMesh ref={starMeshRef} args={[starGeometry, undefined, COUNTS.STARS]}>
        <meshStandardMaterial color={COLORS.WHITE} emissive={COLORS.WHITE} emissiveIntensity={0.8} />
      </instancedMesh>
    </group>
  );
};

export default Ornaments;
