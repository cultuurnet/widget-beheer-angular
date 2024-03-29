import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { group_filter_types } from 'app/widget-builder/constants/group-filters';
import { TranslateService } from '@ngx-translate/core';
import { QueryStringService } from 'app/widget-builder/services/query-string.service';

/**
 * Widget group filters edit component.
 */
@Component({
  selector: 'app-widget-group-filters-edit',
  templateUrl: './widget-group-filters-edit.component.html',
  providers: [QueryStringService],
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
  @Input() hideType = false;

  /**
   * Show the groupfilter placeholder field
   */
  @Input() hidePlaceholder = false;

  /**
   * Hide the default options
   */
  @Input() hideDefaultOption = false;

  /**
   * Notify when the group filters have changed
   */
  @Output() groupFiltersChanged = new EventEmitter();

  /**
   * The group filter form
   */
  public groupFilterForm: FormGroup;

  /**
   * The available groupfilter types
   */
  public filterTypes: Array<any> = [];

  /**
   * Subscription to the filter form values
   */
  private formSubscription: Subscription;

  /**
   * WidgetGroupFiltersFilterEditComponent constructor
   */
  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private queryStringService: QueryStringService
  ) {}

  /**
   * @inheritDoc
   */
  ngOnInit() {
    // Initialize the form
    this.buildForm();

    // Subscribe to changes in the form and reflect them on the widget groupFilters model
    this.formSubscription = this.groupFilterForm.valueChanges.subscribe(
      (values) => {
        for (const key in values) {
          if (values.hasOwnProperty(key)) {
            this.groupFilters[key] = values[key];
          }
        }
        // Sanitize groupFilters
        this.groupFilters.filters = this.queryStringService.sanitizeFilters(
          this.groupFilters.filters
        );

        // Notify watchers
        this.groupFiltersChanged.emit();
      }
    );

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

    // Create the group edit form components for the group filters already on the model
    if (this.groupFilters.hasOwnProperty('filters')) {
      for (const groupFilter of this.groupFilters.filters) {
        items.push(
          this.buildGroupFilterItem(
            groupFilter.type,
            groupFilter.label,
            groupFilter.placeholder,
            groupFilter.options,
            groupFilter.default_option
          )
        );
      }
    }

    // Add an empty option if needed
    if (!items.length) {
      items.push(
        this.buildGroupFilterItem(
          '',
          this.translateService.instant('GROUP_FILTERS_DEFAULT_LABEL')
        )
      );
    }

    // Initialize the form
    this.groupFilterForm = this.formBuilder.group({
      enabled: this.groupFilters.enabled,
      filters: this.formBuilder.array(items),
    });
  }

  /**
   * Build group filter item
   * @param type
   * @param label
   * @param placeholder
   * @param options
   * @param default_option
   * @returns {FormGroup}
   */
  private buildGroupFilterItem(
    type?: string,
    label = '',
    placeholder = '',
    options: any = [],
    default_option = ''
  ) {
    const filterOptions = [];

    // Create the filter options form components
    for (const option of options) {
      filterOptions.push(
        this.buildFilterOptionItem(option.label, option.query)
      );
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
        const defaultFieldType = group_filter_types.find(
          (filterType) => filterType.default === true
        );
        if (defaultFieldType) {
          type = defaultFieldType.type;
        }
      }
    }

    const formGroup = {
      label: [label, Validators.required],
      type: [type, this.hideType ? [] : Validators.required],
      placeholder: [
        placeholder,
        this.hidePlaceholder ? [] : Validators.required,
      ],
      options: this.formBuilder.array(filterOptions),
      default_option: [default_option],
    };

    return this.formBuilder.group(formGroup);
  }

  /**
   * Build a filter option item
   * @param label
   * @param query
   * @returns {FormGroup}
   */
  private buildFilterOptionItem(label = '', query = '') {
    return this.formBuilder.group({
      label: [label, Validators.required],
      query: [query, Validators.required],
    });
  }

  /**
   * Add a group filter formgroup
   */
  public addGroupFilterItem() {
    const control = <FormArray>this.groupFilterForm.controls['filters'];
    control.push(
      this.buildGroupFilterItem(
        this.type,
        this.translateService.instant('GROUP_FILTERS_DEFAULT_LABEL')
      )
    );
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
    if (change.action !== 'confirm') {
      // Traverse the form and update all childrens' value and validity
      const filters = this.groupFilterForm.get('filters');
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
  public handleStatusUpdate() {
    this.groupFiltersChanged.emit();
  }
}
