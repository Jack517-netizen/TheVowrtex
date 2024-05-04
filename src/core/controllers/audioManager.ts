import { IAudioLayer } from '../interfaces/audio'
import { GameAudio } from '../../entities/audio'
import { AudioType } from '../enums/audio'

export class AudioManager implements IAudioLayer {
  private static _instances: GameAudio[] = []

  /**
   * Play a given audio
   * @param url the root url of the audio track
   * @returns void
   */
  public static playAudio(url: string): void {
    const _gameMusic = new GameAudio(url, AudioType.MUSIC)
    this._instances.push(_gameMusic)
  }

  /**
   * Play an audio in short given time
   * @param url the root url of the audio track
   * @returns void
   */
  public static playInstantAudio(url: string): void {
    const _gameSFX = new GameAudio(url, AudioType.SFX)
    this._instances.push(_gameSFX)
  }

  /**
   * Get the number of
   * all audio tracks managed by audioManager
   * @param void
   * @returns number
   */
  public static getNumberOfTracks(): number {
    return this._instances.length
  }

  /**
   * Unload ressources
   * associated to audio track
   * @param void
   * @returns void
   */
  public static disposeAllSongs(): void {
    this._instances.forEach((audioTrack) => {
      audioTrack.dispose()
    })
    this._instances = []
  }

  /**
   * Freeze every audio track playing in background
   * @param void
   * @returns void
   */
  public static freezeAllSongs(): void {
    this._instances.forEach((audioTrack) => {
      if (audioTrack.isPlaying) {
        audioTrack.pause()
      }
    })
  }

  /**
   * Resume every audio track playing in background
   * @param void
   * @returns void
   */
  public static resumeAllSongs(): void {
    this._instances.forEach((audioTrack) => {
      if (audioTrack.isPaused) {
        audioTrack.play()
      }
    })
  }
}
