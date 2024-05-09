import { Engine, Scene } from '@babylonjs/core'
import IGameScreen from '../interfaces/screen'
import GameAPP from '../app'
import { UserManager } from '../controllers/userManager'
import { NavBar } from '../components/navbar'
import { AudioManager } from '../controllers/audioManager'

export class BaseScreen implements IGameScreen {
  protected readonly _engine: Engine
  protected readonly _scene: Scene
  protected readonly _game: GameAPP
  protected readonly _userManager: UserManager
  protected _navBar: NavBar
  _screenId: string

  constructor(
    private readonly app: GameAPP,
    sid: string,
  ) {
    this._game = app
    this._engine = app.getEngine
    this._scene = new Scene(this._engine)
    this._screenId = sid
    this._userManager = new UserManager()
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
  }

  deactivate(): void {
    this._engine.onResizeObservable.removeCallback(this._resize, this)
    this._scene.detachControl()
    AudioManager.disposeAllSongs()
  }

  render(): void {
    this._scene.render()
  }

  dispose(): void {
    AudioManager.disposeAllSongs()
    this._scene.dispose()
  }

  private _resize() {}
}
