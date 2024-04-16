export interface IGameState {
  // Mark each state with unique name(SID => State ID)
  sid: string

  /**
   * Paint interfaces
   */
  _draw(): void

  /**
   * Build entire scene for a given state
   */
  _build(): Promise<void>

  /**
   * Dispose resources for current scene
   */
  _leave(): void

  obscure(): void

  reveal(): void
}
