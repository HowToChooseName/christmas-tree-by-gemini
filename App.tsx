
import React, { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { TreeState } from './types';
import Experience from './components/Experience';
import UI from './components/UI';
import BackgroundMusic from './components/BackgroundMusic';

const App: React.FC = () => {
  const [treeState, setTreeState] = useState<TreeState>(TreeState.SCATTERED);

  const toggleState = useCallback(() => {
    setTreeState(prev => 
      prev === TreeState.SCATTERED ? TreeState.TREE_SHAPE : TreeState.SCATTERED
    );
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#01160e]">
      <UI state={treeState} onToggle={toggleState} />
      <BackgroundMusic />
      
      <Canvas
        shadows
        gl={{ 
          antialias: true, 
          stencil: false, 
          depth: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <Experience state={treeState} />
      </Canvas>

      {/* Cinematic Overlays */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
    </div>
  );
};

export default App;
