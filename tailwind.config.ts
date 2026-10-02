import type { Config } from 'tailwindcss'

const config: Config = {
  // hover: utilities only on devices that really hover — on touch, a tap otherwise leaves the hover state stuck on.
  future: { hoverOnlyWhenSupported: true },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Keynote palette (2026-09 redesign) ───────────────────────
        // Apple-like: near-white grounds, graphite ink, one blue action.
        // Token names are unchanged so every page picks this up.
        // Values live in CSS vars: light by default (pay/admin), dark under .space (public site).
        ivory: 'rgb(var(--c-ivory) / <alpha-value>)',
        bone: 'rgb(var(--c-bone) / <alpha-value>)',
        paper: 'rgb(var(--c-paper) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        graphite: 'rgb(var(--c-graphite) / <alpha-value>)',
        ash: 'rgb(var(--c-ash) / <alpha-value>)',
        mute: 'rgb(var(--c-mute) / <alpha-value>)',
        hairline: 'var(--hairline)',
        gold: {
          DEFAULT: '#0071E3',  // action blue (legacy "gold" token name)
          soft: '#6BB4FF',     // blue on dark grounds
          deep: '#0066CC',     // link blue
        },
        action: '#0071E3',
        link: '#0066CC',
        coral: '#0071E3',
        peach: '#CFE3FB',
        sun: '#E8F1FD',
        teal: '#00A3A3',
        mint: '#BFE8E0',
        watermelon: '#0071E3',
        brand: {
          50: '#F2F7FE',
          100: '#E1EEFD',
          200: '#BFDAFB',
          300: '#8CBDF7',
          400: '#0071E3',
          500: '#0066CC',
          600: '#0058B0',
          700: '#1D1D1F',
          800: '#141416',
          900: '#0A0A0B',
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
        sans: ['var(--font-geist-sans, var(--font-sans, -apple-system))', 'Apple SD Gothic Neo', 'Malgun Gothic', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-geist-sans, var(--font-serif, Georgia))', 'Apple SD Gothic Neo', 'system-ui', 'sans-serif'],
        display: ['var(--font-geist-sans, var(--font-serif, Georgia))', 'Apple SD Gothic Neo', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'mega': ['clamp(3.5rem, 10vw, 8.5rem)', { lineHeight: '0.95', letterSpacing: '-0.055em' }],
        'hero': ['clamp(2.75rem, 7.5vw, 6.5rem)', { lineHeight: '0.98', letterSpacing: '-0.05em' }],
        'display-lg': ['clamp(2.25rem, 5.5vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.045em' }],
        'display': ['clamp(2rem, 4.5vw, 3.25rem)', { lineHeight: '1.06', letterSpacing: '-0.04em' }],
        'display-sm': ['clamp(1.5rem, 3.2vw, 2.125rem)', { lineHeight: '1.15', letterSpacing: '-0.03em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.005em' }],
        'overline': ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.02em' }],
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
        'glow-sm': '0 0 16px rgba(0, 113, 227, 0.2)',
        'glow': '0 0 24px rgba(0, 113, 227, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 113, 227, 0.35)',
        'inner-glow': 'inset 0 0 60px rgba(0, 113, 227, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(90deg, #0071E3 0%, #00A3A3 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
export default config
