import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F0',
        bone: '#F3EEE2',
        paper: '#FFFFFF',
        ink: '#141414',
        graphite: '#2A2A2A',
        ash: '#6B675F',
        mute: '#9C958A',
        hairline: 'rgba(20, 20, 20, 0.08)',
        gold: {
          DEFAULT: '#B8914A',
          soft: '#D9BC85',
          deep: '#8F6F36',
        },
        brand: {
          50: '#FAF7F0',
          100: '#F3EEE2',
          200: '#E6DFCE',
          300: '#D4CAAF',
          400: '#B8914A',
          500: '#9F7D3F',
          600: '#826634',
          700: '#141414',
          800: '#0F0F0F',
          900: '#0A0A0A',
        },
        surface: {
          DEFAULT: '#0a0a0a',
          raised: '#111111',
          card: '#141414',
          hover: '#1a1a1a',
          border: '#1f1f1f',
        },
        dark: {
          100: '#1e1e1e',
          200: '#2d2d2d',
          300: '#3d3d3d',
          400: '#4d4d4d',
          500: '#5d5d5d',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'Noto Sans KR', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Fraunces', 'ui-serif', 'Georgia', 'serif'],
        display: ['var(--font-serif)', 'Fraunces', 'ui-serif', 'Georgia', 'serif'],
      },
      fontSize: {
        'mega': ['clamp(4rem, 11vw, 10rem)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        'hero': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'display': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'display-sm': ['clamp(1.5rem, 3.5vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.005em' }],
        'overline': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.24em' }],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up-delay': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both',
        'slide-up-delay-2': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both',
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 20px rgba(0,0,0,0.04)',
        'card': '0 4px 24px rgba(0,0,0,0.06)',
        'card-hover': '0 12px 48px rgba(0,0,0,0.12)',
        'elevated': '0 20px 60px rgba(0,0,0,0.10)',
        'glow-sm': '0 0 16px rgba(200, 164, 92, 0.2)',
        'glow': '0 0 24px rgba(200, 164, 92, 0.3)',
        'glow-lg': '0 0 40px rgba(200, 164, 92, 0.35)',
        'inner-glow': 'inset 0 0 60px rgba(200, 164, 92, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, #C8A45C 0%, #E8D5A3 50%, #C8A45C 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
export default config
