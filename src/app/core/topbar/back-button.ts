/**
 * Provides a back button.
 */
export class BackButton {

  static TYPE_LINK = 'link';
  static TYPE_ROUTE = 'route';

  /**
   * The link type
   */
  public type: string;

  /**
   * The link label
   */
  public label: string;

  /**
   * The button url (if type link)
   */
  public url: string;

  /**
   * The button route (if type route)
   */
  public route: Array<string>;

  /**
   * BackButton constructor
   * @param type
   * @param label
   * @param url
   * @param route
   */
  constructor(type: string, label: string, url: string = null, route: Array<string> = []) {
    this.type = type;
    this.label = label;
    this.url = url;
    this.route = route;
  }

}
