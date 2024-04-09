import { Engine, Scene } from '@babylonjs/core'
import '@babylonjs/core/Debug/debugLayer'
import '@babylonjs/inspector'
import { GameStateManager } from './controllers/stateManager'

export class Game {
  private _gameManager: GameStateManager
  private _engine: Engine
  private _scene: Scene

  constructor(canvas: HTMLCanvasElement) {
    this._engine = new Engine(canvas, true)
    this._scene = new Scene(this._engine)

    // Provide core references(Engine, Scene) to children
    this._gameManager = new GameStateManager(this._engine, this._scene)

    window.addEventListener('keydown', (evt) => {
      if(evt.ctrlKey && evt.key === 'i') {
        if(this._scene.debugLayer.isVisible()) {
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
    this._engine.runRenderLoop(() => {
      this.render()
    })
  }

  /**
   * Render method to draw the current game state
   */
  private render(): void {
    this._gameManager.getCurrentState().enter()
  }

  /**
   * Get the game manager instance
   */
  public getGameManager(): GameStateManager {
    return this._gameManager
  }

  /**
   * Get the engine instance
   */
  public getEngine(): Engine {
    return this._engine
  }

  /**
   * Dispose of resources when the game ends
   */
  public dispose(): void {
    this._engine.dispose()
  }
}
