import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { group_filter_types } from 'app/widget-builder/constants/group-filters';
import { Widget } from '../../../../core/widget/widget';
import { TranslateService } from '@ngx-translate/core';

/**
 * Widget facility filters edit component.
 */
@Component({
  selector: 'app-widget-facility-filters-edit',
  templateUrl: './widget-facility-filters-edit.component.html'
})
export class WidgetFacilityFiltersEditComponent implements OnInit, OnDestroy {

  /**
   * The facility filters model
   */
  @Input() facilityFilters: any;

  /**
   * Optional facilityfilter type
   * This forces the facilityfilter to always be the given type.
   */
  @Input() type: string = null;

  /**
   * Hide the type options
   */
  @Input() hideType = false;

  /**
   * Show the facilityfilter placeholder field
   */
  @Input() hidePlaceholder = false;

  /**
   * Hide the default options
   */
  @Input() hideDefaultOption = false;

  /**
   * Notify when the facility filters have changed
   */
  @Output() facilityFiltersChanged = new EventEmitter();

  /**
   * The facility filter form
   */
  public facilityFilterForm: FormGroup;

  /**
   * The available facilityfilter types
   */
  public filterTypes: Array<any> = [];

  /**
   * Subscription to the filter form values
   */
  private formSubscription: Subscription;


  /**
   * WidgetFacilityFiltersFilterEditComponent constructor
   */
  constructor(private formBuilder: FormBuilder, private translateService: TranslateService) {
  }

  /**
   * @inheritDoc
   */
  ngOnInit() {
    // Initialize the form
    this.buildForm();

    // Subscribe to changes in the form and reflect them on the widget facilityFilters model
    this.formSubscription = this.facilityFilterForm.valueChanges.subscribe(values => {
      for (const key in values) {

        if (values.hasOwnProperty(key)) {
          this.facilityFilters[key] = values[key];
        }
      }

      // Notify watchers
      this.facilityFiltersChanged.emit();
    });

    this.filterTypes = group_filter_types;
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  /**
   * Build the initial form
   */
  public buildForm() {
    const items = [];
    console.log(this.facilityFilters);

    // Create the facility edit form components for the facility filters already on the model
    if (this.facilityFilters.hasOwnProperty('filters')) {
      for (const facilityFilter of this.facilityFilters.filters) {
        items.push(this.buildFacilityFilterItem(
            facilityFilter.type,
            facilityFilter.label,
            facilityFilter.placeholder,
            facilityFilter.options,
            facilityFilter.default_option
        ));
      }
    }

    // Add an empty option if needed
    if (!items.length) {
      items.push(this.buildFacilityFilterItem('', this.translateService.instant('GROUP_FILTERS_DEFAULT_LABEL')));
    }

    // Initialize the form
    this.facilityFilterForm = this.formBuilder.group({
      enabled: this.facilityFilters.enabled,
      filters: this.formBuilder.array(items)
    });

  }

  /**
   * Build facility filter item
   * @param type
   * @param label
   * @param placeholder
   * @param options
   * @param default_option
   * @returns {FormGroup}
   */
  private buildFacilityFilterItem(type?: string, label: string = '', placeholder: string = '', options: any = [], default_option: string = '') {
    const filterOptions = [];

    // Create the filter options form components
    for (const option of options) {
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
        type = this.type;
      } else {
        // Fall back to the default
        const defaultFieldType = group_filter_types.find(filterType => filterType.default === true);
        if (defaultFieldType) {
          type = defaultFieldType.type;
        }
      }
    }

    const formGroup = {
      label: [label, Validators.required],
      type: [type, this.hideType ? [] : Validators.required],
      placeholder: [placeholder, this.hidePlaceholder ? [] : Validators.required],
      options: this.formBuilder.array(filterOptions),
      default_option: [default_option]
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
   * Add a facility filter formgroup
   */
  public addFacilityFilterItem() {
    const control = <FormArray>this.facilityFilterForm.controls['filters'];
    control.push(this.buildFacilityFilterItem(this.type, this.translateService.instant('GROUP_FILTERS_DEFAULT_LABEL')));
  }

  /**
   * Add a facility filter option
   */
  public addFacilityFilterOptionItem(formArray: FormArray) {
    formArray.push(this.buildFilterOptionItem());
  }

  /**
   * Handle the row changed event
   * @param change
   */
  public handleRowChanged(change: any) {
    if (change.action !== 'confirm') {
      // Traverse the form and update all childrens' value and validity
      const filters = this.facilityFilterForm.get('filters');
      if (filters) {
        for (const filter in filters['controls']) {
          if (filters['controls'].hasOwnProperty(filter)) {
            const filterGroup = filters['controls'][filter];
            filterGroup.updateValueAndValidity();

            if (filters['controls'].hasOwnProperty(filter)) {
              const options = filters['controls'][filter].get('options');
              if (options) {
                options.updateValueAndValidity();
              }
            }
          }
        }
      }
    }
  }

  /**
   * Handle a status update of group filters.
   */
  public handleStatusUpdate(event: any) {
    this.facilityFiltersChanged.emit();
  }

}
