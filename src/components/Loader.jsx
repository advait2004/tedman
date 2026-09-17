import { useState, useEffect } from 'react';

export default function Loader({ isReady }) {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Only start the fade out sequence once the app declares it is ready
    if (!isReady) return;

    // A small buffer to ensure smooth transition after readiness
    const fadeTimer = setTimeout(() => {
      setFade(true);
    }, 500);
    
    // Completely remove from DOM after the fade transition (500ms)
    const removeTimer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [isReady]);

  if (!loading) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0705]/80 backdrop-blur-2xl transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Friendly Superhero Badge */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Soft, pulsing halo that grows and shrinks in intensity */}
        <div className="absolute w-40 h-40 sm:w-48 sm:h-48 bg-mustard/40 blur-[35px] rounded-full animate-pulse"></div>
        
        {/* Evenly Lit 8-Bit Pixel Heart */}
        <svg className="w-40 h-40 sm:w-48 sm:h-48 relative z-10 animate-pulse" viewBox="0 0 11 11" shapeRendering="crispEdges" style={{ filter: 'drop-shadow(0 0 25px rgba(217, 154, 52, 0.6))' }}>
          <g fill="#D99A34">
            <rect x="2" y="1" width="2" height="1"/>
            <rect x="7" y="1" width="2" height="1"/>
            <rect x="1" y="2" width="4" height="1"/>
            <rect x="6" y="2" width="4" height="1"/>
            <rect x="0" y="3" width="11" height="3"/>
            <rect x="1" y="6" width="9" height="1"/>
            <rect x="2" y="7" width="7" height="1"/>
            <rect x="3" y="8" width="5" height="1"/>
            <rect x="4" y="9" width="3" height="1"/>
            <rect x="5" y="10" width="1" height="1"/>
          </g>
        </svg>
      </div>

      {/* Loading Text */}
      <p 
        className="text-xs sm:text-sm text-parchment drop-shadow-md text-center mt-6 uppercase leading-loose max-w-md px-6 animate-pulse"
        style={{ fontFamily: "'Press Start 2P', monospace" }}
      >
        Your friendly neighbour,<br/><span className="text-mustard inline-block mt-3">Tedman</span>,<br/>is here.
      </p>
      
    </div>
  );
}
