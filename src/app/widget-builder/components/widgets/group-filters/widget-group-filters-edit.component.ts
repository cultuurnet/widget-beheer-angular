import { Component, Input, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { WidgetGroupFiltersGroupEditComponent } from "./widget-group-filters-group-edit.component";

/**
 * Widget group filters edit component.
 */
@Component({
  selector: 'app-widget-group-filters-edit',
  templateUrl: './widget-group-filters-edit.component.html'
})
export class WidgetGroupFiltersEditComponent implements OnInit {

  /**
   * The group filters model
   */
  @Input() groupFilters: any;

  /**
   * The group filter form
   */
  public groupFilterForm: FormGroup;

  /**
   * WidgetGroupFiltersFilterEditComponent constructor
   */
  constructor(private formBuilder: FormBuilder) {
  }

  /**
   * @inheritDoc
   */
  ngOnInit() {
    // Initialize the form
    this.buildForm();

    // Subscribe to changes in the form and reflect them on the widget groupFilters model
    this.groupFilterForm.valueChanges.subscribe(values => {
      this.groupFilters.filters = values.filters
    });
  }

  /**
   * Build the initial form
   */
  private buildForm() {
    let items = [];

    // Create the group edit form components for the group filters already on the model
    if (this.groupFilters.hasOwnProperty('filters')) {
      for (let groupFilter of this.groupFilters.filters) {
        items.push(WidgetGroupFiltersGroupEditComponent.buildItem(
            groupFilter.label,
            groupFilter.placeholder,
            groupFilter.type,
            groupFilter.options
        ));
      }
    }

    // Add an empty option if needed
    if (!items.length) {
      items.push(WidgetGroupFiltersGroupEditComponent.buildItem());
    }

    // Initialize the form
    this.groupFilterForm = this.formBuilder.group({
      filters: this.formBuilder.array(items)
    });
  }

  /**
   * Add a group filter formgroup
   */
  private addGroup() {
    let control = <FormArray>this.groupFilterForm.controls['filters'];
    control.push(WidgetGroupFiltersGroupEditComponent.buildItem());
  }

}
