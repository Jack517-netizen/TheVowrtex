import IGameScreen from '../interfaces/screen'

export default class ScreenManager {
  private readonly _screens: IGameScreen[] = []

  constructor() {}

  /**
   * Dispose the current instance of ScreenManager and in same time release all screens
   * @param void
   * @returns void
   */
  public dispose(): void {
    this.clearScreens()
  }

  /**
   * Returns the top screen in the stack and at user level, the current screen displayed
   * @param void
   * @returns Nullable<IGameScreen>
   */
  public getTopScreen(): IGameScreen | null {
    return this._screens.length > 0
      ? this._screens[this._screens.length - 1]
      : null
  }

  /**
   * Push new screen in the stack and display it
   * @param nextScreen IGameScreen
   * @returns void
   */
  public pushScreen(nextScreen: IGameScreen): void {
    const _topScreen = this.getTopScreen()
    if (_topScreen !== null) _topScreen.deactivate()

    this._screens.push(nextScreen)
    nextScreen.activate()
  }

  /**
   * Dispose the current screen and go back to previous in the stack
   * @param numberOfScreens number
   * @returns void
   */
  public popScreen(numberOfScreens: number = 1): void {
    if (numberOfScreens < 1) return

    let _topScreen = this.getTopScreen()
    if (_topScreen === null) return
    _topScreen.deactivate()

    while (numberOfScreens > 0) {
      _topScreen = this.getTopScreen()
      if (_topScreen === null) return

      _topScreen.dispose()
      this._screens.pop()
      numberOfScreens--
    }

    _topScreen = this.getTopScreen()
    if (_topScreen === null) return
    _topScreen.activate()
  }

  public clearScreens() {
    this.popScreen(this._screens.length)
  }

  /**
   * logScreens print in debug console all screens in stack
   * @param void
   * @returns void
   */
  public logScreens() {
    console.log(this._screens)
  }

  /**
   * returns true if the current screen can be popped
   * @param void
   * @returns Boolean
   */
  public canBePop(): Boolean {
    return this.getTopScreen() !== null
  }

  /**
   * getScreens return all screens contains in Stack
   * @param void
   * @returns IGameScreen[]
   */
  public getAllStates(): IGameScreen[] {
    return this._screens
  }
}
