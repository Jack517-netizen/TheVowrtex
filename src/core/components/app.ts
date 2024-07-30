import { initializeApp } from 'firebase/app'

export class APP {
  // Your web app's Firebase configuration (For
  // Firebase JS SDK v7.20.0 and later, measurementId is optional)
  private static _firebaseConfig: any = {}

  // Initialize Firebase
  private static _app = initializeApp(APP._firebaseConfig)

  /**
   * getFirebaseConfig method
   * @param void
   * @returns _firebaseConfig
   */
  public static getFirebaseConfig(): any {
    return APP._firebaseConfig
  }

  /**
   * getApp method
   * @param void
   * @returns _app
   */
  public static getApp(): any {
    return APP._app
  }
}
