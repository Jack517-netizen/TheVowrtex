export class GameUser {
    private static _uid: string
    private static _uuid: string = '' // for multiplayer && public purpose
    private static _name: string
    private static _username: string = ''
    private static _email: string
    private static _pic: string // user profile photo
    private static _tex: number = 0
    private static _token: number = 0
    private static _star: number = 0

    /**
     * initialize the unique user for game session
     * @returns GameUser user
     */
    public static init(uid: string, name: string, email: string, pic: string) {
        this._uid = uid
        this._name = name
        this._email = email
        this._pic = pic
    }

    /**
     * get user name
     * @returns _name
     */
    public static getName(): string{
        return this._name
    }

    /**
     * get user username
     * @returns _username
     */
    public static getUsername(): string{
        return this._username
    }

    /**
     * set user username
     * @returns void
     */
    public static setUsername(newValue: string) {
        this._username = newValue
    }

    /**
     * get user id
     * @returns _uid
     */
    public static getUid(): string{
        return this._uuid
    }

    /**
     * get user uuid
     * @returns _uuid
     */
    public static getUuid(): string{
        return this._uid
    }

    /**
     * get user Tex
     * @returns _tex
     */
    public static getTex(): number{
        return this._tex
    }

    /**
     * set the new value for Tex
     * @returns void
     */
    public static setTex(newValue: number){
        this._tex = newValue
    }

    /**
     * get user Token
     * @returns _token
     */
    public static getToken(): number{
        return this._token
    }

    /**
     * set the new value for Token
     * @returns void
     */
    public static setToken(newValue: number){
        this._token = newValue
    }

    /**
     * get user Star
     * @returns _star
     */
    public static getStar(): number{
        return this._star
    }

    /**
     * set the new value for Star
     * @returns void
     */
    public static setStar(newValue: number){
        this._star = newValue
    }

    /**
     * get user email
     * @returns _email
     */
    public static getEmail(): string{
        return this._email
    }

    /**
     * get user pic
     * @returns _pic
     */
    public static getPic(): string{
        return this._pic
    }
}