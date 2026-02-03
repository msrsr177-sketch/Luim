
import React from 'react';
import { CardData } from '../types';

interface GlassCardProps {
  data: CardData;
  isDark: boolean;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ data, isDark, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative cursor-pointer active:scale-[0.98] transition-all duration-300 ease-out h-full"
    >
      <div 
        className={`relative h-full p-5 flex flex-col items-start gap-4 rounded-3xl matte-card overflow-hidden`}
      >
        {/* Subtle Top Indicator on Hover */}
        <div className="absolute left-0 top-0 right-0 h-1 bg-yellow-500 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

        {/* Icon container - Adjusted for Grid */}
        <div 
          className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl border transition-all duration-300 
            bg-black border-[#1f1f1f] group-hover:border-yellow-500/50 group-hover:text-yellow-500 text-slate-400
            group-hover:icon-glow-pulse`}
          dangerouslySetInnerHTML={{ __html: data.icon }}
        />

        {/* Text content - Re-optimized for Grid columns */}
        <div className="flex flex-col flex-grow">
          <h3 className={`text-[10px] font-black tracking-[0.1em] mb-2 uppercase transition-colors text-slate-500 group-hover:text-yellow-500/80 line-clamp-2`}>
            {data.title}
          </h3>
          <p className={`text-[12px] font-medium leading-[1.5] text-[var(--text-main)] transition-colors opacity-90 group-hover:opacity-100 line-clamp-4`}>
            {data.value}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes icon-pulse {
          0% { box-shadow: 0 0 0px rgba(250, 204, 21, 0); }
          50% { box-shadow: 0 0 15px rgba(250, 204, 21, 0.4); }
          100% { box-shadow: 0 0 0px rgba(250, 204, 21, 0); }
        }
        .group:hover .group-hover\\:icon-glow-pulse {
          animation: icon-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default GlassCard;
