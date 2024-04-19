import { FirebaseAuthLayer } from '../../api/firebase/authenticationLayer'
import { FirebaseUserLayer } from '../../api/firebase/userLayer'
import { GameUser } from '../../entities/user'
import { IUser } from '../interfaces/user'

export class UserManager implements IUser {
  private static _firebaseUserLayer: FirebaseUserLayer = new FirebaseUserLayer()
  private static _gameUser: GameUser = new GameUser(null, null, null, null)

  /**
   * @deprecated
   * Create a new game user (User wants to login)
   * @param user GameUser
   * @returns void
   */
  createUser(user: GameUser): void {
    console.log(user)
  }

  /**
   * Get user data
   * @param void
   * @returns void
   */
  readUser(uid: string): void {
    //TODO: Call FirebaseUserLayer to do low level process
    UserManager._firebaseUserLayer.readUser(uid)
  }

  /**
   * Update user data and associated info
   * @param void
   * @returns void
   */
  updateUser(user: GameUser): void {
    UserManager._firebaseUserLayer.updateUser(user)
  }

  /**
   * Delete existing user info and associated data
   * @param void
   * @returns void
   */
  deleteUser(user: GameUser): void {
    UserManager._firebaseUserLayer.createUser(user)
  }

  /**
   * loginUser method log user using OAuth Provider
   * @param void
   * @returns void
   */
  public static async loginUser(): Promise<void> {
    try {
      const result = await FirebaseAuthLayer.login()

      // Initialize a GameUser instance with provided value by FirebaseAuth
      UserManager._gameUser = new GameUser(
        result.uid,
        result.displayName || '',
        result.email || '',
        result.photoURL || '',
      )

      // Merge data to database
      UserManager._firebaseUserLayer.createUser(UserManager._gameUser)
    } catch (err) {
      throw err
    }
  }

  /**
   * logoutUser method sign out user using OAuth Provider
   * @param void
   * @returns void
   */
  public static logoutUser(): void {
    try {
      const result = FirebaseAuthLayer.logout()
      // log-out success
    } catch (err) {
      throw err
    }
  }

  /**
   * Defines an subscriber on User states changes
   * @param void
   * @return Boolean
   */
  public static userStateChanged(): Boolean {
    return FirebaseAuthLayer.onChange()
  }

  /**
   * getCurrentUser returns the current logged user
   * @param void
   * @returns GameUser instance
   */
  public static getCurrentGameUser(): GameUser {
    const result = FirebaseAuthLayer.getCurrentUser()
    if (result !== null) {
      UserManager._gameUser = new GameUser(
        result.uid,
        result.displayName || '',
        result.email || '',
        result.photoURL || '',
      )
    }
    return UserManager._gameUser
  }

  /**
   * isNotEmpty returns Boolean flag to know
   * if user is authenticated or not
   * @param void
   * @returns Boolean
   */
  public static isNotEmpty(): Boolean {
    return (
      UserManager._gameUser.getUid() !== 'xxx' &&
      UserManager._gameUser.getName() !== 'xxx' &&
      UserManager._gameUser.getEmail() !== 'xxx' &&
      UserManager._gameUser.getPic() !== 'xxx'
    )
  }

  /**
   * isEmpty returns Boolean flag to know
   * if user is authenticated or not
   * @param void
   * @returns Boolean
   */
  public static isEmpty(): Boolean {
    return (
      UserManager._gameUser.getUid() === 'xxx' &&
      UserManager._gameUser.getName() === 'xxx' &&
      UserManager._gameUser.getEmail() === 'xxx' &&
      UserManager._gameUser.getPic() === 'xxx'
    )
  }
}

