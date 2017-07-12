import { Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";

/**
 * Abstract implementation of a widget edit component
 */
export class AbstractWidgetEditComponent implements OnInit, OnDestroy {

  /**
   * The widget edit form
   */
  public widgetEditForm: FormGroup;

  /**
   * The widget edit component settings
   */
  @Input() settings: any;

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
    // Initialize the form
    this.buildForm();

    // Subscribe to changes in the form and reflect them on the widget model
    this.formSubscription = this.widgetEditForm.valueChanges.subscribe(values => {
      // Remove all null values from the form values
      // @todo: Decide if the cleanup of the empty/null values should be done here or server-side
      this.deleteEmptyProperties(values, true);

      // Set all top-level properties, so we keep the original settings object and its pointer
      for (let key in values) {
        if (values.hasOwnProperty(key)) {
          this.settings[key] = values[key];
        }
      }
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
   * Delete all null (or undefined) or empty properties from an object.
   * Set 'recursive' to true if you also want to delete properties in nested objects.
   */
  private deleteEmptyProperties(obj, resursive = false) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === null || obj[key] === '') {
          delete obj[key];
        } else if (resursive && typeof obj[key] === 'object') {
          this.deleteEmptyProperties(obj[key], resursive);
        }
      }
    }
  }

}