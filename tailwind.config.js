/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        mono: ['Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        clarendon: ["clarendon"],
        notosanstelugu: ["notosans-telugu"],
        bodoni: ["Bodoni"],
        domine: ["Playfair Display", "serif"],
        neuehaas: ['Neue Haas Grotesk Display Pro', "sans-serif"],
      },
    },
  },
  plugins: [],
}

