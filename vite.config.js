import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function nonBlockingCss() {
  return {
    name: 'vite-plugin-non-blocking-css',
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
        '<link rel="stylesheet" crossorigin href="$1" media="print" onload="this.media=\'all\'">\n    <noscript><link rel="stylesheet" href="$1"></noscript>'
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), nonBlockingCss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/gsap')) {
            return 'gsap'
          }
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react'
          }
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
    warmup: {
      clientFiles: ['./src/main.jsx', './src/App.jsx', './src/index.css'],
    },
  },
})
