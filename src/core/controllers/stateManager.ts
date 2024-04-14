import { Stack } from './../../utils/stack'
import { IGameState } from './../interfaces/state'
import { HomeGameState } from '../scenes/home'
import { AssetContainer, Engine, Scene } from '@babylonjs/core'

export class GameStateManager {
  private static _engine: Engine
  private static _scene: Scene
  private static _assetContainer: AssetContainer
  private static _currentStates: Stack<IGameState> = new Stack()

  /**
   * Initialize the game state manager
   * @returns void
   */
  public static init(engine: Engine, scene: Scene): void {
    this._engine = engine
    this._scene = scene

    this._assetContainer = new AssetContainer(this._scene)
    this.pushState(new HomeGameState(this._engine, this._scene))
  }

  /**
   * Get the current state for the game
   * @returns The current state
   */
  public static async getCurrentState(): Promise<IGameState> {
    return this._currentStates.peek()
  }

  /**
   * Get the current AssetContainer for the game
   * @returns The global assets container
   */
  public static getAssetContainer(): AssetContainer {
    return this._assetContainer
  }

  /**
   * returns true if the current state can be popped
   * @returns Boolean
   */
  public static canBePop(): Boolean {
    return !this._currentStates.isEmpty()
  }

  /**
   * Pop the current state from the stack and call its leaving method
   * @returns The popped state, or undefined if there's no previous state
   */
  public static popState() {
    this._currentStates.pop()
  }

  /**
   * Push a new state onto the stack and call its entering method
   * @param nextState The state to push
   */
  public static pushState(nextState: IGameState) {
    this._currentStates.push(nextState)
  }

  /**
   * Removes all states from the stack. Resetting the state stack or
   * cleaning up resources when exiting the application
   * @returns void
   */
  public static clearState(): void {
    const currentState = this._currentStates.clear()
  }

  /**
   * Show another game state is stacked on top of this one
   */
  public show() {
    // Add implementation if needed
  }

  /**
   * Hide another game state which stacked on top of this one
   */
  public hide() {
    // Add implementation if needed
  }
}
