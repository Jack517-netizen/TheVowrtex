import { Color4, Engine, Scene } from '@babylonjs/core'
import IGameScreen from '../interfaces/screen'
import GameAPP from '../app'
import GameModeScreen from './modeScreen'

export default class HomeScreen implements IGameScreen {
	private readonly _engine: Engine
	private readonly _scene: Scene
	private readonly _game: GameAPP
	_screenId: string

	constructor(readonly game: GameAPP) {
		this._game = game
		this._engine = game.getEngine
		this._scene = new Scene(this._engine)
		this._screenId = 'home'

		//TODO: ...Setup scene...
		this._scene.clearColor = Color4.FromHexString('#007A56')

		// Attach inspector debug tools
		this._debugGame()
	}

	/**
	 * For debug purpose using inspector layer
	 * @param void
	 * @return void
	 */
	private _debugGame(): void {
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

	activate(): void {
		this._scene.attachControl()
		this._engine.onResizeObservable.add(this._resize, undefined, undefined, this)
		this._resize()
	}

	deactivate(): void {
		//* this.debugLayerManager.hide()
		this._engine.onResizeObservable.removeCallback(this._resize, this)
		this._scene.detachControl()
	}

	render(): void {
		this._scene.render()
	}

	dispose(): void {
		this._scene.dispose()	
	}

	private _resize() {}

	private pushSecondScreen() {
		this._game.getScreenManager.pushScreen(new GameModeScreen(this._game))
	}
}
