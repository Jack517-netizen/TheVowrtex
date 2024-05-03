import { IAudioLayer } from '../interfaces/audio'
import { GameAudio } from '../../entities/audio'
import { AudioType } from '../enums/audio'

export class AudioManager implements IAudioLayer {
  private _instances: GameAudio[] = []

  /**
   * Play a given audio
   * @param url the root url of the audio track
   * @returns void
   */
  public playAudio(url: string): void {
    const _gameMusic = new GameAudio(url, AudioType.MUSIC)
    this._instances.push(_gameMusic)
  }

  /**
   * Play an audio in short given time
   * @param url the root url of the audio track
   * @returns void
   */
  public playInstantAudio(url: string): void {
    const _gameSFX = new GameAudio(url, AudioType.SFX)
    this._instances.push(_gameSFX)
  }

  /**
   * Pause a given audio found by its name
   * @param void
   * @returns void
   */
  public pauseAudio(name: string): void {
    const _foundAudio = this.getDesiredAudio(name)
    if (_foundAudio !== undefined) _foundAudio.pause()
  }

  /**
   * Get the current audio track
   * @param void
   * @returns GameAudio
   */
  public getDesiredAudio(id: string): GameAudio | undefined {
    const _tmp = this._instances.find((audio) => audio.name === id)
    return _tmp
  }

  /**
   * Get the number of
   * all audio tracks managed by audioManager
   * @param void
   * @returns number
   */
  public getNumberOfTracks(): number {
    return this._instances.length
  }

  /**
   * Unload ressources
   * associated to audio track
   * @param void
   * @returns void
   */
  public disposeAllSongs(): void {
    this._instances.forEach((audioTrack) => {
      audioTrack.dispose()
    })
  }

  /**
   * Freeze every audio track
   * playing in background
   * @param void
   * @returns void
   */
  public freezeAllSongs(): void {
    this._instances.forEach((audioTrack) => {
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
  public resumeAllSongs(): void {
    this._instances.forEach((audioTrack) => {
      if (audioTrack.isPaused) {
        audioTrack.play()
      }
    })
  }
}
