import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite plugins: "react" lets Vite understand JSX, "tailwindcss" generates our CSS classes.
// Tailwind v4 needs no tailwind.config.js or postcss.config.js file.
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
