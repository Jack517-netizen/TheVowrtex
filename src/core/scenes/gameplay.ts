import { Engine, Scene } from '@babylonjs/core'
import { IGameState } from '../interfaces/state'

export class GameplayGameState implements IGameState {
  private _engine: Engine
  private _scene: Scene
  sid: string

  constructor(engine: Engine, scene: Scene) {
    this.sid = 'GamePlay'
    this._engine = engine
    this._scene = scene
  }

  _draw(): void {
    this._drawTerrain()
    this._drawEnemies()
    // Add UI drawing logic here if needed
    console.log('Real time: Draw')
  }

  obscure(): void {
    // Add UI obscuring logic here if needed
    console.log('Real time: Obscuring')
  }

  reveal(): void {
    // Add UI revealing logic here if needed
    console.log('Real time: Revealing')
  }

  enter(): void {
    // Add UI enter logic here if needed
    console.log('Real time: Enter')
  }

  leave(): void {
    // Add UI leaving logic here if needed
    console.log('Real time: Leaving')
  }

  private _updateEnemies(): void {
    // Implement enemy update logic
  }

  private _drawEnemies(): void {
    // Implement enemy drawing logic
  }

  private _drawTerrain(): void {
    // Implement terrain drawing logic
  }
}
