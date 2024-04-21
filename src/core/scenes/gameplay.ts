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
import { AdvancedDynamicTexture, Control, StackPanel } from '@babylonjs/gui'
import { GameButton } from '../components/buttons'
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

    // ...build
    this._build()
  }

  async _listener(): Promise<void> {
    // Add UI drawing logic here if needed
    console.log('Real time: Draw')
  }

  async _build(): Promise<void> {
    GameStateManager.getAssetContainer().addAllToScene()
  }

  _leave(): void {
    // Add UI leaving logic here if needed
    console.log('Real time: Leaving')
  }
}
