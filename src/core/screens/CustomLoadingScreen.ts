import { ILoadingScreen } from '@babylonjs/core'

export class CustomLoadingScreen implements ILoadingScreen {
  //default loader support. Optional!
  loadingUIBackgroundColor: string
  loadingUIText: string

  constructor(
    private loadingBar: HTMLElement,
    private percentLoaded: HTMLElement,
    private loader: HTMLElement,
  ) {}

  //What happens when loading starts
  displayLoadingUI(): void {
    this.loadingBar.style.width = '0%'
    this.percentLoaded.innerText = '0%'
  }

  //What happens when loading stops
  hideLoadingUI(): void {
    this.loader.id = 'loaded'
		setTimeout(() => {
			this.loader.style.display = 'none'
		}, 1000);
  }

	updateLoadStatus(status: string): void {
		this.loadingBar.style.width = `${status}%`
		this.percentLoaded.innerText = `${status}%`
	}
}
