
import React, { useState } from 'react';

interface SplashSceneProps {
  onComplete: () => void;
}

const SplashScene: React.FC<SplashSceneProps> = ({ onComplete }) => {
  const [isFlying, setIsFlying] = useState(false);

  const handleInteraction = () => {
    setIsFlying(true);
    // Wait for animation to finish before calling onComplete
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden select-none cursor-pointer" onClick={handleInteraction}>
      <div className={`relative transition-all duration-1000 ease-in-out ${isFlying ? 'translate-y-[-150vh] scale-50 opacity-0 rotate-12' : 'translate-y-0'}`}>
        
        {/* Tree Branch - Minimalist Design */}
        <div className={`absolute bottom-[-10px] left-[-120px] w-[400px] h-4 bg-[#1a1a1a] rounded-full rotate-[-5deg] transition-opacity duration-500 ${isFlying ? 'opacity-0' : 'opacity-100'}`}>
          <div className="absolute top-[-10px] left-[60px] w-8 h-8 bg-[#1a1a1a] rounded-full rotate-45" />
          <div className="absolute top-[-5px] right-[80px] w-6 h-6 bg-[#1a1a1a] rounded-full -rotate-12" />
          {/* Minimalist Yellow Leaves */}
          <div className="absolute top-[-18px] left-[70px] w-2 h-5 bg-yellow-500/20 rounded-full rotate-45" />
          <div className="absolute top-[-12px] right-[90px] w-2 h-5 bg-yellow-500/20 rounded-full -rotate-12" />
        </div>

        {/* The Owl Logo - Professional Branding */}
        <div className={`relative w-48 h-48 flex items-center justify-center transition-transform duration-500 ${!isFlying && 'animate-owl-breathe'}`}>
          <svg className="w-full h-full text-yellow-500 drop-shadow-[0_0_40px_rgba(250,204,21,0.4)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 15L15 45V75C15 86.0457 23.9543 95 35 95H65C76.0457 95 85 86.0457 85 75V45L50 15Z" fill="rgba(250, 204, 21, 0.05)" />
            <path d="M15 45L50 15L85 45" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="35" cy="55" r="10" stroke="currentColor" strokeWidth="5"/>
            <circle cx="65" cy="55" r="10" stroke="currentColor" strokeWidth="5"/>
            <path d="M35 55L35.5 55" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
            <path d="M65 55L65.5 55" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
            <path d="M50 65L42 75H58L50 65Z" fill="currentColor"/>
            <path d="M20 95H80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.3"/>
          </svg>
        </div>

        {/* Instruction Hint */}
        {!isFlying && (
          <div className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 whitespace-nowrap">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-500/50 animate-pulse">
              Click the logo to start
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes owl-breathe {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.03); }
        }
        .animate-owl-breathe {
          animation: owl-breathe 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SplashScene;
