import { Layer, MeshBuilder, StandardMaterial } from '@babylonjs/core'
import '@babylonjs/core/Debug/debugLayer'
import '@babylonjs/inspector'
import GameAPP from '../app'
import { AdvancedDynamicTexture, ColorPicker, Control } from '@babylonjs/gui'
import { reaction } from 'mobx'
import { NavBar } from '../components/navbar'
import { AudioManager } from '../controllers/audioManager'
import { Inspector } from '@babylonjs/inspector'
import { BaseScreen } from './BaseScreen'
import IGameScreen from '../interfaces/screen'

export default class GarageScreen extends BaseScreen implements IGameScreen {
  private readonly _garageGUI: AdvancedDynamicTexture
  private _backgroundLayer: Layer
  private _navBar: NavBar

  constructor(private readonly _app: GameAPP) {
    super(_app, 'home')
    this._garageGUI = AdvancedDynamicTexture.CreateFullscreenUI('UI')

    // ... build UI
    this._build()
  }

  activate(): void {
    super.activate()
    AudioManager.playAudio('race-phonk.ogg')
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

    // -- this._scene SETUP... --
    this._scene.detachControl()
    this._scene.createDefaultCameraOrLight(true, true, true)
    this._navBar = new NavBar(
      this._game,
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
