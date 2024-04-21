import { IAudioLayer } from '../interfaces/audio'
import { GameAudio } from '../../entities/audio'
import { AudioType } from '../enums/audio'

export class AudioManager implements IAudioLayer {
  private _gameAudio: GameAudio
  private static _instances: Array<GameAudio> = new Array()

  /**
   * Play a given sound
   * @param url the root url of the audio track
   * @returns void
   */
  public playSound(url: string): void {
    this._gameAudio = new GameAudio(url, AudioType.MUSIC)
    AudioManager._instances.push(this._gameAudio)
  }

  /**
   * Play a sound in short given time
   * @param url the root url of the audio track
   * @returns void
   */
  public static playInstantSound(url: string): void {
    let _instantSound = new GameAudio(url, AudioType.MUSIC)
    AudioManager._instances.push(_instantSound)
  }

  /**
   * Pause a given sound
   * @param void
   * @returns void
   */
  public pauseSound(): void {
    this._gameAudio.pause()
  }

  /**
   * Get the current audio track
   * @param void
   * @returns GameAudio
   */
  public getCurrentAudio(): GameAudio {
    return this._gameAudio
  }

  /**
   * Re-define new audio track to manage
   * ...Useful to change the environment audio based on user position
   * for example...
   * @param GameAudio
   * @returns void
   */
  public setNewTrack(newGameAudio: GameAudio): void {
    this._gameAudio = newGameAudio
  }

  /**
   * Get the number of
   * all audio tracks managed by audioManager
   * @param void
   * @returns number
   */
  public static getNumberOfTracks(): number {
    return AudioManager._instances.length
  }

  /**
   * Unload ressources
   * associated to audio track
   * @param void
   * @returns void
   */
  public static disposeAllSongs(): void {
    AudioManager._instances.forEach((audioTrack) => {
      audioTrack.dispose()
    })
  }

  /**
   * Freeze every audio track
   * playing in background
   * @param void
   * @returns void
   */
  public static freezeAllSongs(): void {
    AudioManager._instances.forEach((audioTrack) => {
      if (audioTrack.isPlaying) {
        audioTrack.pause()
      }
    })
  }

  /**
   * Resume every audio track
   * playing in background
   * @param void
   * @returns void
   */
  public static resumeAllSongs(): void {
    AudioManager._instances.forEach((audioTrack) => {
      if (audioTrack.isPaused) {
        audioTrack.play()
      }
    })
  }
}
