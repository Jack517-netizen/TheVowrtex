export interface IUser {
  /**
   * create method
   */
  createUser(user: NonNullable<any>): void

  /**
   * read method
   */
  readUser(uid: string): void

  /**
   * update method
   */
  updateUser(user: NonNullable<any>): void

  /**
   * delete method
   */
  deleteUser(user: NonNullable<any>): void
}
