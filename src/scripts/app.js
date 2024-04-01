var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import { Engine, Scene, ArcRotateCamera, Vector3, MeshBuilder, HemisphericLight, Color4, FreeCamera } from '@babylonjs/core';
import { AdvancedDynamicTexture, Button, Control } from '@babylonjs/gui';
var State;
(function (State) {
    State[State["START"] = 0] = "START";
    State[State["GAME"] = 1] = "GAME";
    State[State["LOSE"] = 2] = "LOSE";
    State[State["CUTSCENE"] = 3] = "CUTSCENE";
})(State || (State = {}));
class App {
    constructor() {
        Object.defineProperty(this, "_scene", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_canvas", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_engine", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "_cutScene", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_gamescene", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._canvas = this._createCanvas();
        this._engine = new Engine(this._canvas, true);
        this._scene = new Scene(this._engine);
        window.addEventListener('keydown', (ev) => {
            if (ev.ctrlKey && ev.key === 'i') {
                if (this._scene.debugLayer.isVisible()) {
                    this._scene.debugLayer.hide();
                }
                else {
                    this._scene.debugLayer.show();
                }
            }
        });
        this._main();
    }
    _main() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._goToStart();
            this._engine.runRenderLoop(() => {
                switch (this._state) {
                    case State.START:
                        this._scene.render();
                        break;
                    case State.CUTSCENE:
                        this._scene.render();
                        break;
                    case State.GAME:
                        this._scene.render();
                        break;
                    case State.LOSE:
                        this._scene.render();
                        break;
                    default: break;
                }
            });
            window.addEventListener('resize', () => {
                this._engine.resize();
            });
        });
    }
    _createCanvas() {
        this._canvas = document.createElement('canvas');
        this._canvas.style.width = '100%';
        this._canvas.style.height = '100%';
        this._canvas.style.touchAction = 'none';
        this._canvas.id = 'renderCanvas';
        document.body.appendChild(this._canvas);
        return this._canvas;
    }
    _goToStart() {
        return __awaiter(this, void 0, void 0, function* () {
            this._engine.displayLoadingUI();
            this._scene.detachControl();
            let scene = new Scene(this._engine);
            scene.clearColor = new Color4(0, 0, 0, 1);
            let camera = new FreeCamera("camera1", Vector3.Zero(), scene);
            camera.setTarget(Vector3.Zero());
            const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI("ui");
            guiMenu.idealHeight = 720;
            const startBtn = Button.CreateSimpleButton("start", "START");
            startBtn.width = 0.2;
            startBtn.height = "40px";
            startBtn.color = "white";
            startBtn.top = "-14px";
            startBtn.thickness = 0;
            startBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
            guiMenu.addControl(startBtn);
            startBtn.onPointerDownObservable.add(() => {
                this._goToCutScene();
                scene.detachControl();
            });
            yield scene.whenReadyAsync();
            this._engine.hideLoadingUI();
            this._scene.dispose();
            this._scene = scene;
            this._state = State.START;
        });
    }
    _goToLose() {
        return __awaiter(this, void 0, void 0, function* () {
            this._engine.displayLoadingUI();
            this._scene.detachControl();
            let scene = new Scene(this._engine);
            scene.clearColor = new Color4(0, 0, 0, 1);
            let camera = new FreeCamera("camera1", new Vector3(0, 0, 0), scene);
            camera.setTarget(Vector3.Zero());
            const guiMenu = AdvancedDynamicTexture.CreateFullscreenUI("UI");
            const mainBtn = Button.CreateSimpleButton("mainmenu", "MAIN MENU");
            mainBtn.width = 0.2;
            mainBtn.height = "40px";
            mainBtn.color = "white";
            guiMenu.addControl(mainBtn);
            mainBtn.onPointerUpObservable.add(() => {
                this._goToStart();
            });
            yield scene.whenReadyAsync();
            this._engine.hideLoadingUI();
            this._scene.dispose();
            this._scene = scene;
            this._state = State.LOSE;
        });
    }
    _goToCutScene() {
        return __awaiter(this, void 0, void 0, function* () {
            this._engine.displayLoadingUI();
            this._scene.detachControl();
            this._cutScene = new Scene(this._engine);
            let camera = new FreeCamera("camera1", new Vector3(0, 0, 0), this._cutScene);
            camera.setTarget(Vector3.Zero());
            this._cutScene.clearColor = new Color4(0, 0, 0, 1);
            const cutScene = AdvancedDynamicTexture.CreateFullscreenUI("cutscene");
            yield this._cutScene.whenReadyAsync();
            this._scene.dispose();
            this._state = State.CUTSCENE;
            this._scene = this._cutScene;
            var finishedLoading = false;
            yield this._setUpGame().then(_res => {
                finishedLoading = true;
                this._goToGame();
            });
        });
    }
    _setUpGame() {
        return __awaiter(this, void 0, void 0, function* () {
            let scene = new Scene(this._engine);
            this._gamescene = scene;
        });
    }
    _goToGame() {
        this._scene.detachControl();
        let scene = this._gamescene;
        scene.clearColor = new Color4(0.01568627450980392, 0.01568627450980392, 0.20392156862745098);
        let camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
        camera.setTarget(Vector3.Zero());
        const playerUI = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        scene.detachControl();
        const loseBtn = Button.CreateSimpleButton("lose", "LOSE");
        loseBtn.width = 0.2;
        loseBtn.height = "40px";
        loseBtn.color = "white";
        loseBtn.top = "-14px";
        loseBtn.thickness = 0;
        loseBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
        playerUI.addControl(loseBtn);
        loseBtn.onPointerDownObservable.add(() => {
            this._goToLose();
            scene.detachControl();
        });
        var light1 = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
        var ground = MeshBuilder.CreateGround("ground", { width: 100 }, scene);
        this._scene.dispose();
        this._state = State.GAME;
        this._scene = scene;
        this._engine.hideLoadingUI();
        this._scene.attachControl();
    }
}
export default App;
