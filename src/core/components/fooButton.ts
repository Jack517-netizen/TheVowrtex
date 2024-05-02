import { Button, Control } from '@babylonjs/gui'
import { colors } from '../../configs/colors'
import { AudioManager } from '../controllers/audioManager'
import { IButton } from '../interfaces/button'

export class FooterButton extends Button implements IButton {
  /**
   *
   * @param id string
   * @param src string
   * @param content qtring
   * @param customColor string | undefined
   * @param actionFn Function | undefined
   * @returns FooterButton
   */
  public static createFooterButton(
    id: string,
    src: string,
    content: string,
    customColor: string | undefined | void,
    actionFn: Function,
  ): FooterButton {
    let _footerBtn = Button.CreateImageButton(
      id,
      content,
      '/assets/icons/' + src,
    )

    _footerBtn.width = '300px'
    _footerBtn.height = '65px'
    _footerBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
    _footerBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
    _footerBtn.color = colors.white.normal
    _footerBtn.thickness = 2
    _footerBtn.paddingBottom = '10px'
    if (_footerBtn.image) _footerBtn.image.paddingLeft = '5px'
    _footerBtn.paddingRight = '10px'
    _footerBtn.background = customColor || colors.blue.rainbow

    // attach sound sfx
    _footerBtn.onPointerClickObservable.add(() => {
      AudioManager.playInstantSound('click-ui.mp3')
    })

    // attach defined action process
    _footerBtn.onPointerClickObservable.add(() => {
      actionFn()
    })

    return _footerBtn as FooterButton
  }
}
