/**
 *  Dividing the types of audio assets
 * used in VORTEX into three main categories: sound, speech, music
 */
export enum AudioType {
  /**
   * Any sort of non-verbal sounds that are propagated
   * from the characters, objects, environment and virtual interfaces in the game
   *  belong to this group.
   * Some examples include the hiss of the wind, the rumble of thunder,
   * footsteps of an approaching enemy, or the bang of a shotgun.
   */
  SOUND,

  /**
   * self-explanatorily refers to the spoken words enacted by voice
   * actors
   */
  SPEECH,

  /**
   * The intelligent organization of pitch, time, loudness and timbre of
   * sound results in an aural form of expression which can be differentiated as music
   */
  MUSIC,

   /**
   * The short-song which can be play in short time
   */
   SFX,
}
