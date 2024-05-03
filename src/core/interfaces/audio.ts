export interface IAudioLayer {
  /**
   * Play a given sound based on name provided
   */
  playAudio(name: string): void

  /**
   * Pause a given sound based on name provided
   */
  pauseAudio(name: string): void
}
