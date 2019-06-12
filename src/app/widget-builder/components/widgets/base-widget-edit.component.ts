import { FormBuilder } from '@angular/forms';
import { AbstractWidgetEditComponent } from '../../../core/widget/components/abstract-widget-edit-component';
import { WidgetBuilderService } from '../../services/widget-builder.service';
import { OnDestroy, OnInit } from '@angular/core';

/**
 * Base widget edit component.
 */
export class BaseWidgetEditComponent extends AbstractWidgetEditComponent implements OnInit, OnDestroy {

  /**
   * BaseWidgetEditComponent constructor
   */
  constructor(public formBuilder: FormBuilder, public widgetBuilderService: WidgetBuilderService) {
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
    this.formSubscription = this.widgetEditForm.valueChanges.subscribe(values => {
      // Remove Line breaks from search_query
      var lineBreakRegex = new RegExp(/\r?\n|\r/g);
      values.general.search_query = values.general.search_query.replace(lineBreakRegex,'');

      // Apply the values to the model
      this.applyValuesToModel(values);
    });
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
    this.formSubscription = this.widgetEditForm.valueChanges.subscribe(values => {
      // Apply the values to the model
      this.applyValuesToModel(values);
    });
  }

}
