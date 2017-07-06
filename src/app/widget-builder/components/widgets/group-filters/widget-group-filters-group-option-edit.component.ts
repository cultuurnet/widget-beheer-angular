import { Component, Input } from "@angular/core";

/**
 * Widget group filters group option edit component
 * for editing an individual filter option in a filter group.
 */
@Component({
  selector: 'app-widget-group-filters-group-option-edit',
  templateUrl: './widget-group-filters-group-option-edit.component.html'
})
export class WidgetGroupFiltersGroupOptionEditComponent {

  /**
   * The filter option
   */
  @Input() option: any;

  /**
   * The filter options
   * @type {Array}
   */
  @Input() options: any = [];

  /**
   * The index of the current filter option
   */
  @Input() index: number;

}
