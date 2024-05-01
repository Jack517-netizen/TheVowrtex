import { Scene } from "@babylonjs/core"

export interface IGameState {
  // Mark each state with unique name(SID => State ID)
  sid: string

  /**
   * Attach listener to scene
   */
  _listener(): Promise<void>

  /**
   * Build entire scene for a given state
   */
  _build(): Promise<void>

  /**
   * Dispose resources for current scene
   */
  _leave(): void
}
