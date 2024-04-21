import { action, computed, flow, makeObservable, observable } from 'mobx'
import { FirebaseAuthLayer } from '../../api/firebase/authenticationLayer'
import { FirebaseUserLayer } from '../../api/firebase/userLayer'
import { GameUser } from '../../entities/user'
import { IUser } from '../interfaces/user'

export class UserManager implements IUser {
  private static _firebaseUserLayer: FirebaseUserLayer = new FirebaseUserLayer()
  _gameUser: GameUser

  /**
   * Instanciate the _gameUser
   * @param void
   */
  constructor() {
    makeObservable(this, {
      _gameUser: observable,
      isLoggedIn: computed,
      loginUser: action,
      logoutUser: action,
      userStateChanged: action,
      getGameUser: computed,
    })
    this._gameUser = new GameUser('xxx', 'xxx', 'xxx', 'xxx')
  }

  /**
   * isLoggedIn
   * method check if user is authenticated or not
   * @returns Boolean
   */
  public get isLoggedIn(): Boolean {
    return this._gameUser.uid !== 'xxx'
  }

  /**
   * Get user data
   * @param void
   * @returns GameUser
   * TODO: See the return type
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
  public async loginUser(): Promise<void> {
    try {
      const result = await FirebaseAuthLayer.login()

      // Initialize a GameUser instance with provided value by FirebaseAuth
      this._gameUser.uid = result.uid
      this._gameUser.name = result.displayName || 'xxx'
      this._gameUser.email = result.email || 'xxx'
      this._gameUser.pic = result.photoURL || 'xxx'

      // Merge data to database
      UserManager._firebaseUserLayer.createUser(this._gameUser)
    } catch (err) {
      throw err
    }
  }

  /**
   * logoutUser method sign out user using OAuth Provider
   * @param void
   * @returns void
   */
  public logoutUser(): void {
    try {
      FirebaseAuthLayer.logout()
      this._gameUser.uid = 'xxx'
      this._gameUser.name = 'xxx'
      this._gameUser.email = 'xxx'
      this._gameUser.pic = 'xxx'
    } catch (err) {
      throw err
    }
  }

  /**
   * getGameUser returns the _gameUser field
   * @param void
   * @returns GameUser
   */
  public get getGameUser() {
    return this._gameUser
  }

  /**
   * Defines an subscriber on User states changes
   * @param void
   * @return Boolean
   */
  public userStateChanged(): void {
    FirebaseAuthLayer.onChange()
      .then((user) => {
        this._gameUser.uid = user.uid
        this._gameUser.name = user.displayName || 'xxx'
        this._gameUser.email = user.email || 'xxx'
        this._gameUser.pic = user.photoURL || 'xxx'
      })
      .catch((error) => {
        throw error
      })
  }

  /**
   * @deprecated
   * !! Use instead the low level function provided by API
   * !! Create a new game user (User wants to login)
   * @param user GameUser
   * @returns void
   */
  createUser(user: GameUser): void {
    alert(user + ' cannot use this function...')
  }
}
