import { Engine } from '@babylonjs/core'
import ScreenManager from './controllers/screenManager'
import HomeScreen from './screens/homeScreen'
import { AudioManager } from './controllers/audioManager'

export default class GameAPP {
  private readonly _engine: Engine
  private readonly _screenManager: ScreenManager = new ScreenManager()
  private _isDisposed: boolean = false
  private readonly resizeHandler: VoidFunction = () => this._resize()
  private readonly renderHandler: VoidFunction = () => this._render()
  private readonly focusHandler: VoidFunction = () => this._checkFocus()
  private readonly blurHandler: VoidFunction = () => this._checkBlur()

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
   * Load game application and initialize all components
   * @param void
   * @returns Promise<void>
   */
  private async _load(): Promise<void> {
    // Go to HomeScreen
    if(window.innerWidth > window.innerHeight) this._screenManager.pushScreen(
      new HomeScreen(this)
    )
  }

  /**
   * Run app game method
   * @param void
   * @returns void
   */
  public run(): void {
    window.addEventListener('resize', this.resizeHandler)
    window.addEventListener('focus', this.focusHandler)
    window.addEventListener('blur', this.blurHandler)
    this._engine.runRenderLoop(this.renderHandler)
  }

  /**
   * Exit app game method
   * @param void
   * @returns void
   */
  public stop(): void {
    window.removeEventListener('resize', this.resizeHandler)
    window.removeEventListener('focus', this.focusHandler)
    window.removeEventListener('blur', this.blurHandler)
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
    if(window.innerWidth < window.innerHeight) {
      return alert(
        'For better and immersive experience, please use landscape orientation or rotate your device.')
    } else {
      const _currentScreen = this._screenManager.getTopScreen
      if (_currentScreen === null) return
      _currentScreen.render()
    }
  }
  /**
   * Check if GAME is using by the player
   * @param void
   * @returns void
   */
  private _checkFocus(): void {
    // Game app gained focus
    window.addEventListener('focus', () => {
      console.log('focus')
      AudioManager.resumeAllSongs()
    })
  }

  /**
   * Check if GAME is in background
   * @param void
   * @returns void
   */
  private _checkBlur(): void {
    // Game app losts focus
    window.addEventListener('blur', () => {
      console.log('blur')
      AudioManager.freezeAllSongs()
    })
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
