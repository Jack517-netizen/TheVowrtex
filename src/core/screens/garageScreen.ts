import {
  Color3,
  Color4,
  CubeTexture,
  Engine,
  FreeCamera,
  Layer,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core'
import '@babylonjs/core/Debug/debugLayer'
import '@babylonjs/inspector'
import IGameScreen from '../interfaces/screen'
import GameAPP from '../app'
import { AdvancedDynamicTexture, ColorPicker, Control } from '@babylonjs/gui'
import { NavBar } from '../components/navbar'
import { AudioManager } from '../controllers/audioManager'
import { UserManager } from '../controllers/userManager'
import { colors } from '../../configs/colors'
import { reaction } from 'mobx'

export default class GarageScreen implements IGameScreen {
  private readonly _engine: Engine
  private readonly _scene: Scene
  private readonly _game: GameAPP
  _screenId: string
  private readonly _garageGUI: AdvancedDynamicTexture
  private readonly _userManager: UserManager
  private _navBar: NavBar

  constructor(readonly game: GameAPP) {
    this._game = game
    this._engine = game.getEngine
    this._scene = new Scene(this._engine)
    this._screenId = 'garage'

    // Attach inspector debug tools
    this._debugGame()

    this._garageGUI = AdvancedDynamicTexture.CreateFullscreenUI('UI')
    this._userManager = new UserManager()

    // ... build ui
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
          this._scene.debugLayer.hide()
        } else {
          this._scene.debugLayer.show()
        }
      }
    })
  }

  activate(): void {
    this._scene.attachControl()
    this._engine.onResizeObservable.add(
      this._resize,
      undefined,
      undefined,
      this,
    )
    this._resize()
    AudioManager.playAudio('race-phonk.ogg')

    // ...attach all listener (understand which affect the rebuild)
    this._listener()
  }

  deactivate(): void {
    AudioManager.disposeAllSongs()

    this._engine.onResizeObservable.removeCallback(this._resize, this)
    this._scene.detachControl()
  }

  render(): void {
    this._scene.render()
  }

  dispose(): void {
    AudioManager.disposeAllSongs()
    this._scene.dispose()
  }

  private _resize() {}

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

    // -- this._scene SETUP... --
    this._scene.detachControl()
    this._scene.createDefaultCameraOrLight(true, true, true)
    this._navBar = new NavBar(
      this.game,
      this._garageGUI,
      this._userManager,
      this._screenId,
    )

    /**
     * TODO: ...Create GARAGE SKYBOX...
     * TODO: ...Review the camera which will be used...
     * TODO: ...Add a model of car...
     * TODO: Build garage UI (skeleton not an advanced)
     */

    let carModel = MeshBuilder.CreateSphere('carSphere', {
      diameter: 10,
    })
    let carMaterial = new StandardMaterial('carMaterial')
    carModel.material = carMaterial

    let carColorPicker = new ColorPicker('carColorPicker')
    carColorPicker.onValueChangedObservable.add((color) => {
      carMaterial.diffuseColor = color
    })
    carColorPicker.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
    carColorPicker.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT
    carColorPicker.paddingLeft = '15px'
    carColorPicker.paddingBottom = '15px'

    this._garageGUI.addControl(this._navBar)
    // -- this._scene FINISHED LOADING --
    await this._scene.whenReadyAsync()
    this._scene.attachControl()
    this._engine.hideLoadingUI()
  }
}
