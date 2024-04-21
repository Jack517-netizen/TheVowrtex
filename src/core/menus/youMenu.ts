import { Button, Control, StackPanel, TextBlock } from '@babylonjs/gui'
import { colors } from '../../configs/colors'
import { GameOverlay } from '../components/overlay'
import { UserManager } from '../controllers/userManager'

export class YouMenu extends StackPanel {
  constructor(userManager: UserManager) {
    // TRANSPARENT DARK EFFECT
    let _overlay = GameOverlay.createTransparentOverlay()

    // POPUP
    super('you-stack')
    this.background = colors.dark.normal
    this.alpha = 0.95
    this.color = colors.white.normal
    this.zIndex = 2
    this.width = '450px'
    this.height = '250px'
    this.isVisible = true

    // MSG CONTENT
    let _text = new TextBlock(
      'title-block',
      'USER INFORMATIONS \n ' +
        userManager.getGameUser.uid +
        '\n' +
        userManager.getGameUser.name +
        '\n' +
        userManager.getGameUser.email +
        '\n' +
        userManager.getGameUser.pic +
        '\n',
    )
    _text.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
    _text.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER

    // BUTTON action
    // OK button action
    let _okBtn = Button.CreateSimpleButton('ok-btn', 'OK')
    _okBtn.width = 0.5
    _okBtn.height = '50px'
    _okBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
    _okBtn.top = this.width
    _okBtn.paddingRight = '10px'
    _okBtn.paddingTop = '10px'
    _okBtn.background = colors.dark.overlay
    _okBtn.color = colors.white.normal
    _okBtn.onPointerClickObservable.add(() => {
      _overlay.isVisible = false
      _overlay.dispose()
      this.isVisible = false
      this.dispose()
    })

    this.addControl(_text)
    this.addControl(_okBtn)

    _overlay.addControl(this)
  }
}
