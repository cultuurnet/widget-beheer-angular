import { Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Widget } from '../widget';

/**
 * Abstract implementation of a widget edit component
 */
export class AbstractWidgetEditComponent implements OnInit, OnDestroy {

  /**
   * The widget edit form
   */
  public widgetEditForm: FormGroup;

  /**
   * The widget
   */
  @Input() widget: Widget;

  /**
   * The widget settings
   */
  public settings: any = {};

  /**
   * Subscription to the widget edit form values
   */
  private formSubscription: Subscription;

  /**
   * AbstractWidgetEditComponent constructor
   */
  constructor(public formBuilder: FormBuilder) {
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
   * Build the initial form
   */
  protected buildForm() {
    // Initialize the form
    this.widgetEditForm = this.formBuilder.group({});
  }

  /**
   * Apply the values from the form to the input model
   * @param values
   */
  protected applyValuesToModel(values: any) {
    // As a default, all top-level properties are applied to the model
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        this.widget.settings[key] = values[key];
      }
    }
  }

  /**
   * Handles the widget name change
   */
  public handleWidgetNameChanged(name: string) {}

}
