import React from 'react';

interface BackgroundPatternProps {
  variant?: 'default' | 'auth' | 'dashboard';
  className?: string;
}

const BackgroundPattern: React.FC<BackgroundPatternProps> = ({ 
  variant = 'default',
  className = ''
}) => {
  // Different patterns based on variant
  const getPatternStyle = () => {
    switch (variant) {
      case 'auth':
        return {
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(63, 94, 251, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(90, 131, 240, 0.1) 0%, transparent 50%)
          `,
          backgroundSize: '100% 100%'
        };
      case 'dashboard':
        return {
          backgroundImage: `
            radial-gradient(circle at 10% 10%, rgba(0, 183, 255, 0.08) 0%, transparent 30%),
            radial-gradient(circle at 90% 20%, rgba(63, 94, 251, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(90, 131, 240, 0.08) 0%, transparent 30%)
          `,
          backgroundSize: '100% 100%'
        };
      default:
        return {
          backgroundImage: `
            radial-gradient(circle at 30% 30%, rgba(63, 94, 251, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(90, 131, 240, 0.05) 0%, transparent 50%)
          `,
          backgroundSize: '100% 100%'
        };
    }
  };

  return (
    <div 
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={getPatternStyle()}
    >
      <div className="absolute -inset-[40%] opacity-50 dark:opacity-30">
        <svg 
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern 
              id="grid-pattern" 
              width="40" 
              height="40" 
              patternUnits="userSpaceOnUse"
              className="text-gray-200 dark:text-gray-700"
            >
              <path 
                d="M0 40L40 0M20 40L40 20M0 20L20 0" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
    </div>
  );
};

export default BackgroundPattern; 