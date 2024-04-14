import { Button, Container, Control } from '@babylonjs/gui'
import { colors } from '../../configs/colors'

export class GameButton {
  /**
   * createHeaderButton create a custom header button
   * @param txt the text of button
   * @param id the identifier of button
   */
  public static createHeaderButton(id: string, txt: string): Button {
    let _tmp = Button.CreateImageButton(id, txt, '/vite.svg')
    _tmp.width = screen.width / 6.8 + 'px'
    _tmp.height = '60px'
    _tmp.color = colors.white.normal
    _tmp.thickness = 0.5
    _tmp.paddingRight = '3px'

    switch (txt.toLocaleLowerCase()) {
      case 'login':
        _tmp.background = colors.red.crimson
        break
      case 'arcturus':
        _tmp.background = colors.yellow.inclusive
        break
      default:
        _tmp.background = colors.violet.rainbow
    }
    return _tmp
  }

  /**
   * createFooterButton create a custom footer button
   * @param txt the text of button
   * @param id the identifier of button
   */
  public static createFooterButton(id: string, txt: string): Button {
    let _tmp = Button.CreateSimpleButton(id, txt)
    _tmp.width = '300px'
    _tmp.height = '65px'
    _tmp.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
    _tmp.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
    _tmp.color = colors.white.normal
    _tmp.thickness = 2
    _tmp.paddingBottom = '15px'
    _tmp.paddingRight = '15px'
    _tmp.background = colors.blue.rainbow

    return _tmp
  }
}
