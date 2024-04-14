import {
  ArcRotateCamera,
  Color4,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Sound,
  Vector3,
  VideoDome,
  StandardMaterial,
  CubeTexture,
  Texture,
  Color3,
  Layer,
} from '@babylonjs/core'
import { IGameState } from '../interfaces/state'
import { colors } from '../../configs/colors'
import {
  AdvancedDynamicTexture,
  Control,
  StackPanel,
} from '@babylonjs/gui'
import { GameStateManager } from '../controllers/stateManager'
import { GameplayGameState } from './gameplay'
import { GameButton } from '../components/buttons'
import { FirebaseOAuth } from '../../api/firebase/authentication'
import { GameUser } from '../../entities/user'

export class HomeGameState implements IGameState {
  private _engine: Engine
  private _scene: Scene
  sid: string

  constructor(engine: Engine, scene: Scene) {
    // init...
    this.sid = 'Home'
    this._engine = engine
    this._scene = scene

    // ...build
    this._build()
  }

  async _draw(): Promise<void> {
    console.log('Real time: Drawing.')
  }

  obscure(): void {
    console.log('Real time: Obscuring.')
  }

  reveal(): void {
    console.log('Real time: Revealing.')
  }

  async _build(): Promise<void> {
    this._engine.displayLoadingUI()

    // --this._scene SETUP--
    this._scene.detachControl()
    // this._this._scene.clearColor = Color4.FromHexString(colors.dark.normal)
    let camera = new ArcRotateCamera("camera1", Math.PI / 2, -Math.PI / 2.5, 10, new Vector3(0, 0, 0), this._scene)
    GameStateManager.getAssetContainer().cameras.push(camera)
  
    // -- GUI SETUP --
    let homeGUI = AdvancedDynamicTexture.CreateFullscreenUI('UI')

    let navBar = new StackPanel('navigationBar')
    navBar.isVertical = false
    navBar.height = 0.07
    navBar.top = 0.02
    navBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP
    navBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER
    let loginBtn = buildUserBtn()
    let texBtn = GameButton.createHeaderButton('texButton', 'TEX')
    let tokenBtn = GameButton.createHeaderButton('tokenButton', 'TOKEN')
    let starBtn = GameButton.createHeaderButton('starButton', 'STAR')
    let garageBtn = GameButton.createHeaderButton('garageButton', 'GARAGE')
    let settingsBtn = GameButton.createHeaderButton(
      'settingsButton',
      'SETTINGS'
    )
    let arcturusBtn = GameButton.createHeaderButton('youButton', 'ARCTURUS')
    navBar.addControl(loginBtn)
    navBar.addControl(texBtn)
    navBar.addControl(tokenBtn)
    navBar.addControl(starBtn)
    navBar.addControl(garageBtn)
    navBar.addControl(settingsBtn)
    navBar.addControl(arcturusBtn)

    let footerBar = new StackPanel('navigationBar')
    footerBar.isVertical = false
    footerBar.height = 0.2
    footerBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
    footerBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
    let leaderBtn = GameButton.createFooterButton('leaderButton', 'LEADERBOARD')
    leaderBtn.background = colors.yellow.inclusive
    let playBtn = GameButton.createFooterButton('playButton', 'PLAY')
    playBtn.onPointerDownObservable.add(() => {
      this._leave()
      GameStateManager.pushState(
        new GameplayGameState(this._engine, this._scene),
      )
    })
    footerBar.addControl(leaderBtn)
    footerBar.addControl(playBtn)

    homeGUI.addControl(navBar)
    homeGUI.addControl(footerBar)
   
    let layers = ['/assets/img/dome1.jpg', '/assets/img/dome3.jpg']
    let backgroundLayer = new Layer('homeLayer', layers[0], this._scene, true)
    
    let i = 0
    setInterval(() => {
      if(i % 2 == 0) {
        backgroundLayer = new Layer('homeLayer', layers[0], this._scene, true)
      } else if (i % 2 == 1) {
        backgroundLayer = new Layer('homeLayer', layers[1], this._scene, true)
      }
      i++
    }, 5500)

    let song = new Sound('start', '/assets/sounds/ncs-janji-heroes.ogg', this._scene, () => {}, {
      autoplay: true,
      spatialSound: true
    })

    // --this._scene FINISHED LOADING--
    await this._scene.whenReadyAsync()
    this._scene.attachControl()
    this._engine.hideLoadingUI()
  }

  _leave(): void {
    GameStateManager.getAssetContainer().moveAllFromScene()
  }

}

// Build user btn based on auth state
function buildUserBtn() {
  if(GameUser.getUid() != '') {
    let youBtn = GameButton.createHeaderButton('youButton', 'YOU')
    youBtn.onPointerClickObservable.add(() => {
      //TODO: Show user profile details in POPUP
      buildUserBtn()
    })
    return youBtn
  } else {
    let loginBtn = GameButton.createHeaderButton('loginButton', 'LOGIN')
    loginBtn.onPointerClickObservable.add(() => {
      FirebaseOAuth.login()
      buildUserBtn()
    })
    
    return loginBtn
  }
}

