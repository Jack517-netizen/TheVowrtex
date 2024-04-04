import {
  ActionManager,
  ExecuteCodeAction,
  Scalar,
  Scene,
} from '@babylonjs/core'

export class PlayerInput {
  public inputMap: any

  // simple movement
  public horizontal: number = 0

  // tracks whether or not there is movement in that axis
  public horizontalAxis: number = 0

  constructor(scene: Scene) {
    scene.actionManager = new ActionManager(scene)

    this.inputMap = {}

    scene.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
        this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == 'keydown'
      }),
    )

    scene.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
        this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == 'keydown'
      }),
    )

    scene.onBeforeRenderObservable.add(() => {
      this._updateFromKeyboard()
    })
  }

  private _updateFromKeyboard(): void {
    if (this.inputMap['ArrowLeft']) {
      this.horizontal = Scalar.Lerp(this.horizontal, -1, 0.2)
      this.horizontalAxis = -1
    } else if (this.inputMap['ArrowRight']) {
      this.horizontal = Scalar.Lerp(this.horizontal, 1, 0.2)
      this.horizontalAxis = 1
    } else {
      this.horizontal = 0
      this.horizontalAxis = 0
    }
  }
}
