import {
  ArcRotateCamera,
  Camera,
  FollowCamera,
  Mesh,
  Scene,
  ShadowGenerator,
  TransformNode,
  UniversalCamera,
  Vector3,
} from '@babylonjs/core'

export class Player extends TransformNode {
  public camera: UniversalCamera
  private _cameraRoot: TransformNode

  public scene: Scene
  private _input

  // Player
  public mesh: Mesh // outer collisionbox of player

  constructor(assets, scene: Scene, shadowGenerator: ShadowGenerator, input?) {
    super('player', scene)
    this.scene = scene
    this._setupPlayerCamera()

    this.mesh = assets.mesh
    this.mesh.parent = this

    shadowGenerator.addShadowCaster(assets.mesh) // the player mesh will cast shadows
    this._input = input // inputs we will get from inputController.ts
  }

  private _updateFromControls(): void {}

  private _setupPlayerCamera(): UniversalCamera {
    // root camera parent that handles positioning of the camera to follow the player
    this._cameraRoot = new TransformNode('root')
    this._cameraRoot.position = Vector3.Zero() // initialized at (0,0,0)
    // to face the player from behind (180 degrees)
    this._cameraRoot.rotation = new Vector3(0, Math.PI, 0)

    //! rotations along the x-axis (up/down tilting)
    //! let yTilt = new TransformNode("ytilt")
    //! yTilt.rotation = Player.ORIGINAL_TILT

    // our actual camera that's pointing at our root's position
    this.camera = new UniversalCamera(
      'pcam#',
      new Vector3(0, 0, -5),
      this.scene,
    )
    this.camera.lockedTarget = this._cameraRoot.position
    this.camera.parent = this._cameraRoot

    this.scene.activeCamera = this.camera
    return this.camera
  }

  private _updateCamera(): void {
    this._cameraRoot.position = Vector3.Lerp(
      this._cameraRoot.position,
      new Vector3(
        this.mesh.position.x,
        this.mesh.position.y,
        this.mesh.position.z,
      ),
      0.4,
    )
  }
}
