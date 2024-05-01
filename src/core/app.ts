import { Engine, Scene } from '@babylonjs/core'
import '@babylonjs/core/Debug/debugLayer'
import '@babylonjs/inspector'
import { GameStateManager } from './controllers/stateManager'
import { AudioManager } from './controllers/audioManager'

export class Game {
  private _engine: Engine
  private _scene: Scene

  constructor(canvas: HTMLCanvasElement) {
    this._engine = new Engine(canvas, true)
    this._scene = new Scene(this._engine)

    // Provide core references(Engine, Scene) to children
    GameStateManager.initGame(this._engine, this._scene)

    // Load inspector layer
    this._loadInspector()

    // Get status/update at top of app
    this._listener()
  }

  private _listener() {
    // Game app gained focus
    window.addEventListener('focus', () => {
      AudioManager.resumeAllSongs()
    })

    // Game app losts focus
    window.addEventListener('blur', () => {
      AudioManager.freezeAllSongs()
    })
  }

  // Load debug tools
  private _loadInspector() {
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

  /**
   * Initialize the game by running the render loop
   */
  public init(): void {
    // Resizing event
    window.addEventListener('resize', () => this._engine.resize())
    this._engine.runRenderLoop(() => {
      this._scene.render()
    })
  }

  /**
   * Dispose of resources when the game ends
   */
  public dispose(): void {
    this._engine.dispose()
  }
}
