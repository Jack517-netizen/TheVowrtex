import { Engine, FreeCamera, Layer, Scene, Vector3 } from '@babylonjs/core'
import '@babylonjs/core/Debug/debugLayer'
import '@babylonjs/inspector'
import GameAPP from '../app'
import GameModeScreen from './modeScreen'
import { AdvancedDynamicTexture } from '@babylonjs/gui'
import { reaction } from 'mobx'
import { NavBar } from '../components/navbar'
import { AudioManager } from '../controllers/audioManager'
import { GamePopup } from '../components/popup'
import { FooterBar } from '../components/foobar'
import { Inspector } from '@babylonjs/inspector'
import { BaseScreen } from './BaseScreen'
import IGameScreen from '../interfaces/screen'

export default class HomeScreen extends BaseScreen implements IGameScreen {
  private readonly _homeGUI: AdvancedDynamicTexture
  private _backgroundLayer: Layer

  constructor(private readonly _app: GameAPP) {
    super(_app, 'home')
    this._homeGUI = AdvancedDynamicTexture.CreateFullscreenUI('UI')

    // Attach inspector debug tools ... build UI
    this._debugGame()
    this._build()
  }

  /**
   * For debug purpose using inspector layer
   * @param void
   * @return void
   */
  private _debugGame(): void {
    window.addEventListener('keydown', (evt) => {
      if (evt.ctrlKey && evt.key === 'i') {
        if (this._scene.debugLayer.isVisible()) {
          Inspector.Show(this._scene, {})
        } else {
          Inspector.Hide()
        }
      }
    })
  }

  activate(): void {
    super.activate()
    AudioManager.playAudio('neon-fury.ogg')
    // ...attach all listener (understand which affect the rebuild)
    this._listener()
  }

  deactivate(): void {
    super.deactivate()
    this._navBar.stop()
  }

  render(): void {
    super.render()
  }

  dispose(): void {
    super.dispose()
  }

  private _listener() {
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

  private async _build(): Promise<void> {
    this._engine.displayLoadingUI()

    // --this._scene SETUP--
    let camera = new FreeCamera('homeCamera', Vector3.Zero(), this._scene)
    this._navBar = new NavBar(this._game, this._homeGUI, this._userManager)

    let fooBar = new FooterBar(this._homeGUI)
    fooBar.getFooterButton('playButton').onPointerClickObservable.add(() => {
      if (this._userManager.getGameUser.uid === 'xxx') {
        return this._homeGUI.addControl(
          GamePopup.showInfoPopup(
            'You must log in before!\n Anonymous login system coming soon...',
          ),
        )
      } else {
        this._game.getScreenManager.pushScreen(new GameModeScreen(this._game))
      }
    })

    this._backgroundLayer = new Layer(
      'homeLayer',
      '/assets/img/banner.jpg',
      this._scene,
      true,
    )
    this._homeGUI.addControl(fooBar)
    this._homeGUI.addControl(this._navBar)

    // --this._scene FINISHED LOADING--
    await this._scene.whenReadyAsync()
    this._engine.hideLoadingUI()
  }
}
