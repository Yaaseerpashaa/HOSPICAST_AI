import React, { useEffect, useState, useMemo } from 'react';

interface BackgroundPatternProps {
  variant?: 'auth' | 'dashboard' | 'default';
}

// Pre-calculated positions to prevent regeneration on re-renders
const PARTICLE_POSITIONS = [
  { width: 45, height: 45, top: 15, left: 25, delay: 2, duration: 18 },
  { width: 30, height: 30, top: 80, left: 10, delay: 4, duration: 22 },
  { width: 60, height: 60, top: 30, left: 70, delay: 1, duration: 25 },
  { width: 25, height: 25, top: 60, left: 30, delay: 3, duration: 20 },
  { width: 40, height: 40, top: 45, left: 90, delay: 5, duration: 19 },
  { width: 55, height: 55, top: 75, left: 60, delay: 7, duration: 21 },
  { width: 35, height: 35, top: 25, left: 45, delay: 2, duration: 23 },
  { width: 50, height: 50, top: 90, left: 80, delay: 6, duration: 17 },
  { width: 20, height: 20, top: 10, left: 55, delay: 1, duration: 24 },
  { width: 45, height: 45, top: 35, left: 15, delay: 4, duration: 20 },
  { width: 30, height: 30, top: 55, left: 85, delay: 3, duration: 19 },
  { width: 65, height: 65, top: 70, left: 40, delay: 2, duration: 22 },
  { width: 25, height: 25, top: 20, left: 65, delay: 5, duration: 18 },
  { width: 40, height: 40, top: 50, left: 20, delay: 0, duration: 23 },
  { width: 55, height: 55, top: 85, left: 75, delay: 3, duration: 21 },
  { width: 35, height: 35, top: 40, left: 50, delay: 2, duration: 24 },
  { width: 50, height: 50, top: 65, left: 35, delay: 4, duration: 19 },
  { width: 45, height: 45, top: 15, left: 95, delay: 1, duration: 20 },
  { width: 30, height: 30, top: 95, left: 5, delay: 6, duration: 25 },
  { width: 60, height: 60, top: 5, left: 30, delay: 3, duration: 22 }
];

// Pre-calculated positions for sparkles
const SPARKLE_POSITIONS = [
  { top: 25, left: 65, delay: 1 },
  { top: 80, left: 30, delay: 3 },
  { top: 40, left: 90, delay: 2 },
  { top: 60, left: 15, delay: 4 },
  { top: 10, left: 45, delay: 0 },
  { top: 75, left: 70, delay: 2 },
  { top: 30, left: 10, delay: 3 },
  { top: 85, left: 50, delay: 1 }
];

const BackgroundPattern: React.FC<BackgroundPatternProps> = ({ variant = 'default' }) => {
  const [mounted, setMounted] = useState(false);
  
  // Set mounted state to true after component mounts to trigger animations
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (variant === 'auth') {
    return (
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Enhanced gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-50 to-violet-100 dark:from-gray-900 dark:via-indigo-950 dark:to-blue-900" />
        
        {/* Animated wave effect */}
        <div className="absolute inset-0 opacity-20">
          <svg 
            className="w-full h-full" 
            viewBox="0 0 1440 320" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,197.3C960,192,1056,160,1152,138.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
              fill="rgba(99, 102, 241, 0.15)"
              className="animate-wave"
            />
            <path 
              d="M0,192L48,197.3C96,203,192,213,288,218.7C384,224,480,235,576,218.7C672,203,768,160,864,149.3C960,139,1056,160,1152,181.3C1248,203,1344,224,1392,234.7L1440,245.3L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
              fill="rgba(79, 70, 229, 0.1)"
              className="animate-wave-slow"
            />
          </svg>
        </div>
        
        {/* Enhanced floating particles with fixed positions */}
        <div className="absolute inset-0">
          {PARTICLE_POSITIONS.map((pos, i) => (
            <div 
              key={i}
              className={`absolute rounded-full bg-blue-500/20 dark:bg-blue-400/30 animate-float-slow`}
              style={{
                width: `${pos.width}px`,
                height: `${pos.height}px`,
                top: `${pos.top}%`,
                left: `${pos.left}%`,
                animationDelay: `${pos.delay}s`,
                animationDuration: `${pos.duration}s`,
              }}
            />
          ))}
        </div>
        
        {/* Abstract medical shapes - larger and more prominent */}
        <div className="absolute top-0 left-0 w-2/5 h-2/5 opacity-40 dark:opacity-30 transform -translate-x-1/4 -translate-y-1/4">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path fill="#4F46E5" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.3,29.2,73.1,42.6C64.9,56,54.1,68.3,40.5,75.7C26.9,83.1,10.4,85.6,-6.9,84.8C-24.2,84,-48.4,79.8,-65.8,68.3C-83.2,56.8,-93.7,37.9,-96.9,18.5C-100.1,-0.9,-96,-20.9,-87.9,-38.2C-79.8,-55.6,-67.7,-70.3,-52.8,-77C-37.9,-83.7,-19,-82.4,-1.9,-79.5C15.1,-76.6,30.7,-71.9,44.7,-76.4Z" transform="translate(100 100)" className="animate-morph fill-blue-500/30 dark:fill-blue-400/30" />
          </svg>
        </div>
        
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-40 dark:opacity-30 transform translate-x-1/4 translate-y-1/4">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path fill="#4338CA" d="M37.9,-49.2C54,-42.7,75.2,-37.5,83.1,-24.8C91,-12.2,85.6,7.8,76.6,24.9C67.7,42,55.3,56.2,39.8,65.6C24.4,75,6.9,79.5,-10.1,77.4C-27,75.3,-43.5,66.4,-56.2,53.6C-69,40.8,-78,24.1,-81.9,5.4C-85.9,-13.4,-84.8,-34.2,-74.1,-47.9C-63.3,-61.7,-42.9,-68.5,-26.2,-74.5C-9.5,-80.5,3.4,-85.9,13.8,-79.9C24.2,-73.9,32.1,-56.7,37.9,-49.2Z" transform="translate(100 100)" className="animate-morph fill-indigo-500/30 dark:fill-indigo-400/30" style={{ animationDelay: '2.5s' }} />
          </svg>
        </div>

        {/* New floating blob */}
        <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 opacity-30 dark:opacity-20">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path fill="#8B5CF6" d="M45.2,-57.2C59.3,-46.8,72.2,-33.2,77.4,-16.6C82.6,0.1,80.1,19.7,70.7,34.9C61.3,50.1,44.9,60.8,27.4,66.6C9.9,72.4,-8.7,73.2,-24.4,67C-40,60.9,-52.8,47.8,-62.9,31.8C-73.1,15.8,-80.6,-3.1,-77.5,-20.1C-74.3,-37.1,-60.3,-52.3,-44.4,-62.3C-28.5,-72.3,-10.7,-77.2,3.4,-81.5C17.6,-85.8,31.1,-89.4,45.2,-83.9" transform="translate(100 100)" className="animate-morph-slow fill-purple-500/20 dark:fill-purple-400/20" />
          </svg>
        </div>
        
        {/* Enhanced grid pattern */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
        
        {/* Medical cross symbols floating - fixed positions */}
        <div className="absolute left-1/4 top-1/5 opacity-25 dark:opacity-15 animate-float-slow">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 3H15V9H21V15H15V21H9V15H3V9H9V3Z" fill="currentColor" className="text-blue-600 dark:text-blue-400" />
          </svg>
        </div>
        <div className="absolute right-1/4 bottom-1/4 opacity-25 dark:opacity-15 animate-float-slow" style={{ animationDelay: '2s' }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 3H15V9H21V15H15V21H9V15H3V9H9V3Z" fill="currentColor" className="text-indigo-600 dark:text-indigo-400" />
          </svg>
        </div>
        <div className="absolute left-2/3 top-2/3 opacity-25 dark:opacity-15 animate-float-slow" style={{ animationDelay: '4s' }}>
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 3H15V9H21V15H15V21H9V15H3V9H9V3Z" fill="currentColor" className="text-violet-600 dark:text-violet-400" />
          </svg>
        </div>
        
        {/* Light sparkles with fixed positions */}
        <div className="absolute inset-0">
          {SPARKLE_POSITIONS.map((pos, i) => (
            <div 
              key={`sparkle-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${pos.top}%`,
                left: `${pos.left}%`,
                animationDelay: `${pos.delay}s`,
                boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.6)',
                opacity: 0.7,
              }}
            />
          ))}
        </div>
        
        {/* Enhanced animated gradient overlay */}
        <div 
          className={`absolute inset-0 opacity-30 dark:opacity-40 transition-opacity duration-1000 animate-gradient ${mounted ? 'opacity-30 dark:opacity-40' : 'opacity-0'}`} 
          style={{ 
            background: 'linear-gradient(120deg, rgba(79, 70, 229, 0.2) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(139, 92, 246, 0.2) 100%)',
            backgroundSize: '200% 200%',
          }} 
        />
      </div>
    );
  }
  
  // Default background for other pages
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-indigo-50/20 dark:from-gray-900/20 dark:to-indigo-950/20" />
      <div className="absolute inset-0 bg-grid-slate-100/[0.05] dark:bg-grid-slate-700/[0.05]" />
    </div>
  );
};

export default BackgroundPattern;