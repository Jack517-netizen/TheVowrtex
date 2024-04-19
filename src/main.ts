import { Game } from './core/app.ts'
import { getAnalytics } from 'firebase/analytics'
import isOnline from 'is-online'
import { registerSW } from 'virtual:pwa-register'
import { APP } from './core/components/app.ts'

// Get user network state
isOnline().then((online) => {
  if (online) {

    const analytics = getAnalytics(APP.getApp())

    // Get canvas element
    let render = document.querySelector('#renderCanvas') as HTMLCanvasElement

    // Set canvas dimensions to match window size
    render.width = window.innerWidth
    render.height = window.innerHeight

    // Running the app (if user is connected to internet)
    let GAME = new Game(render)
    GAME.init()
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
