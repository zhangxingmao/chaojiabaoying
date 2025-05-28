import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'rainbow-border': 'rainbow-border 3s linear infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'ripple': 'ripple 0.6s linear',
        'typewriter': 'typewriter 3s steps(40, end)',
        'blink-caret': 'blink-caret 0.75s step-end infinite',
        'particle-float': 'particle-float 20s infinite linear',
        'loading-dots': 'loading-dots 1.5s infinite',
        'bounce-slow': 'bounce 2s infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px) rotate(0deg)' 
          },
          '33%': { 
            transform: 'translateY(-15px) rotate(1deg)' 
          },
          '66%': { 
            transform: 'translateY(-5px) rotate(-1deg)' 
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(139, 92, 246, 0.2)'
          },
          '50%': {
            boxShadow: '0 0 40px rgba(6, 182, 212, 0.8), 0 0 80px rgba(139, 92, 246, 0.4)'
          },
        },
        'rainbow-border': {
          '0%': { borderColor: '#ef4444' },
          '16.66%': { borderColor: '#f97316' },
          '33.33%': { borderColor: '#eab308' },
          '50%': { borderColor: '#22c55e' },
          '66.66%': { borderColor: '#3b82f6' },
          '83.33%': { borderColor: '#8b5cf6' },
          '100%': { borderColor: '#ef4444' },
        },
        twinkle: {
          '0%, 100%': { 
            opacity: '0.3',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '1',
            transform: 'scale(1.2)'
          },
        },
        ripple: {
          '0%': {
            transform: 'scale(0)',
            opacity: '1'
          },
          '100%': {
            transform: 'scale(4)',
            opacity: '0'
          },
        },
        typewriter: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#06b6d4' },
        },
        'particle-float': {
          '0%': {
            transform: 'translateY(100vh) rotate(0deg)',
            opacity: '0'
          },
          '10%': {
            opacity: '1'
          },
          '90%': {
            opacity: '1'
          },
          '100%': {
            transform: 'translateY(-100vh) rotate(360deg)',
            opacity: '0'
          },
        },
        'loading-dots': {
          '0%, 20%': {
            color: 'rgba(255, 255, 255, 0.4)',
            textShadow: '0.25em 0 0 rgba(255, 255, 255, 0.4), 0.5em 0 0 rgba(255, 255, 255, 0.4)'
          },
          '40%': {
            color: 'white',
            textShadow: '0.25em 0 0 rgba(255, 255, 255, 0.4), 0.5em 0 0 rgba(255, 255, 255, 0.4)'
          },
          '60%': {
            textShadow: '0.25em 0 0 white, 0.5em 0 0 rgba(255, 255, 255, 0.4)'
          },
          '80%, 100%': {
            textShadow: '0.25em 0 0 white, 0.5em 0 0 white'
          },
        },
      },
      colors: {
        'glass': {
          light: 'rgba(255, 255, 255, 0.1)',
          dark: 'rgba(0, 0, 0, 0.2)',
        },
        'neon': {
          cyan: '#06b6d4',
          purple: '#8b5cf6',
          pink: '#ec4899',
          blue: '#3b82f6',
        }
      },
      backdropBlur: {
        'xs': '2px',
        '4xl': '72px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(6, 182, 212, 0.4)',
        'glow-lg': '0 0 40px rgba(6, 182, 212, 0.6)',
        'neon': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor, 0 0 20px #06b6d4',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      scale: {
        '102': '1.02',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      }
    },
  },
  plugins: [],
} satisfies Config; 