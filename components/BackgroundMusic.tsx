
import React, { useEffect, useRef, useState } from 'react';

const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Attempt to play on mount (autoplay policy permitting)
    const attemptPlay = async () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (e) {
          // Autoplay blocked, waiting for interaction
        }
      }
    };
    attemptPlay();

    // Unlock audio on first user interaction
    const unlockAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((e) => console.error("Audio play failed:", e));
      }
      ['click', 'touchstart', 'keydown'].forEach(evt => 
        window.removeEventListener(evt, unlockAudio)
      );
    };

    ['click', 'touchstart', 'keydown'].forEach(evt => 
      window.addEventListener(evt, unlockAudio)
    );

    return () => {
      ['click', 'touchstart', 'keydown'].forEach(evt => 
        window.removeEventListener(evt, unlockAudio)
      );
    };
  }, []);

  const toggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-24 right-10 md:bottom-32 md:right-12 z-50 pointer-events-auto">
      <audio 
        ref={audioRef} 
        src="./bgm.mp3" 
        loop 
        onError={(e) => console.warn("Audio file not found or failed to load:", e)}
      />
      <button 
        onClick={toggle}
        className="group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#D4AF37]/30 bg-[#01160e]/40 backdrop-blur-md hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all duration-500"
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        <div className={`text-[#D4AF37] opacity-60 group-hover:opacity-100 transition-opacity duration-300 ${isPlaying ? 'animate-pulse' : ''}`}>
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
          )}
        </div>
        
        {/* Ripple effect rings */}
        {isPlaying && (
          <>
            <div className="absolute inset-0 rounded-full border border-[#D4AF37] opacity-20 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
            <div className="absolute inset-0 rounded-full border border-[#D4AF37] opacity-10 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite_1s]"></div>
          </>
        )}
      </button>
    </div>
  );
};

export default BackgroundMusic;
