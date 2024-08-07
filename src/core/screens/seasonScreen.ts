import { Engine, FreeCamera, Layer, Scene, Vector3 } from '@babylonjs/core'
import '@babylonjs/core/Debug/debugLayer'
import '@babylonjs/inspector'
import GameAPP from '../app'
import {
  AdvancedDynamicTexture,
  Button,
  Container,
  Control,
  Image,
  TextBlock,
} from '@babylonjs/gui'
import { action, computed, makeObservable, observable, reaction } from 'mobx'
import { NavBar } from '../components/navbar'
import { AudioManager } from '../controllers/audioManager'
import { Inspector } from '@babylonjs/inspector'
import { BaseScreen } from './BaseScreen'
import IGameScreen from '../interfaces/screen'
import { GameOverlay } from '../components/overlay'
import EpisodeScreen from './EpisodeScreen'
import { GameButton } from '../components/buttons'
import { colors } from '../../configs/colors'
import { styles } from '../../configs/styles'

export default class SeasonScreen extends BaseScreen implements IGameScreen {
  private readonly _gameSeasonGUI: AdvancedDynamicTexture
  private _navBar: NavBar
  _index: number = 1

  constructor(private readonly _app: GameAPP) {
    super(_app, 'season')
    makeObservable(this, {
      _index: observable,
      getIndex: computed,
      _slide: action,
    })
    this._gameSeasonGUI = AdvancedDynamicTexture.CreateFullscreenUI('UI')

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
    let camera = new FreeCamera('modeCamera', Vector3.Zero(), this._scene)
    this._navBar = new NavBar(
      this._game,
      this._gameSeasonGUI,
      this._userManager,
      this._screenId,
    )

    let arrowLeft = GameButton.createDirectionnalButton(
      'leftArrowBtn',
      'left-arrow.png',
      () => {},
    )
    arrowLeft.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
    arrowLeft.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT
    let arrowRight = GameButton.createDirectionnalButton(
      'rightArrowBtn',
      'right-arrow.png',
      () => {},
    )
    arrowRight.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
    arrowRight.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT

    let modeTitle = new TextBlock('titleTextBlock', 'TITLE')
    modeTitle.fontSize = '42px'
    modeTitle.fontWeight = '900'
    modeTitle.top = '13%'
    modeTitle.color = colors.white.normal
    modeTitle.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP
    modeTitle.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER
    modeTitle.height = '15%'

    let descTitle = new TextBlock('descriptionTextBlock', 'A DESCRIPTION')
    descTitle.fontSize = styles.headline2
    descTitle.fontWeight = '600'
    descTitle.color = colors.white.normal
    descTitle.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
    descTitle.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER
    descTitle.height = '10%'

    let gameSeasonPanel = new Container('gameSeasonPanel')

    let imageBlock = new Image(
      'imagePart',
      `/assets/img/dome${this.getIndex}.jpg`,
    )
    imageBlock.width = '60%'
    imageBlock.height = '50%'
    imageBlock.highlightLineWidth = 15
    imageBlock.highlightColor = colors.violet.rainbow
    imageBlock.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
    imageBlock.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER
    gameSeasonPanel.addControl(imageBlock)

    let isLocked = false

    if (isLocked) {
      let lockBlock = Button.CreateImageOnlyButton(
        'lockBlockImg',
        `/assets/icons/lock.png`,
      )
      lockBlock.background = colors.dark.competitive
      lockBlock.alpha = 0.9
      lockBlock.width = '60%'
      lockBlock.height = '50%'
      if (lockBlock.image) lockBlock.image.width = '100px'
      if (lockBlock.image) lockBlock.image.height = '100px'
      if (lockBlock.image) {
        lockBlock.image.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
        lockBlock.image.horizontalAlignment =
          Control.HORIZONTAL_ALIGNMENT_CENTER
      }
      lockBlock.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
      lockBlock.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER
      gameSeasonPanel.addControl(lockBlock)
    } else {
      let selectBtn = GameButton.createActionButton('SELECT', () => {
        switch (this._index) {
          case 1:
            this._app.getScreenManager.pushScreen(new EpisodeScreen(this._app))
            break
          case 2:
            break
          case 3:
            break
          case 4:
            break
          case 5:
            break
          case 6:
            break
          case 7:
            break
          case 8:
            break
          default:
            break
        }
      })
      selectBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
      selectBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER
      gameSeasonPanel.addControl(selectBtn)
    }

    const _backgroundLayer = new Layer(
      'seasonLayer',
      '/assets/img/banner.jpg',
      this._scene,
      true,
    )

    this._gameSeasonGUI.addControl(modeTitle)
    this._gameSeasonGUI.addControl(descTitle)
    this._gameSeasonGUI.addControl(gameSeasonPanel)
    this._gameSeasonGUI.addControl(arrowLeft)
    this._gameSeasonGUI.addControl(arrowRight)
    this._gameSeasonGUI.addControl(this._navBar)
    this._gameSeasonGUI.addControl(
      GameOverlay.createTransparentBackgroundOverlay(),
    )

    // -- this._scene FINISHED LOADING --
    await this._scene.whenReadyAsync()
    this._engine.hideLoadingUI()
  }

  /**
   * Slide on possible value of index
   * @param void
   * @returns void
   */
  public _slide(_symbol: string) {}

  /**
   * Return the current slide index
   * @param void
   * @returns number
   */
  public get getIndex(): number {
    return this._index
  }
}
