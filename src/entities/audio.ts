import { Sound } from '@babylonjs/core'
import { AudioType } from '../core/enums/audio'

export class GameAudio extends Sound {
  private _type: AudioType

  constructor(url: string, type: AudioType) {
    // init babylon sound...
    super(`${url}`, `/assets/sounds/${url}`, null, () => {}, {
      autoplay: type === AudioType.MUSIC ? true : false,
      loop: type === AudioType.MUSIC ? true : false,
      spatialSound: type === AudioType.MUSIC ? true : false,
      volume:type === AudioType.MUSIC ? 0.5 : 0.9,
    })

    // ...define sound type
    this._type = type
  }

  /**
   * Get the type for the audio track
   * @param void
   * @returns AudioType
   */
  public getType(): AudioType {
    return this._type
  }

  /**
   * Get the type for the audio track
   * @param AudioType
   * @returns void
   */
  public setType(newType: AudioType): void {
    this._type = newType
  }
}
