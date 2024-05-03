import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth'
import { APP } from '../../core/components/app'
import { Nullable } from '@babylonjs/core'

export class FirebaseAuthLayer {
  /**
   * This method is a wrapper at the top for the
   * firebase login process
   */
  public static async login(): Promise<User> {
    try {
      const auth = getAuth(APP.getApp())
      const provider = new GoogleAuthProvider()

      const result = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = credential?.accessToken

      return result.user
    } catch (error: any) {
      // Handle Errors here
      const errorCode = error.code
      const errorMessage = error.message

      // The email of the user's account used.
      const email = error.customData.email

      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      console.log('errorCode: ', errorCode)
      console.log('errorMessage: ', errorMessage)
      console.log('credential: ', credential)

      throw error
    }
  }

  /**
   * This method is a wrapper at the top for the
   * firebase logout process
   */
  public static logout(): void {
    const auth = getAuth(APP.getApp())
    signOut(auth)
      .then(() => {
        // Sign-out successful
      })
      .catch((error) => {
        // An error occured
        throw error
      })
  }

  /**
   * Listener and notifier
   */
  public static onChange(): Promise<User> {
    return new Promise((resolve) => {
      const auth = getAuth(APP.getApp())
      let unsubscribe: () => void

      // Subscribe to authentication state changes
      unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          resolve(user)
        } else {
          // User is signed out
        }
      })
      return true
    })
  }
}
