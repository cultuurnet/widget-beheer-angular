import { SearchFormWidgetEditComponent } from './search-form-widget-edit.component';
import { Widget } from "../../widget";

/**
 * Provide a search form widget.
 */
export class SearchFormWidget implements Widget {

  public type = 'search_form';
  public editComponent = SearchFormWidgetEditComponent;

  /**
   * SearchFormWidget constructor.
   * @param settings
   */
  constructor(public settings: any) {
  }

}
