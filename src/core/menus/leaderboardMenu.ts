import { Control, StackPanel, TextBlock } from '@babylonjs/gui'
import { colors } from '../../configs/colors'

export class LeaderBoardMenu extends StackPanel {
  constructor() {
    // POPUP
    super('you-stack')
    this.background = colors.dark.normal
    this.alpha = 0.95
    this.color = colors.white.normal
    this.zIndex = 2
    this.width = '80%'
    this.height = '70%'
    this.isVisible = true

    // MSG CONTENT
    let _text = new TextBlock('title-block', 'LEADERBOARD \n')
    _text.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
    _text.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER

    this.addControl(_text)
  }
}
