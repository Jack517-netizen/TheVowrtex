import { Control, StackPanel, TextBlock } from '@babylonjs/gui'
import { colors } from '../../configs/colors'
import { UserManager } from '../controllers/userManager'
import { styles } from '../../configs/styles'

export class YouMenu extends StackPanel {
  constructor(userManager: UserManager) {
    // POPUP
    super('youStack')
    this.background = colors.dark.normal
    this.alpha = 0.95
    this.color = colors.white.normal
    this.zIndex = 2
    this.width = '80%'
    this.height = '70%'
    this.isVisible = true

    // MSG CONTENT
    let _text = new TextBlock(
      'titleTextBlock',
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
    _text.fontSize = styles.headline4

    this.addControl(_text)
  }
}
