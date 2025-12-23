
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
    <div className="fixed inset-0 pointer-events-none flex flex-col justify-between p-6 md:p-12 z-10">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="pointer-events-auto">
          <h1 
            style={titleStyle}
            className="text-5xl sm:text-6xl md:text-8xl text-[#D4AF37] tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] leading-[0.8] sm:leading-[0.85] md:leading-[0.9]"
          >
            圣诞快乐
          </h1>
          <span className="text-[10px] md:text-base text-[#D4AF37]/80 tracking-[0.4em] md:tracking-[0.6em] mt-2 md:mt-4 block uppercase font-light">
            Merry Christmas
          </span>
          <div className="h-[1px] md:h-[1.5px] w-32 md:w-72 bg-gradient-to-r from-[#D4AF37] to-transparent mt-3 md:mt-6 opacity-40 shadow-[0_0_15px_#D4AF37]"></div>
          <p className="font-['Noto_Sans_SC'] text-[#D4AF37] opacity-60 text-[10px] md:text-[14px] mt-3 md:mt-6 tracking-[0.15em] md:tracking-[0.2em] max-w-[180px] md:max-w-none">
            烛光闪烁，愿你每个梦都香甜
          </p>
        </div>
        
        {/* Top Right: Design By */}
        <div className="text-right hidden md:block pt-4 pointer-events-auto">
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
          className="pointer-events-auto group relative px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-5 overflow-hidden border border-white/20 bg-white/5 backdrop-blur-[32px] rounded-sm transition-all duration-700 hover:border-[#D4AF37]/50 hover:pl-8 md:hover:pl-16 active:scale-95 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] mt-1 md:mt-2"
        >
          {/* Liquid Glass Blobs Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
            <div className="liquid-blob-1 absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[#D4AF37]/40 to-transparent blur-3xl rounded-full"></div>
            <div className="liquid-blob-2 absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-white/20 to-transparent blur-3xl rounded-full"></div>
            <div className="liquid-blob-3 absolute top-0 left-0 w-full h-full bg-radial-gradient from-[#D4AF37]/20 to-transparent blur-2xl rounded-full"></div>
          </div>

          {/* Frosted shine effect layer */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-20"></div>
          
          {/* Animated fill (appears on hover) */}
          <div className="absolute inset-0 bg-[#D4AF37] -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-in-out opacity-10"></div>
          
          <span className="relative text-[#D4AF37] tracking-[0.4em] md:tracking-[0.6em] uppercase text-xs md:text-base font-['Noto_Sans_SC'] font-black flex items-center gap-2 md:gap-4">
            <span className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_15px_#D4AF37] animate-pulse"></span>
            {state === TreeState.TREE_SHAPE ? '消散' : '聚合'}
          </span>
          
          {/* Subtle outer glow on the glass edge */}
          <div className="absolute inset-0 border border-white/5 pointer-events-none"></div>
        </button>
      </div>

      {/* Footer */}
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
