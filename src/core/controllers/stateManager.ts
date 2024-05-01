import { Stack } from './../../utils/stack'
import { IGameState } from './../interfaces/state'
import { HomeGameState } from '../scenes/home'
import { Engine, Scene } from '@babylonjs/core'

export class GameStateManager {
  private static _currentStates: Stack<IGameState> = new Stack()

  /**
   * Initialize the game state manager
   * @returns void
   */
  public static async initGame(engine: Engine, scene: Scene): Promise<void> {
    // Get home view instance
    this.pushState(new HomeGameState(engine, scene))
  }

  /**
   * logAllStates print all states in stack
   * @param void
   * @returns void
   */
  public static logAllStates() {
    console.log(this._currentStates)
  }

  /**
   * Get the current state for the game
   * @returns The current state
   */
  public static async getCurrentState(): Promise<IGameState> {
    return this._currentStates.peek()
  }
  
  /**
   * returns true if the current state can be popped
   * @returns Boolean
   */
  public static canBePop(): Boolean {
    return this._currentStates.size() > 1
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
