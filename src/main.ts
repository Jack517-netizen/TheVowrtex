import { getAnalytics } from 'firebase/analytics'
import isOnline from 'is-online'
import { registerSW } from 'virtual:pwa-register'
import { UAParser } from 'ua-parser-js'
import { APP } from './core/components/app.ts'
import GameAPP from './core/app.ts'
import Navigo from 'navigo'

/**--------ENTRY POINT---- */
const router = new Navigo('/')

// Get user network state && Running the app (if user is connected to internet)
isOnline().then((online) => {
  if (online) {
    //! const analytics = getAnalytics(APP.getApp())

    // Get canvas element
    let render = document.querySelector('#renderCanvas') as HTMLCanvasElement

    // Set canvas dimensions to match window inner size
    render.width = window.innerWidth
    render.height = window.innerHeight

    // Get informations about the userAgent used by the player (use to load better content)
    const parser = new UAParser()
    const result = parser.getResult()

    //! DEBUG PURPOSE
    console.log('GUA => ', result)
    if (result.os.name === 'Windows' || result.os.name === 'Mac 0S') {
      const loadingBar = document.querySelector('#loadingBar') as HTMLElement
      const percentLoaded = document.querySelector(
        '#percentLoaded',
      ) as HTMLElement
      const loader = document.querySelector('#loader') as HTMLElement

      let GAME = new GameAPP(render, loadingBar, percentLoaded, loader)
      GAME.run()
    } else {
      // Excuse page
      router.navigate('/unsupported-devices/')
    }
  } else {
    // Excuse page
    router.navigate('/offline/')
  }
})

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
