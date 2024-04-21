import { AdvancedDynamicTexture, Control, StackPanel } from '@babylonjs/gui'
import { NavbarButton } from './navButton'
import { colors } from '../../configs/colors'
import { GamePopup } from './popup'
import { UserManager } from '../controllers/userManager'
import { autorun, IReactionDisposer } from 'mobx'
import { YouMenu } from '../menus/youMenu'

export class NavBar extends StackPanel {
  private _stop: IReactionDisposer

  /**
   * Responsible for building a beautiful and dynamic navbar
   */
  constructor(gui: AdvancedDynamicTexture, userManager: UserManager) {
    super('vortex-navbar')
    this.isVertical = false
    this.width = '100%'
    this.top = '0px'
    this.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP
    this.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER

    //TODO: Build dynamic btn
    const switchBtn = this.buildSwitchComponent(userManager, gui)
    const texBtn = this.buildTexComponent(userManager, gui)
    const tokenBtn = this.buildTokenComponent(userManager, gui)
    const starBtn = this.buildStarComponent(userManager, gui)
    const garageBtn = this.buildGarageComponent(userManager, gui)
    const settingsBtn = this.buildSettingsComponent(userManager, gui)

    const arcturusBtn = this.buildArcturusBtn(gui)

    this.addControl(switchBtn)
    this.addControl(texBtn)
    this.addControl(tokenBtn)
    this.addControl(starBtn)
    this.addControl(garageBtn)
    this.addControl(settingsBtn)
    this.addControl(arcturusBtn)
  }

  private buildSwitchComponent(
    userManager: UserManager,
    gui: AdvancedDynamicTexture,
  ): NavbarButton {
    let _toggleBtn: NavbarButton = new NavbarButton()
    this._stop = autorun(() => {
      if(userManager.getGameUser.uid != 'xxx') {
        _toggleBtn = NavbarButton.createNavbarButton('youButton', 
        'user.png', 'YOU', colors.violet.rainbow, () => {
          gui.addControl(new YouMenu(userManager))
        })
        return _toggleBtn
      } else {
        _toggleBtn = NavbarButton.createNavbarButton('loginButton',
        'login.png', 'LOGIN', colors.red.crimson, () => {
          try {
            // log in...
            userManager.loginUser()
          } catch (error: any) {
            // ...error during log in process
            return gui.addControl(
              GamePopup.showInfoPopup(
                'WE ARE SORRY... AN ERROR OCCURED WHEN TRYING TO LOG IN YOU.\n ' +
                  error.code +
                  '\n' +
                  error.message +
                  '\n' +
                  'TRY AGAIN LATER.',
              ),
            )
          }
        })
        
      }
    })

    return _toggleBtn
  }

  private buildArcturusBtn(gui: AdvancedDynamicTexture) {
    const arcturusBtn = NavbarButton.createNavbarButton(
      'arcturusButton',
      'arcturus.png',
      'ARCTURUS',
      colors.dark.competitive,
      () => {
        // TODO: User - Studio links
        return gui.addControl(GamePopup.showInfoPopup('GET IN TOUCH'))
      }
    )
    return arcturusBtn
  }

  private buildSettingsComponent(
    userManager: UserManager,
    gui: AdvancedDynamicTexture,
  ) {
    const settingsBtn = NavbarButton.createNavbarButton(
      'settingsButton',
      'settings.png',
      'SETTINGS',
      undefined,
      () => {
        if (userManager.getGameUser.uid === 'xxx') {
          return gui.addControl(
            GamePopup.showInfoPopup(
              'You must log in before!\n Anonymous login system will be coming soon...',
            ),
          )
        }
        // TODO: Game logic goes here
      }
    )
    return settingsBtn
  }

  private buildGarageComponent(
    userManager: UserManager,
    gui: AdvancedDynamicTexture,
  ) {
    const garageBtn = NavbarButton.createNavbarButton(
      'garageButton',
      'garage.png',
      'GARAGE',
      undefined,
      () => {
        if (userManager.getGameUser.uid === 'xxx') {
          return gui.addControl(
            GamePopup.showInfoPopup(
              'You must log in before!\n Anonymous login system will be coming soon...',
            ),
          )
        }
        // TODO: Game logic goes here
      }
    )
    return garageBtn
  }

  private buildStarComponent(
    userManager: UserManager,
    gui: AdvancedDynamicTexture,
  ) {
    const starBtn = NavbarButton.createNavbarButton(
      'starButton',
      'star.png',
      userManager.getGameUser.star.toString(),
      undefined,
      () => {
        if (userManager.getGameUser.uid === 'xxx') {
          return gui.addControl(
            GamePopup.showInfoPopup(
              'You must log in before!\n Anonymous login system will be coming soon...',
            ),
          )
        }
        // TODO: Game logic goes here
      }
    )
    return starBtn
  }

  private buildTokenComponent(
    userManager: UserManager,
    gui: AdvancedDynamicTexture,
  ) {
    const tokenBtn = NavbarButton.createNavbarButton(
      'tokenButton',
      'token.png',
      userManager.getGameUser.token.toString(),
      undefined,
      () => {
        if (userManager.getGameUser.uid === 'xxx') {
          return gui.addControl(
            GamePopup.showInfoPopup(
              'You must log in before!\n Anonymous login system will be coming soon...',
            ),
          )
        }
        // TODO: Game logic goes here
      }
    )
    return tokenBtn
  }

  private buildTexComponent(
    userManager: UserManager,
    gui: AdvancedDynamicTexture,
  ) {
    const texBtn = NavbarButton.createNavbarButton(
      'texButton',
      'tex.png',
      userManager.getGameUser.tex.toString(),
      undefined,
      () => {
        if (userManager.getGameUser.uid === 'xxx') {
          return gui.addControl(
            GamePopup.showInfoPopup(
              'You must log in before!\n Anonymous login system will be coming soon...',
            ),
          )
        }
        // TODO: Game logic goes here
      }
    )
    return texBtn
  }

  /**
   * getNavbarButton returns the child component of navbar
   * @param id
   * @returns NavbarButton | null
   */
  public getNavbarButton(id: string): NavbarButton {
    const _tmp = this.getChildByName(id)
    if (_tmp !== null && _tmp instanceof NavbarButton) {
      return _tmp
    }
    return NavbarButton.createNavbarButton('undefined', 'undefined', 'undefined', 'undefined')
  }

  /**
   * This build method releases or disposes ressources allocated 
   * to header navigation bar
   * @param void
   * @returns void
   */
  public stop() {
    this._stop()
  }
}
