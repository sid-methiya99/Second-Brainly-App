import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
   plugins: [react(), tailwindcss()],
   server: {
      host: '0.0.0.0', // Allows external connections (needed for Docker)
      port: 5173,
      strictPort: true,
      watch: {
         usePolling: true, // Enables hot reload in Docker containers
      },
      hmr: {
         host: 'localhost', // Hot Module Replacement host
      },
   },
})
