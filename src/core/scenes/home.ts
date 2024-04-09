import { Color4, Engine, FreeCamera, Scene, Vector3 } from '@babylonjs/core'
import { IGameState } from '../interfaces/state'
import { configs } from '../../configs/constants'
import { AdvancedDynamicTexture, Button, Control } from '@babylonjs/gui/2D'
import { GameStateManager } from '../controllers/stateManager'
import { GameplayGameState } from './gameplay'

export class HomeGameState implements IGameState {
  private _engine: Engine
  private _scene: Scene
  sid: string

  constructor(engine: Engine, scene: Scene) {
    this.sid = 'Home'
    this._engine = engine
    this._scene = scene
  }

  async _draw(): Promise<void> {
    this._engine.displayLoadingUI()

    // --scene setup--
    this._scene.detachControl()
    let scene = new Scene(this._engine)
    scene.clearColor = Color4.FromHexString(configs.clear)
    let camera = new FreeCamera('camera#01', Vector3.Zero(), scene)
    camera.setTarget(Vector3.Zero())

    // --build gui--
    const guiHome = AdvancedDynamicTexture.CreateFullscreenUI('UI')
    const playBtn = Button.CreateSimpleButton('playbtn', 'PLAY')
    playBtn.width = 0.4
    playBtn.height = '40px'
    playBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
    playBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
    playBtn.color = configs.primary
    guiHome.addControl(playBtn)
    playBtn.onPointerDownObservable.add(() => {
      GameStateManager.switchState(new GameplayGameState(this._engine, this._scene))
      scene.detachControl()
    })

    // --scene finished loading--
    await scene.whenReadyAsync()
    this._engine.hideLoadingUI()
    this._scene.dispose()
    this._scene = scene
  }

  obscure(): void {
    console.log('Real time: Obscuring.')
  }

  reveal(): void {
    console.log('Real time: Revealing.')
  }

  enter(): void {
    this._draw()
  }

  leave(): void {
    console.log('Real time: Leaving.')
  }

  private _drawLogo(): void {}
}
