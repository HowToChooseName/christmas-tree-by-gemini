
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3, Shape, ExtrudeGeometry } from 'three';
import { TreeState } from '../types';
import { COLORS } from '../constants';

interface TreeStarProps {
  state: TreeState;
}

const TreeStar: React.FC<TreeStarProps> = ({ state }) => {
  const meshRef = useRef<any>(null);
  const lightRef = useRef<any>(null);
  // Tip is at y=6, star center at 7.1 gives clear space above needles
  const treeTopPos = new Vector3(0, 7.1, 0); 
  const scatterPos = new Vector3(0, 0, 0);
  const currentPos = useRef(new Vector3(0, 0, 0));

  const starGeometry = useMemo(() => {
    const shape = new Shape();
    const points = 6;
    const outerRadius = 0.85;
    const innerRadius = 0.4;

    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();

    return new ExtrudeGeometry(shape, {
      depth: 0.22,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.08,
      bevelSegments: 5
    });
  }, []);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    const targetPos = state === TreeState.TREE_SHAPE ? treeTopPos : scatterPos;
    currentPos.current.lerp(targetPos, 0.05 * (delta * 60));
    
    meshRef.current.position.copy(currentPos.current);
    meshRef.current.rotation.y += delta * 1.2; // Slightly faster rotation for cinematic feel
    
    const pulse = 1 + Math.sin(_state.clock.elapsedTime * 3) * 0.15;
    meshRef.current.scale.setScalar(pulse);
    if (lightRef.current) lightRef.current.intensity = 30 * pulse;
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={starGeometry}>
        <meshStandardMaterial 
          color={COLORS.BRIGHT_GOLD} 
          emissive={COLORS.BRIGHT_GOLD} 
          emissiveIntensity={15} 
          metalness={1} 
          roughness={0} 
        />
        <pointLight ref={lightRef} intensity={30} distance={18} color={COLORS.BRIGHT_GOLD} />
      </mesh>
    </group>
  );
};

export default TreeStar;
