import { FormBuilder } from '@angular/forms';
import { AbstractWidgetEditDirective } from '../../../core/widget/components/abstract-widget-edit-component';
import { WidgetBuilderService } from '../../services/widget-builder.service';
import { OnDestroy, OnInit, Directive } from '@angular/core';
import { QueryStringService } from 'app/widget-builder/services/query-string.service';

/**
 * Base widget edit component.
 */
@Directive()
/* eslint-disable */
export class BaseWidgetEditDirective
  extends AbstractWidgetEditDirective
  implements OnInit, OnDestroy
{
  /* eslint-enable */
  /**
   * BaseWidgetEditDirective constructor
   */
  constructor(
    public formBuilder: FormBuilder,
    public widgetBuilderService: WidgetBuilderService,
    public queryStringService: QueryStringService
  ) {
    super(formBuilder);
  }

  /**
   * @inheritDoc
   */
  ngOnInit(): void {
    // Create a reference to the widget settings
    this.settings = this.widget.settings;

    // Initialize the form
    this.buildForm();

    // Subscribe to changes in the form and reflect them on the widget model
    this.formSubscription = this.widgetEditForm.valueChanges.subscribe(
      (values) => {
        // Remove Line breaks from search results and tips widget
        if (values.search_params && values.search_params.query) {
          values.search_params.query = this.queryStringService.removeLineBreaks(
            values.search_params.query
          );
        }
        // Remove line breaks from search box
        if (values.general && values.general.search_query) {
          values.general.search_query =
            this.queryStringService.removeLineBreaks(
              values.general.search_query
            );
        }
        // Apply the values to the model
        this.applyValuesToModel(values);
      }
    );
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  /**
   * @inheritDoc
   */
  public handleWidgetNameChanged(name: string) {
    this.widgetBuilderService.saveWidgetPage(this.widget.id);
  }

  /**
   * Handle changes in the group filters
   */
  public handleGroupFiltersChanged() {
    this.widgetBuilderService.saveWidgetPage(this.widget.id);
  }

  /**
   * Update the form values when the JSON model was changed from the JSON edit component
   */
  public handleJsonChanged() {
    this.buildForm();

    // Subscribe to changes in the form and reflect them on the widget model
    this.formSubscription = this.widgetEditForm.valueChanges.subscribe(
      (values) => {
        // Apply the values to the model
        this.applyValuesToModel(values);
      }
    );
  }
}
