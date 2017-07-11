import { Component, Input } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { WidgetGroupFiltersGroupOptionEditComponent } from "./widget-group-filters-group-option-edit.component";
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
   * The form group
   */
  @Input() groupFilter: FormGroup;

  /**
   * The group rows
   */
  @Input() rows: any;

  /**
   * The index of the current group
   */
  @Input() index: number;

  /**
   * The available filter types
   */
  public filterTypes: any;

  /**
   * WidgetGroupFiltersGroupEditComponent constructor
   */
  constructor() {
    this.filterTypes = group_filter_types;
  }

  /**
   * Add an empty option form component to the form
   */
  public addOption() {
    let control = <FormArray>this.groupFilter.controls['options'];
    control.push(WidgetGroupFiltersGroupOptionEditComponent.buildItem());
  }

  /**
   * Build group filter item
   * @param label
   * @param placeholder
   * @param type
   * @param options
   * @returns {FormGroup}
   */
  static buildItem(label: string = '', placeholder: string = '', type?: string, options: any = []) {
    let filterOptions = [];

    // Create the filter options form components
    for (let option of options) {
      filterOptions.push(WidgetGroupFiltersGroupOptionEditComponent.buildItem(option.label, option.query));
    }

    // Add empty options form if needed
    if (!filterOptions.length) {
      filterOptions.push(WidgetGroupFiltersGroupOptionEditComponent.buildItem());
    }

    // Set the default filter type if none is provided
    if (!type) {
      let defaultFieldType = group_filter_types.find(filterType => filterType.default === true);
      if (defaultFieldType) {
        type = defaultFieldType.type;
      }
    }

    return new FormGroup({
      label: new FormControl(label, Validators.required),
      placeholder: new FormControl(placeholder, Validators.required),
      type: new FormControl(type, Validators.required),
      options: new FormArray(filterOptions)
    });
  }

  /**
   * Handle the row changed event
   * @param change
   */
  public handleRowChanged(change: any) {
    // Update the form
    this.groupFilter.updateValueAndValidity();
  }

}
