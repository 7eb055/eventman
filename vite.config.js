import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    include: "**/*.{jsx,tsx}",
  })],
  server: {
    port: 5173,
    strictPort: true,
    host: true
    
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: [],
  }
})