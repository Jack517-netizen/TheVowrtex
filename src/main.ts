import { getAnalytics } from 'firebase/analytics'
import isOnline from 'is-online'
import { registerSW } from 'virtual:pwa-register'
import { UAParser } from 'ua-parser-js'
import { APP } from './core/components/app.ts'
import GameAPP from './core/app.ts'

/**--------ENTRY POINT---- */

// Get user network state && Running the app (if user is connected to internet)
isOnline().then((online) => {
  if (online) {
    const analytics = getAnalytics(APP.getApp())

    // Get canvas element
    let render = document.querySelector('#renderCanvas') as HTMLCanvasElement

    // Set canvas dimensions to match window inner size
    render.width = window.innerWidth
    render.height = window.innerHeight
    
    // Get informations about the userAgent used by the player (use to load better content)
    const parser = new UAParser()
    const result = parser.getResult()
    if(result.device.type !== undefined && result.device.type !== 'mobile') {
      let GAME = new GameAPP(render)
      GAME.run()
    } else {
      // Excuse page
      window.location.href = '/unsupported-devices/'
    }
  } else {
    // Excuse page
    window.location.href = '/offline/'
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
