import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        atelier: {
          ivory: '#FAF8F5',
          'ivory-light': '#FDFCFB',
          'ivory-dark': '#F2ECE4',
          sand: '#EBE4DA',
          'sand-dark': '#DDD3C4',
          nude: '#E6DCD2',
          'nude-muted': '#D9CCC0',
          champagne: '#D4C1A8',
          'champagne-light': '#E9DFD0',
          gold: '#C5A880',
          'gold-light': '#DFCAAB',
          'gold-dark': '#9A7D55',
          noir: '#131211',
          charcoal: '#1E1C1A',
          graphite: '#2C2926',
          muted: '#8A847C',
          'rose-dust': '#E7DBD5',
          'rose-subtle': '#F2EAE6',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        editorial: '0.22em',
        widest: '0.28em',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      aspectRatio: {
        portrait: '3/4',
        editorial: '4/5',
        tall: '9/16',
        square: '1/1',
        wide: '16/9',
        panoramic: '21/9',
      },
      boxShadow: {
        'luxe': '0 20px 40px -15px rgba(26, 22, 18, 0.08)',
        'luxe-hover': '0 30px 60px -20px rgba(26, 22, 18, 0.16)',
        'modal': '0 25px 70px -15px rgba(0, 0, 0, 0.5)',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'luxe': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
