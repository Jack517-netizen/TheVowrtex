import { Color4, Engine, FreeCamera, Scene, Vector3 } from '@babylonjs/core'
import { IGameState } from '../interfaces/state'
import { GameStateManager } from '../controllers/stateManager'
import { AudioManager } from '../controllers/audioManager'
import { AdvancedDynamicTexture } from '@babylonjs/gui'
import { NavBar } from '../components/navbar'
import { FooterBar } from '../components/foobar'
import { GamePopup } from '../components/popup'
import { UserManager } from '../controllers/userManager'
import { colors } from '../../configs/colors'

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
    this.sid = 'Setup'
    this._engine = engine
    this._scene = scene
    this._audioManager = new AudioManager()
    userManager !== undefined ? this._userManager = userManager : this._userManager = new UserManager()
    

    // ...build
    this._build()
  }

  _listener(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async _build(): Promise<void> {
    this._engine.displayLoadingUI()

    // -- this._scene SETUP... --
    let scene = new Scene(this._engine)
    scene.detachControl()
    scene.clearColor = Color4.FromHexString(colors.dark.competitive)
    let camera = new FreeCamera('home-camera', Vector3.Zero(), this._scene)
    this._audioManager.playSound('race-phonk.ogg')
    
    this._navBar = new NavBar(this._gameModeGUI, this._userManager)


    this._gameModeGUI.addControl(this._navBar)

    // -- this._scene FINISHED LOADING --
    await this._scene.whenReadyAsync()
    this._scene.attachControl()
    this._engine.hideLoadingUI()
  }

  _leave(): void {
    throw new Error('Method not implemented.')
  }
}
