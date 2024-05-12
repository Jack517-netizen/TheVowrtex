import { Button, Control } from '@babylonjs/gui'
import { colors } from '../../configs/colors'
import { styles } from '../../configs/styles'
import { AudioManager } from '../controllers/audioManager'

export class GameButton extends Button {
  /**
   * createOkButton
   * @param actionFn VoidFunction
   * @returns GameButton
   */
  public static createOkButton(actionFn: VoidFunction): GameButton {
    let _tmp = Button.CreateSimpleButton('okButton', 'OK')
    _tmp.width = '250px'
    _tmp.height = '50px'
    _tmp.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
    _tmp.paddingRight = '10px'
    _tmp.paddingTop = '10px'
    _tmp.background = colors.dark.overlay
    _tmp.color = colors.white.normal
    _tmp.onPointerClickObservable.add(() => {
      actionFn()
    })
    return _tmp
  }

  /**
   * createOkButton
   * @param txt string
   * @param actionFn VoidFunction
   * @returns GameButton
   */
  public static createActionButton(
    txt: string,
    actionFn: VoidFunction,
  ): GameButton {
    let _tmp = Button.CreateSimpleButton(txt.toString() + 'Button', txt)
    _tmp.width = '500px'
    _tmp.height = '80px'
    _tmp.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
    _tmp.paddingRight = '10px'
    _tmp.paddingBottom = '10px'
    _tmp.paddingTop = '10px'
    _tmp.background = colors.dark.overlay
    _tmp.color = colors.white.normal
    if (_tmp.textBlock) _tmp.textBlock.fontSize = styles.headline4
    if (_tmp.textBlock) _tmp.textBlock.fontWeight = '500'
    _tmp.onPointerClickObservable.add(() => {
      actionFn()
    })
    return _tmp
  }

  /**
   * createDirectionnalButton create a new directionnal button
   * @param id string
   * @param src string
   */
  public static createDirectionnalButton(
    id: string,
    src: string,
    actionFn: VoidFunction,
  ): GameButton {
    let _tmp = Button.CreateImageOnlyButton(id, '/assets/icons/' + src)
    _tmp.width = '200px'
    _tmp.height = '200px'
    _tmp.paddingLeft = '20px'
    _tmp.paddingRight = '20px'
    _tmp.thickness = 0

    _tmp.onPointerClickObservable.add(() => {
      AudioManager.playInstantAudio('click-ui.mp3')
      actionFn()
    })

    return _tmp
  }

  /**
   * createCancelButton
   */
  public static createCancelButton(actionFn: VoidFunction) {
    let _tmp = Button.CreateSimpleButton('cancelButton', 'CANCEL')
    _tmp.width = '250px'
    _tmp.height = '50px'
    _tmp.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
    _tmp.paddingRight = '10px'
    _tmp.paddingTop = '10px'
    _tmp.background = colors.dark.overlay
    _tmp.color = colors.white.normal
    _tmp.onPointerClickObservable.add(() => {
      actionFn()
    })
    return _tmp
  }

  /**
   * createAlertButton
   */
  public static createAlertButton(actionFn: VoidFunction) {
    let _tmp = Button.CreateSimpleButton('cancelButton', 'CANCEL')
    _tmp.width = '250px'
    _tmp.height = '50px'
    _tmp.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
    _tmp.paddingRight = '10px'
    _tmp.paddingTop = '10px'
    _tmp.background = colors.red.surf
    _tmp.color = colors.white.normal
    _tmp.onPointerClickObservable.add(() => {
      actionFn()
    })
    return _tmp
  }
}
