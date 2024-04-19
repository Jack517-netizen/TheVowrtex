import {
  Button,
  Container,
  Control,
  StackPanel,
  TextBlock,
} from '@babylonjs/gui'
import { colors } from '../../configs/colors'
import { GameOverlay } from './overlay'

export class GamePopup {
  /**
   * showInfoPopup create a custom popup
   * @param msg the content of message
   * @returns Container
   */
  public static showInfoPopup(msg: string): Container {
    // TRANSPARENT DARK EFFECT
    let _overlay = GameOverlay.createDarkOverlay()

    // POPUP
    let _tmp = new StackPanel('info-stack')
    _tmp.width = '450px'
    _tmp.color = colors.white.normal
    _tmp.height = '250px'
    _tmp.background = colors.dark.normal
    _tmp.zIndex = 2
    _tmp.isVisible = true
    _tmp.alpha = 0.95

    // MSG CONTENT
    let _text = new TextBlock('msg-block', msg)
    _text.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
    _text.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER

    // OK button action
    let _okBtn = Button.CreateSimpleButton('ok-btn', 'OK')
    _okBtn.width = 0.5
    _okBtn.height = '50px'
    _okBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
    _okBtn.top = _tmp.width
    _okBtn.paddingRight = '10px'
    _okBtn.paddingTop = '10px'
    _okBtn.background = colors.dark.overlay
    _okBtn.color = colors.white.normal
    _okBtn.onPointerClickObservable.add(() => {
      _overlay.isVisible = false
      _overlay.dispose()
      _tmp.isVisible = false
      _tmp.dispose()
    })

    _tmp.addControl(_text)
    _tmp.addControl(_okBtn)

    return _overlay.addControl(_tmp)
  }

  /**
   * showInfoPopup create a custom popup
   * @param msg the content of message
   * @returns Container
   */
  public static showActionsPopup(
    msg: string,
    actionTxt: string | undefined,
    undoTxt: string | undefined,
    actionFunction: Function,
    undoFunction: Function,
  ): Container {
    let _overlay = GameOverlay.createDarkOverlay()

    // POPUP
    let _tmp = new StackPanel('actions-stack')
    _tmp.background = colors.dark.overlay
    _tmp.alpha = 0.95
    _tmp.color = colors.white.normal
    _tmp.zIndex = 2
    _tmp.width = '450px'
    _tmp.height = '250px'
    _tmp.isVisible = true

    // MSG CONTENT
    let _text = new TextBlock('msg-block', msg)
    _text.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
    _text.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER

    // BUTTON action
    let _stack = new StackPanel('action-stack')
    let _doBtn = Button.CreateSimpleButton('do-btn', actionTxt || 'OK')
    _doBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
    _doBtn.paddingRight = '10px'
    _doBtn.paddingTop = '10px'
    _doBtn.width = 0.5
    _doBtn.height = '50px'
    _doBtn.background = colors.dark.overlay
    _doBtn.color = colors.white.normal
    _doBtn.onPointerClickObservable.add(() => {
      actionFunction()
      _overlay.isVisible = false
      _overlay.dispose()
    })

    let _cancelBtn = Button.CreateSimpleButton(
      'cancel-btn',
      undoTxt || 'CANCEL',
    )
    _cancelBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
    _cancelBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
    _cancelBtn.paddingRight = '10px'
    _cancelBtn.paddingBottom = '10px'
    _cancelBtn.width = 0.5
    _cancelBtn.height = '50px'
    _cancelBtn.background = colors.dark.overlay
    _cancelBtn.color = colors.white.normal
    _cancelBtn.onPointerClickObservable.add(() => {
      undoFunction()
      _overlay.isVisible = false
      _overlay.dispose()
    })

    _stack.isVertical = false
    _stack.addControl(_doBtn)
    _stack.addControl(_cancelBtn)

    _tmp.addControl(_text)
    _tmp.addControl(_stack)
    return _overlay.addControl(_tmp)
  }

  /**
   * showMenuPopup create in-scene menu popup
   * @param stack StackPanel
   * @returns Container
   */
  public showMenuPopup(stack: StackPanel): Container {
    let _overlay = GameOverlay.createDarkOverlay()
    stack.zIndex = 2

    //!!!!!!!!!!!!

    return _overlay.addControl(stack)
  }
}
