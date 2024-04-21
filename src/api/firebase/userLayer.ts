import { setDoc, doc, Firestore, getFirestore } from 'firebase/firestore'
import { IUser } from '../../core/interfaces/user'
import { APP } from '../../core/components/app'
import { GameUser } from '../../entities/user'

// Firestore data converter
const userConverter = {
  /**
   * toFirestore method converts GameUser model to JSON object
   * @param void
   * @returns void
   */
  toFirestore: (user: GameUser) => {
    return {
      uid: user.uid,
      name: user.name,
      email: user.email,
      pic: user.pic,
      tex: user.tex,
      star: user.star,
      token: user.token,
      joinedDate: Date.now(),
    }
  },

  /**
   * fromFirestore converts JSON object to GameUser model
   */
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options)
    return new GameUser(data.uid, data.name, data.email, data.pic)
  },
}

export class FirebaseUserLayer implements IUser {
  private static _db: Firestore = getFirestore(APP.getApp())

  /**
   * Insert user data in the firebase firestore
   * @param user GameUser
   * @returns Promise<void>
   */
  async createUser(user: GameUser): Promise<void> {
    const docRef = await setDoc(
      doc(FirebaseUserLayer._db, 'users', user.uid),
      userConverter.toFirestore(user),
      { merge: true },
    )
  }

  /**
   * !
   * Get user data from the firebase firestore [ NOT IMPLEMENTED]
   */
  readUser(uid: string): void {
    throw new Error(uid)
  }

  /**
   * !
   * Update user data stored in the database [ NOT IMPLEMENTED]
   */
  updateUser(user: GameUser): void {
    throw new Error(JSON.stringify(user))
  }

  /**
   * !
   * Delete user data stored in the database [ NOT IMPLEMENTED]
   */
  deleteUser(user: JSON): void {
    throw new Error(JSON.stringify(user))
  }
}
