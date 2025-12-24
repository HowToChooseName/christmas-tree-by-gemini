import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { InstancedMesh, Object3D, Vector3 } from 'three';
import { COUNTS, COLORS } from '../constants';
import '../types';

const SnowParticles: React.FC = () => {
  const meshRef = useRef<InstancedMesh>(null);
  const tempObject = useMemo(() => new Object3D(), []);
  
  const snowData = useMemo(() => {
    return Array.from({ length: COUNTS.SNOW }, () => ({
      position: new Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      ),
      speed: 0.02 + Math.random() * 0.05,
      horizontalSway: Math.random() * 0.02,
      scale: 0.02 + Math.random() * 0.04,
    }));
  }, []);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;

    snowData.forEach((s, i) => {
      s.position.y -= s.speed * (delta * 60);
      s.position.x += Math.sin(_state.clock.elapsedTime + i) * s.horizontalSway;

      // Wrap around
      if (s.position.y < -20) s.position.y = 20;
      if (s.position.x < -20) s.position.x = 20;
      if (s.position.x > 20) s.position.x = -20;

      tempObject.position.copy(s.position);
      tempObject.scale.setScalar(s.scale);
      tempObject.updateMatrix();
      meshRef.current?.setMatrixAt(i, tempObject.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNTS.SNOW]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color={COLORS.WHITE} transparent opacity={0.6} />
    </instancedMesh>
  );
};

export default SnowParticles;