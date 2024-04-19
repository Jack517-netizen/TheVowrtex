import { initializeApp } from "firebase/app"

export class APP {
  // Your web app's Firebase configuration (For
  // Firebase JS SDK v7.20.0 and later, measurementId is optional)
  private static _firebaseConfig: any = {
    apiKey: 'AIzaSyDqSkPyq2l92R27JFbYyYQmNdYh-UpRcJ4',
    authDomain: 'vortexx-e89f8.firebaseapp.com',
    projectId: 'vortexx-e89f8',
    storageBucket: 'vortexx-e89f8.appspot.com',
    messagingSenderId: '76885884562',
    appId: '1:76885884562:web:84ecce2058c3af5094f04b',
    measurementId: 'G-3JPQNTSWG3',
  }

	// Initialize Firebase
	private static _app = initializeApp(APP._firebaseConfig)

	/**
	 * getFirebaseConfig method
	 * @param void
	 * @returns _firebaseConfig
	 */
	public static getFirebaseConfig(): any{
		return APP._firebaseConfig
	}

	/**
	 * getApp method
	 * @param void
	 * @returns _app
	 */
	public static getApp(): any{
		return APP._app
	}
}
