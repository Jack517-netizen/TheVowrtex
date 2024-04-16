import { IAudioLayer } from '../interfaces/audio'
import { GameAudio } from '../../entities/audio'
import { AudioType } from '../enums/audio'

export class AudioManager implements IAudioLayer {
  private _gameAudio: GameAudio

  /**
   * Play a given sound
   * @param url the root url of the audio track
   * @returns void
   */
  public playSound(url: string): void {
    this._gameAudio = new GameAudio(url, AudioType.MUSIC)
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
}
