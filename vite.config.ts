import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Vortex',
        short_name: 'Vortex',
        description: 'The Ultimate Racing Universe',
        theme_color: '#000000',
        orientation: 'landscape',
        start_url: '/',
        icons: [
          {
            src: '/assets/img/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/img/android-chrome-512x512.jpg',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
