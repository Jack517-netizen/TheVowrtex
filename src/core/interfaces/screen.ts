export default interface IGameScreen {
  // Unique id for each screen (Can be use to set a title to screen)
  _screenId: string

  /**
   * Is used to attach all held resource to scene
   * Initialize observables and unfreeze components.
   * @param void
   * @returns void
   */
  activate(): void

  /**
   * Is used to release all held resource attached to scene
   * Based on freeze components function
   * @param void
   * @returns void
   */
  deactivate(): void

  /**
   * Is used to render the matching scene
   * @param void
   * @returns void
   */
  render(): void

  /**
   * Is used to dispose resources. At low-level, it calls the dispose native
   * method on the scene
   * @param void
   * @returns void
   */
  dispose(): void
}
