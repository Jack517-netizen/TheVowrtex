import { MeshBuilder, Scene, Vector3 } from '@babylonjs/core'

export class Environment {
  private _scene: Scene

  constructor(scene: Scene) {
    this._scene = scene
  }

  /**
   * Load assets and build the game world
   */
  public async load() {
    let ground = MeshBuilder.CreateGround(
      'ground',
      { width: 90, height: 90 },
      this._scene,
    )
  }
}
