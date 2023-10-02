import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

export default defineConfig( {
  resolve: {
    alias: {
      '@': fileURLToPath( new URL ( './', import.meta.url ) ),
      '@compos': fileURLToPath( new URL ( './composables', import.meta.url ) ),
      '@js': fileURLToPath( new URL ( './js', import.meta.url ) ),
      '@mock': fileURLToPath( new URL ( './mock', import.meta.url ) ),
    }
  },
} )