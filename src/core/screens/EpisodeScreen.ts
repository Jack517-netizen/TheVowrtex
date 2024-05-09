import { Engine, FreeCamera, Layer, Scene, Vector3 } from '@babylonjs/core'
import '@babylonjs/core/Debug/debugLayer'
import '@babylonjs/inspector'
import IGameScreen from '../interfaces/screen'
import GameAPP from '../app'
import {
  AdvancedDynamicTexture,
  Button,
  Container,
  Control,
  Grid,
  Image,
  TextBlock,
} from '@babylonjs/gui'
import { action, computed, makeObservable, observable, reaction } from 'mobx'
import { NavBar } from '../components/navbar'
import { AudioManager } from '../controllers/audioManager'
import { colors } from '../../configs/colors'
import { styles } from '../../configs/styles'
import { GameOverlay } from '../components/overlay'
import { episodes } from '../../data/episodes'
import { GamePopup } from '../components/popup'
import { EpisodeDetailsMenu } from '../menus/episodeDetailsMenu'
import { BaseScreen } from './BaseScreen'

export default class EpisodeScreen extends BaseScreen implements IGameScreen {
  private readonly _gameEpisodeGUI: AdvancedDynamicTexture
  private _navBar: NavBar
  _index: number = 1

  constructor(private readonly _app: GameAPP) {
    super(_app, 'game mode')
    makeObservable(this, {
      _index: observable,
      getIndex: computed,
      _slide: action,
    })
    this._gameEpisodeGUI = AdvancedDynamicTexture.CreateFullscreenUI('UI')

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
    let camera = new FreeCamera('episodeCamera', Vector3.Zero(), this._scene)
    this._navBar = new NavBar(
      this._game,
      this._gameEpisodeGUI,
      this._userManager,
      this._screenId,
    )

    let episodesGrid = new Grid('episodesGrid')
    episodesGrid.paddingTop = '10%'
    episodesGrid.width = '99%'
    episodesGrid.height = '90%'

    for (let i = 1; i <= episodes.length / 5; i++) {
      episodesGrid.addRowDefinition(0.5)
      for (let j = 1; j <= episodes.length / 2; j++) {
        const element = episodes[i * j - 1]
        const episodeComponent = this._buildEpisodeComponent(element)
        episodesGrid.addColumnDefinition(253, true)
        episodesGrid.addControl(episodeComponent, i - 1, j - 1)
      }
    }

    const _backgroundLayer = new Layer(
      'episodeLayer',
      '/assets/img/banner.jpg',
      this._scene,
      true,
    )

    this._gameEpisodeGUI.addControl(episodesGrid)
    this._gameEpisodeGUI.addControl(this._navBar)
    this._gameEpisodeGUI.addControl(
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
   * Load episode details menu
   * @param id string
   * @returns void
   */
  private _loadEpisodeDetails(id: string): void {
    this._gameEpisodeGUI.addControl(
      GamePopup.showMenu(new EpisodeDetailsMenu(id)),
    )
  }

  /**
   * Return the current slide index
   * @param void
   * @returns number
   */
  public get getIndex(): number {
    return this._index
  }

  private _buildEpisodeComponent(element: {
    id: number
    title: string
    description: string
    url: string
    isLocked: boolean
  }) {
    const component = new Container('episode' + element.id)
    component.width = '100%'
    component.height = '99%'
    component.paddingLeft = '5px'

    let episodeTitle = new TextBlock(
      'episodeTextBlock' + element.id,
      element.title,
    )
    episodeTitle.fontSize = styles.headline3
    episodeTitle.fontWeight = '600'
    episodeTitle.color = colors.white.normal
    episodeTitle.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
    episodeTitle.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER
    let episodeImage = new Image('episodeImage' + element.id, element.url)
    episodeImage.width = '100%'
    episodeImage.height = '100%'

    component.addControl(episodeImage)
    component.addControl(episodeTitle)
    if (element.isLocked) {
      let lockBlock = Button.CreateImageOnlyButton(
        'lockBlockImg',
        `/assets/icons/lock.png`,
      )
      lockBlock.background = colors.dark.competitive
      lockBlock.alpha = 0.9
      lockBlock.width = '100%'
      lockBlock.height = '100%'
      if (lockBlock.image) lockBlock.image.width = '90px'
      if (lockBlock.image) lockBlock.image.height = '90px'
      if (lockBlock.image) {
        lockBlock.image.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
        lockBlock.image.horizontalAlignment =
          Control.HORIZONTAL_ALIGNMENT_CENTER
      }
      lockBlock.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
      lockBlock.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER
      component.addControl(lockBlock)
    } else {
      component.onPointerClickObservable.add(() => {
        this._loadEpisodeDetails(element.id.toString())
      })
    }

    return component
  }
}
