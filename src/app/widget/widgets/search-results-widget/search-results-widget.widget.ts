import { Widget } from "../../widget";
import { SearchResultsWidgetEditComponent } from "./search-results-widget-edit.component";

/**
 * Provide a search results widget.
 */
export class SearchResultsWidget implements Widget {

  public editComponent = SearchResultsWidgetEditComponent;

  /**
   * SearchResultsWidget constructor.
   * @param settings
   */
  constructor(public settings: any) {
  }

}
