import {
  Engine,
  Scene,
  Vector3,
  Layer,
  KeepAssets,
  FreeCamera,
} from '@babylonjs/core'
import { IGameState } from '../interfaces/state'
import { AdvancedDynamicTexture, Control, StackPanel } from '@babylonjs/gui'
import { GameStateManager } from '../controllers/stateManager'
import { AudioManager } from '../controllers/audioManager'
import { SetupGameState } from './gameMode'
import { GamePopup } from '../components/popup'
import { UserManager } from '../controllers/userManager'
import { reaction } from 'mobx'
import { NavBar } from '../components/navbar'
import { FooterBar } from '../components/foobar'

export class HomeGameState implements IGameState {
  private _engine: Engine
  private _scene: Scene
  private _homeGUI: AdvancedDynamicTexture
  private _audioManager: AudioManager
  private _userManager: UserManager
  sid: string
  private _navBar: NavBar

  constructor(engine: Engine, scene: Scene) {
    // init...
    this.sid = 'Home'
    this._engine = engine
    this._scene = scene
    this._homeGUI = AdvancedDynamicTexture.CreateFullscreenUI('UI')
    this._audioManager = new AudioManager()
    this._userManager = new UserManager()

    // ...attach all listener (understand which affect the rebuild)
    this._audioManager.playSound('neon-fury.ogg')
    this._listener()
  }

  async _listener(): Promise<void> {
    this._userManager.userStateChanged()
    reaction(
      () => this._userManager.isLoggedIn,
      (flag) => {
        if (flag) {
          // TODO: Show a log in popup
          console.log('user log in')
        } else {
          // TODO: Show a log out popup
          console.log('user log out')
        }
      },
    )
  }

  async _build(): Promise<void> {
    this._engine.displayLoadingUI()

    // --this._scene SETUP--
    let camera = new FreeCamera('home-camera', Vector3.Zero(), this._scene)
    this._navBar = new NavBar(this._homeGUI, this._userManager)

    let fooBar = new FooterBar(this._homeGUI)
    fooBar.getFooterButton('playButton').onPointerClickObservable.add(() => {
      if (this._userManager.getGameUser.uid === 'xxx') {
        return this._homeGUI.addControl(
          GamePopup.showInfoPopup(
            'You must log in before!\n Anonymous login system coming soon...',
          ),
        )
      } else {
        this._leave()
        GameStateManager.pushState(new SetupGameState(this._engine, this._scene))
      }
    })

    this._homeGUI.addControl(this._navBar)
    this._homeGUI.addControl(fooBar)

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
    await  this._scene.whenReadyAsync()
    this._scene.attachControl()
    this._engine.hideLoadingUI()
  }

  _leave(): void {
    this._navBar.stop()
  }
}
