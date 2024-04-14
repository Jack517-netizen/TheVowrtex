import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      injectRegister: 'auto',
      workbox: {
        maximumFileSizeToCacheInBytes: 20000000
      },
      devOptions: {
        enabled: true,
      },
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'maskable-icon.png',
        'img/no-connection.png',
        'img/offline-version.html',
      ],
      manifest: {
        name: 'Vortex',
        short_name: 'Vortex',
        description: 'The Ultimate Racing Universe',
        theme_color: '#000000',
        orientation: 'landscape',
        display: 'fullscreen',
        display_override: ['fullscreen'],
        start_url: '/',
        icons: [
          {
            src: '/assets/img/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/img/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
