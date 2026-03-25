import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  monochrome?: boolean;
}

export default function Logo({ className = "", showText = true, monochrome = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 shrink-0 ${className}`}>
      {/* Icon */}
      <svg 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-10 h-10 shrink-0 transform group-hover:scale-105 transition-transform duration-300"
      >
        {!monochrome && (
          <defs>
            <linearGradient id="wp-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0EA5E9" /> {/* sky-500 */}
              <stop offset="50%" stopColor="#2DD4BF" /> {/* teal-400 */}
              <stop offset="100%" stopColor="#8B5CF6" /> {/* violet-500 */}
            </linearGradient>
            <linearGradient id="wp-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E3A8A" /> {/* blue-900 */}
              <stop offset="50%" stopColor="#0F766E" /> {/* teal-700 */}
              <stop offset="100%" stopColor="#6D28D9" /> {/* violet-700 */}
            </linearGradient>
            <filter id="wp-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        )}

        <g filter={monochrome ? undefined : "url(#wp-glow)"}>
          {/* Background soft glow / outer star */}
          <path 
            d="M20 2 L 23.5 16.5 L 38 20 L 23.5 23.5 L 20 38 L 16.5 23.5 L 2 20 L 16.5 16.5 Z" 
            fill={monochrome ? "currentColor" : "url(#wp-grad-1)"} 
            opacity={monochrome ? 0.2 : 0.6} 
          />
          
          {/* Diagonal secondary star */}
          <path 
            d="M20 8 L 22 18 L 32 20 L 22 22 L 20 32 L 18 22 L 8 20 L 18 18 Z" 
            fill={monochrome ? "currentColor" : "url(#wp-grad-2)"} 
            opacity={monochrome ? 0.4 : 0.8}
            transform="rotate(45 20 20)"
          />
          
          {/* Core sharp star */}
          <path 
            d="M20 6 L 22 18 L 34 20 L 22 22 L 20 34 L 18 22 L 6 20 L 18 18 Z" 
            fill={monochrome ? "currentColor" : "#FFFFFF"} 
            opacity={monochrome ? 1 : 0.9} 
          />
          
          {/* Center dot/sparkle */}
          <circle 
            cx="20" 
            cy="20" 
            r="2" 
            fill={monochrome ? "transparent" : "#FFFFFF"} 
          />
        </g>
      </svg>
      
      {/* Wordmark */}
      {showText && (
        <span 
          className={`text-2xl font-semibold tracking-tight whitespace-nowrap py-1 pr-2 shrink-0 min-w-max ${
            monochrome 
              ? "text-current" 
              : "bg-clip-text text-transparent bg-gradient-to-r from-blue-900 via-teal-700 to-violet-800"
          }`} 
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          WishPilot
        </span>
      )}
    </div>
  );
}
