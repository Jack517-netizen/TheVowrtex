import { action, computed, makeAutoObservable } from 'mobx'

export class GameUser {
  _uid: string
  _name: string
  _email: string
  _pic: string // user profile photo
  _tex: number = 0
  _token: number = 0
  _star: number = 0
  _uuid: string // for multiplayer && public purpose
  _username: string

  /**
   * Initialize a new game user object with unique instance
   * @param uid string
   * @param name string
   * @param email string
   * @param pic string
   */
  constructor(uid: string, name: string, email: string, pic: string) {
    makeAutoObservable(this)
    //* Initialize an empty or unauthenticated user
    this._uid = uid
    this._name = name
    this._email = email
    this._pic = pic
  }

  /**
   * get user id
   * @returns _uid
   */
  public get uid(): string {
    return this._uid
  }

  /**
   * get user name
   * @returns _name
   */
  public get name(): string {
    return this._name
  }

  /**
   * get user email
   * @returns _email
   */
  public get email(): string {
    return this._email
  }

  /**
   * get user pic
   * @returns _pic
   */
  public get pic(): string {
    return this._pic
  }

  /**
   * get user username
   * @returns _username
   */
  public get username(): string {
    return this._username
  }

  /**
   * get user uuid
   * @returns _uuid
   */
  public get uuid(): string {
    return this._uid
  }

  /**
   * get user Tex
   * @returns _tex
   */
  public get tex(): number {
    return this._tex
  }

  /**
   * get user Star
   * @returns _star
   */
  public get star(): number {
    return this._star
  }

  /**
   * get user Token
   * @returns _token
   */
  public get token(): number {
    return this._token
  }

  /**
   * set user username
   * @returns void
   */
  public set username(value: string) {
    this._username = value
  }

  /**
   * set user uid
   * @returns _uid
   */
  public set uid(value: string) {
    this._uid = value
  }

  /**
   * get user Email
   * @returns _email
   */
  public set email(value: string) {
    this._email = value
  }

  /**
   * set the new value for Tex
   * @returns void
   */
  public set tex(value: number) {
    this._tex = value
  }

  /**
   * set the new value for Token
   * @returns void
   */
  public set token(value: number) {
    this._token = value
  }

  /**
   * set the new value for Star
   * @returns void
   */
  public set star(value: number) {
    this._star = value
  }

  /**
   * get user Uuid
   * @returns _uuid
   */
  public set uuid(value: string) {
    this._uid = value
  }

  /**
   * set user name
   * @returns _name
   */
  public set name(value: string) {
    this._name = value
  }

  /**
   * set user picture
   * @returns _pic
   */
  public set pic(value: string) {
    this._pic = value
  }
}
