import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#f6ede2',
        ink: '#28211c',
        muted: '#77685b',
        line: '#dccbb8',
        olive: '#566748',
        clay: '#c87745',
        card: '#fbf5ec',
        sand: '#ead9c4',
        sea: '#6a96a7'
      },
      fontFamily: {
        serif: ['Georgia', 'ui-serif', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 40px rgba(62, 42, 23, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
