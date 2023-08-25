/* eslint-disable linebreak-style */
/* eslint-disable indent */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/cryptoV/',
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src',
    },
  },
})
