import { getAnalytics } from 'firebase/analytics'
import isOnline from 'is-online'
import { registerSW } from 'virtual:pwa-register'
import { UAParser } from 'ua-parser-js'
import { APP } from './core/components/app.ts'
import GameAPP from './core/app.ts'
import { RouterManager } from './core/controllers/routerManager.ts'

/**--------ENTRY POINT OF GAME---- */
const router = RouterManager.generateRoutes()
const parser = new UAParser()
const result = parser.getResult()

const LAUNCH_APPLICATION = () => {
  // Get user network state (if user is connected ?) && Running the app
  isOnline().then((status) => {
    if (status) {
      const _analytics = getAnalytics(APP.getApp())

      //! DEBUG PURPOSE
      console.log('GUA => ', result)

      // Get informations about the userAgent used by the player (use to load better content)
      if (result.os.name !== 'Android' && result.os.name !== 'iOS') {
        const gameCanvas = document.querySelector(
          '#renderCanvas',
        ) as HTMLCanvasElement
        const bjsLoader = document.querySelector('#bjs-loader') as HTMLElement
        gameCanvas.width = window.innerWidth
        gameCanvas.height = window.innerHeight

        let GAME = new GameAPP(gameCanvas, bjsLoader)
        GAME.run()
      } else {
        // Excuse page
        return router.navigate(
          '/unsupported-devices?browserName=' +
            result.browser.name +
            '&osName=' +
            result.os.name,
        )
      }
    } else {
      // Excuse page
      router.navigateByName('offline-page')
    }
  })
}

LAUNCH_APPLICATION()

// Fetch updates and get user attention...
const updateSW = registerSW({
  onNeedRefresh() {
    const userConsent = confirm(
      'New version of VORTEX available, We recommend update now.',
    )
    if (userConsent) {
      updateSW()
    } else {
      alert(
        "You can always update from settings > Update Vortex. Don't miss any available features!",
      )
    }
  },
  onOfflineReady() {
    //TODO: Run code here.
  },
})
