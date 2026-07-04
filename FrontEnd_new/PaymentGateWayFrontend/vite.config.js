import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // All /api calls go to Spring Boot running on 8080
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      }
    }
  }
})

