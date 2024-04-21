import { AdvancedDynamicTexture, Control, StackPanel } from '@babylonjs/gui'
import { FooterButton } from './fooButton'
import { colors } from '../../configs/colors'
import { GamePopup } from './popup'

export class FooterBar extends StackPanel {
  /**
   * Responsible for building a beautiful and dynamic footer bar
   */
  constructor(gui: AdvancedDynamicTexture) {
    super('vortex-footerbar')
    this.isVertical = false
    this.width = '100%'
    this.top = '0px'
    this.left = '52%'
    this.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
    this.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT

    let leaderBtn = this.buildLeaderComponent(gui)
    let playBtn = this.buildPlayComponent(gui)

    this.addControl(leaderBtn)
    this.addControl(playBtn)
  }

  private buildPlayComponent(_gui: AdvancedDynamicTexture) {
    return FooterButton.createFooterButton('playButton', 'play.png', 'PLAY')
  }

  private buildLeaderComponent(gui: AdvancedDynamicTexture) {
    let leaderBtn = FooterButton.createFooterButton(
      'leaderButton',
      'leaderboard.png',
      'LEADERBOARD',
      colors.yellow.inclusive,
      () => {
        gui.addControl(GamePopup.showInfoPopup('LEADERBOARD'))
      })
    return leaderBtn
  }

  /**
   * Return the children of footer bar
   * @param id
   */
  public getFooterButton(id: string): FooterButton {
    const _tmp = this.getChildByName(id)
    if (_tmp !== null && _tmp instanceof FooterButton) {
      return _tmp
    }
    return FooterButton.createFooterButton('undefined', 'undefined', 'undefined', 'undefined')
  }
}
