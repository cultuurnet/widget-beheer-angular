import { Component, Input } from "@angular/core";
import { group_filter_types } from "../../../constants/group-filters";

/**
 * Widget group filters group edit component.
 */
@Component({
  selector: 'app-widget-group-filters-group-edit',
  templateUrl: './widget-group-filters-group-edit.component.html'
})
export class WidgetGroupFiltersGroupEditComponent {

  /**
   * The group settings
   */
  @Input() settings: any = {};

  /**
   * The group filter rows
   */
  @Input() groupFilters: any = [];

  /**
   * The index of the current group (row)
   */
  @Input() index: number;

  /**
   * The available filter types
   */
  public groupFilterTypes: any = group_filter_types;

  /**
   * Add a filter option to the filter group
   */
  public addOption() {
    if(!this.settings.hasOwnProperty('options')) {
      this.settings.options = [];
    }

    // Push an empty filter option on the stack
    this.settings.options.push({});
  }

}
