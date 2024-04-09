import { Stack } from './../../utils/stack'
import { IGameState } from './../interfaces/state'
import { HomeGameState } from '../scenes/home'
import { GameplayGameState } from '../scenes/gameplay'
import { Engine, Scene } from '@babylonjs/core'

export class GameStateManager {
  private _currentStates: Stack<IGameState>
  private _engine: Engine
  private _scene: Scene

  constructor(engine: Engine, scene: Scene) {
    this._currentStates = new Stack()
    this._engine = engine
    this._scene = scene
  }

  /**
   * !Switch between available states based on the provided state
   * !@param state The state to switch to
   */
  public static switchState(state: IGameState) {
    switch (state.constructor) {
      case HomeGameState:
        console.log('Entering menu state')
        break
      case GameplayGameState:
        console.log('Entering gameplay state')
        break
      default:
        console.log('Unknown game state')
        break
    }
  }

  /**
   * Get the current state for the game
   * @returns The current state
   */
  public getCurrentState(): IGameState {
    return this._currentStates.peek() || new HomeGameState(this._engine, this._scene)
  }

  /**
   * Pop the current state from the stack and call its leaving method
   * @returns The popped state, or undefined if there's no previous state
   */
  public popState(): IGameState | undefined {
    const currentState = this._currentStates.pop()
    if (currentState) {
      currentState.leave()
    }
    return currentState
  }

  /**
   * Push a new state onto the stack and call its entering method
   * @param nextState The state to push
   */
  public pushState(nextState: IGameState) {
    this._currentStates.push(nextState)
    nextState.enter()
  }

  /**
   * Removes all states from the stack. Resetting the state stack or
   * cleaning up resources when exiting the application
   * @returns void
   */
  public clearState(): void {
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
