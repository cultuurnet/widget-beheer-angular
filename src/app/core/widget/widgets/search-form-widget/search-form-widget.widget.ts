import { Widget } from "../../widget";

/**
 * Provide a search form widget.
 */
export class SearchFormWidget implements Widget {

  /**
   * SearchFormWidget constructor.
   * @param type
   * @param settings
   */
  constructor(public type: string, public settings: any) {
  }

}
