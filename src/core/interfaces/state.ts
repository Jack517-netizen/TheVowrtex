import { Engine, Scene } from "@babylonjs/core"

export interface IGameState {
  // Mark each state with unique name(SID => State ID)
  sid: string

  /**
   * Paint interfaces
  */
  _draw(): void
  
  /**
   * Load resources
   */
  enter(): void

  /**
   * Dispose resources
  */
  leave(): void

  obscure(): void

  reveal(): void
}
