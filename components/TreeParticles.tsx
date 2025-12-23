
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { InstancedMesh, Object3D, Vector3 } from 'three';
import { TreeState } from '../types';
import { getTreePosition, getScatterPosition, getRandomRotation, getSpiralPosition } from '../utils/math';
import { COUNTS, COLORS, TREE_CONFIG } from '../constants';

interface TreeParticlesProps {
  state: TreeState;
}

const TreeParticles: React.FC<TreeParticlesProps> = ({ state }) => {
  const leafMeshRef = useRef<InstancedMesh>(null);
  const spiralMeshRef = useRef<InstancedMesh>(null);
  const tempObject = useMemo(() => new Object3D(), []);
  const tempPos = useMemo(() => new Vector3(), []);

  // Dense needle count and spiral count for high fidelity
  const SPIRAL_COUNT = 5000;
  const LEAF_COUNT = COUNTS.NEEDLES;

  const leafData = useMemo(() => {
    return Array.from({ length: LEAF_COUNT }, (_, i) => ({
      treePos: getTreePosition(i, LEAF_COUNT),
      scatterPos: getScatterPosition(),
      currentPos: getScatterPosition(),
      treeRot: getRandomRotation(),
      scatterRot: getRandomRotation(),
      scale: 0.06 + Math.random() * 0.2, // Slightly smaller range for dense leaves
    }));
  }, [LEAF_COUNT]);

  const spiralData = useMemo(() => {
    return Array.from({ length: SPIRAL_COUNT }, (_, i) => ({
      treePos: getSpiralPosition(i, SPIRAL_COUNT),
      scatterPos: getScatterPosition(),
      currentPos: getScatterPosition(),
      scale: 0.02 + Math.random() * 0.08,
      rotation: getRandomRotation(),
    }));
  }, [SPIRAL_COUNT]);

  useFrame((_state, delta) => {
    const t = TREE_CONFIG.TRANSITION_SPEED * (delta * 60);
    const isTree = state === TreeState.TREE_SHAPE;
    const globalRotY = _state.clock.elapsedTime * 0.12;

    leafData.forEach((p, i) => {
      const targetPos = isTree ? p.treePos : p.scatterPos;
      p.currentPos.lerp(targetPos, t);
      
      tempPos.copy(p.currentPos);
      
      if (isTree) {
        const x = tempPos.x;
        const z = tempPos.z;
        tempPos.x = x * Math.cos(globalRotY) - z * Math.sin(globalRotY);
        tempPos.z = x * Math.sin(globalRotY) + z * Math.cos(globalRotY);
      }

      tempObject.position.copy(tempPos);
      const rot = isTree ? p.treeRot : p.scatterRot;
      tempObject.rotation.set(rot.x, rot.y + (isTree ? globalRotY : 0), rot.z);
      tempObject.scale.setScalar(p.scale);
      tempObject.updateMatrix();
      leafMeshRef.current?.setMatrixAt(i, tempObject.matrix);
    });

    spiralData.forEach((p, i) => {
      const targetPos = isTree ? p.treePos : p.scatterPos;
      p.currentPos.lerp(targetPos, t * 0.8);
      
      tempPos.copy(p.currentPos);
      if (isTree) {
        const x = tempPos.x;
        const z = tempPos.z;
        tempPos.x = x * Math.cos(globalRotY) - z * Math.sin(globalRotY);
        tempPos.z = x * Math.sin(globalRotY) + z * Math.cos(globalRotY);
      }

      tempObject.position.copy(tempPos);
      tempObject.rotation.copy(p.rotation);
      tempObject.scale.setScalar(p.scale);
      tempObject.updateMatrix();
      spiralMeshRef.current?.setMatrixAt(i, tempObject.matrix);
    });

    if (leafMeshRef.current) leafMeshRef.current.instanceMatrix.needsUpdate = true;
    if (spiralMeshRef.current) spiralMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {/* High-fidelity emerald needles */}
      <instancedMesh ref={leafMeshRef} args={[undefined, undefined, LEAF_COUNT]}>
        <boxGeometry args={[0.3, 0.02, 0.02]} />
        <meshStandardMaterial 
          color={COLORS.EMERALD} 
          emissive={COLORS.EMERALD}
          emissiveIntensity={1.4}
          metalness={0.8}
          roughness={0.15}
        />
      </instancedMesh>

      {/* Surface white light points */}
      <instancedMesh ref={spiralMeshRef} args={[undefined, undefined, SPIRAL_COUNT]}>
        <sphereGeometry args={[1, 4, 4]} />
        <meshStandardMaterial 
          color={COLORS.WHITE} 
          emissive={COLORS.WHITE}
          emissiveIntensity={2.2}
          transparent
          opacity={0.65}
        />
      </instancedMesh>
    </group>
  );
};

export default TreeParticles;
