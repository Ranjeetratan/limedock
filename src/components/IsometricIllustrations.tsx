import React from 'react';

const THEME_BG = '#0C1412'; 
const ACCENT_TEAL = '#2DD4BF';
const ACCENT_YELLOW = '#FACC15';
const GLASS_BORDER = 'rgba(255, 255, 255, 0.2)';
const GLASS_HIGHLIGHT = 'rgba(255, 255, 255, 0.4)';
const TEAM_COLOR = '#2DD4BF';

const Defs = () => (
  <defs>
    <linearGradient id="glassSurface" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.02)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
    </linearGradient>
    
    <linearGradient id="glassSurfaceVertical" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
    </linearGradient>

    <linearGradient id="conveyorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(45, 212, 191, 0.05)" />
        <stop offset="50%" stopColor="rgba(45, 212, 191, 0.2)" />
        <stop offset="100%" stopColor="rgba(45, 212, 191, 0.05)" />
    </linearGradient>

    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#B45309" />
    </linearGradient>

    <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5EEAD4" />
        <stop offset="100%" stopColor="#0F766E" />
    </linearGradient>

    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>

    <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
        <feColorMatrix type="matrix" values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 1 0 " in="coloredBlur" result="coloredBlur"/>
        <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
  </defs>
);

const CubeProduct = () => (
  <g>
    {/* Shadow */}
    <ellipse cx="0" cy="10" rx="12" ry="6" fill="black" opacity="0.4" filter="url(#glow)" />
    
    {/* Back Faces */}
    <path d="M 0 0 L -10 -5 L -10 -20 L 0 -15 Z" fill="#0F766E" fillOpacity="0.6" stroke={ACCENT_TEAL} strokeWidth="0.5" />
    <path d="M 0 0 L 10 -5 L 10 -20 L 0 -15 Z" fill="#0F766E" fillOpacity="0.8" stroke={ACCENT_TEAL} strokeWidth="0.5" />
    
    {/* Top Face */}
    <path d="M 0 -15 L 10 -20 L 0 -25 L -10 -20 Z" fill="#CCFBF1" fillOpacity="0.6" stroke="white" strokeWidth="0.5" />
    
    {/* Inner Glow Core */}
    <circle cx="0" cy="-12" r="3" fill="white" filter="url(#strongGlow)" opacity="0.9" />
  </g>
);

const ProductionHouseBase = () => (
    <g>
         <path d="M -70 35 L 0 70 L 70 35 L 0 0 Z" fill="#151f1d" stroke={GLASS_BORDER} strokeWidth="1" />
         <path d="M -40 -40 L 0 -60 L 40 -40 L 40 20 L 0 40 L -40 20 Z" fill="none" stroke={GLASS_BORDER} strokeWidth="0.5" strokeDasharray="4 2" opacity="0.3" />
         
         {/* Inner Gold Core */}
         <g filter="url(#glow)">
            <path d="M -20 10 L 0 20 L 20 10 L 20 -30 L 0 -40 L -20 -30 Z" fill="url(#goldGradient)" fillOpacity="0.2" stroke="url(#goldGradient)" strokeWidth="1.5">
                <animate attributeName="fill-opacity" values="0.2; 0.5; 0.2" dur="3s" repeatCount="indefinite" />
            </path>
            
            <path d="M 0 20 L 0 -40" stroke="url(#goldGradient)" strokeWidth="1" opacity="0.6">
                <animate attributeName="opacity" values="0.6; 1; 0.6" dur="3s" repeatCount="indefinite" />
            </path>
            
            <path d="M -20 10 L 0 -10 L 20 10" fill="none" stroke="url(#goldGradient)" strokeWidth="1" opacity="0.6">
                 <animate attributeName="opacity" values="0.6; 1; 0.6" dur="3s" repeatCount="indefinite" />
            </path>
         </g>
    </g>
);

const ProductionHouseGlass = () => (
    <g>
        <path d="M -40 20 L 0 40 L 0 -20 L -40 -40 Z" fill="url(#glassSurfaceVertical)" stroke={GLASS_BORDER} strokeWidth="0.5" />
        <path d="M 40 20 L 0 40 L 0 -20 L 40 -40 Z" fill="url(#glassSurfaceVertical)" stroke={GLASS_BORDER} strokeWidth="0.5" />
        
        {/* Top Highlight */}
        <path d="M -40 -40 L 0 -60 L 40 -40 L 0 -20 Z" fill="rgba(255,255,255,0.1)" stroke={GLASS_HIGHLIGHT} strokeWidth="1" />
        
        {/* Edge Highlights */}
        <path d="M 0 40 L 0 -20" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
    </g>
);

const PersonIcon = () => (
    <g>
        {/* Base Shadow */}
        <ellipse cx="0" cy="0" rx="6" ry="3" fill="black" opacity="0.3" filter="url(#glow)" />
        
        {/* Body Base Ring - Active Status */}
        <ellipse cx="0" cy="0" rx="5" ry="2.5" fill="none" stroke={ACCENT_TEAL} strokeWidth="0.5" opacity="0.6" />
        
        {/* Body - 3D Cone/Cylinder shape */}
        <path d="M -4 -8 L 4 -8 L 5 0 L -5 0 Z" fill="url(#tealGradient)" opacity="0.9" />
        <path d="M -4 -8 L 4 -8 L 5 0 L -5 0 Z" fill="url(#glassSurfaceVertical)" opacity="0.4" />
        
        {/* Shoulders/Collar Highlight */}
        <path d="M -4 -8 L 4 -8" stroke={GLASS_HIGHLIGHT} strokeWidth="0.5" opacity="0.5" />

        {/* Head - Sphere with gradient */}
        <circle cx="0" cy="-11" r="3.5" fill="url(#tealGradient)" />
        <circle cx="-1" cy="-12" r="1.5" fill="white" opacity="0.3" filter="url(#glow)" />
        
        {/* Holographic Ring Effect around person */}
        <ellipse cx="0" cy="-5" rx="7" ry="3.5" fill="none" stroke={ACCENT_TEAL} strokeWidth="0.2" opacity="0.2">
             <animate attributeName="opacity" values="0.1; 0.4; 0.1" dur="3s" repeatCount="indefinite" />
             <animate attributeName="rx" values="7; 8; 7" dur="3s" repeatCount="indefinite" />
             <animate attributeName="ry" values="3.5; 4; 3.5" dur="3s" repeatCount="indefinite" />
        </ellipse>
    </g>
);

const TeamMembers = () => (
    <g>
        <g transform="translate(-30, 30)">
            <PersonIcon />
        </g>
        <g transform="translate(30, 30)">
            <PersonIcon />
        </g>
    </g>
);

const PremiumGrid = () => (
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1"/>
        <circle cx="0" cy="0" r="1" fill="rgba(255,255,255,0.1)" />
    </pattern>
);

const Background = () => (
    <>
        <defs>
            <radialGradient id="bgGradient" cx="50%" cy="0%" r="100%" fx="50%" fy="0%">
                <stop offset="0%" stopColor="#132320" />
                <stop offset="100%" stopColor="#0C1412" />
            </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bgGradient)" />
    </>
);

export const EndToEndIllustration = () => {
  return (
    <div className="w-full h-full bg-[#0C1412] relative overflow-hidden flex items-center justify-center">
      <svg viewBox="0 0 500 350" className="w-full h-full">
        <Defs />
        <Background />
        <PremiumGrid />
        <rect width="500" height="350" fill="url(#grid)" />
        
        {/* Ambient Glow */}
        <circle cx="250" cy="175" r="150" fill="url(#tealGradient)" opacity="0.05" filter="url(#glow)" />

        <g transform="translate(0, 20)">
            <path d="M 50 185 L 180 250 L 210 265 L 80 200 Z" fill="#0F1715" /> 
            <path d="M 210 235 L 340 170 L 370 185 L 240 250 Z" fill="#0F1715" />
            
            <path d="M 50 180 L 180 245 L 210 260 L 80 195 Z" fill="#1A2624" />
            <path d="M 50 180 L 180 245 L 210 260 L 80 195 Z" fill="url(#conveyorGradient)" opacity="1" />
            <path d="M 50 180 L 180 245" stroke={GLASS_BORDER} strokeWidth="0.5" />
            <path d="M 210 260 L 80 195" stroke={GLASS_BORDER} strokeWidth="0.5" />
            
            <path d="M 210 230 L 340 165 L 370 180 L 240 245 Z" fill="#1A2624" />
            <path d="M 210 230 L 340 165 L 370 180 L 240 245 Z" fill="url(#conveyorGradient)" opacity="1" />
            <path d="M 210 230 L 340 165" stroke={GLASS_BORDER} strokeWidth="0.5" />
            <path d="M 370 180 L 240 245" stroke={GLASS_BORDER} strokeWidth="0.5" />
            
            <path d="M 180 245 L 210 260 L 240 245 L 210 230 Z" fill="#1A2624" stroke={GLASS_BORDER} strokeWidth="0.5" />
        </g>

        <g transform="translate(360, 160)">
             <ProductionHouseBase />
        </g>

        <g>
            <g>
                <CubeProduct />
                <animateTransform 
                    attributeName="transform" 
                    type="translate" 
                    values="65 200; 195 265; 360 180" 
                    keyTimes="0; 0.5; 1" 
                    dur="4s" 
                    repeatCount="indefinite" 
                />
            </g>
        </g>

        <g transform="translate(360, 160)">
             <ProductionHouseGlass />
             <TeamMembers />
        </g>
      </svg>
    </div>
  );
};

export const CollaborativeIllustration = () => {
  return (
    <div className="w-full h-full bg-[#0C1412] relative overflow-hidden flex items-center justify-center">
      <svg viewBox="0 0 500 350" className="w-full h-full">
        <Defs />
        <Background />
        <PremiumGrid />
        <rect width="500" height="350" fill="url(#grid)" />

        {/* Ambient Glow */}
        <circle cx="250" cy="175" r="150" fill="url(#tealGradient)" opacity="0.05" filter="url(#glow)" />
        
        <g transform="translate(250, 150)">
             <ProductionHouseBase />
        </g>

        <g transform="translate(0, 0)">
            <path d="M 20 200 L 100 240 L 130 255 L 50 215 Z" fill="#0F1715" />
            <path d="M 100 240 L 190 195 L 220 210 L 130 255 Z" fill="#0F1715" />

            <path d="M 20 195 L 100 235 L 130 250 L 50 210 Z" fill="#1A2624" />
            <path d="M 20 195 L 100 235 L 130 250 L 50 210 Z" fill="url(#conveyorGradient)" opacity="1" />
            <path d="M 20 195 L 100 235" stroke={GLASS_BORDER} strokeWidth="0.5" />
            <path d="M 130 250 L 50 210" stroke={GLASS_BORDER} strokeWidth="0.5" />
            
            <path d="M 100 235 L 190 190 L 220 205 L 130 250 Z" fill="#1A2624" />
            <path d="M 100 235 L 190 190 L 220 205 L 130 250 Z" fill="url(#conveyorGradient)" opacity="1" />
            <path d="M 100 235 L 190 190" stroke={GLASS_BORDER} strokeWidth="0.5" />
            <path d="M 220 205 L 130 250" stroke={GLASS_BORDER} strokeWidth="0.5" />
            
            <path d="M 100 235 L 130 250 L 130 250 L 100 235 Z" stroke={GLASS_BORDER} strokeWidth="0.5" /> 
        </g>

        <g transform="translate(0, 0)">
            <path d="M 480 200 L 400 240 L 370 255 L 450 215 Z" fill="#0F1715" />
            <path d="M 400 240 L 310 195 L 280 210 L 370 255 Z" fill="#0F1715" />

            <path d="M 480 195 L 400 235 L 370 250 L 450 210 Z" fill="#1A2624" />
            <path d="M 480 195 L 400 235 L 370 250 L 450 210 Z" fill="url(#conveyorGradient)" opacity="1" />
            <path d="M 480 195 L 400 235" stroke={GLASS_BORDER} strokeWidth="0.5" />
            <path d="M 370 250 L 450 210" stroke={GLASS_BORDER} strokeWidth="0.5" />

            <path d="M 400 235 L 310 190 L 280 205 L 370 250 Z" fill="#1A2624" />
            <path d="M 400 235 L 310 190 L 280 205 L 370 250 Z" fill="url(#conveyorGradient)" opacity="1" />
            <path d="M 400 235 L 310 190" stroke={GLASS_BORDER} strokeWidth="0.5" />
            <path d="M 280 205 L 370 250" stroke={GLASS_BORDER} strokeWidth="0.5" />
        </g>

        <g>
            <CubeProduct />
            <animateTransform 
                attributeName="transform" 
                type="translate" 
                values="35 205; 115 245; 205 200" 
                keyTimes="0; 0.5; 1" 
                dur="4s" 
                repeatCount="indefinite" 
            />
        </g>

        <g>
            <CubeProduct />
            <animateTransform 
                attributeName="transform" 
                type="translate" 
                values="465 205; 385 245; 295 200" 
                keyTimes="0; 0.5; 1" 
                dur="4s" 
                repeatCount="indefinite" 
                begin="2s"
            />
        </g>

        <g transform="translate(250, 150)">
             <ProductionHouseGlass />
             <TeamMembers />
        </g>

        <g transform="translate(90, 250)">
                <PersonIcon />
        </g>

        <g transform="translate(410, 250)">
                <PersonIcon />
        </g>

        <g transform="translate(250, 180)">
             <circle cx="0" cy="-5" r="2" fill="url(#goldGradient)" filter="url(#glow)">
                 <animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" repeatCount="indefinite" />
             </circle>
        </g>

      </svg>
    </div>
  );
};

