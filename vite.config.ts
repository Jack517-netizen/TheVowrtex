import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      injectRegister: 'auto',
      workbox: {
        //! DON'T OVERCOME THIS DEFINED SIZE
        maximumFileSizeToCacheInBytes: 25000000,
      },
      devOptions: {
        enabled: true,
      },
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'maskable-icon.svg',

        'assets/img/no-connection.png',
        'offline/index.html',
        'unsupported-devices/index.html',
      ],
      manifest: {
        name: 'Vowrtex (Alpha)',
        short_name: 'Vowrtex (Alpha)',
        description: 'The race of your life.',
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
