/**
 * Defines a User
 */
export class User {

  /**
   * The user id
   */
  public id: string;

  /**
   * The user nickname
   */
  public nick: string;

  /**
   * The user displayname
   */
  public displayName: string;

  /**
   * The user email address
   */
  public mbox: string;

  /**
   * The user avatar
   */
  public depiction: string;

  /**
   * The user status
   */
  public status: string;

  /**
   * The user privacy config
   */
  public privacyConfig: any = {};

  /**
   * The user roles
   */
  public roles: Array<string> = [];

  /**
   * User constructor.
   * @param values
   */
  constructor(values: any = {}) {
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        this[key] = values[key];
      }
    }

    this.displayName = values.givenName || values.nick;
  }

}
