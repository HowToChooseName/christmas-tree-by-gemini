
import React, { Suspense } from 'react';
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { TreeState } from '../types';
import TreeParticles from './TreeParticles';
import Ornaments from './Ornaments';
import TreeStar from './TreeStar';
import SnowParticles from './SnowParticles';
import { COLORS } from '../constants';

interface ExperienceProps {
  state: TreeState;
}

const Experience: React.FC<ExperienceProps> = ({ state }) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 4, 20]} fov={45} />
      <OrbitControls 
        enablePan={false} 
        minDistance={10} 
        maxDistance={40} 
        autoRotate={state === TreeState.TREE_SHAPE} 
        autoRotateSpeed={0.5}
      />

      <color attach="background" args={[COLORS.DARK_GREEN]} />
      <fog attach="fog" args={[COLORS.DARK_GREEN, 10, 50]} />

      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color={COLORS.GOLD} />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color={COLORS.EMERALD} />
      <spotLight 
        position={[0, 20, 0]} 
        angle={0.3} 
        penumbra={1} 
        intensity={2} 
        castShadow 
        color={COLORS.BRIGHT_GOLD}
      />

      <Suspense fallback={null}>
        {/* Slightly lowered the Y position from 0 to -1.5 to align with text/UI layout */}
        <group position={[0, -1.5, 0]}>
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
            <TreeParticles state={state} />
            <Ornaments state={state} />
            <TreeStar state={state} />
          </Float>
        </group>
        
        <SnowParticles />
        
        <Environment preset="night" />
      </Suspense>

      <EffectComposer disableNormalPass>
        <Bloom 
          luminanceThreshold={1.2} 
          mipmapBlur 
          intensity={1.5} 
          radius={0.4} 
        />
        <Noise opacity={0.05} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
};

export default Experience;
