import { Engine, Scene } from "@babylonjs/core";
import { IGameState } from "../interfaces/state";

export class SetupGameState implements IGameState {
    private _engine: Engine
    private _scene: Scene
    sid: string

    constructor(engine: Engine, scene: Scene) {
        // init...
        this.sid = 'Setup'
        this._engine = engine
        this._scene = scene

        // ...build
        this._build()
    }

    _draw(): void {
        throw new Error("Method not implemented.");
    }

    _build(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    _leave(): void {
        throw new Error("Method not implemented.");
    }
    
    obscure(): void {
        throw new Error("Method not implemented.");
    }
    
    reveal(): void {
        throw new Error("Method not implemented.");
    }
    
}