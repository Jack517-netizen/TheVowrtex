import {
  ArcRotateCamera,
  Color4,
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from '@babylonjs/core'
import { IGameState } from '../interfaces/state'
import { GameStateManager } from '../controllers/stateManager'
import { colors } from '../../configs/colors'

export class GameplayGameState implements IGameState {
  private _engine: Engine
  private _scene: Scene
  sid: string

  constructor(engine: Engine, scene: Scene) {
    // init...
    this.sid = 'GamePlay'
    this._engine = engine
    this._scene = scene
  }

  async _listener(): Promise<void> {
    // Add UI drawing logic here if needed
    console.log('Real time: Draw')
  }

  async _build(): Promise<void> {
    this._engine.displayLoadingUI()

    // --this._scene SETUP... --
    this._scene.detachControl()
    this._scene.clearColor = Color4.FromHexString(colors.dark.competitive)
    console.log('GAMEPLAY SCENE')

    // --this._scene FINISHED LOADING--
    await  this._scene.whenReadyAsync()
    this._scene.attachControl()
    this._engine.hideLoadingUI()
  }

  _leave(): void {
    // Add UI leaving logic here if needed
    console.log('Real time: Leaving')
  }
}
