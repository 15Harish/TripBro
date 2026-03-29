export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ocean: { DEFAULT: '#0077BE', light: '#1a8fd1', dark: '#005a8e' },
        sand: { DEFAULT: '#F5E6D3', light: '#faf3eb', dark: '#e8c9a8' },
        sunset: { DEFAULT: '#FF6B35', light: '#ff8a5c', dark: '#e5501a' },
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
