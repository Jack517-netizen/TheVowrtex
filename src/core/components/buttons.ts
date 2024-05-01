import { Button } from '@babylonjs/gui'

export class GameButton extends Button {

  /**
   * createOkButton
   */
  public static createOkButton() {
    //TODO: ok btn
  }

  /**
   * createDirectionnalButton create a new directionnal button
   * @param id string
   * @param src string
   */
  public static createDirectionnalButton(id: string, src: string): GameButton {
    let _tmp = Button.CreateImageOnlyButton(id, '/assets/icons/'+src)
    _tmp.width = '200px'
    _tmp.height = '200px'
    _tmp.paddingLeft = '20px'

    return _tmp
  }

  /**
   * createCancelButton
   */
  public static createCancelButton() {
    //TODO: cancel btn
  }

  /**
   * createAlertButton
   */
  public static createAlertButton() {
    //TODO: alert btn
  }
}
