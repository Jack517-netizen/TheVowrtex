import { Nullable } from "@babylonjs/core"
import { Timestamp } from "firebase/firestore/lite"

export class GameUser {
  private _uid: string
  private _uuid: string = '' // for multiplayer && public purpose
  private _name: string
  private _username: string = ''
  private _email: string
  private _pic: string // user profile photo
  private _tex: number = 0
  private _token: number = 0
  private _star: number = 0

  /**
   * Initialize a new game user object with unique instance
   * @param uid string
   * @param name string
   * @param email string
   * @param pic string
   */
  constructor(uid: Nullable<string>, name: Nullable<string>, email: Nullable<string>, pic: Nullable<string>) {
    //* Initialize an empty or unauthenticated user
    this._uid = uid || 'xxx'
    this._name = name || 'xxx'
    this._email = email || 'xxx'
    this._pic = pic || 'xxx'
  }

  /**
   * get user name
   * @returns _name
   */
  public getName(): string {
    return this._name
  }

  /**
   * get user username
   * @returns _username
   */
  public getUsername(): string {
    return this._username
  }

  /**
   * set user username
   * @returns void
   */
  public setUsername(newValue: string) {
    this._username = newValue
  }

  /**
   * get user id
   * @returns _uid
   */
  public getUid(): string {
    return this._uuid
  }

  /**
   * get user uuid
   * @returns _uuid
   */
  public getUuid(): string {
    return this._uid
  }

  /**
   * get user Tex
   * @returns _tex
   */
  public getTex(): number {
    return this._tex
  }

  /**
   * set the new value for Tex
   * @returns void
   */
  public setTex(newValue: number) {
    this._tex = newValue
  }

  /**
   * get user Token
   * @returns _token
   */
  public getToken(): number {
    return this._token
  }

  /**
   * set the new value for Token
   * @returns void
   */
  public setToken(newValue: number) {
    this._token = newValue
  }

  /**
   * get user Star
   * @returns _star
   */
  public getStar(): number {
    return this._star
  }

  /**
   * set the new value for Star
   * @returns void
   */
  public setStar(newValue: number) {
    this._star = newValue
  }

  /**
   * get user email
   * @returns _email
   */
  public getEmail(): string {
    return this._email
  }

  /**
   * get user pic
   * @returns _pic
   */
  public getPic(): string {
    return this._pic
  }

  /**
   * isNotEmpty returns Boolean flag to know
   * if user is authenticated or not
   * @param void
   * @returns Boolean
   */
  public isNotEmpty(): Boolean {
    return (
      this._uid !== 'xxx' &&
      this._name !== 'xxx' &&
      this._email !== 'xxx' &&
      this._pic !== 'xxx'
    )
  }

  /**
   * isEmpty returns Boolean flag to know
   * if user is authenticated or not
   * @param void
   * @returns Boolean
   */
  public isEmpty(): Boolean {
    return (
      this._uid === 'xxx' &&
      this._name === 'xxx' &&
      this._email === 'xxx' &&
      this._pic === 'xxx'
    )
  }

}
