
import React from 'react';

interface BackgroundProps {
  isDark: boolean;
}

const Background: React.FC<BackgroundProps> = ({ isDark }) => {
  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-slate-50'}`}>
      {/* Deep Technical Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/micro-carbon.png')` }} />
      
      {/* Subtle Accent Orbs */}
      <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20 transition-colors duration-700 ${isDark ? 'bg-yellow-500/20' : 'bg-yellow-500/10'}`} />
      <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-10 transition-colors duration-700 ${isDark ? 'bg-blue-500/10' : 'bg-indigo-500/5'}`} />

      {/* Very Subtle Dark Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-40 pointer-events-none" />
      
      <style>{`
        .bg-radial-gradient {
          background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%);
        }
      `}</style>
    </div>
  );
};

export default Background;
