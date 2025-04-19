import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  assetsInclude: ['**/*.obj', '**/*.mtl', '**/*.png'],  // Inclui tipos de arquivo 3D
  resolve: {
    alias: {
      three: 'three'
    }
  },
  optimizeDeps: {
    include: ['three', 'three/examples/jsm/loaders/OBJLoader']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three']
        }
      }
    }
  }
})
