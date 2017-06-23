import { Widget } from "../../widget";
import { SearchFormWidgetEditComponent } from "../../../../widget-builder/components/widgets/search-form-widget/search-form-widget-edit.component";

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
