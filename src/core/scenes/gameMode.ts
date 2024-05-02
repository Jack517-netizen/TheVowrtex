import { Color4, Engine, FreeCamera, Scene, Vector3 } from '@babylonjs/core'
import { IGameState } from '../interfaces/state'
import { AudioManager } from '../controllers/audioManager'
import {
  AdvancedDynamicTexture,
  Container,
  Control,
  Image,
  StackPanel,
  TextBlock,
} from '@babylonjs/gui'
import { NavBar } from '../components/navbar'
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
    this.sid = 'Game Mode'
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
    let camera = new FreeCamera('modeCamera', Vector3.Zero(), this._scene)

    this._navBar = new NavBar(this._gameModeGUI, this._userManager, this.sid)

    let arrowLeft = GameButton.createDirectionnalButton(
      'leftArrowBtn',
      'left-arrow.png',
    )
    arrowLeft.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
    arrowLeft.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT

    let arrowRight = GameButton.createDirectionnalButton(
      'rightArrowBtn',
      'right-arrow.png',
    )
    arrowRight.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
    arrowRight.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT

    let imageContainer = new Container('imgContainer')
    imageContainer.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
    imageContainer.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER
    imageContainer.width = '450px'
    imageContainer.height = '400px'

    let infoStack = new Container('infoStackPanel')
    imageContainer.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
    imageContainer.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER

    let modeTitle = new TextBlock('titleTextBlock', 'CRAZY COURSE')
    modeTitle.fontSize = '16px'
    infoStack.addControl(modeTitle)

    let descTitle = new TextBlock('descriptionTextBlock', 'A DESCRIPTION')
    descTitle.fontSize = '16px'
    infoStack.addControl(descTitle)

    let imageBlock = new Image('imagePart', '/assets/img/vortex.jpg')
    imageBlock.width = '100%'
    imageBlock.height = '100%'
    imageContainer.addControl(imageBlock)
    this._gameModeGUI.addControl(imageContainer)

    this._gameModeGUI.addControl(arrowLeft)
    this._gameModeGUI.addControl(arrowRight)
    this._gameModeGUI.addControl(this._navBar)

    // -- this._scene FINISHED LOADING --
    await this._scene.whenReadyAsync()
    this._scene.attachControl()
    this._engine.hideLoadingUI()
  }

  _leave(): void {
    this._navBar.stop()
    this._gameModeGUI.dispose()
    AudioManager.disposeAllSongs()
  }
}
