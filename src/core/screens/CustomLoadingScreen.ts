import { ILoadingScreen } from '@babylonjs/core'
import { RouterManager } from '../controllers/routerManager'
import { colors } from '../../configs/colors'

export class CustomLoadingScreen implements ILoadingScreen {
  // default loader support. Optional!
  loadingUIBackgroundColor: string
  loadingUIText: string

  constructor(private readonly loaderContainer: HTMLElement) {}

  // What happens when loading starts
  displayLoadingUI(): void {
    this.loaderContainer.style.opacity = '1'
    this.loaderContainer.style.visibility = 'visible'
  }

  // What happens when loading stops
  hideLoadingUI(): void {
    this.loaderContainer.style.opacity = '0'
    this.loaderContainer.style.visibility = 'hidden'
    setTimeout(() => {
      this.loaderContainer.style.display = 'none'
    }, 1500)
  }
}
