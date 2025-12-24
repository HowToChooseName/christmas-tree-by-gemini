
import React from 'react';
import { TreeState } from '../types';

interface UIProps {
  state: TreeState;
  onToggle: () => void;
}

const UI: React.FC<UIProps> = ({ state, onToggle }) => {
  const titleStyle = {
    fontFamily: '"STZhongsong", "SimSun", serif',
    fontWeight: 900,
  };

  const metadataStyle = "font-['Noto_Sans_SC'] text-[#D4AF37] opacity-60 text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-medium";

  return (
    <div className="fixed inset-0 pointer-events-none flex flex-col justify-between p-10 md:p-12 z-10">
      {/* Header - Top padding adjusted to pt-2 to match footer pb-2 for symmetry */}
      <div className="flex justify-between items-start pt-2">
        <div className="pointer-events-auto flex flex-col w-fit">
          <h1 
            style={titleStyle}
            className="text-4xl sm:text-5xl md:text-6xl text-[#D4AF37] tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] leading-[0.8] sm:leading-[0.85] md:leading-[0.9] whitespace-nowrap"
          >
            圣诞快乐
          </h1>
          
          {/* Subtitle - Reduced size for wide screens, font-black for boldness */}
          <div className="mt-2 md:mt-4 w-full">
            <h2 
              style={titleStyle} 
              className="text-[#D4AF37] opacity-80 text-2xl sm:text-3xl md:text-4xl font-black tracking-wide whitespace-nowrap"
            >
              Merry Christmas
            </h2>
          </div>

          <div className="h-[1px] md:h-[1.5px] w-full bg-gradient-to-r from-[#D4AF37] to-transparent mt-3 md:mt-5 opacity-40 shadow-[0_0_15px_#D4AF37]"></div>
          <p className="font-['Noto_Sans_SC'] text-[#D4AF37] opacity-80 text-[14px] md:text-[20px] mt-2 md:mt-3 tracking-[0.15em] md:tracking-[0.2em]">
            阳光纯手工
          </p>
        </div>
        
        {/* Top Right: Design By - Visible on all screens now */}
        <div className="text-right pt-1 pointer-events-auto">
          <p className={metadataStyle}>
            Design By<br />
            HowChooseName
          </p>
        </div>
      </div>

      {/* Controls - Tightened Gaps */}
      <div className="flex flex-col items-start gap-2 md:gap-5 mb-10 md:mb-24 ml-1 md:ml-4">
        <div className="flex flex-col items-start gap-0">
            <span className="text-[#D4AF37]/30 text-[7px] md:text-[9px] tracking-[0.5em] md:tracking-[0.8em] uppercase font-bold leading-tight">Geometry Protocol</span>
            <span className="text-[#D4AF37] text-lg md:text-2xl font-serif tracking-[0.1em] md:tracking-[0.2em] uppercase transition-all duration-1000 leading-tight">
                {state === TreeState.TREE_SHAPE ? 'Coalescence' : 'Dispersion'}
            </span>
        </div>

        <button 
          onClick={onToggle}
          className="pointer-events-auto group relative px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-5 overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl rounded-sm transition-all duration-700 hover:border-[#D4AF37]/40 hover:pl-8 md:hover:pl-16 active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.4)] mt-1 md:mt-2"
        >
          {/* Frosted shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-20"></div>
          {/* Animated fill */}
          <div className="absolute inset-0 bg-[#D4AF37] -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-in-out opacity-10"></div>
          
          <span className="relative text-[#D4AF37] tracking-[0.4em] md:tracking-[0.6em] uppercase text-xs md:text-base font-['Noto_Sans_SC'] font-black flex items-center gap-2 md:gap-4">
            <span className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_12px_#D4AF37] animate-pulse"></span>
            {state === TreeState.TREE_SHAPE ? '消散' : '聚合'}
          </span>
        </button>
      </div>

      {/* Footer - Bottom padding pb-2 used as reference for top padding */}
      <div className="flex justify-between items-end pb-2">
        <div className="flex flex-col">
          <p className={metadataStyle}>peace and joy</p>
        </div>
        
        <div className="flex-1 flex justify-center">
          <p className={metadataStyle}>2026</p>
        </div>

        {/* Bottom Right: Wish */}
        <div className="flex flex-col items-end text-right">
          <p className={metadataStyle}>wish 平安喜乐</p>
        </div>
      </div>
    </div>
  );
};

export default UI;
