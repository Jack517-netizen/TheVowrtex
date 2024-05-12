import { Button, Control, StackPanel, TextBlock } from '@babylonjs/gui'
import { colors } from '../../configs/colors'
import { GameButton } from '../components/buttons'
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

    const _leftPanel = new StackPanel()
    _leftPanel.width = '35%'
    _leftPanel.paddingLeft = '10px'
    _leftPanel.height = '85%'
    _leftPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT

    const _rightPanel = new StackPanel()
    _rightPanel.paddingLeft = '10px'
    _rightPanel.height = '85%'
    _rightPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT

    const _followBtn = GameButton.createActionButton('Follow us', () => {
      _rightPanel.dispose()

      const _firstColumn = new StackPanel()
      _firstColumn.width = '50%'
      const _youtubeBtn = GameButton.createActionButton('YouTube', () => {})
      _youtubeBtn.background = colors.red.surf
      const _facebookBtn = GameButton.createActionButton('Facebook', () => {})
      _facebookBtn.background = colors.blue.rainbow
      const _instagramBtn = GameButton.createActionButton('Instagram', () => {})
      _instagramBtn.background = colors.orange.rainbow
      _firstColumn.addControl(_youtubeBtn)
      _firstColumn.addControl(_facebookBtn)
      _firstColumn.addControl(_instagramBtn)

      const _secondColumn = new StackPanel()
      _secondColumn.width = '50%'
      const _discordBtn = GameButton.createActionButton('Discord', () => {})
      _discordBtn.background = colors.violet.rainbow
      const _twitterBtn = GameButton.createActionButton('Twitter', () => {})
      _twitterBtn.background = colors.blue.inclusive
      const _tiktokBtn = GameButton.createActionButton('TikTok', () => {})
      _tiktokBtn.background = colors.black.olive
      _firstColumn.addControl(_discordBtn)
      _firstColumn.addControl(_twitterBtn)
      _firstColumn.addControl(_tiktokBtn)

      _rightPanel.addControl(_firstColumn)
      // _rightPanel.addControl(_secondColumn)
    })
    const _forumBtn = GameButton.createActionButton('Community', () => {})
    const _legalBtn = GameButton.createActionButton('Legal Terms', () => {})
    const _aboutBtn = GameButton.createActionButton('About', () => {})

    _leftPanel.addControl(_followBtn)
    _leftPanel.addControl(_forumBtn)
    _leftPanel.addControl(_legalBtn)
    _leftPanel.addControl(_aboutBtn)

    this.addControl(_leftPanel)
    this.addControl(_rightPanel)
  }
}
