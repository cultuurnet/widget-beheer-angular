import { Component, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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
   * The form group
   */
  @Input() option: FormGroup;

  /**
   * The option rows
   */
  @Input() rows: any;

  /**
   * The index of the current option
   */
  @Input() index: number;

  /**
   * Build a new option item
   * @param label
   * @param query
   * @returns {FormGroup}
   */
  static buildItem(label: string = '', query: string = '') {
    return new FormGroup({
      label: new FormControl(label, Validators.required),
      query: new FormControl(query, Validators.required)
    });
  }

  /**
   * Handle the row changed event
   * @param change
   */
  public handleRowChanged(change: any) {
    // Update the form
    this.option.updateValueAndValidity();
  }

}
