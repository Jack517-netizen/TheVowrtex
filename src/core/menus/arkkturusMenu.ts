import { Control, StackPanel, TextBlock } from '@babylonjs/gui'
import { colors } from '../../configs/colors'
import { styles } from '../../configs/styles'

export class ArkkturusMenu extends StackPanel {
  constructor() {
    // POPUP
    super('arkkturusStack')
    this.background = colors.dark.normal
    this.alpha = 0.95
    this.color = colors.white.normal
    this.zIndex = 2
    this.width = '80%'
    this.height = '70%'
    this.isVisible = true

    // MSG CONTENT
    let _text = new TextBlock('titleTextBlock', 'ARKKTURUS GAMES STUDIO \n')
    _text.fontSize = styles.headline4
    _text.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP
    _text.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER

    this.addControl(_text)
  }
}
