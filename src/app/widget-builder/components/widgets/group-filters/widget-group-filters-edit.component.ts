import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { group_filter_types } from "app/widget-builder/constants/group-filters";

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
   * Optional groupfilter type
   * This forces the groupfilter to always be the given type.
   */
  @Input() type: string = null;

  /**
   * Hide the type options
   */
  @Input() hideType: boolean = false;

  /**
   * Show the groupfilter placeholder field
   */
  @Input() hidePlaceholder: boolean = false;

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
      console.log(values);
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
  public buildForm() {
    let items = [];

    // Create the group edit form components for the group filters already on the model
    if (this.groupFilters.hasOwnProperty('filters')) {
      for (let groupFilter of this.groupFilters.filters) {
        items.push(this.buildGroupFilterItem(
            groupFilter.type,
            groupFilter.label,
            groupFilter.placeholder,
            groupFilter.options
        ));
      }
    }

    // Add an empty option if needed
    if (!items.length) {
      items.push(this.buildGroupFilterItem());
    }

    // Initialize the form
    this.groupFilterForm = this.formBuilder.group({
      enabled: this.groupFilters.enabled,
      filters: this.formBuilder.array(items)
    });
  }

  /**
   * Build group filter item
   * @param type
   * @param label
   * @param placeholder
   * @param options
   * @returns {FormGroup}
   */
  private buildGroupFilterItem(type?: string, label: string = '', placeholder: string = '', options: any = []) {
    let filterOptions = [];

    // Create the filter options form components
    for (let option of options) {
      filterOptions.push(this.buildFilterOptionItem(option.label, option.query));
    }

    // Add empty options form if needed
    if (!filterOptions.length) {
      filterOptions.push(this.buildFilterOptionItem());
    }

    // Set the default filter type if none is provided
    if (!type) {
      // Set the type if it is forced on the directive
      if (this.type) {
        type = this.type
      } else {
        // Fall back to the default
        let defaultFieldType = group_filter_types.find(filterType => filterType.default === true);
        if (defaultFieldType) {
          type = defaultFieldType.type;
        }
      }
    }

    let formGroup = {
      label: [label, Validators.required],
      type: [type, this.hideType ? [] : Validators.required],
      placeholder: [placeholder, this.hidePlaceholder ? [] : Validators.required],
      options: this.formBuilder.array(filterOptions)
    };

    return this.formBuilder.group(formGroup);
  }

  /**
   * Build a filter option item
   * @param label
   * @param query
   * @returns {FormGroup}
   */
  private buildFilterOptionItem(label: string = '', query: string = '') {
    return this.formBuilder.group({
      label: [label, Validators.required],
      query: [query, Validators.required]
    });
  }

  /**
   * Add a group filter formgroup
   */
  public addGroupFilterItem() {
    let control = <FormArray>this.groupFilterForm.controls['filters'];
    control.push(this.buildGroupFilterItem(this.type));
  }

  /**
   * Add a group filter option
   */
  public addGroupFilterOptionItem(formArray: FormArray) {
    formArray.push(this.buildFilterOptionItem());
  }

  /**
   * Handle the row changed event
   * @param change
   */
  public handleRowChanged(change: any) {
    // Update the form
    this.groupFilterForm.updateValueAndValidity();
  }

}
