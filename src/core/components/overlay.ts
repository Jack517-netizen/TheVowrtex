import { Button, Container, Control } from '@babylonjs/gui'
import { colors } from '../../configs/colors'

export class GameOverlay {
  /**
   * createTransparentOverlay create a transparent overlay
   * @param void
   * @returns Container
   */
  public static createTransparentOverlay(): Container {
    let _tmp = new Container('overlay-container')
    _tmp.width = '100%'
    _tmp.height = '100%'
    _tmp.background = colors.dark.competitive
    _tmp.alpha = 0.9
    _tmp.zIndex = 1
    _tmp.isPointerBlocker = true
    _tmp.isVisible = true

    return _tmp
  }

  /**
   * createTransparentOverlay create a transparent overlay
   * @param void
   * @returns Container
   */
  public static createTransparentBackgroundOverlay(): Container {
    let _tmp = new Container('overlay-container')
    _tmp.width = '100%'
    _tmp.height = '100%'
    _tmp.background = colors.dark.competitive
    _tmp.alpha = 0.6
    _tmp.zIndex = -1
    _tmp.isPointerBlocker = true
    _tmp.isVisible = true

    return _tmp
  }
}
