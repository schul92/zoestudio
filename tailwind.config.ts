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
        // Luxury bright palette — cream/ivory base, soft gold accent, charcoal text
        brand: {
          ivory: '#FEFBF4',
          cream: '#F7F3EB',
          gold: '#C8A45C',
          'gold-light': '#E8D5A3',
          'gold-dark': '#A07D3A',
          charcoal: '#1A1A1A',
          graphite: '#2E2E2E',
          slate: '#6B6B6B',
          mist: '#A3A3A3',
          blush: '#F2E0D6',
          sage: '#D4DDD2',
        },
        // Keep primary for backwards compat
        primary: {
          50: '#FEFBF4',
          100: '#F7F3EB',
          200: '#E8D5A3',
          300: '#D4C08A',
          400: '#C8A45C',
          500: '#A07D3A',
          600: '#8A6A30',
          700: '#6E5226',
          800: '#523D1C',
          900: '#3A2B14',
        },
        surface: {
          DEFAULT: '#FEFBF4',
          raised: '#FFFFFF',
          card: '#FFFFFF',
          hover: '#F7F3EB',
          border: '#E8E2D6',
          'dark': '#1A1A1A',
          'dark-raised': '#2E2E2E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans KR', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 7vw, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.04em', fontWeight: '800' }],
        'display-lg': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'display-sm': ['clamp(1.5rem, 3.5vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        'overline': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.15em', fontWeight: '600' }],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up-delay': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both',
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'counter': 'counter 2s cubic-bezier(0.16, 1, 0.3, 1)',
        'marquee': 'marquee 30s linear infinite',
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
          '0%': { transform: 'translateY(24px)', opacity: '0' },
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
        counter: {
          '0%': { '--num': '0' },
          '100%': { '--num': '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 20px rgba(0,0,0,0.04)',
        'card': '0 4px 24px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.10)',
        'elevated': '0 12px 48px rgba(0,0,0,0.08)',
        'gold': '0 4px 24px rgba(200,164,92,0.15)',
        'gold-lg': '0 8px 40px rgba(200,164,92,0.20)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, #C8A45C 0%, #E8D5A3 50%, #C8A45C 100%)',
        'gradient-warm': 'linear-gradient(180deg, #FEFBF4 0%, #F7F3EB 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
export default config
