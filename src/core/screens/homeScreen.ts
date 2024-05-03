import { Engine, FreeCamera, Layer, Scene, Vector3 } from '@babylonjs/core'
import '@babylonjs/core/Debug/debugLayer'
import '@babylonjs/inspector'
import IGameScreen from '../interfaces/screen'
import GameAPP from '../app'
import GameModeScreen from './modeScreen'
import { AdvancedDynamicTexture } from '@babylonjs/gui'
import { reaction } from 'mobx'
import { NavBar } from '../components/navbar'
import { AudioManager } from '../controllers/audioManager'
import { UserManager } from '../controllers/userManager'
import { GamePopup } from '../components/popup'
import { FooterBar } from '../components/foobar'

export default class HomeScreen implements IGameScreen {
	private readonly _engine: Engine
	private readonly _scene: Scene
	private readonly _game: GameAPP
	_screenId: string
	private readonly _homeGUI: AdvancedDynamicTexture
  private readonly _audioManager: AudioManager
  private readonly _userManager: UserManager
  private _navBar: NavBar
  private _backgroundLayer: Layer

	constructor(readonly game: GameAPP) {
		this._game = game
		this._engine = game.getEngine
		this._scene = new Scene(this._engine)
		this._screenId = 'home'

		// Attach inspector debug tools
		this._debugGame()

		this._homeGUI = AdvancedDynamicTexture.CreateFullscreenUI('UI')
		this._userManager = new UserManager()

		// ... build ui
    AudioManager.playAudio('neon-fury.ogg')
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
    this._navBar.stop()
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
      '/assets/img/dome1.jpg',
      this._scene,
      true,
    )
    this._homeGUI.addControl(fooBar)
    this._homeGUI.addControl(this._navBar)

    // --this._scene FINISHED LOADING--
    await this._scene.whenReadyAsync()
    this._scene.attachControl()
    this._engine.hideLoadingUI()
  }
}
