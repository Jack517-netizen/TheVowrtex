import Navigo from 'navigo'

export class RouterManager {
  private static router: Navigo

  /**
   * generateRoutes register all routes which will be using in app.
   * @param void
   * @returns _router Navigo
   */
  public static generateRoutes(): Navigo {
    RouterManager.router = new Navigo('/')

    // ...register
    RouterManager.router.on({
      //* home page
      '/': {
        as: 'home-page',
        uses: () => {
          console.log('Home page')
        },
      },

      //* offline page
      '/offline': {
        as: 'offline-page',
        uses: () => {
          window.location.replace('/offline/')
        },
      },

      //* unsupported devices page
      '/unsupported-devices': {
        as: 'unsupported-devices-page',
        uses: ({ params }) => {
          window.location.replace(
            '/unsupported-devices?browserName=' +
              params.browserName +
              '&osName=' +
              params.osName,
          )
        },
      },
    })

    // ... NOT FOUND case
    RouterManager.router.notFound(() => {
      window.location.replace('/not-found-page')
    })

    // By default, Navigo is not resolving our routes
    RouterManager.router.resolve()
    return RouterManager.router
  }

  /**
   * getCurrentLocationURL returns the current url shown in adress bar
   * @param void
   * @returns string
   */
  public static getCurrentLocationURL(): string {
    const _tmp = RouterManager.router.getCurrentLocation()
    console.log(_tmp)
    return _tmp.url
  }
}
