import {
  ArcRotateCamera,
  Engine,
  Scene,
  Vector3,
  Layer,
  KeepAssets,
} from '@babylonjs/core'
import { IGameState } from '../interfaces/state'
import { colors } from '../../configs/colors'
import { AdvancedDynamicTexture, Control, StackPanel } from '@babylonjs/gui'
import { GameStateManager } from '../controllers/stateManager'
import { GameButton } from '../components/buttons'
import { AudioManager } from '../controllers/audioManager'
import { SetupGameState } from './setup'
import { GamePopup } from '../components/popup'
import { UserManager } from '../controllers/userManager'

export class HomeGameState implements IGameState {
  private _engine: Engine
  private _scene: Scene
  private _homeGUI: AdvancedDynamicTexture
  private _audioManager: AudioManager
  private _keepAssets: KeepAssets
  sid: string

  constructor(engine: Engine, scene: Scene) {
    // init...
    this.sid = 'Home'
    this._engine = engine
    this._scene = scene
    this._homeGUI = AdvancedDynamicTexture.CreateFullscreenUI('UI')
    this._audioManager = new AudioManager()
    this._keepAssets = new KeepAssets()

    // ...attach all listener (understand which affect the rebuild)
    this._listener()

    // ...build
    this._build()
  }

  async _listener(): Promise<void> {
    UserManager.userStateChanged()
  }

  async _build(): Promise<void> {
    this._engine.displayLoadingUI()

    // --this._scene SETUP--
    this._scene.detachControl()
    // this._this._scene.clearColor = Color4.FromHexString(colors.dark.normal)
    let camera = new ArcRotateCamera(
      'camera1',
      Math.PI / 2,
      -Math.PI / 2.5,
      10,
      new Vector3(0, 0, 0),
      this._scene,
    )
    this._keepAssets.cameras.push(camera)

    this._audioManager.playSound('neon-fury.ogg')
    // -- GUI SETUP --

    let navBar = new StackPanel('navigationBar')
    navBar.isVertical = false
    navBar.height = 0.07
    navBar.top = 0.02
    navBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP
    navBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER
    if (UserManager.getCurrentGameUser().isEmpty()) {
      let loginBtn = GameButton.createHeaderButton('loginButton', 'LOGIN')
      loginBtn.onPointerClickObservable.add(() => {
        try {
          // log in...
          UserManager.loginUser()
        } catch (error: any) {
          // ...error during log in process
          return this._homeGUI.addControl(
            GamePopup.showInfoPopup(
              'WE ARE SORRY... AN ERROR OCCURED WHEN TRYING TO LOG IN YOU.\n ' +
                error.code +
                '\n' +
                error.message +
                '\n' +
                'TRY AGAIN LATER.',
            ),
          )
        }
      })

      // return loginBtn
      navBar.addControl(loginBtn)
    } else {
      let youBtn = GameButton.createHeaderButton('youButton', 'YOU')
      youBtn.onPointerClickObservable.add(() => {
        return this._homeGUI.addControl(
          GamePopup.showInfoPopup(
            'USER INFORMATIONS \n ' +
              UserManager.getCurrentGameUser().getUid() +
              '\n' +
              UserManager.getCurrentGameUser().getName() +
              '\n' +
              UserManager.getCurrentGameUser().getEmail() +
              '\n' +
              UserManager.getCurrentGameUser().getPic() +
              '\n',
          ),
        )
      })
      navBar.addControl(youBtn)
    }
    let texBtn = GameButton.createHeaderButton('texButton', 'TEX')
    texBtn.onPointerClickObservable.add(() => {
      if (UserManager.getCurrentGameUser().isEmpty()) {
        return this._homeGUI.addControl(
          GamePopup.showInfoPopup(
            'You must log in before!\n Anonymous login system will be coming soon...',
          ),
        )
      }
      // TODO: Game logic goes here
    })
    let tokenBtn = GameButton.createHeaderButton('tokenButton', 'TOKEN')
    tokenBtn.onPointerClickObservable.add(() => {
      if (UserManager.getCurrentGameUser().isEmpty()) {
        return this._homeGUI.addControl(
          GamePopup.showInfoPopup(
            'You must log in before!\n Anonymous login system will be coming soon...',
          ),
        )
      }
      // TODO: Game logic goes here
    })
    let starBtn = GameButton.createHeaderButton('starButton', 'STAR')
    starBtn.onPointerClickObservable.add(() => {
      if (UserManager.getCurrentGameUser().isEmpty()) {
        return this._homeGUI.addControl(
          GamePopup.showInfoPopup(
            'You must log in before!\n Anonymous login system will be coming soon...',
          ),
        )
      }
      // TODO: Game logic goes here
    })
    let garageBtn = GameButton.createHeaderButton('garageButton', 'GARAGE')
    garageBtn.onPointerClickObservable.add(() => {
      if (UserManager.getCurrentGameUser().isEmpty()) {
        return this._homeGUI.addControl(
          GamePopup.showInfoPopup(
            'You must log in before!\n Anonymous login system will be coming soon...',
          ),
        )
      }
      // TODO: Game logic goes here
    })
    let settingsBtn = GameButton.createHeaderButton(
      'settingsButton',
      'SETTINGS',
    )
    settingsBtn.onPointerClickObservable.add(() => {
      if (UserManager.getCurrentGameUser().isEmpty()) {
        return this._homeGUI.addControl(
          GamePopup.showInfoPopup(
            'You must log in before!\n Anonymous login system will be coming soon...',
          ),
        )
      }
      // TODO: Game logic goes here
    })
    let arcturusBtn = GameButton.createHeaderButton('youButton', 'ARCTURUS')
    arcturusBtn.onPointerClickObservable.add(() => {
      // TODO: User - Studio links
      return this._homeGUI.addControl(GamePopup.showInfoPopup('GET IN TOUCH'))
      //*window.open('https://studioarcturus.blogspot.com', '_blank')
    })
    navBar.addControl(texBtn)
    navBar.addControl(tokenBtn)
    navBar.addControl(starBtn)
    navBar.addControl(garageBtn)
    navBar.addControl(settingsBtn)
    navBar.addControl(arcturusBtn)

    let footerBar = new StackPanel('navigationBar')
    footerBar.isVertical = false
    footerBar.height = 0.2
    footerBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
    footerBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
    let leaderBtn = GameButton.createFooterButton('leaderButton', 'LEADERBOARD')
    leaderBtn.background = colors.yellow.inclusive
    leaderBtn.onPointerClickObservable.add(() => {
      // TODO: Game logic goes here
      return this._homeGUI.addControl(GamePopup.showInfoPopup('LEADERBOARD'))
    })
    let playBtn = GameButton.createFooterButton('playButton', 'PLAY')
    playBtn.onPointerClickObservable.add(() => {
      if (UserManager.getCurrentGameUser().isEmpty()) {
        return this._homeGUI.addControl(
          GamePopup.showInfoPopup(
            'You must log in before!\n Anonymous login system will be coming soon...',
          ),
        )
      }
      this._leave()
      GameStateManager.pushState(new SetupGameState(this._engine, this._scene))
      // TODO: Game logic goes here
    })
    footerBar.addControl(leaderBtn)
    footerBar.addControl(playBtn)

    this._homeGUI.addControl(navBar)
    this._homeGUI.addControl(footerBar)

    let layers = ['/assets/img/dome1.jpg', '/assets/img/dome3.jpg']
    let backgroundLayer = new Layer('homeLayer', layers[0], this._scene, true)

    let i = 0
    setInterval(() => {
      if (i % 2 == 0) {
        backgroundLayer = new Layer('homeLayer', layers[0], this._scene, true)
      } else if (i % 2 == 1) {
        backgroundLayer = new Layer('homeLayer', layers[1], this._scene, true)
      }
      i++
    }, 5500)

    // --this._scene FINISHED LOADING--
    await this._scene.whenReadyAsync()
    this._scene.attachControl()
    this._engine.hideLoadingUI()
  }

  _leave(): void {
    GameStateManager.getAssetContainer().moveAllFromScene(this._keepAssets)
  }
}
