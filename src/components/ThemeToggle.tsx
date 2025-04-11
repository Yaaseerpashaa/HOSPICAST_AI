import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  const isDark = theme === 'dark';

  return (
    <div className="relative">
      <button
        onClick={toggleTheme}
        className={`p-2.5 rounded-full transition-all duration-300 ${
          isDark 
            ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600 shadow-inner'
            : 'bg-blue-50 text-blue-800 hover:bg-blue-100 shadow'
        } flex items-center justify-center`}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>
      <span className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-blue-500 dark:bg-yellow-400"></span>
      <span className="sr-only">{isDark ? 'Dark mode active' : 'Light mode active'}</span>
    </div>
  );
};

export default ThemeToggle; 