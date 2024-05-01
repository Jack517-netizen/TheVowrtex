import { Button, Control } from '@babylonjs/gui'
import { colors } from '../../configs/colors'
import { AudioManager } from '../controllers/audioManager'
import { IButton } from '../interfaces/button'

export class NavbarButton extends Button implements IButton {

  constructor(id: string, src: string, content: string, color: string, actionFn: Function) {
    super(id)
    NavbarButton.createNavbarButton(id, src, content, color, actionFn)
  }
  
  /**
   * 
   * @param id string
   * @param src string
   * @param content qtring
   * @param customColor string | undefined
   * @param actionFn Function | undefined
   * @returns NavbarButton
   */
  public static createNavbarButton(
    id: string,
    src: string,
    content: string,
    customColor: string | undefined | void,
    actionFn: Function,
  ): NavbarButton {
    let _navBtn = Button.CreateImageButton(
      id,
      content,
      '/assets/icons/' + src,
    )
    
    _navBtn.width = screen.width / 6.9 + 'px'//'14.20%'
    _navBtn.height = '65px'
    if(_navBtn.image) _navBtn.image.paddingLeft = '5px'
    _navBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP
    _navBtn.color = colors.white.normal
    _navBtn.thickness = 0
    _navBtn.paddingRight = '5px'
    _navBtn.background = customColor || colors.blue.rainbow

    // attach sound sfx
    _navBtn.onPointerClickObservable.add(() => {
      AudioManager.playInstantSound('click-ui.mp3')
    })

    // attach defined action process
    _navBtn.onPointerClickObservable.add(() => {
      actionFn()
    })

    return _navBtn as NavbarButton
  }

  public static createNavbarButtonOnlyWithText(id: string, content: string): NavbarButton {
    let _navBtn = Button.CreateSimpleButton(
      id,
      content
    )

    _navBtn.width = screen.width / 6.9 + 'px'//'14.20%'
    _navBtn.height = '65px'
    if(_navBtn.image) _navBtn.image.paddingLeft = '5px'
    _navBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP
    _navBtn.color = colors.dark.competitive
    _navBtn.thickness = 0
    _navBtn.paddingRight = '5px'
    _navBtn.background = colors.white.normal
    _navBtn.isEnabled = false

    return _navBtn as NavbarButton
  }

  /**
   * createNavbarButtonOnlyWithImage create a button without label
   * @param id string
   * @param src string
   * @param color string
   * @param actionFn Function
   * @returns NavbarButton
   */
  public static createNavbarButtonOnlyWithImage(id: string, src: string, actionFn: Function): NavbarButton {
    let _navBtn = Button.CreateImageOnlyButton(
      id,
      '/assets/icons/' + src,
    )

    if(_navBtn.image !== undefined && _navBtn.image !== null) _navBtn.image.width = '60%'
    if(_navBtn.image !== undefined && _navBtn.image !== null) _navBtn.image.height = '50%'
    if(_navBtn.image !== undefined && _navBtn.image !== null) _navBtn.image.paddingLeft = '40%'
    _navBtn.width = screen.width / 6.9 + 'px'//'14.20%'
    _navBtn.height = '65px'
    _navBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP
    _navBtn.thickness = 0
    _navBtn.paddingRight = '5px'
    _navBtn.background = colors.red.surf

    // attach sound sfx
    _navBtn.onPointerClickObservable.add(() => {
      AudioManager.playInstantSound('back-ui.mp3')
    })

    // attach defined action process
    _navBtn.onPointerClickObservable.add(() => {
      actionFn()
    })

    return _navBtn as NavbarButton
  }

  /**
   * Update component
   * @param id string
   * @param src string
   * @param content string
   * @param urban string
   */
  public static updateComponent(thing: NavbarButton, id: string, src: string, content: string, color: string, actionFn: Function) {
    thing.name = id
    thing.width = screen.width / 6.9 + 'px'//'14.20%'
    thing.height = '65px'
    thing.thickness = 0
    thing.paddingRight = '5px'
    thing.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP
    thing.color = colors.white.normal
    if(thing.image) thing.image.source = '/assets/icons/' + src
    if(thing.textBlock) thing.textBlock.text = content
    thing.background = color

    thing.onPointerClickObservable.clear()
    thing.onPointerClickObservable.add(() => {
      actionFn()
    })
  }
}
