/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        soc: {
          bg: '#0B0F19',
          card: '#111827',
          border: '#1F2937',
          primary: '#3B82F6',
          accent: '#06B6D4',
          danger: '#EF4444',
          warning: '#F59E0B',
          success: '#10B981',
          muted: '#9CA3AF'
        }
      }
    },
  },
  plugins: [],
}
