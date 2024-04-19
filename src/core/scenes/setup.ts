import { Engine, Scene } from '@babylonjs/core'
import { IGameState } from '../interfaces/state'
import { GameStateManager } from '../controllers/stateManager'
import { AudioManager } from '../controllers/audioManager'

export class SetupGameState implements IGameState {
  private _engine: Engine
  private _scene: Scene
  sid: string
  private _audioManager: AudioManager

  constructor(engine: Engine, scene: Scene) {
    // init...
    this.sid = 'Setup'
    this._engine = engine
    this._scene = scene
    this._audioManager = new AudioManager()

    // ...build
    this._build()
  }

  _listener(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async _build(): Promise<void> {
    this._engine.displayLoadingUI()
    GameStateManager.getAssetContainer().addAllToScene()

    this._audioManager.playSound('neon-fury.ogg')

    // --this._scene FINISHED LOADING--
    await this._scene.whenReadyAsync()
    this._scene.attachControl()
    this._engine.hideLoadingUI()
  }

  _leave(): void {
    throw new Error('Method not implemented.')
  }
}
