import { Widget } from "../../widget";

/**
 * Provide a search results widget.
 */
export class SearchResultsWidget implements Widget {

  /**
   * SearchFormWidget constructor.
   * @param type
   * @param settings
   */
  constructor(public type: string, public settings: any) {
  }

}
