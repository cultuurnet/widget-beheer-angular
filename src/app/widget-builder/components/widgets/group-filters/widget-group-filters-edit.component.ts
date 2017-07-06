import { Component, Input } from "@angular/core";
import { group_filter_types } from "../../../constants/group-filters";

/**
 * Widget group filters edit component.
 */
@Component({
  selector: 'app-widget-group-filters-edit',
  templateUrl: './widget-group-filters-edit.component.html'
})
export class WidgetGroupFiltersEditComponent {

  /**
   * The group filters
   */
  @Input() groupFilters: any = [];

  /**
   * The default filter type
   */
  public defaultFilterType: any;

  /**
   * WidgetGroupFiltersFilterEditComponent constructor.
   */
  constructor() {
    // Set the default filter type (useful when adding a new filter)
    for (let type of group_filter_types) {
      if (type.default) {
        this.defaultFilterType = type;
      }
    }
  }

  /**
   * Add a group filter
   */
  public addGroupFilter() {
    this.groupFilters.push({
      type: this.defaultFilterType.type,
    });
  }

}
