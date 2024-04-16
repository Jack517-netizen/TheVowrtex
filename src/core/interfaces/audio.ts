export interface IAudioLayer {
  /**
   * Play a given sound based on url provided
   */
  playSound(url: string): void

  /**
   * Pause a given sound
   */
  pauseSound(): void
}
