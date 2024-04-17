import { GameUser } from '../../entities/user'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

export class FirebaseOAuth {
  /**
   * This method is a wrapper at the top for the
   * firebase login process
   */
  public static login() {
    const provider = new GoogleAuthProvider()
    const auth = getAuth()

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken

        // The signed-in user info.
        const user = result.user
        GameUser.init(
          user.uid,
          user.displayName || '',
          user.email || '',
          user.photoURL || '',
        )
      })
      .catch((error) => {
        // Handle Errors here
        const errorCode = error.code
        const errorMessage = error.message

        // The email of the user's account used.
        const email = error.customData.email

        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
      })
  }

  /**
   * This method is a wrapper at the top for the
   * firebase logout process
   */
  public logout() {
    //TODO: Implement log out user process
  }
}
