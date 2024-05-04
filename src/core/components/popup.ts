import {
  Button,
  Container,
  Control,
  StackPanel,
  TextBlock,
} from '@babylonjs/gui'
import { colors } from '../../configs/colors'
import { GameOverlay } from './overlay'
import { GameButton } from './buttons'
import { styles } from '../../configs/styles'

export class GamePopup {
  /**
   * showInfoPopup create a custom popup
   * @param msg the content of message
   * @returns Container
   */
  public static showInfoPopup(msg: string): Container {
    // TRANSPARENT DARK EFFECT
    let _overlay = GameOverlay.createTransparentOverlay()

    // POPUP
    let _tmp = new StackPanel('info-stack')
    _tmp.width = '80%'
    _tmp.color = colors.white.normal
    _tmp.height = '350px'
    _tmp.background = colors.dark.normal
    _tmp.zIndex = 2
    _tmp.isVisible = true
    _tmp.alpha = 0.95

    // MSG CONTENT
    let _text = new TextBlock('msg-block', msg)
    _text.fontSize = styles.headline4
    _text.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
    _text.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER

    // OK BUTTON
    let _okBtn = GameButton.createOkButton(() =>{
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
   * showMenu show a custom menu instance
   * @param stackPanel StackPanel
   * @returns Container
   */
  public static showMenu(stackPanel: StackPanel): Container {
    // TRANSPARENT DARK EFFECT
    let _overlay = GameOverlay.createTransparentOverlay()

    // OK button action
    let _okBtn = GameButton.createOkButton(() => {
      _overlay.isVisible = false
      _overlay.dispose()
      stackPanel.isVisible = false
      stackPanel.dispose()
    })
    stackPanel.addControl(_okBtn)

    return _overlay.addControl(stackPanel)
  }

  /**
   * showActions create a custom popup with the user choice
   * @param msg the content of message
   * @returns Container
   */
  public static showActions(msg: string, actionFn: VoidFunction) {
    // TRANSPARENT DARK EFFECT
    let _overlay = GameOverlay.createTransparentOverlay()

    // POPUP
    let _tmp = new StackPanel('actionsStackPanel')
    _tmp.width = '550px'
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

    // DO IT BUTTON
    const _actionBtn = GameButton.createOkButton(() =>{
      actionFn()

      _overlay.isVisible = false
      _overlay.dispose()
      _tmp.isVisible = false
      _tmp.dispose()
    })

    const _undoBtn = GameButton.createCancelButton(() =>{
      _overlay.isVisible = false
      _overlay.dispose()
      _tmp.isVisible = false
      _tmp.dispose()
    })
    let _stackActions = new StackPanel('actionsStackPanel')
    _stackActions.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
    _stackActions.paddingLeft = '10px'
    _stackActions.width = '100%'
    _stackActions.height = '20%'
    _stackActions.isVertical = false
    _stackActions.addControl(_actionBtn)
    _stackActions.addControl(_undoBtn)

    _tmp.addControl(_text)
    _tmp.addControl(_stackActions)

    return _overlay.addControl(_tmp)
  }
}
