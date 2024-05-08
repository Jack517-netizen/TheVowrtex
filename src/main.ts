import { getAnalytics } from 'firebase/analytics'
import isOnline from 'is-online'
import { registerSW } from 'virtual:pwa-register'
import { UAParser } from 'ua-parser-js'
import { APP } from './core/components/app.ts'
import GameAPP from './core/app.ts'
import Navigo from 'navigo'
import { RouterManager } from './core/controllers/routerManager.ts'

/**--------ENTRY POINT OF GAME---- */
const router = RouterManager.generateRoutes()

const gameCanvas = document.querySelector('#renderCanvas') as HTMLCanvasElement
gameCanvas.width = window.innerWidth
gameCanvas.height = window.innerHeight

// Fetch updates and get user attention...
const listenForUpdates = () => {
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
}

// Get informations about the userAgent used by the player (use to load better content)
const getPlayerDeviceInfo = () => {
  const parser = new UAParser()
  const result = parser.getResult()

  //! DEBUG PURPOSE
  console.log('GUA => ', result)

  if (result.os.name !== 'Android' && result.os.name !== 'iOS') {
    const loadingBar = document.querySelector('#loadingBar') as HTMLElement
    const percentLoaded = document.querySelector(
      '#percentLoaded',
    ) as HTMLElement
    const loader = document.querySelector('#loader') as HTMLElement

    let GAME = new GameAPP(gameCanvas, loadingBar, percentLoaded, loader)
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
}

// Get user network state (if user is connected ?) && Running the app
const getPlayerConnectionState = () => {
  isOnline().then((status) => {
    if (status) {
      //! const analytics = getAnalytics(APP.getApp())
      getPlayerDeviceInfo()
    } else {
      // Excuse page
      console.log('offline')
      return router.navigateByName('offline-page')
    }
  })
}

const openApplication = () => {
  getPlayerConnectionState()

  listenForUpdates()
}

openApplication()
