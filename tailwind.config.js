module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'grid-slate-100': "url(\"data:image/svg+xml,...\")",
        'grid-slate-700': "url(\"data:image/svg+xml,...\")",
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'morph': 'morph 15s ease-in-out infinite',
        'morph-slow': 'morph 25s ease-in-out infinite',
        'gradient': 'gradientBackground 15s ease infinite',
        'wave': 'wave 15s ease-in-out infinite',
        'wave-slow': 'wave 18s ease-in-out infinite reverse',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-15px) translateX(10px)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        gradientBackground: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
      },
    }
  }
}
