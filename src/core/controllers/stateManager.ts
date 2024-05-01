import { Stack } from './../../utils/stack'
import { IGameState } from './../interfaces/state'
import { HomeGameState } from '../scenes/home'
import { AssetContainer, Engine, Scene } from '@babylonjs/core'

export class GameStateManager {
  private static _states: Stack<IGameState> = new Stack()

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
    console.log(this._states)
  }

  /**
   * Get the current state for the game
   * @returns The current state
   */
  public static async getCurrentState(): Promise<IGameState> {
    return this._states.peek()
  }
  
  /**
   * returns true if the current state can be popped
   * @returns Boolean
   * ! Why Greater than 0 and not 1 ???
   */
  public static canBePop(): Boolean {
    return GameStateManager._states.size() > 0
  }

  /**
   * Pop the current state from the stack and call its leaving method
   * @returns The popped state, or undefined if there's no previous state
   */
  public static popState(state: IGameState) {
    this._states.pop()
    this._states[this._states.size() - 1] = state
  }

  /**
   * getAllStates return all game states contains in Stack
   * @param void
   * @returns void
   */
  public static getAllStates(): Stack<IGameState> {
    return this._states
  }

  /**
   * Push a new state onto the stack and call its entering method
   * @param nextState The state to push
   */
  public static pushState(nextState: IGameState) {
    this._states.push(nextState)
  }

  /**
   * Removes all states from the stack. Resetting the state stack or
   * cleaning up resources when exiting the application
   * @returns void
   */
  public static clearState(): void {
    this._states.clear()
  }

}
