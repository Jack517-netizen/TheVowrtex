import { Button, Container, Control } from '@babylonjs/gui'
import { colors } from '../../configs/colors'
import { AudioManager } from '../controllers/audioManager'
import { GameUser } from '../../entities/user'
import { UserManager } from '../controllers/userManager'

export class GameButton {
  /**
   * createHeaderButton create a custom header button
   * @param txt the text of button
   * @param id the identifier of button
   */
  public static createHeaderButton(id: string, txt: string): Button {
    let _tmp

    switch (txt.toLocaleLowerCase()) {
      case 'login':
        _tmp = Button.CreateImageButton(id, txt, '/assets/icons/login.png')
        _tmp.background = colors.red.crimson
        _tmp.width = screen.width / 7 + 'px'
        _tmp.height = '60px'
        _tmp.color = colors.white.normal
        _tmp.thickness = 0.5
        _tmp.paddingRight = '3px'
        break
      case 'user':
        _tmp = Button.CreateImageButton(id, txt, '/assets/icons/user.png')
        _tmp.background = colors.violet.rainbow
        _tmp.width = screen.width / 7 + 'px'
        _tmp.height = '60px'
        _tmp.color = colors.white.normal
        _tmp.thickness = 0.5
        _tmp.paddingRight = '3px'
        break
      case 'tex':
        _tmp = Button.CreateImageButton(
          id,
          txt + '   ' + UserManager.getCurrentGameUser().getTex(),
          '/assets/icons/tex.png',
        )
        _tmp.background = colors.violet.rainbow
        _tmp.width = screen.width / 7 + 'px'
        _tmp.height = '60px'
        _tmp.color = colors.white.normal
        _tmp.thickness = 0.5
        _tmp.paddingRight = '3px'
        break
      case 'token':
        _tmp = Button.CreateImageButton(
          id,
          txt + '   ' + UserManager.getCurrentGameUser().getToken(),
          '/assets/icons/token.png',
        )
        _tmp.background = colors.violet.rainbow
        _tmp.width = screen.width / 7 + 'px'
        _tmp.height = '60px'
        _tmp.color = colors.white.normal
        _tmp.thickness = 0.5
        _tmp.paddingRight = '3px'
        break
      case 'star':
        _tmp = Button.CreateImageButton(
          id,
          txt + '   ' + UserManager.getCurrentGameUser().getStar(),
          '/assets/icons/star.png',
        )
        _tmp.background = colors.violet.rainbow
        _tmp.width = screen.width / 7 + 'px'
        _tmp.height = '60px'
        _tmp.color = colors.white.normal
        _tmp.thickness = 0.5
        _tmp.paddingRight = '3px'
        break
      case 'settings':
        _tmp = Button.CreateImageButton(id, txt, '/assets/icons/settings.png')
        _tmp.background = colors.violet.rainbow
        _tmp.width = screen.width / 7 + 'px'
        _tmp.height = '60px'
        _tmp.color = colors.white.normal
        _tmp.thickness = 0.5
        _tmp.paddingRight = '3px'
        break
      case 'garage':
        _tmp = Button.CreateImageButton(id, txt, '/assets/icons/garage.png')
        _tmp.background = colors.violet.rainbow
        _tmp.width = screen.width / 7 + 'px'
        _tmp.height = '60px'
        _tmp.color = colors.white.normal
        _tmp.thickness = 0.5
        _tmp.paddingRight = '3px'
        break
      case 'arcturus':
        _tmp = Button.CreateImageButton(id, txt, '/assets/icons/arcturus.png')
        _tmp.background = colors.violet.rainbow
        _tmp.width = screen.width / 7 + 'px'
        _tmp.height = '60px'
        _tmp.color = colors.white.normal
        _tmp.thickness = 0.5
        _tmp.paddingRight = '3px'
        _tmp.background = colors.yellow.inclusive
        break
      default:
        _tmp = Button.CreateImageButton(id, txt, '/assets/icons/vite.svg')
        _tmp.background = colors.violet.rainbow
        _tmp.width = screen.width / 7 + 'px'
        _tmp.height = '60px'
        _tmp.color = colors.white.normal
        _tmp.thickness = 0.5
        _tmp.paddingRight = '3px'
    }

    _tmp.onPointerClickObservable.add(() => {
      new AudioManager().playSound('click-ui.mp3')
    })
    return _tmp
  }

  /**
   * createFooterButton create a custom footer button
   * @param txt the text of button
   * @param id the identifier of button
   */
  public static createFooterButton(id: string, txt: string): Button {
    let _tmp
    if (txt.toLocaleLowerCase() === 'play') {
      _tmp = Button.CreateImageButton(id, txt, '/assets/icons/play.png')
    } else {
      _tmp = Button.CreateImageButton(id, txt, '/assets/icons/leaderboard.png')
    }
    _tmp.width = '300px'
    _tmp.height = '65px'
    _tmp.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM
    _tmp.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT
    _tmp.color = colors.white.normal
    _tmp.thickness = 2
    _tmp.paddingBottom = '15px'
    _tmp.paddingRight = '15px'
    _tmp.background = colors.blue.rainbow

    _tmp.onPointerClickObservable.add(() => {
      new AudioManager().playSound('click-ui.mp3')
    })
    return _tmp
  }
}
