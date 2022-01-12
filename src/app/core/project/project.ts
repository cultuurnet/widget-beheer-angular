/**
 * Represents a Project
 */
export class Project {
  /**
   * The project Id
   */
  public id: string;

  /**
   * The project name
   */
  public name: string;

  /**
   * The project user id
   */
  public userId: string;

  /**
   * The project created timestamp
   */
  public created: number;

  /**
   * The project updated timestamp
   */
  public updated: number;

  /**
   * The "test" consumer key
   */
  public testConsumerKey: string;

  /**
   * The "test" consumer secret
   */
  public testConsumerSecret: string;

  /**
   * The "live" consumer key
   */
  public liveConsumerKey: string;

  /**
   * The "live" consumer secret
   */
  public liveConsumerSecret: string;

  /**
   * The content filter
   */
  public contentFilter: string;

  /**
   * The coupon code
   */
  public coupon: string;

  /**
   * Project constructor.
   * @param values
   */
  constructor(values: any = {}) {
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        this[key] = values[key];
      }
    }
  }
}
