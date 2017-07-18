import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { WidgetGroupFiltersGroupEditComponent } from "./widget-group-filters-group-edit.component";
import { Subscription } from "rxjs";

/**
 * Widget group filters edit component.
 */
@Component({
  selector: 'app-widget-group-filters-edit',
  templateUrl: './widget-group-filters-edit.component.html'
})
export class WidgetGroupFiltersEditComponent implements OnInit, OnDestroy {

  /**
   * The group filters model
   */
  @Input() groupFilters: any;

  /**
   * The group filter form
   */
  public groupFilterForm: FormGroup;

  /**
   * Subscription to the filter form values
   */
  private formSubscription: Subscription;

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
    this.formSubscription = this.groupFilterForm.valueChanges.subscribe(values => {
      for (let key in values) {
        if (values.hasOwnProperty(key)) {
          this.groupFilters[key] = values[key];
        }
      }
    });
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy() {
    // Unsubscribe from the form value changes
    this.formSubscription.unsubscribe();
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
      enabled: this.groupFilters.enabled,
      filters: this.formBuilder.array(items)
    });
  }

  /**
   * Add a group filter formgroup
   */
  public addGroup() {
    let control = <FormArray>this.groupFilterForm.controls['filters'];
    control.push(WidgetGroupFiltersGroupEditComponent.buildItem());
  }

}
