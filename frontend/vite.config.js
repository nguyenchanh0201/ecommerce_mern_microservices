import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0", // Allows access from Docker network
    port: 5173,      // Ensure this matches docker-compose.yml
  },
  plugins: [react()],
})
