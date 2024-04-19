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

export class FirebaseAuthLayer {
  private static _auth: Auth = getAuth(APP.getApp())

  /**
   * This method is a wrapper at the top for the
   * firebase login process
   */
  public static async login(): Promise<User> {
    try {
      const provider = new GoogleAuthProvider()

      const result = await signInWithPopup(FirebaseAuthLayer._auth, provider)
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
    signOut(FirebaseAuthLayer._auth)
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
  public static onChange(): Boolean {
    onAuthStateChanged(FirebaseAuthLayer._auth, (user) => {
      if (user) {
        // User is signed in, see docs
      } else {
        // User is signed out
      }
    })
    return true
  }

  /**
   * getCurrentUser method the current signed-in firebase user
   * @param void
   * @returns void
   */
  public static getCurrentUser(): User | null {
    const auth = getAuth()
    const user = auth.currentUser
    return user
  }
}
