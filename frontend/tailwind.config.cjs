module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#0b1021',
        surface: '#0f172a',
        panel: '#111827',
        accent: {
          indigo: '#6366f1',
          emerald: '#34d399',
          cyan: '#22d3ee',
        },
      },
      boxShadow: {
        soft: '0 10px 40px rgba(0,0,0,0.35)',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
};
