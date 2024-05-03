import { Color4, Engine, FreeCamera, Layer, Scene, Vector3 } from '@babylonjs/core'
import '@babylonjs/core/Debug/debugLayer'
import '@babylonjs/inspector'
import IGameScreen from '../interfaces/screen'
import GameAPP from '../app'
import { AdvancedDynamicTexture, Container, Control, Image, TextBlock } from '@babylonjs/gui'
import { reaction } from 'mobx'
import { NavBar } from '../components/navbar'
import { AudioManager } from '../controllers/audioManager'
import { UserManager } from '../controllers/userManager'
import { GameButton } from '../components/buttons'

export default class GameModeScreen implements IGameScreen {
  private readonly _engine: Engine
  private readonly _scene: Scene
  private readonly _game: GameAPP
  _screenId: string
  private readonly _gameModeGUI: AdvancedDynamicTexture
  private readonly _userManager: UserManager
  private _navBar: NavBar
  private _backgroundLayer: Layer

  constructor(readonly game: GameAPP) {
    this._game = game
    this._engine = game.getEngine
    this._scene = new Scene(this._engine)
    this._screenId = 'game mode'

    // Attach inspector debug tools
    this._debugGame()

    this._gameModeGUI = AdvancedDynamicTexture.CreateFullscreenUI('UI')
    this._userManager = new UserManager()

    // ... build ui
    AudioManager.playAudio('race-phonk.ogg')
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
    this._engine.onResizeObservable.add(this._resize, undefined, undefined, this)
    this._resize()
    AudioManager.resumeAllSongs()

    // ...attach all listener (understand which affect the rebuild)
    this._listener()
  }

  deactivate(): void {
    AudioManager.freezeAllSongs()

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

  private _resize() { }

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
    let camera = new FreeCamera('modeCamera', Vector3.Zero(), this._scene)

    this._navBar = new NavBar(this.game, this._gameModeGUI, this._userManager, this._screenId)

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
    this._backgroundLayer = new Layer(
      'homeLayer',
      '/assets/img/dome1.jpg',
      this._scene,
      true,
    )

    this._gameModeGUI.addControl(arrowLeft)
    this._gameModeGUI.addControl(arrowRight)
    this._gameModeGUI.addControl(this._navBar)

    // -- this._scene FINISHED LOADING --
    await this._scene.whenReadyAsync()
    this._scene.attachControl()
    this._engine.hideLoadingUI()
  }
}
