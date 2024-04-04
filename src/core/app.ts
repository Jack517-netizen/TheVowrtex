import '@babylonjs/core/Debug/debugLayer'
import '@babylonjs/inspector'
import {
  Engine,
  Scene,
  Vector3,
  Mesh,
  MeshBuilder,
  HemisphericLight,
  Color4,
  FreeCamera,
  Matrix,
  PointLight,
  Color3,
  ShadowGenerator,
} from '@babylonjs/core'
import { AdvancedDynamicTexture, Button, Control } from '@babylonjs/gui'
import { Environment } from './environment'
import { Player } from './playerController'
import { configs } from '../configs/constants'
import { PlayerInput } from './inputController'

// STATES for Game
enum State {
  START = 0,
  GAME = 1,
  LOSE = 2,
  CUTSCENE = 3,
}

export class App {
  // General Entire Application
  private _scene: Scene
  private _canvas: HTMLCanvasElement
  private _engine: Engine

  // Scene - related (at instant T)
  private _state: number = 0
  private _cutScene: Scene
  private _gamescene: Scene

  // Game State Related
  public assets
  private _environment
  private _player: Player
  private _input: PlayerInput

  constructor() {
    this._canvas = this._createCanvas()

    // initialize babylon scene and engine
    this._engine = new Engine(this._canvas, true)
    this._scene = new Scene(this._engine)

    // hide/show the Inspector
    window.addEventListener('keydown', (ev) => {
      // Ctrl+I
      if (ev.ctrlKey && ev.key === 'i') {
        if (this._scene.debugLayer.isVisible()) {
          this._scene.debugLayer.hide()
        } else {
          this._scene.debugLayer.show()
        }
      }
    })

    // MAIN render loop & state machine
    this._main()
  }

  private async _main(): Promise<void> {
    await this._goToStart()

    // run the main render loop
    this._engine.runRenderLoop(() => {
      switch (this._state) {
        case State.START:
          this._scene.render()
          break
        case State.CUTSCENE:
          this._scene.render()
          break
        case State.GAME:
          this._scene.render()
          break
        case State.LOSE:
          this._scene.render()
          break
        default:
          break
      }
    })

    window.addEventListener('resize', () => {
      this._engine.resize()
    })
  }

  ///* SET UP CANVAS
  private _createCanvas(): HTMLCanvasElement {
    // create the canvas html element and attach it to the webpage
    this._canvas = document.createElement('canvas')
    this._canvas.style.width = '100%'
    this._canvas.style.height = '100%'
    this._canvas.style.touchAction = 'none'
    this._canvas.id = 'renderCanvas'
    document.body.appendChild(this._canvas)

    return this._canvas
  }

  ///* LOAD START SCENE
  private async _goToStart(): Promise<void> {
    // make sure to wait for start to load
    this._engine.displayLoadingUI()

    // don't detect any inputs from this ui while the game is loading
    this._scene.detachControl()
    let scene = new Scene(this._engine)
    scene.clearColor = Color4.FromHexString(configs.clear)
    let camera = new FreeCamera('camera#01', Vector3.Zero(), scene)
    camera.setTarget(Vector3.Zero())

    //TODO: ...do gui related stuff
    // create a fullscreen ui for all of our GUI elements
    const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI('GUI')
    guiMenu.idealHeight = 720 // fit our fullscreen ui to this height

    const startBtn = Button.CreateSimpleButton('start', 'START')
    startBtn.width = 0.2
    startBtn.height = '40px'
    startBtn.color = 'white'
    startBtn.top = '-14px'
    startBtn.thickness = 0
    startBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
    guiMenu.addControl(startBtn)

    // this handles interactions with the start button attached to the scene
    startBtn.onPointerDownObservable.add(() => {
      this._goToCutScene()
      scene.detachControl() //observables disabled
    })

    // --SCENE FINISHED LOADING--
    await scene.whenReadyAsync()
    this._engine.hideLoadingUI()
    // lastly set the current state to the start state and set the scene to the start scene
    this._scene.dispose()
    this._scene = scene
    this._state = State.START
  }

  ///*
  private async _goToLose(): Promise<void> {
    this._engine.displayLoadingUI()

    // --SCENE SETUP--
    this._scene.detachControl()
    let scene = new Scene(this._engine)
    scene.clearColor = Color4.FromHexString(configs.clear)
    let camera = new FreeCamera('camera#01', new Vector3(0, 0, 0), scene)
    camera.setTarget(Vector3.Zero())

    // --GUI--
    const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI('GUI')
    const mainBtn = Button.CreateSimpleButton('mainmenu', 'MAIN MENU')
    mainBtn.width = 0.2
    mainBtn.height = '40px'
    mainBtn.color = 'white'
    guiMenu.addControl(mainBtn)
    // this handles interactions with the start button attached to the scene
    mainBtn.onPointerUpObservable.add(() => {
      this._goToStart()
    })

    // --SCENE FINISHED LOADING--
    await scene.whenReadyAsync()
    this._engine.hideLoadingUI() // when the scene is ready, hide loading
    // lastly set the current state to the lose state and set the scene to the lose scene
    this._scene.dispose()
    this._scene = scene
    this._state = State.LOSE
  }

  ///* SETUP CUTSCENE
  private async _goToCutScene(): Promise<void> {
    this._engine.displayLoadingUI()

    // --SETUP SCENE--
    // dont detect any inputs from this ui while the game is loading
    this._scene.detachControl()
    this._cutScene = new Scene(this._engine)
    let camera = new FreeCamera(
      'camera#01',
      new Vector3(0, 0, 0),
      this._cutScene,
    )
    camera.setTarget(Vector3.Zero())
    this._cutScene.clearColor = Color4.FromHexString(configs.clear)

    // --GUI--
    const cutScene = AdvancedDynamicTexture.CreateFullscreenUI('CUTSCENE')

    //--PROGRESS DIALOGUE--
    const next = Button.CreateSimpleButton('next', 'NEXT')
    next.color = 'white'
    next.thickness = 0
    next.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
    next.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
    next.width = '64px'
    next.height = '64px'
    next.top = '-3%'
    next.left = '-12%'
    cutScene.addControl(next)

    // --WHEN SCENE IS FINISHED LOADING--
    await this._cutScene.whenReadyAsync()
    this._engine.hideLoadingUI()
    this._scene.dispose()
    this._state = State.CUTSCENE
    this._scene = this._cutScene

    next.onPointerUpObservable.add(() => {
      this._goToGame()
    })

    // --START LOADING AND SETTING UP THE GAME DURING THIS SCENE--
    let finishedLoading = false
    await this._setUpGame().then((_res) => {
      finishedLoading = true
    })
  }

  ///* SETUP ENTIRE GAME
  private async _setUpGame() {
    // --CREATE SCENE--
    let scene = new Scene(this._engine)
    this._gamescene = scene

    // --CREATE ENVIRONMENT--
    const environment = new Environment(scene)
    this._environment = environment
    await this._environment.load()

    // ..loaded environment
    await this._loadGameAssets(scene) // player car
  }

  private async _loadGameAssets(scene: Scene) {
    async function loadCharacter() {
      //TODO: Think about built-in mesh
      // collision mesh
      const outer = MeshBuilder.CreateBox(
        'outer',
        { width: 1, height: 1, depth: 3 },
        scene,
      )

      outer.position.y = 0.5
      outer.isVisible = true
      outer.isPickable = false
      outer.checkCollisions = true

      return {
        mesh: outer as Mesh,
      }
    }

    return loadCharacter().then((assets) => {
      this.assets = assets
    })
  }

  ///* Initialize the game
  private async _initializeGameAsync(scene): Promise<void> {
    // temporary light to light the entire scene
    let light0 = new HemisphericLight('HemiLight', new Vector3(0, 1, 0), scene)

    const light = new PointLight('sparklight', new Vector3(0, 0, 0), scene)
    light.diffuse = new Color3(
      0.08627450980392157,
      0.10980392156862745,
      0.15294117647058825,
    )
    light.intensity = 35
    light.radius = 1

    const shadowGenerator = new ShadowGenerator(1024, light)
    shadowGenerator.darkness = 0.4

    // --INPUT--
    this._input = new PlayerInput(scene) // detect keyboard/mobile inputs

    this._player = new Player(this.assets, scene, shadowGenerator, this._input) // dont have inputs yet so we dont need to pass it in
  }

  ///* SETUP GAME SCENE
  private async _goToGame() {
    // --SETUP SCENE--
    this._scene.detachControl()
    let scene = this._gamescene

    // a color that fit the overall color scheme better
    scene.clearColor = Color4.FromHexString(configs.primary)

    // --GUI--
    const playerUI = AdvancedDynamicTexture.CreateFullscreenUI('UI')
    scene.detachControl()

    const loseBtn = Button.CreateSimpleButton('lose', 'LOSE')
    loseBtn.width = 0.2
    loseBtn.height = '40px'
    loseBtn.color = 'white'
    loseBtn.top = '-14px'
    loseBtn.thickness = 0
    loseBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
    playerUI.addControl(loseBtn)

    // this handles interactions with the lose button attached to the scene
    loseBtn.onPointerDownObservable.add(() => {
      this._goToLose()
      scene.detachControl() //observables disabled
    })

    // primitive character and setting
    await this._initializeGameAsync(scene)

    await scene.whenReadyAsync()
    // get rid of start scene, switch to gamescene and change states
    this._scene.dispose()
    this._state = State.GAME
    this._scene = scene
    this._engine.hideLoadingUI()

    // the game is ready, attach control back
    this._scene.attachControl()
  }
}
