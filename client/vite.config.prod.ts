import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // This plugin automatically reads your tsconfig.json paths
  ],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src/app'),
      '@app/*': path.resolve(__dirname, './src/app/*'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@entities/*': path.resolve(__dirname, './src/entities/*'),
      '@features': path.resolve(__dirname, './src/features'),
      '@features/*': path.resolve(__dirname, './src/features/*'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@pages/*': path.resolve(__dirname, './src/pages/*'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@shared/*': path.resolve(__dirname, './src/shared/*'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@widgets/*': path.resolve(__dirname, './src/widgets/*'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@styles/*': path.resolve(__dirname, './src/styles/*'),
      '@mui/styled-engine': path.resolve(__dirname, 'node_modules/@mui/styled-engine-sc'),
    },
  },
  build: {
    outDir: 'dist',
  },
})
