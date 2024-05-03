import { AdvancedDynamicTexture, Control, StackPanel } from '@babylonjs/gui'
import { NavbarButton } from './navButton'
import { colors } from '../../configs/colors'
import { GamePopup } from './popup'
import { UserManager } from '../controllers/userManager'
import { autorun, IReactionDisposer } from 'mobx'
import { YouMenu } from '../menus/youMenu'
import GameAPP from '../app'

export class NavBar extends StackPanel {
  private _stop: IReactionDisposer
  private readonly _app: GameAPP

  /**
   * Responsible for building a beautiful and dynamic navbar
   */
  constructor(
    app: GameAPP,
    gui: AdvancedDynamicTexture,
    userManager: UserManager,
    sid: string | void,
  ) {
    super('vortex-navbar')
    this._app = app
    this.isVertical = false
    this.width = '100%'
    this.height = '10%'
    this.top = '0px'
    this.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP
    this.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER

    if (!this._app.getScreenManager.canBePop) {
      let switchBtn = this.buildSwitchComponent(userManager, gui)
      this.addControl(switchBtn)
    } else {
      let backBtn = this.buildBackComponent()
      let titleBtn = this.buildTitleComponent(sid !== undefined ? sid : 'game')

      this.addControl(backBtn)
      this.addControl(titleBtn)
    }
    let texBtn = this.buildTexComponent(userManager, gui)
    let tokenBtn = this.buildTokenComponent(userManager, gui)
    let starBtn = this.buildStarComponent(userManager, gui)
    let garageBtn = this.buildGarageComponent(userManager, gui)
    let settingsBtn = this.buildSettingsComponent(userManager, gui)
    let arcturusBtn = this.buildArcturusBtn(gui)

    this.addControl(texBtn)
    this.addControl(tokenBtn)
    this.addControl(starBtn)
    this.addControl(garageBtn)
    this.addControl(settingsBtn)
    if (!this._app.getScreenManager.canBePop) this.addControl(arcturusBtn)
  }

  private buildTitleComponent(id: string) {
    const titleBtn = NavbarButton.createNavbarButtonOnlyWithText(
      'titleButton',
      id.toLocaleUpperCase(),
    )
    return titleBtn
  }

  private buildBackComponent() {
    const backBtn = NavbarButton.createNavbarButtonOnlyWithImage(
      'backButton',
      'back.png',
      () => {
        this._app.getScreenManager.popScreen()
      },
    )
    return backBtn
  }

  private buildSwitchComponent(
    userManager: UserManager,
    gui: AdvancedDynamicTexture,
  ): NavbarButton {
    const toggleBtn = NavbarButton.createNavbarButton(
      'loginButton',
      'login.png',
      'LOGIN',
      colors.red.crimson,
      () => {},
    )
    this._stop = autorun(() => {
      if (userManager.getGameUser.uid != 'xxx') {
        NavbarButton.updateComponent(
          toggleBtn,
          'youButton',
          'user.png',
          'YOU',
          colors.violet.rainbow,
          () => {
            gui.addControl(GamePopup.showMenu(new YouMenu(userManager)))
          },
        )
        return toggleBtn
      } else {
        NavbarButton.updateComponent(
          toggleBtn,
          'loginButton',
          'login.png',
          'LOGIN',
          colors.red.crimson,
          () => {
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
          },
        )
      }
    })

    return toggleBtn
  }

  private buildArcturusBtn(gui: AdvancedDynamicTexture) {
    const arcturusBtn = NavbarButton.createNavbarButton(
      'arcturusButton',
      'arcturus.png',
      'ARCTURUS',
      colors.dark.normal,
      () => {
        gui.addControl(GamePopup.showInfoPopup('GET IN TOUCH'))
      },
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
          gui.addControl(
            GamePopup.showInfoPopup(
              'You must log in before!\n Anonymous login system will be coming soon...',
            ),
          )
        } else {
          gui.addControl(GamePopup.showInfoPopup('SETTINGS. \n'))
        }
      },
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
          gui.addControl(
            GamePopup.showInfoPopup(
              'You must log in before!\n Anonymous login system will be coming soon...',
            ),
          )
        } else {
          gui.addControl(GamePopup.showInfoPopup('GARAGE. \n '))
        }
      },
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
          gui.addControl(
            GamePopup.showInfoPopup(
              'You must log in before!\n Anonymous login system will be coming soon...',
            ),
          )
        }
        // TODO: Game logic goes here
      },
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
          gui.addControl(
            GamePopup.showInfoPopup(
              'You must log in before!\n Anonymous login system will be coming soon...',
            ),
          )
        }
        // TODO: Game logic goes here
      },
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
      },
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
    return NavbarButton.createNavbarButton(
      'undefined',
      'undefined',
      'undefined',
      'undefined',
      () => {},
    )
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
