import { Engine } from '@babylonjs/core'
import ScreenManager from './controllers/screenManager'
import HomeScreen from './screens/homeScreen'
import { AudioManager } from './controllers/audioManager'

export default class GameAPP {
  private readonly _engine: Engine
  private readonly _screenManager: ScreenManager
  private _isDisposed: boolean = false
  private readonly resizeHandler: VoidFunction = () => this._resize()
  private readonly renderHandler: VoidFunction = () => this._render()

  constructor(readonly canvasElement: HTMLCanvasElement) {
    this._engine = new Engine(canvasElement, true)
    this._load()
  }

  /**
   * Quit game method which release everything to avoid memory leak
   * @param void
   * @returns void
   */
  private _dispose(): void {
    this._isDisposed = true
    this.stop()
    this._screenManager.dispose()
    this._engine.dispose()
  }

  /**
   * Load game applicationand initialize all components
   * @param void
   * @returns Promise<void>
   */
  private async _load(): Promise<void> {
    //TODO: ...Load stuff...
    // Game app gained focus
    window.addEventListener('focus', () => {
      AudioManager.resumeAllSongs()
    })

    // Game app losts focus
    window.addEventListener('blur', () => {
      AudioManager.freezeAllSongs()
    })

    // Go to HomeScreen
    this._screenManager.pushScreen(new HomeScreen(this))
  }

  /**
   * Run app game method
   * @param void
   * @returns void
   */
  public run(): void {
    window.addEventListener('resize', this.resizeHandler)
    this._engine.runRenderLoop(this.renderHandler)
  }

  /**
   * Exit app game method
   * @param void
   * @returns void
   */
  public stop(): void {
    window.removeEventListener('resize', this.resizeHandler)
    this._engine.stopRenderLoop(this.renderHandler)
  }

  /**
   * Resizing event method
   * @param void
   * @returns void
   */
  private _resize(): void {
    this._engine.resize()
  }

  /**
   * Render the matched scene to corresponding screen
   * @param void
   * @returns void
   */
  private _render(): void {
    const _currentScreen = this._screenManager.getTopScreen()
    if (_currentScreen === null) return

    _currentScreen.render()
  }

	/**
	 * getEngine returns the root engine instance created by GameAPP
	 * @param void
	 * @returns Engine
	 */
	public get getEngine(): Engine {
		return this._engine
	}

	/**
	 * getScreenManager returns the root screenManager instance created by GameAPP
	 * @param void
	 * @returns ScreenManager
	 */
	public get getScreenManager(): ScreenManager {
		return this._screenManager
	}
}
