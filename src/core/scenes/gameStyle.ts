import { Color4, Engine, FreeCamera, Scene, Vector3 } from '@babylonjs/core'
import { IGameState } from '../interfaces/state'
import { GameStateManager } from '../controllers/stateManager'
import { AudioManager } from '../controllers/audioManager'
import { AdvancedDynamicTexture, Control, StackPanel } from '@babylonjs/gui'
import { NavBar } from '../components/navbar'
import { FooterBar } from '../components/foobar'
import { GamePopup } from '../components/popup'
import { UserManager } from '../controllers/userManager'
import { colors } from '../../configs/colors'
import { GameButton } from '../components/buttons'

export class SetupGameState implements IGameState {
  private _engine: Engine
  private _scene: Scene
  private _gameModeGUI: AdvancedDynamicTexture
  private _userManager: UserManager
  sid: string
  private _audioManager: AudioManager
  private _navBar: NavBar

  constructor(engine: Engine, scene: Scene, userManager: UserManager | void) {
    // init...
    this.sid = 'Game Style'
    this._engine = engine
    this._scene = scene
    this._gameModeGUI = AdvancedDynamicTexture.CreateFullscreenUI('UI')
    this._audioManager = new AudioManager()
    userManager !== undefined
      ? (this._userManager = userManager)
      : (this._userManager = new UserManager())

    // ...attach all listener (understand which affect the rebuild)
    this._listener()

    // ...build
    this._build()
  }

  _listener(): void {
    this._userManager.userStateChanged()
    console.log('Method not implemented.')
  }

  async _build(): Promise<void> {
    this._engine.displayLoadingUI()

    this._audioManager.playSound('race-phonk.ogg')

    // -- this._scene SETUP... --
    this._scene.detachControl()
    this._scene.clearColor = Color4.FromHexString(colors.gray.teal)
    let camera = new FreeCamera('rival-camera', Vector3.Zero(), this._scene)

    this._navBar = new NavBar(this._gameModeGUI, this._userManager)
    this._gameModeGUI.addControl(this._navBar)

    console.log('choose opponent')

    // -- this._scene FINISHED LOADING --
    await this._scene.whenReadyAsync()
    this._scene.attachControl()
    this._engine.hideLoadingUI()
  }

  _leave(): void {
    this._navBar.stop()
  }
}
